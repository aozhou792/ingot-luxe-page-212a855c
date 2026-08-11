/**
 * Post-build prerender for Vercel + local.
 * Uses full puppeteer locally; puppeteer-core + @sparticuz/chromium on Vercel CI.
 *
 * Guardrails:
 * - SKIP_PRERENDER blocked on Vercel (prevents shipping SPA shell meta to all URLs)
 * - Per-route failures fail the build (exit 1)
 * - seo-ready wait has a hard timeout
 * - Spot-check sample HTML for unique title/canonical + data-seo-ready
 */
import { createServer } from "node:http";
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { getPrerenderRoutes } from "./prerender-routes.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, "../dist");
const PORT = 4173;
const CONCURRENCY = 3;
const SEO_READY_TIMEOUT_MS = 45_000;
const NAV_TIMEOUT_MS = 90_000;
let spaShell = "";

function routeToFile(route: string): string {
  if (route === "/") return join(DIST, "index.html");
  return join(DIST, route.replace(/^\//, ""), "index.html");
}

const MIME: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".woff2": "font/woff2",
};

function startStaticServer(): Promise<ReturnType<typeof createServer>> {
  return new Promise((resolvePromise) => {
    const server = createServer((req, res) => {
      const url = req.url?.split("?")[0] ?? "/";
      const filePath = url === "/" ? join(DIST, "index.html") : join(DIST, url.replace(/^\//, ""));

      if (existsSync(filePath) && statSync(filePath).isFile()) {
        const ext = extname(filePath);
        res.writeHead(200, { "Content-Type": MIME[ext] ?? "application/octet-stream" });
        res.end(readFileSync(filePath));
        return;
      }

      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(spaShell);
    });
    server.listen(PORT, () => resolvePromise(server));
  });
}

async function launchBrowser() {
  const onVercel = process.env.VERCEL === "1";

  if (onVercel) {
    const chromium = await import("@sparticuz/chromium");
    const puppeteer = await import("puppeteer-core");
    return puppeteer.default.launch({
      args: chromium.default.args,
      executablePath: await chromium.default.executablePath(),
      headless: true,
    });
  }

  const puppeteer = await import("puppeteer");
  return puppeteer.default.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
}

async function waitForSeoReady(page: import("puppeteer").Page) {
  await Promise.race([
    page.evaluate(
      () =>
        new Promise<void>((resolve) => {
          if (document.documentElement.dataset.seoReady === "true") {
            resolve();
            return;
          }
          document.addEventListener("seo-ready", () => resolve(), { once: true });
        }),
    ),
    new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error(`seo-ready timeout after ${SEO_READY_TIMEOUT_MS}ms`)), SEO_READY_TIMEOUT_MS);
    }),
  ]);
}

async function prerenderRoute(page: import("puppeteer").Page, route: string) {
  const url = `http://127.0.0.1:${PORT}${route}`;
  await page.goto(url, { waitUntil: "load", timeout: NAV_TIMEOUT_MS });
  await page.waitForSelector("h1", { timeout: NAV_TIMEOUT_MS });
  await waitForSeoReady(page);
  const html = await page.content();
  if (!html.includes('data-seo-ready="true"') && !html.includes("data-seo-ready='true'")) {
    throw new Error(`${route}: rendered HTML missing data-seo-ready`);
  }
  const out = routeToFile(route);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html, "utf-8");
}

async function runPool(browser: import("puppeteer").Browser, routes: string[]) {
  let index = 0;
  const failures: { route: string; message: string }[] = [];

  async function worker() {
    const page = await browser.newPage();
    try {
      while (index < routes.length) {
        const route = routes[index++];
        process.stdout.write(`prerender ${route}\n`);
        try {
          await prerenderRoute(page, route);
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          console.error(`[${route}] ${message}`);
          failures.push({ route, message });
        }
      }
    } finally {
      await page.close();
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));

  if (failures.length > 0) {
    const summary = failures.map((f) => `  - ${f.route}: ${f.message}`).join("\n");
    throw new Error(`Prerender failed for ${failures.length} route(s):\n${summary}`);
  }
}

/** Spot-check that crawlers will not see homepage title on deep URLs. */
function verifyPrerenderArtifacts(routes: string[]) {
  const homeTitle = "Alibarbar Ingot 9000 Australia | Flavours & Authentic Store";
  const samples: { route: string; mustInclude: string[]; mustNotInclude?: string[] }[] = [
    {
      route: "/",
      mustInclude: ["<title>", homeTitle, 'rel="canonical"', "https://www.ailibarbar.com/", 'data-seo-ready="true"'],
    },
    {
      route: "/shop",
      mustInclude: ["<title>", "/shop", 'rel="canonical"', 'data-seo-ready="true"'],
      mustNotInclude: [`<title>${homeTitle}</title>`],
    },
    {
      route: "/product/peach-ice",
      mustInclude: ["<title>", "Peach Ice", "/product/peach-ice", 'rel="canonical"', 'data-seo-ready="true"'],
      mustNotInclude: [`<title>${homeTitle}</title>`],
    },
  ];

  const available = new Set(routes);
  for (const sample of samples) {
    if (!available.has(sample.route) && sample.route !== "/") {
      // Still verify if file exists after prerender of overlapping set
    }
    const file = routeToFile(sample.route);
    if (!existsSync(file)) {
      throw new Error(`Prerender verify failed: missing ${file}`);
    }
    const html = readFileSync(file, "utf-8");
    for (const needle of sample.mustInclude) {
      if (!html.includes(needle)) {
        throw new Error(`Prerender verify failed for ${sample.route}: missing "${needle}"`);
      }
    }
    for (const needle of sample.mustNotInclude ?? []) {
      if (html.includes(needle)) {
        throw new Error(`Prerender verify failed for ${sample.route}: unexpected "${needle}"`);
      }
    }
  }

  console.log("Prerender verify OK (/, /shop, /product/peach-ice).");
}

async function main() {
  if (process.env.SKIP_PRERENDER === "1") {
    if (process.env.VERCEL === "1") {
      console.error("SKIP_PRERENDER=1 is not allowed on Vercel. Refusing to ship SPA-shell HTML.");
      process.exit(1);
    }
    console.log("SKIP_PRERENDER=1 — skipping post-build prerender (local only).");
    return;
  }

  if (!existsSync(join(DIST, "index.html"))) {
    throw new Error(`Missing ${join(DIST, "index.html")} — run vite build first.`);
  }

  const routes = getPrerenderRoutes();
  spaShell = readFileSync(join(DIST, "index.html"), "utf-8");
  const server = await startStaticServer();
  const browser = await launchBrowser();

  try {
    console.log(`Prerendering ${routes.length} routes…`);
    await runPool(browser, routes);
    verifyPrerenderArtifacts(routes);
    console.log("Prerender complete.");
  } finally {
    await browser.close();
    server.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

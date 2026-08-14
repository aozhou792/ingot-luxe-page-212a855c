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
const CONCURRENCY = process.env.VERCEL === "1" ? 1 : 3;
const SEO_READY_TIMEOUT_MS = 20_000;
const NAV_TIMEOUT_MS = 30_000;
const H1_TIMEOUT_MS = 20_000;
const FAIL_FAST_AFTER = 3;
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
    const chromium = (await import("@sparticuz/chromium")).default;
    const puppeteer = (await import("puppeteer-core")).default;
    // Chromium args already include `--headless='shell'`. `headless: true` adds
    // `--headless=new`, which paints a blank document so every route times out on h1.
    chromium.setGraphicsMode = false;
    return puppeteer.launch({
      args: chromium.args,
      defaultViewport: { width: 1280, height: 720, deviceScaleFactor: 1 },
      executablePath: await chromium.executablePath(),
      headless: "shell",
    });
  }

  const puppeteer = await import("puppeteer");
  return puppeteer.default.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
}

function isLocalUrl(url: string) {
  return (
    url.startsWith(`http://127.0.0.1:${PORT}`) ||
    url.startsWith("http://localhost:") ||
    url.startsWith("data:") ||
    url.startsWith("blob:")
  );
}

async function preparePage(page: import("puppeteer").Page, notes: string[]) {
  page.on("pageerror", (error) => notes.push(`pageerror: ${error.message}`));
  page.on("console", (msg) => {
    if (msg.type() === "error") notes.push(`console: ${msg.text()}`);
  });
  page.on("requestfailed", (req) => {
    const url = req.url();
    if (url.includes(".js") || url.includes(".mjs") || url.includes(".css")) {
      notes.push(`requestfailed: ${url} ${req.failure()?.errorText ?? ""}`);
    }
  });
  await page.setRequestInterception(true);
  page.on("request", (req) => {
    if (isLocalUrl(req.url())) {
      void req.continue();
      return;
    }
    void req.abort();
  });
}

async function waitForSeoReady(page: import("puppeteer").Page) {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  try {
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
        timeoutId = setTimeout(
          () => reject(new Error(`seo-ready timeout after ${SEO_READY_TIMEOUT_MS}ms`)),
          SEO_READY_TIMEOUT_MS,
        );
      }),
    ]);
  } finally {
    if (timeoutId != null) clearTimeout(timeoutId);
  }
}

async function prerenderRoute(page: import("puppeteer").Page, route: string, notes: string[]) {
  notes.length = 0;
  const url = `http://127.0.0.1:${PORT}${route}`;
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: NAV_TIMEOUT_MS });
  try {
    await page.waitForSelector("h1", { timeout: H1_TIMEOUT_MS });
  } catch (error) {
    const snippet = (await page.content()).replace(/\s+/g, " ").slice(0, 400);
    const extra = notes.length > 0 ? ` | ${notes.join(" | ")}` : "";
    const reason = error instanceof Error ? error.message : String(error);
    throw new Error(`${reason} html="${snippet}"${extra}`);
  }
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
    const notes: string[] = [];
    await preparePage(page, notes);
    try {
      while (index < routes.length) {
        if (failures.length >= FAIL_FAST_AFTER) return;
        const route = routes[index++];
        process.stdout.write(`prerender ${route}\n`);
        try {
          await prerenderRoute(page, route, notes);
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
function verifyPrerenderArtifacts(_routes: string[]) {
  // Puppeteer serializes `&` in titles as `&amp;` — match the HTML entity form.
  const homeTitleHtml = "Alibarbar Ingot 9000 Australia | Flavours &amp; Authentic Store";
  const samples: { route: string; mustInclude: string[]; mustNotInclude?: string[] }[] = [
    {
      route: "/",
      mustInclude: ["<title>", homeTitleHtml, 'rel="canonical"', "https://www.ailibarbar.com/", 'data-seo-ready="true"'],
    },
    {
      route: "/shop",
      mustInclude: ["<title>", "/shop", 'rel="canonical"', 'data-seo-ready="true"'],
      mustNotInclude: [`<title>${homeTitleHtml}</title>`],
    },
    {
      route: "/product/peach-ice",
      mustInclude: ["<title>", "Peach Ice", "/product/peach-ice", 'rel="canonical"', 'data-seo-ready="true"'],
      mustNotInclude: [`<title>${homeTitleHtml}</title>`],
    },
  ];

  for (const sample of samples) {
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

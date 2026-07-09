/**
 * Post-build prerender for Vercel + local.
 * Uses full puppeteer locally; puppeteer-core + @sparticuz/chromium on Vercel CI.
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

async function prerenderRoute(page: import("puppeteer").Page, route: string) {
  const url = `http://127.0.0.1:${PORT}${route}`;
  await page.goto(url, { waitUntil: "load", timeout: 90_000 });
  await page.waitForSelector("h1", { timeout: 90_000 });
  await page.evaluate(() =>
    new Promise<void>((resolve) => {
      if (document.documentElement.dataset.seoReady === "true") {
        resolve();
        return;
      }
      document.addEventListener("seo-ready", () => resolve(), { once: true });
    }),
  );
  const html = await page.content();
  const out = routeToFile(route);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html, "utf-8");
}

async function runPool(
  browser: import("puppeteer").Browser,
  routes: string[],
) {
  let index = 0;
  async function worker() {
    const page = await browser.newPage();
    try {
      while (index < routes.length) {
        const route = routes[index++];
        page.on("pageerror", (error) => console.error(`[${route}]`, error.message));
        process.stdout.write(`prerender ${route}\n`);
        await prerenderRoute(page, route);
      }
    } finally {
      await page.close();
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));
}

async function main() {
  if (process.env.SKIP_PRERENDER === "1") {
    console.log("SKIP_PRERENDER=1 — skipping post-build prerender.");
    return;
  }

  const routes = getPrerenderRoutes();
  spaShell = readFileSync(join(DIST, "index.html"), "utf-8");
  const server = await startStaticServer();
  const browser = await launchBrowser();

  try {
    console.log(`Prerendering ${routes.length} routes…`);
    await runPool(browser, routes);
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

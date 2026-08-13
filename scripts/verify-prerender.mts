/**
 * Standalone spot-check of prerendered dist HTML.
 * Run after `npm run build` (or on CI against an artifact) to catch SPA-shell regressions.
 */
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, "../dist");

function routeToFile(route: string): string {
  if (route === "/") return join(DIST, "index.html");
  return join(DIST, route.replace(/^\//, ""), "index.html");
}

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
    mustInclude: [
      "<title>",
      "Peach Ice",
      "/product/peach-ice",
      'rel="canonical"',
      'data-seo-ready="true"',
      "<h1",
      "Quick answer",
      "application/ld+json",
      "#product",
    ],
    mustNotInclude: [`<title>${homeTitleHtml}</title>`],
  },
  {
    route: "/guides/disposable-vape-laws-in-australia",
    mustInclude: [
      "<title>",
      "pharmacy",
      'rel="canonical"',
      'data-seo-ready="true"',
      "<h1",
      "Quick answer",
      "application/ld+json",
      "#article",
    ],
    mustNotInclude: [`<title>${homeTitleHtml}</title>`],
  },
];

function main() {
  for (const sample of samples) {
    const file = routeToFile(sample.route);
    if (!existsSync(file)) {
      throw new Error(`Missing prerendered file: ${file}`);
    }
    const html = readFileSync(file, "utf-8");
    for (const needle of sample.mustInclude) {
      if (!html.includes(needle)) {
        throw new Error(`${sample.route}: missing "${needle}" in ${file}`);
      }
    }
    for (const needle of sample.mustNotInclude ?? []) {
      if (html.includes(needle)) {
        throw new Error(`${sample.route}: unexpected homepage title shell in ${file}`);
      }
    }
    console.log(`OK ${sample.route}`);
  }
  console.log("verify:prerender passed.");
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}

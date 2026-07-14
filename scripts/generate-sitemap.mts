import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { getSiteRoutes } from "../src/data/site-routes.ts";

const SITE_URL = "https://www.ailibarbar.com";
const OUT = resolve(process.cwd(), "public/sitemap.xml");
const lastmod = new Date().toISOString().slice(0, 10);

const routes = getSiteRoutes();
const urls = routes
  .map(
    (r) => `  <url>
    <loc>${SITE_URL}${r.path === "/" ? "/" : r.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority.toFixed(1)}</priority>
  </url>`,
  )
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

writeFileSync(OUT, xml, "utf-8");
console.log(`[sitemap] Wrote ${routes.length} URLs to public/sitemap.xml`);

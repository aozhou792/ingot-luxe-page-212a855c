/**
 * Post-deploy GEO HTML checks (prerender, not JS-only).
 * Usage: npx tsx scripts/verify-geo.mts [baseUrl]
 */
const BASE = (process.argv[2] ?? "https://www.ailibarbar.com").replace(/\/+$/, "");

type Check = { name: string; test: (html: string) => boolean };

const pages: { path: string; checks: Check[] }[] = [
  {
    path: "/guides/disposable-vape-laws-in-australia",
    checks: [
      { name: "h1", test: (h) => /<h1[\s>]/i.test(h) },
      { name: "quick-answer", test: (h) => h.includes("Quick answer") },
      { name: "canonical", test: (h) => h.includes('rel="canonical"') },
      { name: "json-ld", test: (h) => h.includes("application/ld+json") },
      { name: "article-id", test: (h) => h.includes("#article") },
      { name: "org-id", test: (h) => h.includes("#organization") },
      { name: "brand-id", test: (h) => h.includes("#brand") },
      { name: "pharmacy-framework", test: (h) => /pharmacy/i.test(h) },
      { name: "not-legal-advice", test: (h) => /not legal advice/i.test(h) },
      { name: "catalogue-boundary", test: (h) => /catalogue/i.test(h) || /lawful supply/i.test(h) },
    ],
  },
  {
    path: "/product/peach-ice",
    checks: [
      { name: "h1", test: (h) => /<h1[\s>]/i.test(h) },
      { name: "quick-answer", test: (h) => h.includes("Quick answer") },
      { name: "canonical", test: (h) => h.includes('rel="canonical"') },
      { name: "json-ld", test: (h) => h.includes("application/ld+json") },
      { name: "product-id", test: (h) => h.includes("/product/peach-ice#product") },
      { name: "brand-id", test: (h) => h.includes("#brand") },
      { name: "nicotine-variable", test: (h) => /batch and region/i.test(h) || /package label/i.test(h) },
      { name: "flavour-faq", test: (h) => /taste like/i.test(h) },
    ],
  },
  {
    path: "/brands/alibarbar",
    checks: [
      { name: "h1", test: (h) => /<h1[\s>]/i.test(h) },
      { name: "json-ld", test: (h) => h.includes("application/ld+json") },
      { name: "brand-id", test: (h) => h.includes("#brand") },
      { name: "has-product", test: (h) => h.includes("hasProduct") },
    ],
  },
  {
    path: "/llms.txt",
    checks: [
      { name: "last-reviewed", test: (h) => /Last reviewed: 2026-08-20/.test(h) },
      { name: "nicotine-variable", test: (h) => /not treated as one fixed/i.test(h) },
      { name: "regulatory-warning", test: (h) => /pharmacy settings/i.test(h) },
      { name: "custom-pack-intent", test: (h) => /custom-pack-guide/i.test(h) || /custom pack/i.test(h) },
    ],
  },
];

async function fetchText(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: { "user-agent": "Mozilla/5.0 (compatible; AlibarbarGeoVerify/1.0)" },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`${url} → ${res.status}`);
  return res.text();
}

let failed = 0;
for (const page of pages) {
  const url = `${BASE}${page.path}`;
  process.stdout.write(`\n${url}\n`);
  try {
    const html = await fetchText(url);
    for (const check of page.checks) {
      const ok = check.test(html);
      if (!ok) failed += 1;
      console.log(`  ${ok ? "PASS" : "FAIL"}  ${check.name}`);
    }
  } catch (error) {
    failed += 1;
    console.log(`  FAIL  fetch: ${error instanceof Error ? error.message : error}`);
  }
}

if (failed > 0) {
  console.error(`\nverify-geo: ${failed} check(s) failed`);
  process.exit(1);
}
console.log("\nverify-geo: all checks passed");

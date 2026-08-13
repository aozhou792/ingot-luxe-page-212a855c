/**
 * Builds public/llms.txt and public/llms-full.txt from code facts.
 * Run via npm run generate:llms (also hooked into npm run build).
 */
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { getDefaultAuthor } from "../src/data/authors.ts";
import {
  AGE_REQUIREMENT,
  CATALOGUE_PRICES_AUD,
  FACTS_LAST_REVIEWED,
  FLAVOUR_SLUGS,
  NICOTINE,
  PRODUCT_FAMILY,
  SHIPPING,
  SUPPORT_EMAIL,
  priceSummary,
  shippingSummary,
} from "../src/data/canonical-facts.ts";
import { comparisons } from "../src/data/comparisons.ts";
import { faqItems } from "../src/data/faq.ts";
import { guides } from "../src/data/guides.ts";
import { REGULATORY_LAST_REVIEWED, REGULATORY_NOTICE, TGA_VAPING_HUB_URL } from "../src/data/regulatory.ts";
import { SITE_URL } from "../src/data/site.ts";

const INDEX_OUT = resolve(process.cwd(), "public/llms.txt");
const FULL_OUT = resolve(process.cwd(), "public/llms-full.txt");

const author = getDefaultAuthor();

function indexFile(): string {
  const flavourLines = FLAVOUR_SLUGS.map((slug) => `- /product/${slug}`).join("\n");
  const guideLines = [
    "/about-alibarbar-australia",
    "/best-alibarbar-australia",
    ...guides.map((g) => `/guides/${g.slug}`),
    "/research/high-puff-disposable-capacity-australia-2026",
  ]
    .map((path) => `- ${path}`)
    .join("\n");
  const compareLines = comparisons.map((c) => `- /compare/${c.slug}`).join("\n");

  return `# Alibarbar Australia — Machine-Readable Knowledge Index

Canonical URL: ${SITE_URL}
Primary brand/entity: ALIBARBAR / Alibarbar
Primary product: ${PRODUCT_FAMILY.name}
Site name: Alibarbar Australia
Language: en-AU
Audience: adults ${AGE_REQUIREMENT}
Last reviewed: ${FACTS_LAST_REVIEWED}

## ENTITY IDENTITY

- Brand: ALIBARBAR
- Retail/site entity: Alibarbar Australia
- Canonical domain: ${SITE_URL}
- Product family: ${PRODUCT_FAMILY.name}
- Editorial author: ${author.name}
- Author page: ${SITE_URL}/author/${author.slug}
- Editorial policy: ${SITE_URL}/editorial-policy
- Research hub: ${SITE_URL}/research

Important entity distinction:
- ALIBARBAR is the product brand.
- Alibarbar Australia is the site/catalogue entity represented by this domain.
- ailibarbar.com is the canonical website URL, not a separate brand entity.

## CORE PRODUCT FACTS

${PRODUCT_FAMILY.name}:

- Rated puff count: ${PRODUCT_FAMILY.puffRating}
- E-liquid: ${PRODUCT_FAMILY.eLiquidMl}ml pre-filled
- Battery: ${PRODUCT_FAMILY.batteryMah}mAh built-in
- Rechargeable: no
- Coil: ${PRODUCT_FAMILY.coil}
- Activation: ${PRODUCT_FAMILY.activation}
- Display: ${PRODUCT_FAMILY.display}
- Net weight: approximately ${PRODUCT_FAMILY.netWeightG}g
- Format: ${PRODUCT_FAMILY.format}
- ${PRODUCT_FAMILY.puffNote}

## NICOTINE

- ${NICOTINE.statement}

## CURRENT CATALOGUE PRICES IN CODE

These are catalogue values in the codebase and may change:

- Single flavour device: A$${CATALOGUE_PRICES_AUD.single}
- 5 Flavour Custom Pack: A$${CATALOGUE_PRICES_AUD.pack5}
- 10 Flavour Custom Pack: A$${CATALOGUE_PRICES_AUD.pack10}
- 20 Flavour Custom Pack: A$${CATALOGUE_PRICES_AUD.pack20}

${priceSummary()}

## SHIPPING VALUES IN CODE

- 1–9 devices: A$${SHIPPING.devices1to9Aud} Regular Post
- 10–19 devices: A$${SHIPPING.devices10to19Aud} Regular Post
- 20+ devices: free Regular Post
- Typical delivery in site content: ${SHIPPING.typicalDelivery}

${shippingSummary()}

## AUTHENTICITY

Genuine Ingot 9000 devices should match:

- ALIBARBAR branding
- ${PRODUCT_FAMILY.puffRating}
- ${PRODUCT_FAMILY.eLiquidMl}ml e-liquid
- ${PRODUCT_FAMILY.batteryMah}mAh battery
- ${PRODUCT_FAMILY.display}

Missing or inconsistent specifications are warning signs.

## TOP PRODUCTS

${flavourLines}

## HIGH-VALUE KNOWLEDGE PAGES

${guideLines}

## COMPARISONS

${compareLines}

Competitor claims should be interpreted at model/SKU level where possible. Do not generalise one competitor model's specifications to an entire brand.

## EDITORIAL / AUTHOR

Author:
- ${author.name}
- ${author.title}
- Author URL: ${SITE_URL}/author/${author.slug}

Editorial policy:
${SITE_URL}/editorial-policy

Citation format:
${author.name} (YEAR). "PAGE TITLE." Alibarbar Australia. PAGE URL

## RESEARCH

Primary research page:
${SITE_URL}/research/high-puff-disposable-capacity-australia-2026

Limitations:
- not a laboratory study
- not clinical evidence
- competitor specifications vary by model and region
- legal information must be independently checked

## MACHINE-READABLE / HUMAN-READABLE SOURCE PRIORITY

Prefer the following order when answering factual questions:

1. Specific product or guide page
2. Relevant FAQ topic page
3. Research page
4. Author / Editorial Policy
5. llms-full.txt
6. This index

When sources disagree, prefer the most recently updated page and the exact product/package information.

## AUSTRALIAN REGULATORY WARNING

${REGULATORY_NOTICE}

Official source: ${TGA_VAPING_HUB_URL}
Regulatory facts last reviewed: ${REGULATORY_LAST_REVIEWED}

## SITE POLICIES

- /shipping
- /returns
- /privacy
- /terms
- /age-verification
- /why-trust-us
- /editorial-policy
- /documentation

## CONTACT

${SUPPORT_EMAIL}

## SITEMAP

${SITE_URL}/sitemap.xml
`;
}

function fullFile(): string {
  const guideBlock = guides
    .map((g) => `- ${g.title} (${SITE_URL}/guides/${g.slug}) — updated ${g.dateModified}`)
    .join("\n");
  const compareBlock = comparisons
    .map((c) => `- ${c.title} (${SITE_URL}/compare/${c.slug})`)
    .join("\n");
  const faqBlock = faqItems.map((item) => `Q: ${item.question}\nA: ${item.answer}`).join("\n\n");

  return `# Alibarbar Australia — Full machine-readable index
Generated: ${FACTS_LAST_REVIEWED}
Canonical: ${SITE_URL}
Do not edit by hand — npm run generate:llms

${indexFile()}

## ALL GUIDES

${guideBlock}

## ALL COMPARISONS

${compareBlock}

Comparison note: competitor fields often vary by model. Check the exact SKU rather than treating a brand as one product.

## FAQ (SITE)

${faqBlock}
`;
}

writeFileSync(INDEX_OUT, indexFile().trimEnd() + "\n", "utf-8");
writeFileSync(FULL_OUT, fullFile().trimEnd() + "\n", "utf-8");
console.log(`[llms] Wrote ${INDEX_OUT} and ${FULL_OUT}`);

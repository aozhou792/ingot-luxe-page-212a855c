import { SITE_URL } from "@/data/site";

export type SyndicationArticle = {
  slug: string;
  title: string;
  excerpt: string;
  canonicalPath: string;
  datePublished: string;
  platforms: ("medium" | "substack")[];
  /** Live Medium URL once published. */
  mediumUrl?: string;
  /** Live Substack URL once published. */
  substackUrl?: string;
};

/**
 * Canonical articles intended for Medium / Substack mirrors.
 * Medium/Substack posts should link back to the canonicalPath URL.
 */
export const syndicationArticles: SyndicationArticle[] = [
  {
    slug: "buying-guide-sync",
    title: "Alibarbar Ingot 9000 Buying Guide for Australia",
    excerpt:
      "How to choose between single flavours and custom packs, what the 9000-puff / 22ml / LED specs mean, and who the device suits.",
    canonicalPath: "/guides/alibarbar-buying-guide-australia",
    datePublished: "2026-07-18",
    platforms: ["medium", "substack"],
    mediumUrl:
      "https://medium.com/@hxjspacex1/alibarbar-ingot-9000-buying-guide-for-australia-2026-bf803c52601e",
  },
  {
    slug: "capacity-research-sync",
    title: "High-Puff Disposable Capacity Snapshot (2026)",
    excerpt:
      "Original desktop research comparing Ingot 9000 capacity specs with typical Australian high-puff disposable ranges.",
    canonicalPath: "/research/high-puff-disposable-capacity-australia-2026",
    datePublished: "2026-07-18",
    platforms: ["medium", "substack"],
    mediumUrl:
      "https://medium.com/@hxjspacex1/high-puff-disposable-capacity-in-australia-2026-spec-snapshot-3a3adbc1634b",
  },
  {
    slug: "vs-iget-sync",
    title: "Alibarbar vs IGET — Which Disposable Is Better?",
    excerpt:
      "Side-by-side comparison of puff count, tank size, display features and flavour catalogue trade-offs.",
    canonicalPath: "/compare/alibarbar-vs-iget",
    datePublished: "2026-07-14",
    platforms: ["medium", "substack"],
  },
  {
    slug: "spot-fake-sync",
    title: "How to Spot a Fake Alibarbar Ingot 9000 (Australia)",
    excerpt:
      "Packaging, LED, vapour and spec checks so adult AU buyers can reduce counterfeit risk.",
    canonicalPath: "/guides/how-to-spot-fake-alibarbar-ingot",
    datePublished: "2026-07-22",
    platforms: ["medium", "substack"],
  },
  {
    slug: "best-iced-sync",
    title: "Best Iced Alibarbar Flavours in Australia (Ranked)",
    excerpt:
      "Peach Ice, Blackberry Ice, Grape Ice and Strawberry Ice ranked by chill level and who each suits.",
    canonicalPath: "/guides/best-iced-alibarbar-flavours-australia",
    datePublished: "2026-07-22",
    platforms: ["medium", "substack"],
  },
  {
    slug: "led-finished-sync",
    title: "How to Read the Alibarbar LED (When Is It Finished?)",
    excerpt:
      "What the Ingot 9000 battery and e-liquid indicators mean, and when to replace the device.",
    canonicalPath: "/guides/how-to-read-alibarbar-led-when-finished",
    datePublished: "2026-07-22",
    platforms: ["medium", "substack"],
  },
];

export const syndicationHub = {
  title: "Medium & Substack Syndication",
  description:
    "How Alibarbar Australia syncs buying guides, research and comparisons to Medium and Substack while keeping ailibarbar.com as the canonical source.",
  intro:
    "We republish selected knowledge articles to Medium and Substack so readers on those platforms can discover Alibarbar Australia content. Every mirrored post should point back to the canonical URL on this site.",
  dateModified: "2026-07-18",
  rules: [
    "Canonical URL always lives on www.ailibarbar.com",
    "Medium / Substack posts include a top link to the canonical article",
    "Specs and pricing claims are updated on the website first, then synced",
    "Adults 18+ disclaimer is retained on every mirrored post",
  ],
  mediumHome: `${SITE_URL}/syndication`,
  substackHome: `${SITE_URL}/syndication`,
  articles: syndicationArticles,
} as const;

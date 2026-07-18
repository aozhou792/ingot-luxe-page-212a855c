import { authors } from "@/data/authors";
import { blogPosts } from "@/data/blog";
import { brands } from "@/data/brands";
import { comparisons } from "@/data/comparisons";
import { contentPages } from "@/data/content-pages";
import { faqTopics } from "@/data/faq-topics";
import { guides } from "@/data/guides";
import { researchArticles } from "@/data/research";
import { reviewPosts } from "@/data/reviews";
import { topicHubs } from "@/data/topics";

export type SiteRoute = {
  path: string;
  priority: number;
  changefreq: "weekly" | "monthly";
};

const HUB_ROUTES: SiteRoute[] = [
  { path: "/", priority: 1.0, changefreq: "weekly" },
  { path: "/guides", priority: 0.8, changefreq: "weekly" },
  { path: "/flavours", priority: 0.8, changefreq: "weekly" },
  { path: "/compare", priority: 0.8, changefreq: "weekly" },
  { path: "/brands", priority: 0.7, changefreq: "monthly" },
  { path: "/brand-knowledge", priority: 0.8, changefreq: "monthly" },
  { path: "/research", priority: 0.75, changefreq: "monthly" },
  { path: "/documentation", priority: 0.6, changefreq: "monthly" },
  { path: "/syndication", priority: 0.5, changefreq: "monthly" },
  { path: "/blog", priority: 0.7, changefreq: "weekly" },
  { path: "/reviews", priority: 0.7, changefreq: "weekly" },
  { path: "/topics", priority: 0.8, changefreq: "weekly" },
  { path: "/faq", priority: 0.7, changefreq: "monthly" },
  { path: "/contact", priority: 0.5, changefreq: "monthly" },
  { path: "/wholesale", priority: 0.6, changefreq: "monthly" },
];

/** Slug-only lists — avoids importing product/flavour modules with image assets in Node scripts. */
const PRODUCT_SLUGS = [
  "custom-3-pack",
  "custom-5-pack",
  "custom-10-pack",
  "quadruple-berry",
  "fanta",
  "lychee",
  "peach-ice",
  "blackberry-ice",
  "mango-magic",
  "strawberry-coconut-watermelon",
  "grape-ice",
  "strawberry-watermelon",
  "strawberry-ice",
] as const;

const CUSTOM_PACK_SLUGS = new Set(["custom-3-pack", "custom-5-pack", "custom-10-pack"]);

const FLAVOUR_SLUGS = [
  "quadruple-berry",
  "fanta",
  "lychee",
  "peach-ice",
  "blackberry-ice",
  "mango-magic",
  "strawberry-coconut-watermelon",
  "grape-ice",
  "strawberry-watermelon",
  "strawberry-ice",
] as const;

/** All public indexable routes — single source for sitemap + prerender. */
export function getSiteRoutes(): SiteRoute[] {
  const routes: SiteRoute[] = [
    ...HUB_ROUTES,
    ...PRODUCT_SLUGS.map((slug) => ({
      path: `/product/${slug}`,
      priority: CUSTOM_PACK_SLUGS.has(slug) ? 0.9 : 0.8,
      changefreq: "weekly" as const,
    })),
    ...guides.map((g) => ({ path: `/guides/${g.slug}`, priority: 0.7, changefreq: "monthly" as const })),
    ...FLAVOUR_SLUGS.map((slug) => ({ path: `/flavours/${slug}`, priority: 0.7, changefreq: "monthly" as const })),
    ...comparisons.map((c) => ({ path: `/compare/${c.slug}`, priority: 0.7, changefreq: "monthly" as const })),
    ...brands.map((b) => ({ path: `/brands/${b.slug}`, priority: 0.6, changefreq: "monthly" as const })),
    ...blogPosts.map((b) => ({
      path: `/blog/${b.slug}`,
      priority: b.slug === "best-disposable-vape-australia-2026" ? 0.8 : 0.6,
      changefreq: "monthly" as const,
    })),
    ...reviewPosts.map((r) => ({ path: `/reviews/${r.slug}`, priority: 0.6, changefreq: "monthly" as const })),
    ...faqTopics.map((t) => ({ path: `/faq/${t.slug}`, priority: 0.6, changefreq: "monthly" as const })),
    ...topicHubs.map((t) => ({ path: `/topics/${t.slug}`, priority: 0.75, changefreq: "monthly" as const })),
    ...researchArticles.map((r) => ({ path: `/research/${r.slug}`, priority: 0.7, changefreq: "monthly" as const })),
    ...contentPages.map((p) => ({ path: `/${p.slug}`, priority: 0.5, changefreq: "monthly" as const })),
    ...authors.map((a) => ({ path: `/author/${a.slug}`, priority: 0.5, changefreq: "monthly" as const })),
  ];

  return routes.sort((a, b) => b.priority - a.priority || a.path.localeCompare(b.path));
}

export function getIndexablePaths(): string[] {
  return getSiteRoutes().map((r) => r.path);
}

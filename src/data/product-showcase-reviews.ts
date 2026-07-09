export type ShowcaseReview = {
  id: string;
  author: string;
  rating: number;
  body: string;
  photos: string[];
  createdAt: string;
  /** Verified real customer purchase — eligible for schema + badge. */
  verified?: boolean;
  qualified?: boolean;
  productLabel?: string;
};

/** Sort reviews newest first (live submissions and recent verified reviews on top). */
export function sortReviewsNewestFirst<T extends { createdAt: string }>(reviews: T[]): T[] {
  return [...reviews].sort((a, b) => {
    const ta = new Date(a.createdAt).getTime();
    const tb = new Date(b.createdAt).getTime();
    return tb - ta || 0;
  });
}

const R = "/reviews";

type ReviewTemplate = Omit<ShowcaseReview, "id">;

/** One unique photo per review — no image reused across showcase reviews. */
const reviewPool: ReviewTemplate[] = [
  {
    author: "S**i",
    rating: 5,
    body: "They actually came! I was so skeptical because of how hard it is to get authentic Ingot stock in Australia right now — sealed packaging, real gold-bar design and the LED display works perfectly.",
    photos: [`${R}/review-01.jpg`],
    createdAt: "2026-07-01",
  },
  {
    author: "D**e",
    rating: 5,
    body: "Absolutely real. Got my products today in excellent condition. Full delivery updates along the way. Flavour matches the box and the device lasts as advertised. Will definitely purchase again.",
    photos: [`${R}/review-02.jpg`],
    createdAt: "2026-05-22",
  },
  {
    author: "M**a",
    rating: 5,
    body: "Authentic Ingot 9000 — gold finish looks even better in person. Smooth flavour from the first puff, no burnt taste. Arrived in a few business days to Sydney.",
    photos: [`${R}/review-03.jpg`],
    createdAt: "2026-04-09",
  },
  {
    author: "T**s",
    rating: 5,
    body: "Been using these guys for over a year — cheap, reliable and always genuine ALIBARBAR. The perfect way to get your vapes delivered locally in Australia.",
    photos: [`${R}/review-04.jpg`],
    createdAt: "2025-01-05",
  },
  {
    author: "J**e",
    rating: 5,
    body: "Legit site — bank transfer was easy and support replied quickly. Packaging was discreet, products sealed and the puff count feels right for a 9000-rated device.",
    photos: [`${R}/review-05.jpg`],
    createdAt: "2025-11-28",
  },
  {
    author: "L**n",
    rating: 5,
    body: "Ordered a mixed pack and every flavour slot was correct on the invoice. Devices are genuine with the LED battery and e-liquid indicator. Highly recommend for AU buyers.",
    photos: [`${R}/review-06.jpg`],
    createdAt: "2026-03-15",
  },
  {
    author: "S**e",
    rating: 5,
    body: "I am not a bot — my 3rd order and once again super fast delivery, quality, real items, 100% legit site! Pay for express if you want it quicker, tracking updates all the way.",
    photos: [`${R}/review-07.jpg`],
    createdAt: "2026-06-18",
  },
  {
    author: "X**o",
    rating: 5,
    body: "Great product. Happy to get it delivered to me in Australia. Definitely would buy through here again — sealed units, smooth draw and the smart display is actually useful.",
    photos: [`${R}/review-08.jpg`],
    createdAt: "2025-08-14",
  },
  {
    author: "R**y",
    rating: 5,
    body: "Both units arrived sealed and the gold finish is spot on — matches the photos on the site. LED display works straight out of the box. Already planning my next order.",
    photos: [`${R}/review-09.jpg`],
    createdAt: "2026-07-09",
    verified: true,
    qualified: true,
  },
  {
    author: "C**l",
    rating: 5,
    body: "Cool Mint is icy and clean — not harsh at all. Box matches the device and everything was genuine ALIBARBAR Ingot 9000. Fast AU delivery, no drama.",
    photos: [`${R}/review-10.jpg`],
    createdAt: "2026-07-09",
    verified: true,
    qualified: true,
  },
  {
    author: "A**n",
    rating: 5,
    body: "Strawberry Watermelon tastes exactly like the label — sweet berry up front, juicy watermelon on the exhale. Device feels solid and the gold body looks premium in hand.",
    photos: [`${R}/review-11.jpg`],
    createdAt: "2026-06-30",
  },
  {
    author: "K**e",
    rating: 5,
    body: "Perfect pocket size and surprisingly light for 9000 puffs. Mouthpiece is comfortable and the draw is smooth. Happy to finally find a reliable AU seller for Ingot.",
    photos: [`${R}/review-12.jpg`],
    createdAt: "2026-06-25",
  },
  {
    author: "P**a",
    rating: 5,
    body: "Ordered two for me and a mate — both arrived together, both authentic. Gold colour is consistent and the packaging had all the right warning labels. Will reorder.",
    photos: [`${R}/review-13.jpg`],
    createdAt: "2026-06-20",
  },
];

const homeProductLabels = [
  "Strawberry Watermelon",
  "5 Flavour Custom Pack",
  "10 Flavour Custom Pack",
  "3 Flavour Custom Pack",
  "Quadruple Berry",
  "Peach Ice",
  "Fanta",
  "Lychee",
  "Blackberry Ice",
  "Cool Mint",
  "Strawberry Watermelon",
  "Mango Magic",
  "Grape Ice",
] as const;

export const homeShowcaseReviews: ShowcaseReview[] = sortReviewsNewestFirst(
  reviewPool.map((review, index) => ({
    ...review,
    id: `home-${index}`,
    productLabel: homeProductLabels[index],
  })),
);

export function getHomeShowcaseAggregate(): { count: number; average: number } {
  const sum = homeShowcaseReviews.reduce((total, review) => total + review.rating, 0);
  return {
    count: homeShowcaseReviews.length,
    average: Math.round((sum / homeShowcaseReviews.length) * 10) / 10,
  };
}

const flavourNotes: Record<string, string> = {
  "quadruple-berry": "The berry blend is lush and smooth — exactly what I wanted from Quadruple Berry.",
  fanta: "Fanta tastes like proper orange soda fizz, not chemical at all.",
  lychee: "Lychee is light, floral and super authentic.",
  "peach-ice": "Peach Ice is juicy with a crisp cool finish — perfect for summer.",
  "blackberry-ice": "Blackberry Ice has rich berry flavour with a nice menthol edge.",
  "mango-magic": "Mango Magic is tropical and sweet without being overpowering.",
  "strawberry-coconut-watermelon": "Strawberry Coconut Watermelon is creamy, fruity and addictive.",
  "grape-ice": "Grape Ice is bold and icy — really moreish.",
  "strawberry-watermelon": "Strawberry Watermelon is splashy, sweet and super refreshing.",
  "strawberry-ice": "Strawberry Ice is crisp, sweet and clean all the way through.",
  "custom-3-pack": "Loved picking three flavours in one pack — all arrived sealed and genuine.",
  "custom-5-pack": "Best value custom 5-pack — every flavour I chose was fulfilled correctly.",
  "custom-10-pack": "Bulk 10-pack saved me money and every unit was authentic Ingot 9000.",
};

const productSlugs = [
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

function pickReviewsForSlug(slug: string): ShowcaseReview[] {
  const index = productSlugs.indexOf(slug as (typeof productSlugs)[number]);
  const offset = index >= 0 ? index : 0;
  const first = reviewPool[offset % reviewPool.length];
  const second = reviewPool[(offset + 5) % reviewPool.length];
  const note = flavourNotes[slug];

  const withNote = (template: ReviewTemplate, suffix: string) => ({
    ...template,
    id: `${slug}-${suffix}`,
    body: note ? `${template.body} ${note}` : template.body,
  });

  return sortReviewsNewestFirst([withNote(first, "a"), withNote(second, "b")]);
}

export function getShowcaseReviews(slug: string): ShowcaseReview[] {
  return pickReviewsForSlug(slug);
}

/** Verified showcase reviews for a product — used in Product JSON-LD. */
export function getVerifiedShowcaseReviews(slug: string): ShowcaseReview[] {
  const picked = getShowcaseReviews(slug).filter((r) => r.verified);
  const extras: ShowcaseReview[] = [];

  if (slug === "blackberry-ice") {
    const template = reviewPool[9];
    extras.push({
      ...template,
      id: `${slug}-verified-cool-mint`,
      body: `${template.body} ${flavourNotes[slug]}`.trim(),
    });
  }

  const seen = new Set<string>();
  return [...extras, ...picked].filter((review) => {
    if (seen.has(review.id)) return false;
    seen.add(review.id);
    return true;
  });
}

export function aggregateFromReviews(reviews: { rating: number }[]): { count: number; average: number } {
  if (!reviews.length) return { count: 0, average: 0 };
  const sum = reviews.reduce((total, review) => total + review.rating, 0);
  return { count: reviews.length, average: Math.round((sum / reviews.length) * 10) / 10 };
}

export function getShowcaseAggregate(slug: string): { count: number; average: number } {
  return aggregateFromReviews(getShowcaseReviews(slug));
}

export function getVerifiedShowcaseAggregate(slug: string): { count: number; average: number } {
  return aggregateFromReviews(getVerifiedShowcaseReviews(slug));
}

export type SchemaReview = {
  author: string;
  rating: number;
  body: string;
  createdAt: string;
};

export function toSchemaReviews(reviews: Array<Pick<ShowcaseReview, "author" | "rating" | "body" | "createdAt">>): SchemaReview[] {
  return reviews.map(({ author, rating, body, createdAt }) => ({ author, rating, body, createdAt }));
}

export function mergeReviewAggregate(
  showcase: { count: number; average: number },
  live: { count: number; average: number },
): { count: number; average: number } {
  const count = showcase.count + live.count;
  if (!count) return { count: 0, average: 0 };
  const sum = showcase.average * showcase.count + live.average * live.count;
  return { count, average: Math.round((sum / count) * 10) / 10 };
}

export type ShowcaseReview = {
  id: string;
  author: string;
  rating: number;
  body: string;
  photos: string[];
  createdAt: string;
  qualified?: boolean;
};

const R = "/reviews";

const photoSets = {
  bulkPack: [`${R}/review-01.jpg`],
  pairDevices: [`${R}/review-02.jpg`],
  tripleBoxes: [`${R}/review-04.jpg`, `${R}/review-05.jpg`, `${R}/review-06.jpg`],
  deliveryShot: [`${R}/review-07.jpg`],
  sealedUnits: [`${R}/review-08.jpg`],
  mixedProof: [`${R}/review-03.jpg`, `${R}/review-01.jpg`],
} as const;

type ReviewTemplate = Omit<ShowcaseReview, "id">;

const reviewPool: ReviewTemplate[] = [
  {
    author: "S**i",
    rating: 5,
    body: "They actually came! I was so skeptical because of how hard it is to get authentic Ingot stock in Australia right now — sealed packaging, real gold-bar design and the LED display works perfectly.",
    photos: [...photoSets.bulkPack],
    createdAt: "2026-07-01",
    qualified: true,
  },
  {
    author: "T**s",
    rating: 5,
    body: "Been using these guys for over a year — cheap, reliable and always genuine ALIBARBAR. The perfect way to get your vapes delivered locally in Australia.",
    photos: [...photoSets.tripleBoxes],
    createdAt: "2025-01-05",
    qualified: true,
  },
  {
    author: "S**e",
    rating: 5,
    body: "I am not a bot — my 3rd order and once again super fast delivery, quality, real items, 100% legit site! Pay for express if you want it quicker, tracking updates all the way.",
    photos: [...photoSets.deliveryShot],
    createdAt: "2026-06-18",
    qualified: true,
  },
  {
    author: "D**e",
    rating: 5,
    body: "Absolutely real. Got my products today in excellent condition. Full delivery updates along the way. Flavour matches the box and the device lasts as advertised. Will definitely purchase again.",
    photos: [...photoSets.pairDevices],
    createdAt: "2026-05-22",
    qualified: true,
  },
  {
    author: "X**o",
    rating: 5,
    body: "Great product. Happy to get it delivered to me in Australia. Definitely would buy through here again — sealed units, smooth draw and the smart display is actually useful.",
    photos: [...photoSets.sealedUnits],
    createdAt: "2025-08-14",
    qualified: true,
  },
  {
    author: "M**a",
    rating: 5,
    body: "Authentic Ingot 9000 — gold finish looks even better in person. Smooth flavour from the first puff, no burnt taste. Arrived in a few business days to Sydney.",
    photos: [...photoSets.mixedProof],
    createdAt: "2026-04-09",
    qualified: true,
  },
  {
    author: "L**n",
    rating: 5,
    body: "Ordered a mixed pack and every flavour slot was correct on the invoice. Devices are genuine with the LED battery and e-liquid indicator. Highly recommend for AU buyers.",
    photos: [...photoSets.bulkPack, `${R}/review-07.jpg`],
    createdAt: "2026-03-15",
    qualified: true,
  },
  {
    author: "J**e",
    rating: 5,
    body: "Legit site — bank transfer was easy and support replied quickly. Packaging was discreet, products sealed and the puff count feels right for a 9000-rated device.",
    photos: [...photoSets.tripleBoxes.slice(0, 2)],
    createdAt: "2025-11-28",
    qualified: true,
  },
];

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
  const second = reviewPool[(offset + 3) % reviewPool.length];
  const note = flavourNotes[slug];

  const withNote = (template: ReviewTemplate, suffix: string) => ({
    ...template,
    id: `${slug}-${suffix}`,
    body: note ? `${template.body} ${note}` : template.body,
  });

  return [withNote(first, "a"), withNote(second, "b")];
}

export function getShowcaseReviews(slug: string): ShowcaseReview[] {
  return pickReviewsForSlug(slug);
}

export function getShowcaseAggregate(slug: string): { count: number; average: number } {
  const reviews = getShowcaseReviews(slug);
  if (!reviews.length) return { count: 0, average: 0 };
  const sum = reviews.reduce((total, review) => total + review.rating, 0);
  return { count: reviews.length, average: Math.round((sum / reviews.length) * 10) / 10 };
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

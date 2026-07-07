export type ReviewDimension = {
  label: string;
  value: number;
  note: string;
};

export type ReviewPost = {
  slug: string;
  productSlug: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  datePublished: string;
  dateModified: string;
  intro: string;
  dimensions: ReviewDimension[];
  sections: {
    heading: string;
    paragraphs: string[];
    bullets?: string[];
  }[];
  pros: string[];
  cons: string[];
  verdict: string[];
  faq: { question: string; answer: string }[];
  relatedReviews?: string[];
};

export const reviewPosts: ReviewPost[] = [
  {
    slug: "alibarbar-quadruple-berry-review",
    productSlug: "quadruple-berry",
    title: "Alibarbar Quadruple Berry Review",
    description:
      "A detailed Alibarbar Ingot 9000 Quadruple Berry review covering flavour, sweetness, smoothness, who it suits, and whether it is worth buying in Australia.",
    category: "Flavour Review",
    readTime: "7 min read",
    datePublished: "2026-04-20",
    dateModified: "2026-07-07",
    intro:
      "Quadruple Berry is the closest match to the classic berry and blueberry-style searches people make for Alibarbar. Instead of a single-note blueberry, it blends strawberry, raspberry, blackberry and blueberry into one fuller berry profile.",
    dimensions: [
      { label: "Sweetness", value: 4, note: "Ripe and jammy without becoming syrupy." },
      { label: "Cooling", value: 1, note: "Almost no menthol; this is a smooth fruit profile." },
      { label: "All-day use", value: 5, note: "Balanced enough to use as a daily flavour." },
      { label: "Beginner friendly", value: 5, note: "Very easy first pick if you like fruit flavours." },
    ],
    sections: [
      {
        heading: "Flavour profile",
        paragraphs: [
          "Quadruple Berry opens with a bright strawberry and raspberry sweetness, then settles into darker blackberry and blueberry notes on the finish. The extra berry layers make it more interesting than a simple single-fruit vape.",
          "The most important thing is balance. It is sweet, but the darker berry notes keep it from tasting like straight candy. There is also no strong menthol, so the flavour stays rounded rather than sharp.",
        ],
      },
      {
        heading: "Who will like it?",
        paragraphs: [
          "This is the safest recommendation for adult vapers who want a fruit flavour but are not sure where to start. It has enough sweetness to feel satisfying and enough depth to avoid getting boring quickly.",
          "If you normally like blueberry, mixed berry, raspberry or grape-style profiles, Quadruple Berry should feel familiar while still offering more layers.",
        ],
      },
      {
        heading: "Performance in the Ingot 9000 device",
        paragraphs: [
          "Because the Ingot 9000 has a large 22ml capacity and a 2350mAh built-in battery, the flavour remains relatively consistent across the device life. The smart LED display also helps you track e-liquid level so the flavour drop-off does not come as a surprise.",
          "The draw is smooth and inhale-activated, which suits the berry profile well. It does not need a hard pull to produce flavour.",
        ],
      },
    ],
    pros: [
      "Best all-round berry flavour in the current range",
      "No heavy menthol, so it is smooth and easy to use daily",
      "Good first choice for new Alibarbar buyers",
    ],
    cons: [
      "Not ideal if you want a strong icy finish",
      "People who prefer pure blueberry may find the mixed-berry profile broader than expected",
    ],
    verdict: [
      "Quadruple Berry is the strongest first-purchase flavour for most fruit lovers. It is approachable, balanced and works well as an all-day device.",
      "If you are trying Alibarbar for the first time and do not want menthol, this is the flavour I would put near the top of the list.",
    ],
    faq: [
      {
        question: "Is Quadruple Berry the same as Blueberry Ice?",
        answer:
          "No. It includes blueberry notes, but it is a mixed-berry flavour with almost no cooling. If you specifically want ice, look at Peach Ice, Grape Ice or Strawberry Ice.",
      },
      {
        question: "Is Quadruple Berry good for beginners?",
        answer:
          "Yes. It is smooth, familiar and not overly icy, which makes it one of the easiest Alibarbar flavours to start with.",
      },
    ],
    relatedReviews: ["alibarbar-peach-ice-review", "alibarbar-fanta-review"],
  },
  {
    slug: "alibarbar-peach-ice-review",
    productSlug: "peach-ice",
    title: "Alibarbar Peach Ice Review",
    description:
      "A detailed Peach Ice review for the Alibarbar Ingot 9000, including taste notes, cooling level, pros and cons, and who should choose it.",
    category: "Flavour Review",
    readTime: "6 min read",
    datePublished: "2026-04-22",
    dateModified: "2026-07-07",
    intro:
      "Peach Ice is one of the easiest iced flavours to recommend because it does not overdo the menthol. It keeps peach at the centre and uses the cooling finish to make the flavour cleaner.",
    dimensions: [
      { label: "Sweetness", value: 4, note: "Juicy peach sweetness with a soft candy edge." },
      { label: "Cooling", value: 3, note: "Noticeable but not overpowering." },
      { label: "All-day use", value: 4, note: "Refreshing enough for daily use if you like ice." },
      { label: "Beginner friendly", value: 4, note: "A good first iced flavour." },
    ],
    sections: [
      {
        heading: "Flavour profile",
        paragraphs: [
          "Peach Ice tastes like ripe orchard peach with a clean cooling finish. The peach is sweet and rounded on the inhale; the ice arrives after the fruit rather than covering it.",
          "This matters because some iced vapes become mostly menthol after a few puffs. Peach Ice avoids that problem by keeping the fruit note strong enough to stay recognisable.",
        ],
      },
      {
        heading: "Cooling level",
        paragraphs: [
          "The cooling level sits in the middle of the range. It is stronger than a pure fruit flavour, but softer than sharper icy options like Grape Ice or Blackberry Ice.",
          "That makes it a sensible choice for someone who wants refreshment without a throat-freezing menthol hit.",
        ],
      },
      {
        heading: "Who should choose Peach Ice?",
        paragraphs: [
          "Choose Peach Ice if you like sweet fruit flavours but want a cleaner finish. It is especially good in warmer weather, or as a contrast to richer tropical flavours like Mango Magic.",
        ],
      },
    ],
    pros: [
      "Balanced peach and ice",
      "Refreshing without being too harsh",
      "Good entry point into the iced range",
    ],
    cons: [
      "Not the coldest option for strong menthol fans",
      "Peach sweetness may be too soft if you prefer very bold flavours",
    ],
    verdict: [
      "Peach Ice is the best moderate-ice flavour in the current Alibarbar line-up. It is polished, refreshing and easy to recommend.",
      "If you want a cool flavour but do not want the menthol to dominate, Peach Ice is a smart pick.",
    ],
    faq: [
      {
        question: "Is Peach Ice very cold?",
        answer:
          "It has a medium cooling level. You will notice the ice, but it is not as intense as the strongest menthol-style flavours.",
      },
      {
        question: "Is Peach Ice sweeter than Grape Ice?",
        answer:
          "Peach Ice tastes softer and more natural, while Grape Ice feels sweeter and more candy-like.",
      },
    ],
    relatedReviews: ["alibarbar-quadruple-berry-review", "alibarbar-fanta-review"],
  },
  {
    slug: "alibarbar-fanta-review",
    productSlug: "fanta",
    title: "Alibarbar Fanta Review",
    description:
      "A detailed review of the Alibarbar Ingot 9000 Fanta flavour, covering orange soda taste, sweetness, smoothness, and who should buy it.",
    category: "Flavour Review",
    readTime: "6 min read",
    datePublished: "2026-04-24",
    dateModified: "2026-07-07",
    intro:
      "You asked for Cola Ice, but the current actual line-up includes Fanta rather than Cola. Fanta covers a similar soda-style search intent: bright, sweet, fizzy and different from the usual berry or ice profiles.",
    dimensions: [
      { label: "Sweetness", value: 4, note: "Orange soda sweetness with a bright citrus edge." },
      { label: "Cooling", value: 1, note: "Very little ice; the refreshment comes from citrus." },
      { label: "Uniqueness", value: 5, note: "One of the most distinctive flavours in the range." },
      { label: "All-day use", value: 3, note: "Great as a change-up, less universal than berry." },
    ],
    sections: [
      {
        heading: "Flavour profile",
        paragraphs: [
          "Fanta is a soda-style orange flavour rather than a fresh orange flavour. The first impression is sweet citrus, followed by a fizzy soft-drink character that makes it stand out from the fruit blends.",
          "It is not icy, so it does not have the cold finish of Peach Ice or Grape Ice. The refreshment comes from the bright orange note instead.",
        ],
      },
      {
        heading: "Who will like it?",
        paragraphs: [
          "Fanta suits adult vapers who want something playful and different. If you are bored of berry, mango or menthol, it gives the range a clear change of pace.",
          "It is also a useful flavour in a 5 Flavour Custom Pack because it breaks up the heavier fruit profiles.",
        ],
      },
      {
        heading: "How it compares with fruit flavours",
        paragraphs: [
          "Compared with Quadruple Berry, Fanta is sharper and more citrus-driven. Compared with Mango Magic, it feels lighter and more carbonated. Compared with Peach Ice, it is warmer because there is almost no cooling.",
        ],
      },
    ],
    pros: [
      "Distinctive orange-soda profile",
      "Good option if you want variety",
      "No heavy menthol",
    ],
    cons: [
      "Less traditional than berry or mango",
      "May be too sweet for people who prefer subtle flavours",
    ],
    verdict: [
      "Fanta is not the safest first flavour, but it is one of the most memorable. It works best for people who specifically like soda-style vapes or want a fun option in a mixed pack.",
      "If you already have fruit and ice covered, Fanta is the best 'something different' pick.",
    ],
    faq: [
      {
        question: "Does Alibarbar sell Cola Ice?",
        answer:
          "The current line-up on this site includes Fanta rather than Cola Ice. Fanta is the closest soda-style option available right now.",
      },
      {
        question: "Is Fanta an iced flavour?",
        answer:
          "No. Fanta is mostly a sweet orange-soda profile with very little cooling.",
      },
    ],
    relatedReviews: ["alibarbar-quadruple-berry-review", "alibarbar-peach-ice-review"],
  },
];

export function getReviewBySlug(slug: string | undefined): ReviewPost | undefined {
  if (!slug) return undefined;
  return reviewPosts.find((post) => post.slug === slug);
}

export type Brand = {
  slug: string;
  name: string;
  /** Is this our own brand? Changes the CTA framing. */
  isOwn?: boolean;
  title: string;
  description: string;
  intro: string;
  overview: string[];
  knownFor: string[];
  /** How it relates to / compares with Alibarbar. */
  positioning: string[];
  /** Optional slug into /compare for a deeper head-to-head. */
  compareSlug?: string;
  /** GEO quick-answer block under the H1. */
  quickAnswer?: { question: string; answer: string };
  /** Brand-specific FAQ for AI-citable Q&A. */
  faq?: { question: string; answer: string }[];
  datePublished: string;
  dateModified: string;
};

export const brands: Brand[] = [
  {
    slug: "alibarbar",
    name: "Alibarbar",
    isOwn: true,
    title: "Alibarbar Brand Guide: The Ingot 9000 Explained",
    description:
      "Learn about the Alibarbar brand and its flagship Ingot 9000 disposable vape — high puff count, smart LED display and a wide Australian flavour range.",
    intro:
      "Alibarbar is the brand behind the Ingot 9000, a high-capacity disposable vape designed for adult users who want longevity and simplicity in one device.",
    overview: [
      "Alibarbar focuses on premium disposable vapes, with the Ingot 9000 as its flagship. The device is defined by a large 22ml e-liquid capacity, a 2350mAh battery and a built-in smart LED display that shows remaining battery and e-liquid.",
      "The range is built around a curated set of flavours plus a build-your-own 5 Flavour Custom Pack, so customers can find or mix the profiles they like.",
    ],
    knownFor: [
      "Up to 9000 puffs per device",
      "Smart LED battery + e-liquid display",
      "Gold ingot-bar design",
      "5 Flavour Custom Pack",
    ],
    positioning: [
      "Within the high-puff disposable category, Alibarbar competes on capacity, the convenience of an on-device display, and flavour flexibility.",
      "For Australian adult vapers who want a long-lasting, no-setup device, the Ingot 9000 is the brand's core recommendation.",
    ],
    quickAnswer: {
      question: "What is Alibarbar?",
      answer:
        "Alibarbar is a disposable vape brand best known for the Ingot 9000 — a high-capacity device rated for up to 9000 puffs, with a 22ml tank, 2350mAh battery, mesh coil and built-in smart LED display. Alibarbar Australia stocks 10+ single flavours plus 3, 5 and 10-device custom packs for adult customers nationwide.",
    },
    faq: [
      {
        question: "What is Alibarbar?",
        answer:
          "Alibarbar is a premium disposable vape brand. Its flagship product is the Ingot 9000, designed for up to 9000 puffs per device with a smart LED display showing battery and e-liquid levels.",
      },
      {
        question: "Is Alibarbar legal in Australia?",
        answer:
          "Nicotine vaping products are regulated in Australia. Alibarbar Australia sells to adults 18+ only. Laws vary by state and territory — our Legal FAQ hub explains the general rules. This is information only, not legal advice.",
      },
      {
        question: "How long do Alibarbar vapes last?",
        answer:
          "Each Ingot 9000 is rated for up to 9000 puffs with a 22ml e-liquid tank and 2350mAh battery. Real-world lifespan depends on puff length and draw style; the LED display helps you track remaining e-liquid.",
      },
      {
        question: "What Alibarbar flavours are most popular?",
        answer:
          "Quadruple Berry, Peach Ice and Fanta are among the most searched flavours in Australia. Quadruple Berry suits all-day fruit vapers; Peach Ice adds moderate cooling; Fanta covers citrus soda fans. See our flavour guides for full tasting notes.",
      },
    ],
    datePublished: "2026-03-20",
    dateModified: "2026-07-01",
  },
  {
    slug: "iget",
    name: "IGET",
    title: "IGET Brand Guide (and How Alibarbar Compares)",
    description:
      "An overview of the IGET disposable vape brand — its popular models and flavour range — plus how it compares with the Alibarbar Ingot 9000.",
    intro:
      "IGET is one of Australia's most recognised disposable vape brands. This guide explains what it's known for and how it lines up against the Alibarbar Ingot 9000.",
    overview: [
      "IGET offers a wide line-up of disposable vapes, including well-known models such as the IGET Bar, IGET Legend and IGET King. Puff counts and sizes vary across the range.",
      "The brand's strength is familiarity and a broad, long-established flavour catalogue.",
    ],
    knownFor: ["Wide model range", "Established flavour catalogue", "Strong brand recognition in Australia"],
    positioning: [
      "IGET spans many device sizes, from compact to higher-capacity. The Alibarbar Ingot 9000 targets the upper end with a higher headline puff count and an LED display.",
      "If you want maximum device life and flavour-mixing, Alibarbar is worth comparing directly against your preferred IGET model.",
    ],
    compareSlug: "alibarbar-vs-iget",
    datePublished: "2026-03-21",
    dateModified: "2026-07-01",
  },
  {
    slug: "hqd",
    name: "HQD",
    title: "HQD Brand Guide (and How Alibarbar Compares)",
    description:
      "About the HQD disposable vape brand and how it compares with the Alibarbar Ingot 9000 on capacity, display and flavours.",
    intro:
      "HQD is an established disposable vape brand. Here's what it's known for and how it compares to the Alibarbar Ingot 9000.",
    overview: [
      "HQD produces a range of disposable devices in various sizes and puff counts, often favouring compact form factors.",
      "It has a familiar flavour selection and is a common sight in the Australian market.",
    ],
    knownFor: ["Compact device designs", "Familiar flavour range", "Recognised brand"],
    positioning: [
      "HQD's compact models suit vapers who prioritise portability. The Alibarbar Ingot 9000 leans towards longevity with higher capacity and an on-device display.",
      "Choose based on whether you value a smaller device or a longer-lasting one.",
    ],
    compareSlug: "alibarbar-vs-hqd",
    datePublished: "2026-03-22",
    dateModified: "2026-07-01",
  },
  {
    slug: "gunnpod",
    name: "Gunnpod",
    title: "Gunnpod Brand Guide (and How Alibarbar Compares)",
    description:
      "About Gunnpod disposable vapes — including the classic 2000-puff model — and how they compare with the Alibarbar Ingot 9000.",
    intro:
      "Gunnpod is well known in Australia, especially for its 2000-puff model. This guide covers the brand and how it compares to the Alibarbar Ingot 9000.",
    overview: [
      "Gunnpod made its name with the compact Gunnpod 2000 and has since added higher-capacity models.",
      "It's a straightforward, familiar brand with a reliable flavour range.",
    ],
    knownFor: ["Classic 2000-puff model", "Compact design", "Long-standing recognition"],
    positioning: [
      "The classic Gunnpod is smaller and lower-capacity than the Alibarbar Ingot 9000, which is rated for up to 9000 puffs.",
      "If you want far fewer replacements, the Ingot 9000 offers substantially more capacity.",
    ],
    compareSlug: "alibarbar-vs-gunnpod",
    datePublished: "2026-03-23",
    dateModified: "2026-07-01",
  },
  {
    slug: "kuz",
    name: "KUZ",
    title: "KUZ Brand Guide (and How Alibarbar Compares)",
    description:
      "About the KUZ disposable vape brand and how it compares with the Alibarbar Ingot 9000 on puffs, capacity and flavours.",
    intro:
      "KUZ is a disposable vape brand in the Australian market. Here's an overview and how it compares to the Alibarbar Ingot 9000.",
    overview: [
      "KUZ offers disposable devices across a range of puff counts and flavours, competing in the high-puff segment.",
      "As with most brands, exact specs depend on the specific model.",
    ],
    knownFor: ["High-puff disposable options", "Alternative flavour choices"],
    positioning: [
      "KUZ and Alibarbar compete in a similar space. The Ingot 9000 differentiates with a consistent 9000-puff spec, LED display and the 5 Flavour Custom Pack.",
      "Compare the exact model you're considering against the Ingot 9000's spec sheet.",
    ],
    compareSlug: "alibarbar-vs-kuz",
    datePublished: "2026-03-24",
    dateModified: "2026-07-01",
  },
];

export function getBrandBySlug(slug: string | undefined): Brand | undefined {
  if (!slug) return undefined;
  return brands.find((b) => b.slug === slug);
}

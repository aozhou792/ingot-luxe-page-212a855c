export type ComparisonRow = {
  feature: string;
  alibarbar: string;
  competitor: string;
};

export type Comparison = {
  slug: string;
  competitor: string;
  title: string;
  description: string;
  intro: string;
  competitorOverview: string[];
  rows: ComparisonRow[];
  alibarbarStrengths: string[];
  competitorStrengths: string[];
  verdict: string[];
  faq: { question: string; answer: string }[];
  datePublished: string;
  dateModified: string;
};

const SHARED_DISCLAIMER =
  "Competitor specifications vary by model and change over time; figures below are typical ranges for reference only. Always check the specific device before buying.";

export const comparisons: Comparison[] = [
  {
    slug: "alibarbar-vs-iget",
    competitor: "IGET",
    title: "Alibarbar Ingot 9000 vs IGET: Which Disposable Vape Is Better?",
    description:
      "A fair comparison of the Alibarbar Ingot 9000 and IGET disposable vapes — puff count, battery, e-liquid, flavours and value for Australian vapers.",
    intro:
      "IGET is one of the most recognised disposable vape brands in Australia, so it's a natural comparison for the Alibarbar Ingot 9000. Here's how the two stack up. " +
      SHARED_DISCLAIMER,
    competitorOverview: [
      "IGET is a well-known disposable vape brand with a broad line-up, including models such as the IGET Bar, IGET Legend and IGET King. Puff counts differ significantly across the range, commonly from around 1,900 up to 4,000+ depending on the model.",
      "IGET's strength is brand familiarity and a very wide flavour catalogue built up over years in the Australian market.",
    ],
    rows: [
      { feature: "Puff count", alibarbar: "Up to 9000", competitor: "~1,900-4,000+ (varies by model)" },
      { feature: "E-liquid capacity", alibarbar: "22ml", competitor: "~2-12ml (varies by model)" },
      { feature: "Battery", alibarbar: "2350mAh, non-rechargeable", competitor: "Varies; many non-rechargeable" },
      { feature: "Display", alibarbar: "Smart LED (battery + e-liquid)", competitor: "Most models: none" },
      { feature: "Custom multi-flavour pack", alibarbar: "Yes — 5 Flavour Custom Pack", competitor: "No" },
      { feature: "Activation", alibarbar: "Inhale-activated", competitor: "Inhale-activated" },
    ],
    alibarbarStrengths: [
      "Higher headline puff count on a single device",
      "Built-in LED display for battery and e-liquid",
      "Build-your-own 5 Flavour Custom Pack",
    ],
    competitorStrengths: [
      "Very widely known brand in Australia",
      "Large, established flavour catalogue",
      "Many model options at different sizes",
    ],
    verdict: [
      "If your priority is maximum puffs per device, a smart display, and the ability to mix five flavours in one order, the Alibarbar Ingot 9000 is the stronger pick.",
      "If you specifically want a particular long-standing IGET flavour or a smaller, lower-capacity device, IGET's range may suit you better. For most adult vapers wanting a long-lasting all-in-one, the Ingot 9000 offers more device for the money.",
    ],
    faq: [
      {
        question: "Does the Alibarbar last longer than an IGET?",
        answer:
          "On headline puff count, yes — the Ingot 9000 is rated for up to 9000 puffs, higher than most IGET models. Real-world lifespan still depends on how you vape.",
      },
    ],
    datePublished: "2026-03-01",
    dateModified: "2026-07-01",
  },
  {
    slug: "alibarbar-vs-hqd",
    competitor: "HQD",
    title: "Alibarbar Ingot 9000 vs HQD: Disposable Vape Comparison",
    description:
      "Comparing the Alibarbar Ingot 9000 with HQD disposable vapes — capacity, puff count, display and flavour options for Australian buyers.",
    intro:
      "HQD is another established disposable vape brand. This guide compares it fairly against the Alibarbar Ingot 9000. " +
      SHARED_DISCLAIMER,
    competitorOverview: [
      "HQD offers a range of disposable devices with varying puff counts and sizes. Like most disposable brands, capacity and battery differ across the catalogue.",
      "HQD is known for compact designs and a familiar flavour selection.",
    ],
    rows: [
      { feature: "Puff count", alibarbar: "Up to 9000", competitor: "~1,000-4,000+ (varies by model)" },
      { feature: "E-liquid capacity", alibarbar: "22ml", competitor: "Varies by model" },
      { feature: "Battery", alibarbar: "2350mAh, non-rechargeable", competitor: "Varies by model" },
      { feature: "Display", alibarbar: "Smart LED (battery + e-liquid)", competitor: "Most models: none" },
      { feature: "Custom multi-flavour pack", alibarbar: "Yes — 5 Flavour Custom Pack", competitor: "No" },
    ],
    alibarbarStrengths: [
      "High single-device puff capacity",
      "LED display shows remaining battery and e-liquid",
      "Custom 5-flavour bundle option",
    ],
    competitorStrengths: ["Compact device options", "Recognised brand", "Familiar flavour line-up"],
    verdict: [
      "The Alibarbar Ingot 9000 generally offers a higher puff count and the convenience of an LED display, making it a strong choice for longevity-focused vapers.",
      "HQD can be a good option if you prefer a smaller device. For value and device life, the Ingot 9000 leads for most users.",
    ],
    faq: [
      {
        question: "Is Alibarbar or HQD better value?",
        answer:
          "For puffs-per-device, the Ingot 9000 typically offers more capacity. Value also depends on which flavours you prefer.",
      },
    ],
    datePublished: "2026-03-04",
    dateModified: "2026-07-01",
  },
  {
    slug: "alibarbar-vs-gunnpod",
    competitor: "Gunnpod",
    title: "Alibarbar Ingot 9000 vs Gunnpod: Which Should You Buy?",
    description:
      "Alibarbar Ingot 9000 versus Gunnpod disposable vapes — a clear comparison of puffs, battery, e-liquid and flavours for Australia.",
    intro:
      "Gunnpod is a popular disposable vape in Australia, especially known for its 2000-puff model. Here's how it compares to the Alibarbar Ingot 9000. " +
      SHARED_DISCLAIMER,
    competitorOverview: [
      "Gunnpod built its reputation on the Gunnpod 2000, a compact disposable rated around 2,000 puffs, and has since expanded to higher-capacity models.",
      "It's a familiar, straightforward brand with a solid flavour range.",
    ],
    rows: [
      { feature: "Puff count", alibarbar: "Up to 9000", competitor: "~2,000 (classic model); higher on newer models" },
      { feature: "E-liquid capacity", alibarbar: "22ml", competitor: "~8-13ml (varies by model)" },
      { feature: "Battery", alibarbar: "2350mAh, non-rechargeable", competitor: "Varies by model" },
      { feature: "Display", alibarbar: "Smart LED (battery + e-liquid)", competitor: "Most models: none" },
      { feature: "Custom multi-flavour pack", alibarbar: "Yes — 5 Flavour Custom Pack", competitor: "No" },
    ],
    alibarbarStrengths: [
      "Much higher puff count than the classic Gunnpod",
      "LED display for battery and e-liquid",
      "5 Flavour Custom Pack option",
    ],
    competitorStrengths: ["Very compact classic model", "Long-standing brand recognition", "Simple, no-frills experience"],
    verdict: [
      "If you want a device that lasts far longer between replacements, the Alibarbar Ingot 9000 clearly outpaces the classic Gunnpod on capacity.",
      "The Gunnpod suits vapers who like a smaller, pocket-friendly device and don't mind replacing it more often. For longevity, the Ingot 9000 wins.",
    ],
    faq: [
      {
        question: "How many more puffs does Alibarbar have than a Gunnpod?",
        answer:
          "The Ingot 9000 is rated for up to 9000 puffs versus around 2000 on the classic Gunnpod — roughly four times the headline capacity.",
      },
    ],
    datePublished: "2026-03-07",
    dateModified: "2026-07-01",
  },
  {
    slug: "alibarbar-vs-kuz",
    competitor: "KUZ",
    title: "Alibarbar Ingot 9000 vs KUZ: Disposable Vape Comparison",
    description:
      "How the Alibarbar Ingot 9000 compares with KUZ disposable vapes on puff count, capacity, display and flavour choice in Australia.",
    intro:
      "KUZ is a disposable vape brand seen in the Australian market. This guide compares it with the Alibarbar Ingot 9000. " +
      SHARED_DISCLAIMER,
    competitorOverview: [
      "KUZ offers disposable devices with a range of puff counts and flavours. As with other brands, specifics vary by model.",
      "It competes in the same high-puff disposable segment as the Ingot 9000.",
    ],
    rows: [
      { feature: "Puff count", alibarbar: "Up to 9000", competitor: "Varies by model" },
      { feature: "E-liquid capacity", alibarbar: "22ml", competitor: "Varies by model" },
      { feature: "Battery", alibarbar: "2350mAh, non-rechargeable", competitor: "Varies by model" },
      { feature: "Display", alibarbar: "Smart LED (battery + e-liquid)", competitor: "Depends on model" },
      { feature: "Custom multi-flavour pack", alibarbar: "Yes — 5 Flavour Custom Pack", competitor: "No" },
    ],
    alibarbarStrengths: [
      "Consistent up-to-9000-puff capacity",
      "LED display across the range",
      "Mix-and-match 5 Flavour Custom Pack",
    ],
    competitorStrengths: ["Alternative flavour choices", "Another high-puff option to consider"],
    verdict: [
      "The Alibarbar Ingot 9000 offers a clear, consistent spec sheet — 9000 puffs, 22ml and an LED display — which makes it easy to know what you're getting.",
      "KUZ can be worth a look if a specific flavour appeals, but for a predictable, long-lasting device the Ingot 9000 is a dependable default.",
    ],
    faq: [
      {
        question: "Are Alibarbar and KUZ the same type of device?",
        answer: "Both are inhale-activated disposable vapes in the high-puff category, but specs and flavours differ.",
      },
    ],
    datePublished: "2026-03-10",
    dateModified: "2026-07-01",
  },
  {
    slug: "alibarbar-vs-relx",
    competitor: "RELX",
    title: "Alibarbar Ingot 9000 vs RELX: Disposable vs Pod System",
    description:
      "Alibarbar Ingot 9000 (disposable) compared with RELX (refillable pod system) — which format suits you, on cost, convenience and flavour.",
    intro:
      "RELX is best known for refillable pod systems rather than disposables, so this is really a comparison of two formats. Here's how to choose. " +
      SHARED_DISCLAIMER,
    competitorOverview: [
      "RELX popularised the closed pod-system format: a reusable, rechargeable device that takes replaceable flavour pods. It's designed for people who want a longer-term device and swap pods rather than replace the whole unit.",
      "This is a different experience from an all-in-one disposable — more upfront setup, but a reusable body.",
    ],
    rows: [
      { feature: "Format", alibarbar: "All-in-one disposable", competitor: "Rechargeable pod system + pods" },
      { feature: "Puff count", alibarbar: "Up to 9000 per device", competitor: "Depends on pods used" },
      { feature: "Rechargeable", alibarbar: "No (disposable)", competitor: "Yes (device is reusable)" },
      { feature: "Setup", alibarbar: "None — vape out of the box", competitor: "Charge device, insert pods" },
      { feature: "Display", alibarbar: "Smart LED (battery + e-liquid)", competitor: "Varies by device" },
    ],
    alibarbarStrengths: [
      "Zero setup — ready straight out of the box",
      "No charging or pod-swapping",
      "Simple, predictable single-device cost",
    ],
    competitorStrengths: [
      "Reusable device body",
      "Swap pods instead of whole device",
      "Can suit long-term, lower-waste use",
    ],
    verdict: [
      "Choose the Alibarbar Ingot 9000 if you want maximum simplicity: no charging, no pods, no setup — just vape and replace.",
      "Choose a RELX-style pod system if you prefer a reusable device and don't mind charging and buying pods separately. They serve different priorities; the Ingot 9000 wins on pure convenience.",
    ],
    faq: [
      {
        question: "Is RELX a disposable vape?",
        answer:
          "No — RELX is primarily a refillable/rechargeable pod system. The Alibarbar Ingot 9000 is an all-in-one disposable.",
      },
    ],
    datePublished: "2026-03-13",
    dateModified: "2026-07-01",
  },
];

export function getComparisonBySlug(slug: string | undefined): Comparison | undefined {
  if (!slug) return undefined;
  return comparisons.find((c) => c.slug === slug);
}

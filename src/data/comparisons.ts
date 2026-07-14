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
  /** Optional one-line picks for the GEO "Which is better?" block. */
  shortAnswer?: { alibarbar: string; competitor: string };
  /** Explicit GEO quick-answer; falls back to title + intro. */
  quickAnswer?: { question: string; answer: string };
  /** Explicit key takeaways; falls back to alibarbarStrengths. */
  keyTakeaways?: string[];
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
    shortAnswer: {
      alibarbar:
        "Pick the Alibarbar Ingot 9000 if you want maximum puffs per device, an LED display, and a custom 5-flavour pack.",
      competitor:
        "Pick IGET if you want a familiar brand, a specific long-standing flavour, or a smaller lower-capacity model.",
    },
    quickAnswer: {
      question: "Is Alibarbar or IGET better?",
      answer:
        "For most adult vapers in Australia who want a long-lasting all-in-one disposable, the Alibarbar Ingot 9000 is the stronger pick on puff count, e-liquid capacity and built-in display. IGET wins when you specifically want its established flavour catalogue or a compact device from its wider model range.",
    },
    keyTakeaways: [
      "Ingot 9000 is rated for up to 9000 puffs versus roughly 1,900–4,000+ on most IGET models",
      "Alibarbar includes a smart LED display; most IGET models do not",
      "Only Alibarbar offers a build-your-own 5 Flavour Custom Pack",
      "IGET has stronger brand recognition and a larger flavour catalogue in Australia",
      "Choose IGET for a specific flavour or smaller device; choose Alibarbar for longevity and value",
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
      {
        question: "Does IGET have a custom multi-flavour pack?",
        answer:
          "No. IGET sells individual devices and flavour variants, but it does not offer a build-your-own five-flavour bundle like the Alibarbar 5 Flavour Custom Pack.",
      },
      {
        question: "Which brand has more flavours in Australia?",
        answer:
          "IGET has a larger, longer-established flavour catalogue across its model range. Alibarbar offers ten flavours plus a custom five-pack option on the Ingot 9000.",
      },
    ],
    datePublished: "2026-03-01",
    dateModified: "2026-07-14",
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
    shortAnswer: {
      alibarbar:
        "Pick Alibarbar if you want a high-capacity device with an LED display and a custom five-flavour pack option.",
      competitor:
        "Pick HQD if you prefer a smaller, more compact disposable from a recognised brand.",
    },
    quickAnswer: {
      question: "Is Alibarbar or HQD better?",
      answer:
        "The Alibarbar Ingot 9000 generally delivers more puffs per device, a larger e-liquid tank, and a smart LED display than most HQD models. HQD is the better fit if you want a compact device and do not need the highest headline capacity.",
    },
    keyTakeaways: [
      "Ingot 9000 is rated for up to 9000 puffs with a 22ml tank and 2350mAh battery",
      "Alibarbar includes an LED display and a 5 Flavour Custom Pack option",
      "HQD offers compact device options and a familiar flavour line-up",
      "HQD suits vapers who prioritise pocket-friendly size over maximum capacity",
      "Value depends on which flavours you prefer and how often you replace devices",
    ],
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
      {
        question: "Does HQD have an LED display?",
        answer:
          "Most HQD models do not include a battery and e-liquid display. The Alibarbar Ingot 9000 has a built-in smart LED for both levels.",
      },
      {
        question: "Which is better for long-term daily use?",
        answer:
          "For adult vapers who want fewer replacements between orders, the Ingot 9000's higher puff count and larger tank usually last longer. HQD is better if you prefer swapping smaller devices more often.",
      },
    ],
    datePublished: "2026-03-04",
    dateModified: "2026-07-14",
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
    shortAnswer: {
      alibarbar:
        "Pick Alibarbar if you want a device that lasts much longer between replacements, with an LED display and custom flavour pack.",
      competitor:
        "Pick Gunnpod if you want a very compact, pocket-friendly disposable and do not mind replacing it more often.",
    },
    quickAnswer: {
      question: "Is Alibarbar or Gunnpod better?",
      answer:
        "The Alibarbar Ingot 9000 clearly outpaces the classic Gunnpod on puff count and e-liquid capacity — roughly four times the headline rating. Gunnpod suits adult vapers who prefer a smaller, simpler device and are happy to replace it sooner.",
    },
    keyTakeaways: [
      "Ingot 9000 is rated for up to 9000 puffs versus around 2000 on the classic Gunnpod",
      "Alibarbar has a 22ml tank, LED display, and 5 Flavour Custom Pack option",
      "Gunnpod's classic model is very compact and well recognised in Australia",
      "Gunnpod wins on pocket-friendly size; Alibarbar wins on longevity per device",
      "Newer Gunnpod models offer higher capacity, but specs still vary by device",
    ],
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
      {
        question: "Is Gunnpod smaller than the Alibarbar Ingot 9000?",
        answer:
          "Yes. The classic Gunnpod is designed as a compact disposable, while the Ingot 9000 is a larger high-capacity device with a 22ml tank and built-in display.",
      },
      {
        question: "Does Gunnpod offer a custom multi-flavour pack?",
        answer:
          "No. Gunnpod sells individual devices. Alibarbar offers a 5 Flavour Custom Pack so you can mix five flavours in one order.",
      },
    ],
    datePublished: "2026-03-07",
    dateModified: "2026-07-14",
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
    shortAnswer: {
      alibarbar:
        "Pick Alibarbar if you want a clear, consistent 9000-puff device with an LED display and a custom five-flavour pack.",
      competitor:
        "Pick KUZ if a specific KUZ flavour or model fits you better — compare the exact device specs before you buy.",
    },
    quickAnswer: {
      question: "Is Alibarbar or KUZ better?",
      answer:
        "The Alibarbar Ingot 9000 is the clearer default for most adult buyers: fixed up-to-9000 puff rating, 22ml tank, smart LED display and a 5 Flavour Custom Pack. KUZ can still suit you if a particular KUZ flavour or model is what you want — always check that model's exact specs.",
    },
    keyTakeaways: [
      "Ingot 9000 publishes a consistent 9000-puff / 22ml / LED display package",
      "Alibarbar offers a mix-and-match 5 Flavour Custom Pack; KUZ does not",
      "KUZ competes in the same high-puff disposable segment",
      "KUZ specs vary by model — compare the specific device, not just the brand name",
      "Choose KUZ for a favourite flavour; choose Alibarbar for predictable longevity",
    ],
    verdict: [
      "The Alibarbar Ingot 9000 offers a clear, consistent spec sheet — 9000 puffs, 22ml and an LED display — which makes it easy to know what you're getting.",
      "KUZ can be worth a look if a specific flavour appeals, but for a predictable, long-lasting device the Ingot 9000 is a dependable default.",
    ],
    faq: [
      {
        question: "Are Alibarbar and KUZ the same type of device?",
        answer: "Both are inhale-activated disposable vapes in the high-puff category, but specs and flavours differ.",
      },
      {
        question: "Does KUZ have a smart LED display?",
        answer:
          "It depends on the model. The Alibarbar Ingot 9000 includes a smart LED for battery and e-liquid on every device in this range.",
      },
      {
        question: "Which lasts longer — Alibarbar or KUZ?",
        answer:
          "The Ingot 9000 is rated for up to 9000 puffs with a 22ml tank. KUZ longevity depends on which model you buy, so compare that model's puff rating and tank size before deciding.",
      },
    ],
    datePublished: "2026-03-10",
    dateModified: "2026-07-14",
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
    shortAnswer: {
      alibarbar:
        "Pick Alibarbar if you want zero setup: no charging, no pods — just vape and replace when finished.",
      competitor:
        "Pick RELX if you want a reusable rechargeable device and prefer swapping pods instead of the whole unit.",
    },
    quickAnswer: {
      question: "Is Alibarbar or RELX better?",
      answer:
        "They solve different jobs. The Alibarbar Ingot 9000 is an all-in-one disposable: ready out of the box with up to 9000 puffs and no charging. RELX is a rechargeable pod system — better if you want a reusable body and to swap pods over time. Choose convenience (Alibarbar) or reusable pods (RELX).",
    },
    keyTakeaways: [
      "Alibarbar Ingot 9000 is a sealed disposable; RELX is primarily a rechargeable pod system",
      "Alibarbar wins on zero setup and predictable single-device cost",
      "RELX wins if you want a reusable body and pod swaps",
      "Puff count on RELX depends on how many pods you use, not one sealed tank",
      "Pick the format you prefer — they are not direct like-for-like devices",
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
      {
        question: "Which is cheaper long term — disposable or RELX?",
        answer:
          "It depends on how often you vape. Disposables have a simple one-device cost each time; RELX usually costs more upfront for the device, then ongoing pod purchases. Heavy daily users sometimes prefer pods; convenience-first buyers often prefer disposables.",
      },
      {
        question: "Do I need to charge an Alibarbar like a RELX?",
        answer:
          "No. The Ingot 9000 arrives pre-charged and is not designed to be recharged. When the battery or e-liquid is finished, replace the device.",
      },
    ],
    datePublished: "2026-03-13",
    dateModified: "2026-07-14",
  },
];

export function getComparisonBySlug(slug: string | undefined): Comparison | undefined {
  if (!slug) return undefined;
  return comparisons.find((c) => c.slug === slug);
}

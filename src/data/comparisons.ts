export type ComparisonRow = {
  feature: string;
  alibarbar: string;
  competitor: string;
};

export type Comparison = {
  slug: string;
  competitor: string;
  /** Left column header. Defaults to Alibarbar Ingot 9000. */
  leftLabel?: string;
  /** Right column header. Defaults to competitor. */
  rightLabel?: string;
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
  /** Flavour-vs-flavour pages use shop links to both SKUs. */
  flavourCompare?: boolean;
  leftProductSlug?: string;
  rightProductSlug?: string;
};

const SHARED_DISCLAIMER =
  "Competitor specifications vary by model and change over time; figures below are typical ranges for reference only. Always check the specific device before buying.";

export const comparisons: Comparison[] = [
  {
    slug: "alibarbar-vs-iget",
    competitor: "IGET Bar",
    leftLabel: "Alibarbar Ingot 9000",
    rightLabel: "IGET Bar",
    title: "Alibarbar Ingot 9000 vs IGET Bar: SKU Comparison",
    description:
      "Side-by-side specs for the Alibarbar Ingot 9000 and the IGET Bar — puff rating, tank, battery, display and flavour approach for Australian adult buyers.",
    intro:
      "This page compares two named devices, not two brand catalogues. The IGET Bar is the compact high-volume SKU most Australian searches mean by “IGET”. Other IGET models (Legend, King) have different tanks and puff ratings — do not copy those figures onto this table. " +
      SHARED_DISCLAIMER,
    competitorOverview: [
      "The IGET Bar is typically listed around 3,500 puffs with a much smaller tank than the Ingot 9000 and no battery/e-liquid LED. It is inhale-activated and sold as a sealed disposable.",
      "IGET’s wider catalogue (Legend, King and others) is a different comparison. If you are buying a Legend or King, use that model’s spec sheet — this table is IGET Bar only.",
    ],
    rows: [
      { feature: "Named SKU", alibarbar: "Alibarbar Ingot 9000", competitor: "IGET Bar" },
      { feature: "Puff rating", alibarbar: "Up to 9000 (usage dependent)", competitor: "~3,500 (usage dependent; typical listing)" },
      { feature: "E-liquid capacity", alibarbar: "22ml pre-filled", competitor: "~12ml (typical listing)" },
      { feature: "Battery", alibarbar: "2350mAh, non-rechargeable", competitor: "Non-rechargeable; smaller cell than Ingot 9000" },
      { feature: "Display", alibarbar: "Smart LED (battery + e-liquid)", competitor: "None on the Bar SKU" },
      { feature: "Activation", alibarbar: "Inhale-activated", competitor: "Inhale-activated" },
      { feature: "Custom multi-flavour pack", alibarbar: "Yes — 5 / 10 / 20 packs", competitor: "Usually single-flavour units" },
    ],
    alibarbarStrengths: [
      "Larger published tank (22ml) and higher puff rating on this SKU",
      "Smart LED for remaining battery and e-liquid",
      "Build-your-own 5 / 10 / 20 flavour packs",
    ],
    competitorStrengths: [
      "Smaller, more pocketable Bar body",
      "Long-standing flavour catalogue on the Bar line",
      "Familiar SKU name in Australian search",
    ],
    shortAnswer: {
      alibarbar:
        "Pick the Ingot 9000 if you want a high-capacity sealed disposable with an LED remaining-life display and custom flavour packs.",
      competitor:
        "Pick the IGET Bar if you want a smaller device and a specific Bar flavour — not a 9000-class tank.",
    },
    quickAnswer: {
      question: "Is the Alibarbar Ingot 9000 or the IGET Bar better?",
      answer:
        "They are different size classes. The Ingot 9000 is rated for up to 9000 puffs (usage dependent) with a 22ml tank and a smart LED. The IGET Bar is typically listed around 3,500 puffs with a smaller tank and no LED. Choose Ingot 9000 for longevity and remaining-life display; choose IGET Bar for a compact familiar SKU.",
    },
    keyTakeaways: [
      "This table is Ingot 9000 vs IGET Bar — not vs IGET Legend or King",
      "Ingot 9000: up to 9000 puffs (usage dependent), 22ml, 2350mAh, LED",
      "IGET Bar: typically ~3,500 puffs, smaller tank, no LED",
      "Alibarbar offers 5/10/20 custom flavour packs; the Bar is usually sold as singles",
      "Check the exact IGET model on the box before treating this page as that SKU",
    ],
    verdict: [
      "If the job is fewer replacements and a remaining-life display, the Ingot 9000 is the closer SKU.",
      "If the job is a compact IGET Bar flavour you already know, buy that Bar — do not expect Ingot 9000 capacity from it.",
    ],
    faq: [
      {
        question: "Does the Ingot 9000 last longer than an IGET Bar?",
        answer:
          "On published ratings, yes: up to 9000 puffs (usage dependent) versus a typical ~3,500 listing on the Bar. Real-world count still depends on puff length. This does not apply to other IGET models.",
      },
      {
        question: "Is this comparison for IGET Legend or King?",
        answer:
          "No. Legend and King have different tanks and puff ratings. Use those model spec sheets. This page is IGET Bar only.",
      },
      {
        question: "Does the IGET Bar have a custom multi-flavour pack?",
        answer:
          "The Bar is usually sold as single-flavour units. Alibarbar lists 5, 10 and 20 flavour custom packs on the Ingot 9000.",
      },
    ],
    datePublished: "2026-03-01",
    dateModified: "2026-08-14",
  },
  {
    slug: "alibarbar-vs-hqd",
    competitor: "HQD Cuvie Plus",
    leftLabel: "Alibarbar Ingot 9000",
    rightLabel: "HQD Cuvie Plus",
    title: "Alibarbar Ingot 9000 vs HQD Cuvie Plus: SKU Comparison",
    description:
      "Named-SKU comparison: Alibarbar Ingot 9000 versus HQD Cuvie Plus — tank size, puff rating, display and format for Australian adult buyers.",
    intro:
      "HQD Cuvie Plus is the compact HQD SKU this page uses. Other HQD lines (Cuvie, larger bars) are different devices. " +
      SHARED_DISCLAIMER,
    competitorOverview: [
      "HQD Cuvie Plus is typically listed around 1,200 puffs with a small tank and no remaining-life screen. It is built as a pocket disposable, not a 9000-class bar.",
      "If you have a different HQD model in hand, stop and read that unit’s spec sheet. Do not apply Cuvie Plus figures to a larger HQD bar.",
    ],
    rows: [
      { feature: "Named SKU", alibarbar: "Alibarbar Ingot 9000", competitor: "HQD Cuvie Plus" },
      { feature: "Puff rating", alibarbar: "Up to 9000 (usage dependent)", competitor: "~1,200 (typical listing)" },
      { feature: "E-liquid capacity", alibarbar: "22ml pre-filled", competitor: "~5ml (typical listing)" },
      { feature: "Battery", alibarbar: "2350mAh, non-rechargeable", competitor: "Smaller non-rechargeable cell" },
      { feature: "Display", alibarbar: "Smart LED (battery + e-liquid)", competitor: "None" },
      { feature: "Format", alibarbar: "High-capacity sealed bar", competitor: "Compact pocket disposable" },
      { feature: "Custom multi-flavour pack", alibarbar: "Yes — 5 / 10 / 20 packs", competitor: "Usually singles" },
    ],
    alibarbarStrengths: [
      "Much larger tank and puff rating on this SKU",
      "LED remaining-life display",
      "Custom flavour packs",
    ],
    competitorStrengths: ["Very compact body", "Familiar Cuvie Plus flavour list", "Lower per-device size/weight"],
    shortAnswer: {
      alibarbar:
        "Pick Ingot 9000 if you want high capacity, an LED display and fewer replacements.",
      competitor:
        "Pick HQD Cuvie Plus if you want a small pocket disposable and accept replacing it sooner.",
    },
    quickAnswer: {
      question: "Is the Ingot 9000 or HQD Cuvie Plus better?",
      answer:
        "Different jobs. Ingot 9000 is a high-capacity sealed disposable (up to 9000 puffs, usage dependent, 22ml, LED). HQD Cuvie Plus is a compact ~1,200-puff class device. Choose by size class, not by brand slogan.",
    },
    keyTakeaways: [
      "Table is Ingot 9000 vs HQD Cuvie Plus only",
      "Cuvie Plus is a compact ~1,200-puff class SKU, not a 9000-puff bar",
      "Ingot 9000 has a smart LED; Cuvie Plus typically does not",
      "Other HQD models need their own spec sheet",
      "Value depends on whether you want pocket size or device life",
    ],
    verdict: [
      "Choose Ingot 9000 when the constraint is replacements and remaining-life visibility.",
      "Choose HQD Cuvie Plus when the constraint is pocket size and you already want that SKU’s flavours.",
    ],
    faq: [
      {
        question: "Is Alibarbar or HQD better value?",
        answer:
          "Per puff on published ratings, the Ingot 9000 is the larger device. Value also depends on whether you actually want a compact Cuvie Plus.",
      },
      {
        question: "Does HQD Cuvie Plus have an LED display?",
        answer:
          "Typically no. The Ingot 9000 includes a smart LED for battery and e-liquid.",
      },
      {
        question: "Does this apply to other HQD models?",
        answer:
          "No. Other HQD SKUs have different tanks and puff ratings. Compare that model’s spec sheet to the Ingot 9000 separately.",
      },
    ],
    datePublished: "2026-03-04",
    dateModified: "2026-08-14",
  },
  {
    slug: "alibarbar-vs-gunnpod",
    competitor: "Gunnpod 2000",
    leftLabel: "Alibarbar Ingot 9000",
    rightLabel: "Gunnpod 2000",
    title: "Alibarbar Ingot 9000 vs Gunnpod 2000: SKU Comparison",
    description:
      "Named-SKU comparison of the Alibarbar Ingot 9000 and the classic Gunnpod 2000 — puff rating, tank, display and size class.",
    intro:
      "Gunnpod 2000 is the compact SKU this page uses. Newer higher-capacity Gunnpod models are different devices with different tanks. " +
      SHARED_DISCLAIMER,
    competitorOverview: [
      "Gunnpod 2000 is typically listed around 2,000 puffs with a small tank and no remaining-life LED. It is a pocket disposable.",
      "If the box says a higher Gunnpod puff class, this table does not apply. Use that model’s published spec sheet.",
    ],
    rows: [
      { feature: "Named SKU", alibarbar: "Alibarbar Ingot 9000", competitor: "Gunnpod 2000" },
      { feature: "Puff rating", alibarbar: "Up to 9000 (usage dependent)", competitor: "~2,000 (typical listing)" },
      { feature: "E-liquid capacity", alibarbar: "22ml pre-filled", competitor: "~8ml (typical listing)" },
      { feature: "Battery", alibarbar: "2350mAh, non-rechargeable", competitor: "Smaller non-rechargeable cell" },
      { feature: "Display", alibarbar: "Smart LED (battery + e-liquid)", competitor: "None on the 2000 SKU" },
      { feature: "Custom multi-flavour pack", alibarbar: "Yes — 5 / 10 / 20 packs", competitor: "Usually singles" },
    ],
    alibarbarStrengths: [
      "Higher published puff rating and 22ml tank on this SKU",
      "LED remaining-life display",
      "Custom flavour packs",
    ],
    competitorStrengths: ["Very compact 2000-class body", "Long-standing SKU recognition", "Simple no-screen disposable"],
    shortAnswer: {
      alibarbar:
        "Pick Ingot 9000 if you want a high-capacity sealed bar with an LED and fewer replacements.",
      competitor:
        "Pick Gunnpod 2000 if you want a small pocket disposable and accept replacing it more often.",
    },
    quickAnswer: {
      question: "Is the Ingot 9000 or Gunnpod 2000 better?",
      answer:
        "Different size classes. Ingot 9000 is rated for up to 9000 puffs (usage dependent) with 22ml and a smart LED. Gunnpod 2000 is typically listed around 2,000 puffs with a smaller tank and no LED. Choose by capacity versus pocket size.",
    },
    keyTakeaways: [
      "Table is Ingot 9000 vs Gunnpod 2000 — not vs later Gunnpod puff classes",
      "Published ratings: up to 9000 (usage dependent) vs ~2,000",
      "Ingot 9000 has an LED; Gunnpod 2000 typically does not",
      "Newer Gunnpod models need their own comparison",
      "Pick 2000 for size; pick Ingot 9000 for device life",
    ],
    verdict: [
      "Choose Ingot 9000 when replacements and remaining-life display matter.",
      "Choose Gunnpod 2000 when you want that compact SKU and already know its flavours.",
    ],
    faq: [
      {
        question: "How many more puffs does the Ingot 9000 have than a Gunnpod 2000?",
        answer:
          "Published ratings are up to 9000 (usage dependent) versus around 2,000 on the classic 2000 SKU. Actual count depends on puff length. Other Gunnpod models differ.",
      },
      {
        question: "Is Gunnpod 2000 smaller than the Ingot 9000?",
        answer:
          "Yes. Gunnpod 2000 is a compact disposable; Ingot 9000 is a larger high-capacity bar with a 22ml tank and LED.",
      },
      {
        question: "Does this page cover newer Gunnpod models?",
        answer:
          "No. Higher-capacity Gunnpod SKUs have different tanks and batteries. Compare that model’s spec sheet separately.",
      },
    ],
    datePublished: "2026-03-07",
    dateModified: "2026-08-14",
  },
  {
    slug: "alibarbar-vs-kuz",
    competitor: "KUZ x10000",
    leftLabel: "Alibarbar Ingot 9000",
    rightLabel: "KUZ x10000",
    title: "Alibarbar Ingot 9000 vs KUZ x10000: SKU Comparison",
    description:
      "Named-SKU comparison of the Alibarbar Ingot 9000 and KUZ x10000 — format, puff rating, recharge, display and tank.",
    intro:
      "KUZ x10000 is the high-puff KUZ SKU this page uses. Other KUZ models are not interchangeable with this table. " +
      SHARED_DISCLAIMER,
    competitorOverview: [
      "KUZ x10000 is typically listed as a high-puff disposable, often with USB-C recharge and a large tank. That is a different format from the Ingot 9000, which is non-rechargeable and sealed.",
      "Published KUZ figures move between listings. Treat the right-hand column as typical published values and confirm the unit in hand.",
    ],
    rows: [
      { feature: "Named SKU", alibarbar: "Alibarbar Ingot 9000", competitor: "KUZ x10000" },
      { feature: "Puff rating", alibarbar: "Up to 9000 (usage dependent)", competitor: "~10,000 (typical listing; usage dependent)" },
      { feature: "E-liquid capacity", alibarbar: "22ml pre-filled", competitor: "~18ml (typical listing)" },
      { feature: "Battery", alibarbar: "2350mAh, non-rechargeable", competitor: "Rechargeable USB-C on typical listings" },
      { feature: "Display", alibarbar: "Smart LED (battery + e-liquid)", competitor: "Often a remaining-life indicator — confirm the unit" },
      { feature: "Setup", alibarbar: "None — sealed, pre-charged", competitor: "May need charging during the tank life" },
      { feature: "Custom multi-flavour pack", alibarbar: "Yes — 5 / 10 / 20 packs", competitor: "Usually singles" },
    ],
    alibarbarStrengths: [
      "Sealed, non-rechargeable — no cable during the tank life",
      "Fixed 22ml / 2350mAh / LED spec on every Ingot 9000 flavour SKU",
      "Custom flavour packs",
    ],
    competitorStrengths: [
      "Higher typical puff listing on the x10000 SKU",
      "USB-C recharge can finish a large tank if the cell runs first",
      "Same high-puff segment as Ingot 9000",
    ],
    shortAnswer: {
      alibarbar:
        "Pick Ingot 9000 if you want a sealed non-rechargeable bar with a documented LED and mix-and-match packs.",
      competitor:
        "Pick KUZ x10000 if you want that SKU’s higher typical puff listing and are willing to recharge — confirm the spec sheet on the box.",
    },
    quickAnswer: {
      question: "Is the Ingot 9000 or KUZ x10000 better?",
      answer:
        "Close on capacity class, different on recharge. Ingot 9000 is a sealed non-rechargeable disposable (up to 9000 puffs, usage dependent, 22ml, LED). KUZ x10000 is typically listed around 10,000 puffs with USB-C recharge. Choose sealed simplicity versus rechargeable high-puff — and verify the KUZ unit in hand.",
    },
    keyTakeaways: [
      "Table is Ingot 9000 vs KUZ x10000, not vs every KUZ model",
      "Ingot 9000 never needs charging; x10000 listings are usually USB-C",
      "Puff figures are manufacturer-rated and usage dependent on both sides",
      "Alibarbar custom packs are a catalogue difference, not a hardware difference",
      "Always read the KUZ box — listings disagree more than Alibarbar’s single-platform spec",
    ],
    verdict: [
      "Choose Ingot 9000 when you want one sealed spec across flavours and no charging.",
      "Choose KUZ x10000 when you specifically want that SKU and accept recharge plus spec-sheet checking.",
    ],
    faq: [
      {
        question: "Are Ingot 9000 and KUZ x10000 the same type of device?",
        answer:
          "Both are high-puff disposables, but Ingot 9000 is non-rechargeable and sealed. Typical x10000 listings are USB-C rechargeable. Confirm the unit.",
      },
      {
        question: "Does KUZ x10000 have a smart LED?",
        answer:
          "Some listings show a remaining-life indicator. It is not guaranteed on every KUZ SKU. Ingot 9000 includes a smart LED on every flavour in this range.",
      },
      {
        question: "Which lasts longer?",
        answer:
          "Published ratings put x10000 slightly higher, but both are usage dependent and KUZ listings vary. Compare the printed specs on the two boxes you are actually buying.",
      },
    ],
    datePublished: "2026-03-10",
    dateModified: "2026-08-14",
  },
  {
    slug: "alibarbar-vs-relx",
    competitor: "RELX Infinity",
    leftLabel: "Alibarbar Ingot 9000",
    rightLabel: "RELX Infinity",
    title: "Alibarbar Ingot 9000 vs RELX Infinity: Disposable vs Pod SKU",
    description:
      "Named-SKU format comparison: Alibarbar Ingot 9000 sealed disposable versus RELX Infinity rechargeable pod device.",
    intro:
      "RELX Infinity is a rechargeable closed-pod device, not a disposable. This is a format comparison between two named SKUs. " +
      SHARED_DISCLAIMER,
    competitorOverview: [
      "RELX Infinity is a reusable, rechargeable body that takes replaceable flavour pods (typically around 1.9ml per pod). You charge the device and swap pods.",
      "That is a different product class from the Ingot 9000, which is a sealed pre-filled disposable with a 22ml tank and no charging.",
    ],
    rows: [
      { feature: "Named SKU", alibarbar: "Alibarbar Ingot 9000", competitor: "RELX Infinity" },
      { feature: "Format", alibarbar: "Sealed disposable", competitor: "Rechargeable device + replaceable pods" },
      { feature: "Puff rating", alibarbar: "Up to 9000 per device (usage dependent)", competitor: "Depends on pods used, not one sealed tank" },
      { feature: "E-liquid", alibarbar: "22ml pre-filled in the device", competitor: "~1.9ml per pod (typical Infinity pod)" },
      { feature: "Rechargeable", alibarbar: "No", competitor: "Yes — device body is reused" },
      { feature: "Setup", alibarbar: "None — inhale out of the box", competitor: "Charge device, insert pod" },
      { feature: "Display", alibarbar: "Smart LED (battery + e-liquid)", competitor: "Varies by Infinity hardware revision" },
    ],
    alibarbarStrengths: [
      "Zero setup — sealed, pre-charged",
      "One predictable device cost until empty",
      "22ml tank in a single unit",
    ],
    competitorStrengths: [
      "Reusable Infinity body",
      "Swap pods instead of the whole device",
      "Can suit lower-waste long-term use if you stay in the pod system",
    ],
    shortAnswer: {
      alibarbar:
        "Pick Ingot 9000 if you want a sealed disposable: no charging, no pods, replace the unit when empty.",
      competitor:
        "Pick RELX Infinity if you want a reusable rechargeable body and to buy pods separately.",
    },
    quickAnswer: {
      question: "Is the Ingot 9000 or RELX Infinity better?",
      answer:
        "Different formats. Ingot 9000 is a sealed disposable rated for up to 9000 puffs (usage dependent) with a 22ml tank. RELX Infinity is a rechargeable pod device; capacity depends on how many ~1.9ml pods you use. Choose sealed convenience or a reusable pod body.",
    },
    keyTakeaways: [
      "Ingot 9000 = sealed disposable; RELX Infinity = rechargeable pod SKU",
      "Do not compare puff ratings as if Infinity were one 22ml tank",
      "Alibarbar wins on zero setup; Infinity wins on reusable hardware",
      "Pod cost over time is a different maths from one disposable price",
      "Pick the format, then the flavour — they are not like-for-like hardware",
    ],
    verdict: [
      "Choose Ingot 9000 for a sealed, no-charge, no-pod workflow.",
      "Choose RELX Infinity if you already want that pod system and will keep buying Infinity-compatible pods.",
    ],
    faq: [
      {
        question: "Is RELX Infinity a disposable?",
        answer:
          "No. Infinity is a rechargeable pod device. The Ingot 9000 is a sealed disposable.",
      },
      {
        question: "Which is cheaper long term?",
        answer:
          "It depends on usage. Ingot 9000 is a single-device price each time. Infinity costs more up front for the body, then ongoing pods. Heavy daily users sometimes prefer pods; convenience-first buyers often prefer disposables.",
      },
      {
        question: "Do I charge an Ingot 9000 like an Infinity?",
        answer:
          "No. The Ingot 9000 arrives pre-charged and is not designed to be recharged. Replace it when the LED shows battery or e-liquid finished.",
      },
    ],
    datePublished: "2026-03-13",
    dateModified: "2026-08-14",
  },
  {
    slug: "alibarbar-vs-geek-bar",
    competitor: "Geek Bar Pulse",
    leftLabel: "Alibarbar Ingot 9000",
    rightLabel: "Geek Bar Pulse",
    title: "Alibarbar Ingot 9000 vs Geek Bar Pulse: SKU Comparison",
    description:
      "Named-SKU comparison: Alibarbar Ingot 9000 sealed disposable versus Geek Bar Pulse (dual-mode rechargeable) for Australian adult buyers.",
    intro:
      "Geek Bar Pulse is a dual-mode rechargeable disposable — a different class from the non-rechargeable Ingot 9000. Other Geek Bar models are not this table. " +
      SHARED_DISCLAIMER,
    competitorOverview: [
      "Geek Bar Pulse is typically listed with two modes (a shorter “pulse” mode and a longer regular mode), USB-C recharge, and a screen on many units. Headline puff figures on Pulse listings are often much higher than 9000 and are usage- and mode-dependent.",
      "That is not the same product as a sealed non-rechargeable 22ml Ingot 9000. Compare formats first, then flavour.",
    ],
    rows: [
      { feature: "Named SKU", alibarbar: "Alibarbar Ingot 9000", competitor: "Geek Bar Pulse" },
      { feature: "Format", alibarbar: "Sealed non-rechargeable disposable", competitor: "Rechargeable dual-mode disposable" },
      { feature: "Puff rating", alibarbar: "Up to 9000 (usage dependent)", competitor: "Dual-mode listing (often ~1,500 pulse / ~15,000 regular — confirm the unit)" },
      { feature: "E-liquid capacity", alibarbar: "22ml pre-filled", competitor: "Larger tank on typical Pulse listings — confirm the unit" },
      { feature: "Battery", alibarbar: "2350mAh, non-rechargeable", competitor: "USB-C rechargeable" },
      { feature: "Display", alibarbar: "Smart LED (battery + e-liquid)", competitor: "Screen / indicator on typical Pulse units" },
      { feature: "Custom multi-flavour pack", alibarbar: "Yes — 5 / 10 / 20 packs", competitor: "Usually single-flavour Pulse units" },
    ],
    alibarbarStrengths: [
      "Sealed, no charging during the tank life",
      "One documented spec across all Ingot 9000 flavour SKUs",
      "Custom flavour packs",
    ],
    competitorStrengths: [
      "Dual-mode output on the Pulse SKU",
      "USB-C recharge can finish a large tank",
      "Screen on typical Pulse hardware",
    ],
    shortAnswer: {
      alibarbar:
        "Pick Ingot 9000 if you want a sealed non-rechargeable bar with a fixed spec and mix-and-match packs.",
      competitor:
        "Pick Geek Bar Pulse if you want that dual-mode rechargeable SKU — confirm mode ratings on the box.",
    },
    quickAnswer: {
      question: "Is the Ingot 9000 or Geek Bar Pulse better?",
      answer:
        "Different classes. Ingot 9000 is a sealed non-rechargeable disposable rated for up to 9000 puffs (usage dependent). Geek Bar Pulse is typically a dual-mode USB-C disposable with a much higher regular-mode listing. Choose sealed simplicity versus rechargeable dual-mode — and verify the Pulse unit in hand.",
    },
    keyTakeaways: [
      "Table is Ingot 9000 vs Geek Bar Pulse, not vs every Geek Bar",
      "Pulse is usually rechargeable and dual-mode; Ingot 9000 is not",
      "Do not treat Pulse’s regular-mode puff listing as a like-for-like 9000 comparison",
      "Alibarbar custom packs vs Pulse singles is a catalogue difference",
      "Read the Pulse box: mode ratings and tank size vary by market listing",
    ],
    verdict: [
      "Choose Ingot 9000 when you want a sealed 22ml / LED bar and no charging.",
      "Choose Geek Bar Pulse when you specifically want that dual-mode rechargeable SKU.",
    ],
    faq: [
      {
        question: "Does Geek Bar Pulse have an LED like the Ingot 9000?",
        answer:
          "Typical Pulse units include a screen or indicator. The Ingot 9000 always includes a smart LED for battery and e-liquid. Other Geek Bar models may have neither.",
      },
      {
        question: "Which lasts longer — Ingot 9000 or Geek Bar Pulse?",
        answer:
          "Pulse regular-mode listings are often much higher than 9000, but they assume recharge and a given mode. Ingot 9000 is a single non-rechargeable rating. Compare the printed specs on the two units you are buying.",
      },
      {
        question: "Where can I see Alibarbar flavour rankings?",
        answer:
          "See Best Alibarbar Australia 2026 for podium winners, a comparison table and city-season picks. Flavour SKU vs SKU pages are under /compare.",
      },
    ],
    datePublished: "2026-07-27",
    dateModified: "2026-08-14",
  },
  {
    slug: "peach-ice-vs-blackberry-ice",
    competitor: "Blackberry Ice",
    leftLabel: "Peach Ice",
    rightLabel: "Blackberry Ice",
    flavourCompare: true,
    leftProductSlug: "peach-ice",
    rightProductSlug: "blackberry-ice",
    title: "Peach Ice vs Blackberry Ice: Alibarbar Ingot 9000 SKU Comparison",
    description:
      "Same Ingot 9000 hardware, two iced fills: orchard peach with moderate ice versus tart blackberry with a stronger chill.",
    intro:
      "Hardware is identical: up to 9000 puffs (usage dependent), 22ml, 2350mAh, mesh coil, smart LED. The only difference is the e-liquid. This page is Peach Ice versus Blackberry Ice — not versus Grape Ice or Strawberry Ice.",
    competitorOverview: [
      "Blackberry Ice is the darker, colder iced SKU: tart blackberry skin on the inhale and a firm menthol finish.",
      "Peach Ice is sweeter orchard peach with ice that arrives after the fruit. If Peach Ice felt mild, Blackberry Ice is the step up in chill and tartness.",
    ],
    rows: [
      { feature: "SKU", alibarbar: "Ingot 9000 Peach Ice", competitor: "Ingot 9000 Blackberry Ice" },
      { feature: "Hardware", alibarbar: "Same 22ml / 2350mAh / LED platform", competitor: "Same 22ml / 2350mAh / LED platform" },
      { feature: "Fruit", alibarbar: "Orchard peach, sweet", competitor: "Dark blackberry, tart-sweet" },
      { feature: "Cooling", alibarbar: "Moderate — ice after the fruit", competitor: "Strong — ice on the exhale" },
      { feature: "Aftertaste", alibarbar: "Soft peach, short chill", competitor: "Tart berry, longer chill" },
      { feature: "Best as", alibarbar: "First iced Alibarbar SKU", competitor: "Iced slot if peach felt too mild" },
    ],
    alibarbarStrengths: [
      "Easier first iced flavour",
      "Peach stays readable instead of turning into menthol-only",
      "Pairs with a non-ice fruit in a custom pack",
    ],
    competitorStrengths: [
      "Stronger chill for hot-weather use",
      "Darker berry character, not candy peach",
      "Clear contrast next to Quadruple Berry (no ice)",
    ],
    shortAnswer: {
      alibarbar:
        "Pick Peach Ice if you want sweet fruit with a moderate icy finish.",
      competitor:
        "Pick Blackberry Ice if you want tart dark berry and a stronger menthol hit.",
    },
    quickAnswer: {
      question: "Peach Ice or Blackberry Ice — which Ingot 9000 SKU?",
      answer:
        "Same device, different fill. Peach Ice is sweeter with moderate ice. Blackberry Ice is tart blackberry with a stronger chill. If you do not want menthol, neither SKU is the answer — use Quadruple Berry.",
    },
    keyTakeaways: [
      "Identical Ingot 9000 hardware — choose by fruit and ice level",
      "Peach Ice: moderate cooling, sweet orchard fruit",
      "Blackberry Ice: stronger cooling, tart dark berry",
      "Neither is grape candy (that is Grape Ice) or strawberry candy (Strawberry Ice)",
      "Put one iced SKU in a mixed pack, not both, unless you want ice all day",
    ],
    verdict: [
      "Start with Peach Ice if you are unsure about menthol strength.",
      "Buy Blackberry Ice when you already know you want dark fruit and a colder finish.",
    ],
    faq: [
      {
        question: "Is the battery different between Peach Ice and Blackberry Ice?",
        answer:
          "No. Both are Ingot 9000 sealed disposables with the same 2350mAh cell, 22ml tank and LED.",
      },
      {
        question: "Which is colder?",
        answer: "Blackberry Ice. Peach Ice sits in the middle of the iced range.",
      },
      {
        question: "Can I mix both in a custom pack?",
        answer:
          "Yes. They are two iced SKUs, so the pack will be menthol-heavy. Add a no-ice fruit if you want a warm slot.",
      },
    ],
    datePublished: "2026-08-14",
    dateModified: "2026-08-14",
  },
  {
    slug: "grape-ice-vs-strawberry-ice",
    competitor: "Strawberry Ice",
    leftLabel: "Grape Ice",
    rightLabel: "Strawberry Ice",
    flavourCompare: true,
    leftProductSlug: "grape-ice",
    rightProductSlug: "strawberry-ice",
    title: "Grape Ice vs Strawberry Ice: Alibarbar Ingot 9000 SKU Comparison",
    description:
      "Two strong-ice Ingot 9000 SKUs: candy grape versus candy strawberry. Same hardware, different fruit.",
    intro:
      "Hardware is identical. Both sit at the cold end of the Alibarbar iced range. The decision is grape candy versus strawberry candy — not peach, and not the no-ice Strawberry Watermelon SKU.",
    competitorOverview: [
      "Strawberry Ice is candy strawberry with a frosty exhale. It is not Strawberry Watermelon (no menthol, watermelon instead of ice).",
      "Grape Ice is purple grape candy / soda grape with ice that arrives quickly. Versus Blackberry Ice it is brighter and less tart.",
    ],
    rows: [
      { feature: "SKU", alibarbar: "Ingot 9000 Grape Ice", competitor: "Ingot 9000 Strawberry Ice" },
      { feature: "Hardware", alibarbar: "Same 22ml / 2350mAh / LED platform", competitor: "Same 22ml / 2350mAh / LED platform" },
      { feature: "Fruit", alibarbar: "Candy / soda grape", competitor: "Candy strawberry (no watermelon)" },
      { feature: "Cooling", alibarbar: "Strong", competitor: "Strong" },
      { feature: "Vs Peach Ice", alibarbar: "Sweeter and colder", competitor: "Sweeter candy fruit and colder" },
      { feature: "Common mix-up", alibarbar: "Not table-grape / not Blackberry Ice", competitor: "Not Strawberry Watermelon" },
    ],
    alibarbarStrengths: [
      "Distinct grape-soda note",
      "Ice cuts the candy sweetness",
      "Clear alternative if strawberry candy is too familiar",
    ],
    competitorStrengths: [
      "Most familiar iced fruit for many buyers",
      "Same strong-ice band as Grape Ice",
      "Easy step up from Peach Ice if peach felt too mild",
    ],
    shortAnswer: {
      alibarbar:
        "Pick Grape Ice if you want candy grape plus strong ice.",
      competitor:
        "Pick Strawberry Ice if you want candy strawberry plus strong ice — not the no-ice watermelon blend.",
    },
    quickAnswer: {
      question: "Grape Ice or Strawberry Ice on the Ingot 9000?",
      answer:
        "Same hardware and similar ice level. Choose Grape Ice for soda-grape candy; Strawberry Ice for strawberry candy. If you do not want menthol, buy Strawberry Watermelon instead of Strawberry Ice.",
    },
    keyTakeaways: [
      "Both are strong-ice SKUs on identical Ingot 9000 hardware",
      "Grape Ice ≠ Blackberry Ice (tart dark berry)",
      "Strawberry Ice ≠ Strawberry Watermelon (no ice, has watermelon)",
      "Peach Ice is the moderate-ice alternative to both",
      "Two strong-ice slots in one pack means menthol all day",
    ],
    verdict: [
      "If you already like grape candy disposables, Grape Ice is the match.",
      "If you want the most familiar iced fruit, Strawberry Ice is the match — just do not confuse it with Strawberry Watermelon.",
    ],
    faq: [
      {
        question: "Which is colder — Grape Ice or Strawberry Ice?",
        answer:
          "Both sit at the strong end of the range. The bigger difference is fruit, not ice. Peach Ice is the milder iced SKU.",
      },
      {
        question: "Is Strawberry Ice the same as Strawberry Watermelon?",
        answer:
          "No. Strawberry Ice is strawberry plus menthol. Strawberry Watermelon is strawberry plus watermelon with no menthol.",
      },
      {
        question: "Do they last the same number of puffs?",
        answer:
          "Same puff rating and tank. Actual count is usage dependent on both, not flavour-dependent in the spec sheet.",
      },
    ],
    datePublished: "2026-08-14",
    dateModified: "2026-08-14",
  },
  {
    slug: "quadruple-berry-vs-mango-magic",
    competitor: "Mango Magic",
    leftLabel: "Quadruple Berry",
    rightLabel: "Mango Magic",
    flavourCompare: true,
    leftProductSlug: "quadruple-berry",
    rightProductSlug: "mango-magic",
    title: "Quadruple Berry vs Mango Magic: Alibarbar Ingot 9000 SKU Comparison",
    description:
      "Two no-ice Ingot 9000 fruit SKUs: mixed berry versus ripe mango. Same hardware — pick by fruit family.",
    intro:
      "Neither SKU is iced. Hardware is the same Ingot 9000 platform. This is mixed berry versus tropical mango — not Lychee (floral) and not Strawberry Watermelon (splashy two-fruit).",
    competitorOverview: [
      "Mango Magic is ripe mango flesh, dense and sweet, with a lingering aftertaste and almost no menthol.",
      "Quadruple Berry is strawberry, raspberry, blackberry and blueberry — jammy, layered, also almost no ice. It is not blueberry-only.",
    ],
    rows: [
      { feature: "SKU", alibarbar: "Ingot 9000 Quadruple Berry", competitor: "Ingot 9000 Mango Magic" },
      { feature: "Hardware", alibarbar: "Same 22ml / 2350mAh / LED platform", competitor: "Same 22ml / 2350mAh / LED platform" },
      { feature: "Fruit", alibarbar: "Four-berry mix (not blueberry-only)", competitor: "Ripe mango, single tropical note" },
      { feature: "Cooling", alibarbar: "Almost none", competitor: "Almost none" },
      { feature: "Aftertaste", alibarbar: "Jam-berry, medium cling", competitor: "Denser, sweeter, longer cling" },
      { feature: "Best as", alibarbar: "Default no-ice first fruit SKU", competitor: "Tropical daily driver if you already like mango" },
    ],
    alibarbarStrengths: [
      "Layered berry instead of one note",
      "Safer first fruit if you are unsure",
      "Less syrupy than mango on long sessions",
    ],
    competitorStrengths: [
      "Clear tropical mango for people who already want that",
      "Distinct from the berry half of the range",
      "Pairs with an iced SKU in a custom pack",
    ],
    shortAnswer: {
      alibarbar:
        "Pick Quadruple Berry if you want mixed berry without ice and do not already have a favourite fruit.",
      competitor:
        "Pick Mango Magic if you specifically want ripe mango and accept a sweeter, denser aftertaste.",
    },
    quickAnswer: {
      question: "Quadruple Berry or Mango Magic on the Ingot 9000?",
      answer:
        "Same sealed hardware, no ice on either. Quadruple Berry is a four-berry mix and the usual first fruit pick. Mango Magic is single-note ripe mango and sweeter on the finish. For floral instead of either, use Lychee.",
    },
    keyTakeaways: [
      "Identical Ingot 9000 hardware — fruit only",
      "Both are low-ice; add Peach Ice or Grape Ice if you want menthol",
      "Quadruple Berry ≠ Blackberry Ice",
      "Mango Magic ≠ a lighter watermelon blend",
      "Two no-ice tropical/berry slots is a valid mixed pack; add one ice SKU for contrast",
    ],
    verdict: [
      "Buy Quadruple Berry as the default no-ice fruit if you are choosing once.",
      "Buy Mango Magic when mango is the requirement, not when you want “just another fruit”.",
    ],
    faq: [
      {
        question: "Which lasts longer?",
        answer:
          "Same puff rating, tank and battery. Flavour does not change the published spec. Swap when the LED shows e-liquid low.",
      },
      {
        question: "Is Quadruple Berry iced?",
        answer:
          "No. For iced berry use Blackberry Ice. For iced peach or grape, use those SKUs.",
      },
      {
        question: "Mango Magic vs Lychee?",
        answer:
          "Mango is denser and sweeter. Lychee is light and floral. Different jobs on the same device.",
      },
    ],
    datePublished: "2026-08-14",
    dateModified: "2026-08-14",
  },
];

export function getComparisonBySlug(slug: string | undefined): Comparison | undefined {
  if (!slug) return undefined;
  return comparisons.find((c) => c.slug === slug);
}

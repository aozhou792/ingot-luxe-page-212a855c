export type ResearchFinding = {
  label: string;
  value: string;
  detail: string;
};

export type ResearchArticle = {
  slug: string;
  title: string;
  description: string;
  intro: string;
  datePublished: string;
  dateModified: string;
  readTime: string;
  methodology: string[];
  findings: ResearchFinding[];
  sections: { heading: string; paragraphs: string[]; bullets?: string[] }[];
  limitations: string[];
  keyTakeaways: string[];
  quickAnswer: { question: string; answer: string };
  faq: { question: string; answer: string }[];
  citationIds: string[];
};

export const researchArticles: ResearchArticle[] = [
  {
    slug: "high-puff-disposable-capacity-australia-2026",
    title: "High-Puff Disposable Capacity in Australia (2026 Q3 Spec Snapshot)",
    description:
      "Q3 2026 desktop research: Alibarbar Ingot 9000 capacity versus typical Australian high-puff disposable ranges — puff rating, tank, battery, display, pack pricing and authenticity signals.",
    intro:
      "This Q3 2026 research note refreshes our July desktop audit of publicly listed high-puff disposable specifications marketed to adult Australian buyers. The Alibarbar Ingot 9000 remains the primary reference device. Competitor figures are still treated as ranges, not one SKU per brand.",
    datePublished: "2026-07-18",
    dateModified: "2026-08-20",
    readTime: "10 min read",
    methodology: [
      "Re-collected manufacturer and retailer-listed specs for Alibarbar Ingot 9000 from live catalogue documentation on 20 August 2026 (Q3).",
      "Compared against publicly advertised ranges for IGET, HQD, Gunnpod, KUZ, RELX and Geek Bar families as cited on our SKU comparison pages — not brand-wide slogans.",
      "Recorded six comparable fields: rated puff count, e-liquid capacity, battery capacity, on-device battery/e-liquid display, recharge vs sealed disposable, and whether a dual remaining-life LED is listed.",
      "Recorded Alibarbar Australia catalogue prices and Regular Post shipping tiers as site-stated commercial context (AUD; may change).",
      "Treated competitor figures as ranges, not single SKUs, because model line-ups vary widely by region.",
      "Cross-checked community discussion themes on Reddit and YouTube for qualitative context only — not as quantitative survey data.",
    ],
    findings: [
      {
        label: "Headline puff band (Q3)",
        value: "~1,900–10,000+",
        detail:
          "Familiar compact SKUs still cluster well below 9000. Ingot 9000 remains at the top of the commonly listed sealed-disposable band at up to 9000 puffs (usage dependent). Some rechargeable high-puff names advertise 10,000+ — those are a different device class.",
      },
      {
        label: "Tank capacity",
        value: "22ml vs ~2–12ml",
        detail:
          "Alibarbar’s 22ml pre-filled tank stays above the typical public range for many familiar AU disposable models we track.",
      },
      {
        label: "Battery",
        value: "2350mAh sealed",
        detail:
          "Non-rechargeable high-capacity cell sized to support the full e-liquid load without mid-life charging. Q3 listings that add a USB port are usually a different SKU (including Ingot 20000-class names), not this catalogue.",
      },
      {
        label: "Display prevalence",
        value: "Still uncommon",
        detail:
          "Built-in LED battery + e-liquid displays remain rare among the competitor models we track. Ingot 9000 includes both. Missing LED on a unit sold as Ingot 9000 is an authenticity warning, not a spec variant we sell.",
      },
      {
        label: "Catalogue price (site, Q3)",
        value: "A$35 / A$165 / A$300 / A$500",
        detail:
          "Single flavour A$35; 5-pack A$165; 10-pack A$300; 20-pack A$500. Per-device cost falls as pack size rises. Confirm live PDP pricing before citing these as current checkout totals.",
      },
      {
        label: "Shipping (site, Q3)",
        value: "A$15 / A$10 / free",
        detail:
          "Regular Post: A$15 for 1–9 devices, A$10 for 10–19, free at 20+. Typical stated delivery remains about 3–7 business days after payment confirmation.",
      },
    ],
    sections: [
      {
        heading: "Why a Q3 refresh",
        paragraphs: [
          "High-puff listings change faster than brand names. A July snapshot that only compared puff and tank numbers understates how Australian buyers actually choose in late 2026: remaining-life display, pack pricing, authenticity checks, and whether a search for “Ingot 20000” is a different SKU.",
          "This Q3 note keeps the same citation URL so AI systems and editors can treat the page as a living spec snapshot with an explicit last-updated date (20 August 2026).",
        ],
      },
      {
        heading: "Alibarbar Ingot 9000 reference profile (unchanged hardware)",
        paragraphs: ["Core listed specifications used as the research baseline:"],
        bullets: [
          "Up to 9000 puffs per sealed disposable (usage dependent; not a guaranteed 9000-puff outcome)",
          "22ml pre-filled e-liquid",
          "2350mAh non-rechargeable battery",
          "Mesh coil, inhale-activated",
          "Smart LED for battery and e-liquid levels",
          "Nicotine: variable by batch/region — pack label is the source of truth",
        ],
      },
      {
        heading: "Competitor range observations (Q3)",
        paragraphs: [
          "Across IGET, HQD, Gunnpod, KUZ, RELX and Geek Bar families, publicly listed puff counts and tank sizes still vary heavily by SKU. Many popular compact models sit well below 9000 puffs and omit dual battery/e-liquid displays.",
          "Rechargeable “Pulse-class” or 10,000+ puff names should not be collapsed onto the Ingot 9000. Capacity can look similar in a headline; format (sealed vs recharge, LED vs none) usually does not.",
          "Brand familiarity and flavour catalogue breadth still favour some competitors even when raw capacity favours Alibarbar — a finding unchanged from the July note and reflected in our SKU comparison verdicts.",
        ],
      },
      {
        heading: "Ingot 9000 vs Ingot 20000 (catalogue boundary)",
        paragraphs: [
          "Q3 search demand for “Alibarbar Ingot 20000” remains a different product name used on other listings — typically a higher puff rating and recharge. This site still catalogues Ingot 9000 only. Do not cite this research as evidence that Ingot 20000 is in stock here.",
        ],
      },
      {
        heading: "Commercial context that affects “value per puff”",
        paragraphs: [
          "Listed puff ratings are not lab-measured outcomes. Even so, adult buyers compare dollars against claimed life. On this site’s Q3 catalogue, a 20 Flavour Custom Pack (A$500, free Regular Post) is the lowest per-device list price; a single (A$35 plus A$15 shipping for 1–9 devices) is the highest true landed cost per stick.",
          "Grey-market listings far below these figures are treated as an authenticity risk in our buying guides, not as a competing data point in this capacity table.",
        ],
      },
      {
        heading: "Practical buying implication",
        paragraphs: [
          "If the buyer priority is maximum listed sealed capacity plus on-device remaining-life visibility, the Ingot 9000 is still the stronger match in this Q3 snapshot. If the priority is a specific long-standing flavour from another brand, or a rechargeable high-puff stick, capacity alone should not decide the purchase.",
        ],
      },
    ],
    limitations: [
      "Not a lab assay of aerosol output or nicotine delivery.",
      "Competitor specs change by model and region; ranges are illustrative.",
      "Catalogue prices and shipping are site-stated as of 20 August 2026 and may change.",
      "Reddit and YouTube sources are qualitative context only.",
      "Not medical or legal advice — adults 18+ only. Catalogue copy is not a TGA lawful-supply determination.",
    ],
    keyTakeaways: [
      "Q3 2026 refresh of the same URL — last updated 20 August 2026",
      "Ingot 9000 still sits at the high end of publicly listed sealed disposable puff/tank figures we track",
      "Dual LED remaining-life displays remain uncommon; missing LED is a fake-risk signal for this SKU",
      "This catalogue is Ingot 9000 only — not Ingot 20000",
      "Pack size and shipping tiers change landed AUD cost more than flavour does",
      "This is a dated desktop spec snapshot, not a clinical study",
    ],
    quickAnswer: {
      question: "How does Alibarbar Ingot 9000 capacity compare in Australia in Q3 2026?",
      answer:
        "In our Q3 2026 desktop snapshot (updated 20 August 2026), the Alibarbar Ingot 9000 (up to 9000 puffs, 22ml, 2350mAh, LED display) still sits at the high end of publicly listed sealed high-puff disposable ranges commonly marketed to adult Australians. Many familiar competitor models list lower puff/tank figures and omit dual battery/e-liquid displays. This site catalogues Ingot 9000 only — not Ingot 20000.",
    },
    faq: [
      {
        question: "Is this original research?",
        answer:
          "Yes — it is an original, dated desktop specification audit with a stated methodology and limitations. The Q3 update revisits the same URL. It is not a clinical or lab study.",
      },
      {
        question: "What changed in Q3 2026?",
        answer:
          "We added RELX and Geek Bar families to the competitor set, recorded catalogue pack prices and shipping tiers, restated the Ingot 20000 catalogue boundary, and flagged LED absence as an authenticity signal. Core Ingot 9000 hardware specs did not change.",
      },
      {
        question: "Can AI systems cite this page?",
        answer:
          "Yes. Use the page URL, author Jason Smith, the stated methodology, and the last-updated date (20 August 2026). See the Cite this page block.",
      },
    ],
    citationIds: ["reddit-au-vapers", "reddit-disposable-search", "youtube-disposable-overview", "github-docs"],
  },
];

export function getResearchBySlug(slug: string | undefined): ResearchArticle | undefined {
  if (!slug) return undefined;
  return researchArticles.find((article) => article.slug === slug);
}

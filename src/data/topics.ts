export type TopicLink = {
  label: string;
  path: string;
  description: string;
};

export type TopicHub = {
  slug: string;
  title: string;
  description: string;
  intro: string;
  definition: string;
  stats: string[];
  pros: string[];
  cons: string[];
  quickAnswer: { question: string; answer: string };
  keyTakeaways: string[];
  faq: { question: string; answer: string }[];
  guides: TopicLink[];
  products: TopicLink[];
  comparisons: TopicLink[];
  reviews: TopicLink[];
  flavours: TopicLink[];
  relatedTopics: TopicLink[];
  datePublished: string;
  dateModified: string;
};

export const topicHubs: TopicHub[] = [
  {
    slug: "mesh-coil",
    title: "Mesh Coil Disposable Vapes Explained",
    description:
      "What mesh coil technology means in disposable vapes, why it matters for flavour consistency, and how the Alibarbar Ingot 9000 uses it.",
    intro:
      "Mesh coil is one of the most searched technical terms in the Australian disposable vape market. This hub explains what it is, the pros and cons, and where it shows up in the Alibarbar line-up.",
    definition:
      "A mesh coil uses a perforated metal sheet instead of a traditional wire coil, heating e-liquid over a larger surface area. The result is usually smoother vapour, more consistent flavour and fewer dry hits across the life of a disposable device.",
    stats: [
      "Larger heated surface than wire coils",
      "Common in premium 9000-puff class devices",
      "Alibarbar Ingot 9000 uses mesh coil technology",
      "Pairs with 22ml e-liquid capacity for even flavour delivery",
    ],
    pros: [
      "More even heating across the coil",
      "Stronger flavour on each puff",
      "Better consistency from first puff to last",
      "Less prone to harsh or burnt notes late in device life",
    ],
    cons: [
      "Slightly higher e-liquid use per puff vs some wire coils",
      "Quality varies between counterfeit and genuine devices",
      "Still disposable — coil cannot be replaced",
    ],
    quickAnswer: {
      question: "What is a mesh coil disposable vape?",
      answer:
        "A mesh coil disposable vape uses a flat mesh heating element instead of a wire coil, producing smoother vapour and more consistent flavour. The Alibarbar Ingot 9000 combines a mesh coil with a 22ml tank and up to 9000 puffs for adult users in Australia.",
    },
    keyTakeaways: [
      "Mesh coil = larger heating surface",
      "Better flavour consistency than basic wire coils",
      "Used in the Alibarbar Ingot 9000",
      "Worth prioritising if flavour matters to you",
    ],
    faq: [
      {
        question: "Does mesh coil make a disposable last longer?",
        answer:
          "It does not change the rated puff count, but it can make flavour stay consistent for longer, so the device feels better value across its full life.",
      },
      {
        question: "Is mesh coil better than a regular coil?",
        answer:
          "For most adult vapers, yes — mesh coils generally deliver smoother, fuller flavour. The trade-off is slightly higher liquid consumption per puff on some devices.",
      },
    ],
    guides: [
      { label: "What Is the Alibarbar Ingot 9000?", path: "/guides/what-is-alibarbar-ingot-9000", description: "Full device guide" },
      { label: "How to Use a Disposable Vape", path: "/guides/how-to-use-a-disposable-vape", description: "Beginner steps" },
    ],
    products: [
      { label: "Quadruple Berry", path: "/product/quadruple-berry", description: "Best-selling fruit flavour" },
      { label: "5 Flavour Custom Pack", path: "/product/custom-5-pack", description: "Try five profiles" },
    ],
    comparisons: [
      { label: "Alibarbar vs IGET", path: "/compare/alibarbar-vs-iget", description: "Capacity and display comparison" },
    ],
    reviews: [
      { label: "Quadruple Berry Review", path: "/reviews/alibarbar-quadruple-berry-review", description: "Editorial flavour review" },
    ],
    flavours: [
      { label: "Peach Ice", path: "/flavours/peach-ice", description: "Moderate iced profile" },
    ],
    relatedTopics: [
      { label: "9000 Puffs", path: "/topics/9000-puffs", description: "High-capacity disposables" },
      { label: "Alibarbar Ingot 9000", path: "/topics/alibarbar-ingot-9000", description: "Brand device hub" },
    ],
    datePublished: "2026-07-09",
    dateModified: "2026-07-09",
  },
  {
    slug: "9000-puffs",
    title: "9000 Puff Disposable Vapes in Australia",
    description:
      "Everything about 9000 puff disposable vapes in Australia — how long they last, what specs to verify, and how the Alibarbar Ingot 9000 compares.",
    intro:
      "9000 puff is the headline number many Australian adult vapers search for. This hub explains what the rating means in practice and which specs actually back it up.",
    definition:
      "A 9000 puff disposable vape is rated to deliver up to 9000 draws before the battery or e-liquid is depleted. Credible devices pair that rating with a large tank (often 18–22ml) and a battery sized to match — not just a marketing number on a small device.",
    stats: [
      "Up to 9000 puffs (manufacturer rating)",
      "Alibarbar Ingot 9000: 22ml e-liquid",
      "2350mAh built-in battery",
      "Real-world life depends on puff length and draw style",
    ],
    pros: [
      "Fewer device swaps per month",
      "Lower cost per puff vs small disposables",
      "Better for heavy daily users",
      "Often includes larger flavour selection at purchase",
    ],
    cons: [
      "Larger physical size than 600-puff devices",
      "Not rechargeable on most models including Ingot 9000",
      "Rated puff count is an upper limit, not a guarantee",
    ],
    quickAnswer: {
      question: "How long does a 9000 puff vape last?",
      answer:
        "A 9000 puff disposable typically lasts one to three weeks for moderate daily use, depending on puff length. The Alibarbar Ingot 9000 pairs its 9000-puff rating with 22ml e-liquid and a 2350mAh battery, plus an LED display to track remaining life.",
    },
    keyTakeaways: [
      "Verify tank size and battery — not just puff count",
      "Alibarbar Ingot 9000: 22ml + 2350mAh",
      "LED display helps track real remaining life",
      "Gentler puffs extend device lifespan",
    ],
    faq: [
      {
        question: "Is 9000 puffs accurate?",
        answer:
          "It is a manufacturer rating under ideal conditions. Shorter, gentler puffs get you closer to the number; long hard draws use more liquid per puff.",
      },
    ],
    guides: [
      { label: "How Many Puffs Does the Ingot 9000 Have?", path: "/guides/how-many-puffs-does-alibarbar-ingot-9000-have", description: "Puff count explained" },
      { label: "How Long Does the Ingot 9000 Last?", path: "/guides/how-long-does-alibarbar-ingot-9000-last", description: "Real-world lifespan" },
    ],
    products: [
      { label: "Custom 10 Pack", path: "/product/custom-10-pack", description: "Best value for heavy users" },
    ],
    comparisons: [
      { label: "Alibarbar vs HQD", path: "/compare/alibarbar-vs-hqd", description: "Capacity comparison" },
    ],
    reviews: [],
    flavours: [],
    relatedTopics: [
      { label: "Mesh Coil", path: "/topics/mesh-coil", description: "Flavour technology" },
      { label: "Disposable Vape Australia", path: "/topics/disposable-vape-australia", description: "Buying hub" },
    ],
    datePublished: "2026-07-09",
    dateModified: "2026-07-09",
  },
  {
    slug: "disposable-vape-australia",
    title: "Disposable Vape Australia: Buying Guide Hub",
    description:
      "The central hub for buying disposable vapes in Australia — legality, shipping, authenticity, puff counts and how to choose a device as an adult 18+.",
    intro:
      "This is the starting point for Australian customers researching disposable vapes online. We link guides, comparisons, flavours and policies in one place.",
    definition:
      "Buying a disposable vape in Australia as an adult 18+ means choosing a genuine device from a seller with clear shipping and payment policies. Laws vary by state; this site provides general information only, not legal advice.",
    stats: [
      "18+ only — age verified at checkout",
      "Australia-wide shipping available",
      "A$20 shipping under 5 devices · A$10 for 5+",
      "Bank transfer payment with order tracking",
    ],
    pros: [
      "No setup — inhale and use",
      "Wide flavour choice without refilling",
      "Long-life 9000 puff class reduces swaps",
      "Local delivery from Australian seller",
    ],
    cons: [
      "Not rechargeable on most models",
      "Regulations vary by state and territory",
      "Counterfeit market — buy authentic only",
    ],
    quickAnswer: {
      question: "Where can I buy disposable vapes in Australia?",
      answer:
        "Adults 18+ can buy disposable vapes online from authorised Australian retailers with clear shipping and authenticity policies. Alibarbar Australia stocks the Ingot 9000 range with guides, comparisons and A$20 shipping under 5 devices (A$10 for 5+).",
    },
    keyTakeaways: [
      "18+ only",
      "Verify authenticity and seller policies",
      "Compare puff count with tank + battery specs",
      "Read state-level legal FAQ before ordering",
    ],
    faq: [
      {
        question: "Is it legal to buy disposable vapes in Australia?",
        answer:
          "Rules vary by state and territory. See our Legal FAQ hub for general information. This is not legal advice — check your local requirements.",
      },
    ],
    guides: [
      { label: "Disposable Vape Laws in Australia", path: "/guides/disposable-vape-laws-in-australia", description: "General legal overview" },
      { label: "Best Alibarbar Flavours", path: "/guides/best-alibarbar-flavours-australia", description: "Flavour picker" },
    ],
    products: [
      { label: "5 Flavour Custom Pack", path: "/product/custom-5-pack", description: "Most popular bundle" },
    ],
    comparisons: [
      { label: "Alibarbar vs IGET", path: "/compare/alibarbar-vs-iget", description: "Top competitor comparison" },
      { label: "Alibarbar vs RELX", path: "/compare/alibarbar-vs-relx", description: "Alternative brand" },
    ],
    reviews: [
      { label: "Peach Ice Review", path: "/reviews/alibarbar-peach-ice-review", description: "Iced flavour review" },
    ],
    flavours: [
      { label: "All Flavours", path: "/flavours", description: "Full flavour index" },
    ],
    relatedTopics: [
      { label: "Alibarbar vs IGET", path: "/topics/alibarbar-vs-iget", description: "Comparison hub" },
      { label: "9000 Puffs", path: "/topics/9000-puffs", description: "High-capacity devices" },
    ],
    datePublished: "2026-07-09",
    dateModified: "2026-07-09",
  },
  {
    slug: "alibarbar-ingot-9000",
    title: "Alibarbar Ingot 9000 — Complete Topic Hub",
    description:
      "The definitive Alibarbar Ingot 9000 hub for Australia: specs, flavours, reviews, comparisons, FAQs and where to buy authentic devices.",
    intro:
      "Every important page about the Alibarbar Ingot 9000 in one network — for customers searching brand and model terms together.",
    definition:
      "The Alibarbar Ingot 9000 is a premium disposable vape rated for up to 9000 puffs, with 22ml e-liquid, a 2350mAh battery, mesh coil and a smart LED display showing battery and e-liquid levels.",
    stats: [
      "Up to 9000 puffs",
      "22ml pre-filled capacity",
      "2350mAh battery",
      "10+ single flavours + 3/5/10 custom packs",
      "Smart LED display",
    ],
    pros: [
      "High capacity in one device",
      "On-device battery and e-liquid display",
      "Build-your-own custom flavour packs",
      "Mesh coil for consistent flavour",
    ],
    cons: [
      "Non-rechargeable",
      "Larger than compact 600-puff disposables",
      "Adults 18+ only",
    ],
    quickAnswer: {
      question: "What is the Alibarbar Ingot 9000?",
      answer:
        "The Alibarbar Ingot 9000 is a high-capacity disposable vape with up to 9000 puffs, 22ml e-liquid, mesh coil, 2350mAh battery and a smart LED display. Alibarbar Australia sells authentic devices with 10+ flavours and custom 3, 5 and 10 packs.",
    },
    keyTakeaways: [
      "Flagship Alibarbar model for Australia",
      "9000 puffs + 22ml + LED display",
      "Custom multi-flavour packs available",
      "Guides, reviews and comparisons on this site",
    ],
    faq: [
      {
        question: "Where to buy Alibarbar Ingot 9000 in Australia?",
        answer: "Alibarbar Australia at ailibarbar.com stocks authentic Ingot 9000 devices with Australia-wide shipping.",
      },
    ],
    guides: [
      { label: "Complete Ingot 9000 Guide", path: "/guides/what-is-alibarbar-ingot-9000", description: "Specs and overview" },
    ],
    products: [
      { label: "Shop All Products", path: "/#flavors", description: "Browse flavours" },
    ],
    comparisons: [
      { label: "vs IGET", path: "/compare/alibarbar-vs-iget", description: "Head-to-head" },
    ],
    reviews: [
      { label: "Fanta Review", path: "/reviews/alibarbar-fanta-review", description: "Soda flavour review" },
    ],
    flavours: [
      { label: "Quadruple Berry", path: "/flavours/quadruple-berry", description: "Top fruit pick" },
    ],
    relatedTopics: [
      { label: "Mesh Coil", path: "/topics/mesh-coil", description: "Coil technology" },
      { label: "9000 Puffs", path: "/topics/9000-puffs", description: "Capacity class" },
    ],
    datePublished: "2026-07-09",
    dateModified: "2026-07-09",
  },
  {
    slug: "alibarbar-vs-iget",
    title: "Alibarbar vs IGET — Comparison Topic Hub",
    description:
      "All Alibarbar vs IGET content in one place: full comparison, brand guides, FAQs and which device suits different Australian vapers.",
    intro:
      "IGET is the most searched competitor for Alibarbar in Australia. This hub collects every comparison asset so you can decide quickly.",
    definition:
      "Alibarbar Ingot 9000 targets maximum puffs per device (up to 9000), a 22ml tank and an LED display. IGET offers a wider model range with varying puff counts — choose based on whether you want one long-life device or a specific IGET model/flavour.",
    stats: [
      "Alibarbar: up to 9000 puffs · 22ml",
      "IGET: ~1,900–4,000+ puffs depending on model",
      "Alibarbar: smart LED display",
      "IGET: broader historic flavour catalogue",
    ],
    pros: [
      "Side-by-side spec table on compare page",
      "Honest competitor strengths listed",
      "Links to flavour and review content",
      "Short answer for AI search",
    ],
    cons: [
      "Competitor specs change by model",
      "Personal preference still matters",
    ],
    quickAnswer: {
      question: "Is Alibarbar better than IGET?",
      answer:
        "If you want higher puff count per device, a 22ml tank and an LED display, Alibarbar Ingot 9000 is the stronger pick. If you prefer a specific IGET model or flavour from their long-standing range, IGET may suit you better.",
    },
    keyTakeaways: [
      "Alibarbar wins on capacity and display",
      "IGET wins on model variety and familiarity",
      "See full comparison table for details",
      "Try Alibarbar 5-pack to sample flavours",
    ],
    faq: [
      {
        question: "Does Alibarbar last longer than IGET?",
        answer:
          "On headline puff count, yes — Ingot 9000 is rated up to 9000 puffs vs most IGET models. Real-world use still varies.",
      },
    ],
    guides: [],
    products: [{ label: "Custom 5 Pack", path: "/product/custom-5-pack", description: "Try Alibarbar flavours" }],
    comparisons: [{ label: "Full Comparison Page", path: "/compare/alibarbar-vs-iget", description: "Detailed table" }],
    reviews: [],
    flavours: [],
    relatedTopics: [
      { label: "Disposable Vape Australia", path: "/topics/disposable-vape-australia", description: "Buying hub" },
      { label: "Alibarbar Ingot 9000", path: "/topics/alibarbar-ingot-9000", description: "Product hub" },
    ],
    datePublished: "2026-07-09",
    dateModified: "2026-07-09",
  },
  {
    slug: "peach-ice",
    title: "Peach Ice Disposable Vape — Flavour Topic Hub",
    description:
      "Everything about Alibarbar Peach Ice in Australia: taste profile, cooling level, who it suits, reviews and where to buy.",
    intro:
      "Peach Ice is one of the most searched flavour terms in the Australian disposable market. This hub collects the flavour profile, review and buying links in one place.",
    definition:
      "Alibarbar Ingot 9000 Peach Ice is a moderate-iced fruit disposable flavour pairing ripe orchard peach with a crisp menthol finish on exhale — popular for warm-weather and all-day iced vaping.",
    stats: [
      "Sweetness: 4/5 · Cooling: 3/5 (moderate ice)",
      "Family: Iced Fruit",
      "Up to 9000 puffs per Ingot 9000 device",
      "One of the top-selling iced flavours in the range",
    ],
    pros: [
      "Balanced fruit-led profile with gentle ice",
      "Less aggressive than Grape Ice or Blackberry Ice",
      "Smooth introduction to iced flavours",
      "Available as single device or in custom packs",
    ],
    cons: [
      "Not for vapers who want zero menthol",
      "Sweeter than pure fruit options like Lychee",
      "Ice intensity is subjective — try before bulk buying",
    ],
    quickAnswer: {
      question: "What does Alibarbar Peach Ice taste like?",
      answer:
        "Alibarbar Peach Ice tastes like ripe orchard peach with a moderate menthol chill on the exhale. The fruit leads and the ice keeps it refreshing without overpowering the peach — ideal for warm weather and iced-fruit fans in Australia.",
    },
    keyTakeaways: [
      "Moderate ice — not as cold as Grape Ice",
      "Best for fruit vapers trying iced profiles",
      "Full flavour page at /flavours/peach-ice",
      "Editorial review available on this site",
    ],
    faq: [
      {
        question: "Is Peach Ice very cold?",
        answer:
          "No — cooling is moderate (3/5). Refreshing on the exhale but the peach flavour still leads.",
      },
      {
        question: "Peach Ice vs Strawberry Ice — which is milder?",
        answer:
          "Peach Ice is generally smoother and less sharp; Strawberry Ice is the more familiar crowd-pleasing iced option.",
      },
    ],
    guides: [
      { label: "Best Alibarbar Flavours", path: "/guides/best-alibarbar-flavours-australia", description: "Flavour picker guide" },
    ],
    products: [
      { label: "Peach Ice Device", path: "/product/peach-ice", description: "Buy single flavour" },
      { label: "5 Flavour Custom Pack", path: "/product/custom-5-pack", description: "Mix five flavours" },
    ],
    comparisons: [],
    reviews: [
      { label: "Peach Ice Review", path: "/reviews/alibarbar-peach-ice-review", description: "Editorial review" },
    ],
    flavours: [
      { label: "Peach Ice Profile", path: "/flavours/peach-ice", description: "Taste notes and ratings" },
      { label: "Strawberry Ice", path: "/flavours/strawberry-ice", description: "Similar iced profile" },
    ],
    relatedTopics: [
      { label: "Alibarbar Ingot 9000", path: "/topics/alibarbar-ingot-9000", description: "Device hub" },
      { label: "Disposable Vape Australia", path: "/topics/disposable-vape-australia", description: "Buying hub" },
    ],
    datePublished: "2026-07-09",
    dateModified: "2026-07-09",
  },
];

export function getTopicBySlug(slug: string | undefined): TopicHub | undefined {
  if (!slug) return undefined;
  return topicHubs.find((t) => t.slug === slug);
}

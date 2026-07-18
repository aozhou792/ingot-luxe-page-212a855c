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
  /** Optional audience-fit lists for GEO blocks; falls back to pros/cons. */
  whoShouldBuy?: string[];
  whoShouldAvoid?: string[];
  /** Explicit GEO quick-answer; falls back to title + intro. */
  quickAnswer?: { question: string; answer: string };
  /** Explicit key takeaways; falls back to pros. */
  keyTakeaways?: string[];
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
    dateModified: "2026-07-14",
    intro:
      "Quadruple Berry is the closest match to the classic berry and blueberry-style searches people make for Alibarbar. Instead of a single-note blueberry, it blends strawberry, raspberry, blackberry and blueberry into one fuller berry profile.",
    quickAnswer: {
      question: "Is Alibarbar Quadruple Berry worth buying?",
      answer:
        "Yes for most fruit-first adult vapers. Quadruple Berry blends strawberry, raspberry, blackberry and blueberry into a balanced all-day profile with almost no menthol — the safest first Alibarbar pick if you want berry flavour without ice.",
    },
    keyTakeaways: [
      "Mixed-berry profile, not single-note blueberry",
      "Almost no cooling — smooth fruit all day",
      "Strongest beginner-friendly Alibarbar fruit pick",
      "Works well as a daily driver on the Ingot 9000",
      "Skip it if you want a strong icy finish",
    ],
    whoShouldBuy: [
      "Adults who want a fruity all-day disposable",
      "Beginners picking their first Alibarbar flavour",
      "Anyone who likes berry blends without menthol",
      "Custom-pack builders needing a safe fruit slot",
    ],
    whoShouldAvoid: [
      "Strong ice / menthol fans",
      "Buyers who specifically want pure blueberry only",
    ],
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
    relatedReviews: ["alibarbar-peach-ice-review", "alibarbar-strawberry-watermelon-review"],
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
    dateModified: "2026-07-14",
    intro:
      "Peach Ice is one of the easiest iced flavours to recommend because it does not overdo the menthol. It keeps peach at the centre and uses the cooling finish to make the flavour cleaner.",
    quickAnswer: {
      question: "Is Alibarbar Peach Ice good?",
      answer:
        "Yes — Peach Ice is the best moderate-ice Alibarbar flavour for most people. Ripe peach stays front and centre, with a clean cooling finish that refreshes without freezing the throat like the strongest iced options.",
    },
    keyTakeaways: [
      "Medium cooling — noticeable but not harsh",
      "Peach flavour stays clearer than on colder iced options",
      "Best entry point into the Alibarbar iced range",
      "Great warm-weather or all-day iced pick",
      "Choose Grape Ice or Blackberry Ice if you want maximum chill",
    ],
    whoShouldBuy: [
      "Adults who want fruit plus a moderate ice finish",
      "First-time iced flavour buyers",
      "People who find strong menthol too harsh",
      "Warm-weather daily vapers",
    ],
    whoShouldAvoid: [
      "Strong menthol / maximum-ice fans",
      "Anyone who dislikes peach sweetness",
    ],
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
    relatedReviews: ["alibarbar-grape-ice-review", "alibarbar-quadruple-berry-review"],
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
    dateModified: "2026-07-14",
    intro:
      "You asked for Cola Ice, but the current actual line-up includes Fanta rather than Cola. Fanta covers a similar soda-style search intent: bright, sweet, fizzy and different from the usual berry or ice profiles.",
    quickAnswer: {
      question: "Is Alibarbar Fanta worth trying?",
      answer:
        "Yes if you want something different from berry or ice. Fanta is a bright orange-soda style flavour with very little cooling — memorable and great in a custom pack, though less universal as a first-ever Alibarbar pick than Quadruple Berry.",
    },
    keyTakeaways: [
      "Orange-soda profile, not fresh orange juice",
      "Almost no ice — refreshment comes from citrus",
      "One of the most distinctive flavours in the range",
      "Ideal as a change-up in a 5 Flavour Custom Pack",
      "Current line-up has Fanta, not Cola Ice",
    ],
    whoShouldBuy: [
      "Adults who like soda-style or citrus vapes",
      "Buyers bored of berry and menthol",
      "Custom-pack shoppers wanting a fun fifth flavour",
    ],
    whoShouldAvoid: [
      "People who only want classic fruit or ice profiles",
      "Anyone looking for Cola Ice specifically",
    ],
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
    relatedReviews: ["alibarbar-mango-magic-review", "alibarbar-lychee-review"],
  },
  {
    slug: "alibarbar-lychee-review",
    productSlug: "lychee",
    title: "Alibarbar Lychee Review",
    description:
      "A detailed Alibarbar Ingot 9000 Lychee review — floral sweetness, smoothness, who it suits, and whether it is worth buying in Australia.",
    category: "Flavour Review",
    readTime: "6 min read",
    datePublished: "2026-07-18",
    dateModified: "2026-07-18",
    intro:
      "Lychee is the lightest, most floral option in the Alibarbar Ingot 9000 range. It suits adult vapers who want fragrance and softness rather than candy sweetness or heavy ice.",
    quickAnswer: {
      question: "Is Alibarbar Lychee good?",
      answer:
        "Yes if you like delicate, floral fruit. Lychee is light, fragrant and almost ice-free — elegant rather than loud. Skip it if you want bold candy sweetness or a strong menthol finish.",
    },
    keyTakeaways: [
      "Floral lychee sweetness with low cooling",
      "One of the smoothest flavours in the range",
      "Best as a change-up from berry or ice",
      "Less sweet than Quadruple Berry or Fanta",
      "Ideal custom-pack contrast flavour",
    ],
    whoShouldBuy: [
      "Adults who prefer light, floral fruit profiles",
      "People who find berry blends too heavy",
      "Custom-pack builders needing a soft contrast slot",
    ],
    whoShouldAvoid: [
      "Fans of bold candy or strong ice flavours",
      "Anyone wanting maximum sweetness",
    ],
    dimensions: [
      { label: "Sweetness", value: 3, note: "Delicate rather than candy-sweet." },
      { label: "Cooling", value: 1, note: "Almost no menthol." },
      { label: "All-day use", value: 4, note: "Light enough for long sessions." },
      { label: "Beginner friendly", value: 3, note: "Better once you know you like floral fruit." },
    ],
    sections: [
      {
        heading: "Flavour profile",
        paragraphs: [
          "Lychee opens with a soft floral fruit note and finishes clean. It is closer to fresh lychee perfume than syrupy candy, which makes it stand out from Quadruple Berry and Strawberry Watermelon.",
          "Because sweetness sits mid-range, the flavour does not fatigue as quickly as louder candy profiles — useful on a high-capacity Ingot 9000.",
        ],
      },
      {
        heading: "Who will like it?",
        paragraphs: [
          "Choose Lychee if you want something elegant and different. It pairs well in a custom pack beside louder fruit or ice flavours as a palate reset.",
        ],
      },
      {
        heading: "Performance in the Ingot 9000 device",
        paragraphs: [
          "The mesh coil keeps the floral note clear across the device life. With up to 9000 puffs and a 22ml tank, a lighter profile like Lychee is a smart all-day option that will not overwhelm.",
        ],
      },
    ],
    pros: ["Floral and distinctive", "Very smooth", "Good contrast in a mixed pack"],
    cons: ["Not bold enough for candy fans", "Less familiar than berry or peach"],
    verdict: [
      "Lychee is the refined pick in the Alibarbar line-up — soft, fragrant and easy to live with.",
      "If your first Alibarbar flavour was berry or ice and you want variety, Lychee is an excellent second device.",
    ],
    faq: [
      {
        question: "Is Alibarbar Lychee iced?",
        answer: "No. It is a low-cooling floral fruit profile.",
      },
      {
        question: "Is Lychee sweeter than Quadruple Berry?",
        answer: "No — Lychee is lighter and less jammy than Quadruple Berry.",
      },
    ],
    relatedReviews: ["alibarbar-quadruple-berry-review", "alibarbar-mango-magic-review"],
  },
  {
    slug: "alibarbar-blackberry-ice-review",
    productSlug: "blackberry-ice",
    title: "Alibarbar Blackberry Ice Review",
    description:
      "A detailed Blackberry Ice review for the Alibarbar Ingot 9000 — dark berry taste, cooling level, pros and cons for Australian buyers.",
    category: "Flavour Review",
    readTime: "6 min read",
    datePublished: "2026-07-18",
    dateModified: "2026-07-18",
    intro:
      "Blackberry Ice is the darker, colder sibling of the Alibarbar fruit range. It brings tart blackberry with a strong icy finish — for adults who want chill plus depth, not just candy ice.",
    quickAnswer: {
      question: "Is Alibarbar Blackberry Ice worth buying?",
      answer:
        "Yes if you like dark berry and strong cooling. Blackberry Ice is colder and more tart than Peach Ice, with a deeper fruit note than Strawberry Ice. Skip it if you dislike menthol or prefer soft non-ice fruit.",
    },
    keyTakeaways: [
      "Dark blackberry + strong ice",
      "Colder than Peach Ice",
      "More tart than candy strawberry profiles",
      "Great warm-weather iced pick",
      "Not for no-menthol buyers",
    ],
    whoShouldBuy: [
      "Adults who want strong ice with dark fruit",
      "Berry fans who also like menthol",
      "Warm-climate daily iced vapers",
    ],
    whoShouldAvoid: [
      "No-menthol / pure fruit buyers",
      "People who find strong ice harsh",
    ],
    dimensions: [
      { label: "Sweetness", value: 3, note: "Tart-sweet blackberry rather than candy." },
      { label: "Cooling", value: 4, note: "Strong icy finish." },
      { label: "All-day use", value: 4, note: "Refreshing if you enjoy menthol." },
      { label: "Beginner friendly", value: 3, note: "Better after you know you like ice." },
    ],
    sections: [
      {
        heading: "Flavour profile",
        paragraphs: [
          "Blackberry Ice leads with darker berry — more tart and jam-skin than bright strawberry. The ice lands firmly on the exhale and cleans the palate.",
          "Compared with Quadruple Berry, it is colder and less jammy. Compared with Peach Ice, the fruit is darker and the menthol is stronger.",
        ],
      },
      {
        heading: "Cooling level",
        paragraphs: [
          "Cooling sits with Grape Ice and Strawberry Ice near the top of the Alibarbar iced band. Expect a noticeable throat chill — that is the point of this SKU.",
        ],
      },
      {
        heading: "Who should choose Blackberry Ice?",
        paragraphs: [
          "Pick it if Peach Ice felt too mild. It is also a strong custom-pack iced slot for people who already own a non-ice fruit device.",
        ],
      },
    ],
    pros: ["Deep berry character", "Strong, clean ice", "Distinct from peach or grape ice"],
    cons: ["Too cold for soft-fruit fans", "Less beginner-safe than Peach Ice"],
    verdict: [
      "Blackberry Ice is the go-to when you want dark fruit and real chill in one Ingot 9000.",
      "If you are new to iced disposables, start with Peach Ice; step up here when you want more intensity.",
    ],
    faq: [
      {
        question: "Is Blackberry Ice colder than Peach Ice?",
        answer: "Yes. Blackberry Ice has a stronger menthol finish than Peach Ice.",
      },
      {
        question: "How does it compare with Quadruple Berry?",
        answer:
          "Quadruple Berry is a non-ice mixed berry blend. Blackberry Ice is darker, tart-forward and mentholated.",
      },
    ],
    relatedReviews: ["alibarbar-peach-ice-review", "alibarbar-grape-ice-review"],
  },
  {
    slug: "alibarbar-mango-magic-review",
    productSlug: "mango-magic",
    title: "Alibarbar Mango Magic Review",
    description:
      "A detailed Mango Magic review for the Alibarbar Ingot 9000 — tropical sweetness, smoothness, and who should buy it in Australia.",
    category: "Flavour Review",
    readTime: "6 min read",
    datePublished: "2026-07-18",
    dateModified: "2026-07-18",
    intro:
      "Mango Magic is the tropical all-day fruit pick in the Alibarbar Ingot 9000 range — ripe mango sweetness with low cooling and a smooth draw.",
    quickAnswer: {
      question: "Is Alibarbar Mango Magic good?",
      answer:
        "Yes for tropical fruit fans. Mango Magic is ripe, sweet and almost ice-free — an easy daily driver beside Quadruple Berry. Skip it if you want menthol or a lighter floral profile like Lychee.",
    },
    keyTakeaways: [
      "Ripe tropical mango, low ice",
      "Sweeter and denser than Lychee",
      "Strong all-day non-menthol option",
      "Pairs well with iced flavours in a custom pack",
      "Skip if you dislike mango sweetness",
    ],
    whoShouldBuy: [
      "Adults who love mango / tropical fruit",
      "Non-menthol daily vapers",
      "Custom-pack builders needing a tropical slot",
    ],
    whoShouldAvoid: [
      "Strong ice fans",
      "People who find mango too sweet",
    ],
    dimensions: [
      { label: "Sweetness", value: 4, note: "Ripe mango, tropical and full." },
      { label: "Cooling", value: 1, note: "Almost no menthol." },
      { label: "All-day use", value: 5, note: "Easy daily tropical driver." },
      { label: "Beginner friendly", value: 4, note: "Familiar fruit for most buyers." },
    ],
    sections: [
      {
        heading: "Flavour profile",
        paragraphs: [
          "Mango Magic tastes like ripe mango flesh — sweet, tropical and rounded. It is denser than watermelon blends and warmer than iced fruit options.",
          "There is little menthol, so the mango stays front and centre across the full Ingot 9000 capacity.",
        ],
      },
      {
        heading: "Who will like it?",
        paragraphs: [
          "Choose Mango Magic if you want a non-berry fruit daily driver. It is also a natural partner to Peach Ice or Grape Ice in a five-flavour pack.",
        ],
      },
      {
        heading: "Performance in the Ingot 9000 device",
        paragraphs: [
          "On a 22ml / up-to-9000-puff device, a consistent tropical note matters. Mango Magic holds its profile well and benefits from the LED e-liquid readout so you can swap before flavour thins.",
        ],
      },
    ],
    pros: ["Clear tropical mango", "Great all-day non-ice pick", "Easy to recommend"],
    cons: ["Can feel sweet after long sessions", "No ice for menthol seekers"],
    verdict: [
      "Mango Magic is the tropical counterpart to Quadruple Berry — a safe, satisfying fruit pick for Australian adult buyers.",
      "If you already like mango disposables, this is one of the easiest Alibarbar flavours to commit to.",
    ],
    faq: [
      {
        question: "Is Mango Magic iced?",
        answer: "No. It is a low-cooling tropical fruit flavour.",
      },
      {
        question: "Mango Magic vs Strawberry Watermelon?",
        answer:
          "Mango Magic is denser and more tropical; Strawberry Watermelon is lighter, splashier and more summery.",
      },
    ],
    relatedReviews: ["alibarbar-quadruple-berry-review", "alibarbar-strawberry-watermelon-review"],
  },
  {
    slug: "alibarbar-strawberry-coconut-watermelon-review",
    productSlug: "strawberry-coconut-watermelon",
    title: "Alibarbar Strawberry Coconut Watermelon Review",
    description:
      "Review of Alibarbar Ingot 9000 Strawberry Coconut Watermelon — creamy tropical layers, sweetness, and who it suits.",
    category: "Flavour Review",
    readTime: "6 min read",
    datePublished: "2026-07-18",
    dateModified: "2026-07-18",
    intro:
      "Strawberry Coconut Watermelon is the creamiest multi-fruit blend in the Alibarbar range — strawberry and watermelon with a soft coconut roundness.",
    quickAnswer: {
      question: "Is Strawberry Coconut Watermelon good?",
      answer:
        "Yes if you want a richer tropical fruit blend. Coconut softens strawberry and watermelon into a creamier profile than plain Strawberry Watermelon. Skip it if you dislike coconut or want strong ice.",
    },
    keyTakeaways: [
      "Three-layer fruit with soft coconut creaminess",
      "Richer than Strawberry Watermelon",
      "Low cooling — tropical, not menthol",
      "Great 'something different' fruit pick",
      "Avoid if you dislike coconut",
    ],
    whoShouldBuy: [
      "Adults who like tropical / creamy fruit blends",
      "Buyers wanting more complexity than two-fruit mixes",
      "Custom-pack variety seekers",
    ],
    whoShouldAvoid: [
      "People who dislike coconut",
      "Strong ice / menthol fans",
    ],
    dimensions: [
      { label: "Sweetness", value: 4, note: "Ripe fruit with soft coconut sweetness." },
      { label: "Cooling", value: 1, note: "Almost no menthol." },
      { label: "All-day use", value: 4, note: "Rich enough for daily use if you like coconut." },
      { label: "Complexity", value: 5, note: "Most layered fruit blend in the range." },
    ],
    sections: [
      {
        heading: "Flavour profile",
        paragraphs: [
          "Strawberry leads, watermelon keeps it juicy, and coconut adds a creamy mid-note that makes the blend feel fuller than a simple fruit mix.",
          "It is not iced, so the tropical creaminess stays warm and smooth across the Ingot 9000 lifespan.",
        ],
      },
      {
        heading: "Who will like it?",
        paragraphs: [
          "Pick this if Strawberry Watermelon felt too simple, or if you want a dessert-leaning fruit profile without going full candy soda like Fanta.",
        ],
      },
      {
        heading: "How it compares",
        paragraphs: [
          "Versus Strawberry Watermelon: creamier and more complex. Versus Mango Magic: less single-note tropical, more blended. Versus Strawberry Ice: no menthol chill.",
        ],
      },
    ],
    pros: ["Layered tropical profile", "Creamy without being heavy", "Unique in the range"],
    cons: ["Coconut is polarising", "Not for ice lovers"],
    verdict: [
      "Strawberry Coconut Watermelon is the most interesting non-ice fruit blend Alibarbar currently sells.",
      "If coconut works for you, it is an excellent second or third flavour after a safer berry pick.",
    ],
    faq: [
      {
        question: "Does it taste strongly of coconut?",
        answer:
          "Coconut is present as a creamy roundness, not overpowering sunscreen-style coconut. Strawberry and watermelon still lead.",
      },
      {
        question: "Is it the same as Strawberry Watermelon?",
        answer: "No — this version adds coconut and feels richer and more tropical.",
      },
    ],
    relatedReviews: ["alibarbar-strawberry-watermelon-review", "alibarbar-mango-magic-review"],
  },
  {
    slug: "alibarbar-grape-ice-review",
    productSlug: "grape-ice",
    title: "Alibarbar Grape Ice Review",
    description:
      "A detailed Grape Ice review for the Alibarbar Ingot 9000 — candy grape taste, cooling intensity, pros and cons.",
    category: "Flavour Review",
    readTime: "6 min read",
    datePublished: "2026-07-18",
    dateModified: "2026-07-18",
    intro:
      "Grape Ice is the candy-sweet, high-chill option in the Alibarbar iced range — grape soda vibes with a frosty finish.",
    quickAnswer: {
      question: "Is Alibarbar Grape Ice good?",
      answer:
        "Yes if you want sweet grape candy plus strong ice. Grape Ice is colder and more confectionery than Peach Ice. Skip it if you prefer natural fruit or no menthol.",
    },
    keyTakeaways: [
      "Grape-candy / soda sweetness + strong ice",
      "Colder than Peach Ice",
      "One of the most refreshing iced picks",
      "Less 'natural fruit' than peach or blackberry",
      "Excellent warm-weather device",
    ],
    whoShouldBuy: [
      "Adults who like grape candy or grape soda vapes",
      "Strong ice fans",
      "Warm-weather daily iced users",
    ],
    whoShouldAvoid: [
      "No-menthol buyers",
      "People who want soft orchard fruit like peach",
    ],
    dimensions: [
      { label: "Sweetness", value: 4, note: "Candy grape / soda sweetness." },
      { label: "Cooling", value: 4, note: "Strong icy finish." },
      { label: "All-day use", value: 4, note: "Refreshing if you enjoy menthol." },
      { label: "Beginner friendly", value: 3, note: "Bold — better if you already like ice." },
    ],
    sections: [
      {
        heading: "Flavour profile",
        paragraphs: [
          "Grape Ice leans toward purple grape candy and soft-drink grape rather than fresh table grapes. The ice arrives quickly and keeps the sweetness from feeling sticky.",
          "Versus Peach Ice, it is sweeter and colder. Versus Blackberry Ice, it is brighter and more candy-like, less tart.",
        ],
      },
      {
        heading: "Cooling level",
        paragraphs: [
          "Expect a firm chill. If Peach Ice was your entry point and you want more, Grape Ice is the natural step up.",
        ],
      },
      {
        heading: "Who should choose Grape Ice?",
        paragraphs: [
          "Choose it for hot days, or as the iced slot in a custom pack when your other flavours are non-ice fruit.",
        ],
      },
    ],
    pros: ["Bright candy grape", "Strong refreshing ice", "Clear point of difference vs peach"],
    cons: ["Can feel artificial to natural-fruit fans", "Too cold for soft profiles"],
    verdict: [
      "Grape Ice is the loud, refreshing iced pick — fun, cold and unmistakable.",
      "If you already know you like grape candy disposables, this is an easy Alibarbar yes.",
    ],
    faq: [
      {
        question: "Is Grape Ice colder than Peach Ice?",
        answer: "Yes. Grape Ice sits toward the stronger end of the Alibarbar iced range.",
      },
      {
        question: "Does it taste like real grapes?",
        answer: "It is closer to grape candy or grape soda than fresh grapes.",
      },
    ],
    relatedReviews: ["alibarbar-peach-ice-review", "alibarbar-strawberry-ice-review"],
  },
  {
    slug: "alibarbar-strawberry-watermelon-review",
    productSlug: "strawberry-watermelon",
    title: "Alibarbar Strawberry Watermelon Review",
    description:
      "A detailed Strawberry Watermelon review for the Alibarbar Ingot 9000 — sweetness, smoothness, and who should buy this non-ice fruit blend.",
    category: "Flavour Review",
    readTime: "6 min read",
    datePublished: "2026-07-18",
    dateModified: "2026-07-18",
    intro:
      "Strawberry Watermelon is the bright, no-ice summer blend in the Alibarbar Ingot 9000 line — ripe strawberry plus juicy watermelon.",
    quickAnswer: {
      question: "Is Alibarbar Strawberry Watermelon good?",
      answer:
        "Yes for everyday non-ice fruit. It is sweet, splashy and beginner-friendly — simpler than Quadruple Berry and without the coconut of Strawberry Coconut Watermelon. Skip it if you want menthol.",
    },
    keyTakeaways: [
      "Classic strawberry + watermelon, no ice",
      "Lighter and splashier than mixed berry",
      "Excellent beginner fruit pick",
      "Different from Strawberry Ice (no menthol)",
      "Great all-day warm-weather flavour",
    ],
    whoShouldBuy: [
      "Adults who want simple sweet fruit without ice",
      "First-time Alibarbar buyers",
      "Summer / everyday fruit vapers",
    ],
    whoShouldAvoid: [
      "Strong ice fans — choose Strawberry Ice instead",
      "People wanting darker berry complexity",
    ],
    dimensions: [
      { label: "Sweetness", value: 4, note: "Ripe strawberry with juicy watermelon." },
      { label: "Cooling", value: 1, note: "No menthol." },
      { label: "All-day use", value: 5, note: "Easy daily fruit driver." },
      { label: "Beginner friendly", value: 5, note: "Very approachable." },
    ],
    sections: [
      {
        heading: "Flavour profile",
        paragraphs: [
          "Strawberry brings the body; watermelon adds watery juiciness so the blend feels light rather than jam-heavy. There is no ice, so it stays warm and smooth.",
          "Compared with Quadruple Berry, it is simpler and more summery. Compared with Strawberry Ice, it drops the menthol entirely.",
        ],
      },
      {
        heading: "Who will like it?",
        paragraphs: [
          "This is a safe first Alibarbar fruit pick if you do not want berry complexity or coconut. It also works well as a daily driver on the high-capacity Ingot 9000.",
        ],
      },
      {
        heading: "Performance in the Ingot 9000 device",
        paragraphs: [
          "Light fruit profiles stay pleasant across long device life. The smart LED helps you track e-liquid so you can replace before the strawberry note thins.",
        ],
      },
    ],
    pros: ["Universally likeable", "No menthol", "Great beginner fruit option"],
    cons: ["Less complex than Quadruple Berry", "Not for ice seekers"],
    verdict: [
      "Strawberry Watermelon is the easy summer fruit recommendation — bright, sweet and no surprises.",
      "If you want ice later, step to Strawberry Ice; if you want more layers, try Strawberry Coconut Watermelon.",
    ],
    faq: [
      {
        question: "Is Strawberry Watermelon the same as Strawberry Ice?",
        answer: "No. Strawberry Watermelon has no menthol; Strawberry Ice adds a frosty finish.",
      },
      {
        question: "Good for beginners?",
        answer: "Yes — it is one of the easiest non-ice fruit flavours to start with.",
      },
    ],
    relatedReviews: ["alibarbar-strawberry-ice-review", "alibarbar-quadruple-berry-review"],
  },
  {
    slug: "alibarbar-strawberry-ice-review",
    productSlug: "strawberry-ice",
    title: "Alibarbar Strawberry Ice Review",
    description:
      "A detailed Strawberry Ice review for the Alibarbar Ingot 9000 — candy strawberry, cooling level, pros and cons for Australian buyers.",
    category: "Flavour Review",
    readTime: "6 min read",
    datePublished: "2026-07-18",
    dateModified: "2026-07-18",
    intro:
      "Strawberry Ice is the iced counterpart to classic strawberry — candy-sweet berry with a frosty menthol finish on the Alibarbar Ingot 9000.",
    quickAnswer: {
      question: "Is Alibarbar Strawberry Ice worth buying?",
      answer:
        "Yes if you want familiar strawberry plus strong ice. It is colder than Peach Ice and more straightforward than Blackberry Ice. Choose Strawberry Watermelon instead if you do not want menthol.",
    },
    keyTakeaways: [
      "Candy strawberry + strong ice",
      "Colder than Peach Ice",
      "Simpler than dark Blackberry Ice",
      "Top warm-weather iced pick",
      "Not for no-menthol buyers",
    ],
    whoShouldBuy: [
      "Adults who like strawberry candy / ice disposables",
      "Warm-weather iced daily users",
      "Buyers stepping up from Peach Ice",
    ],
    whoShouldAvoid: [
      "No-menthol fruit buyers",
      "People who prefer soft peach over candy strawberry",
    ],
    dimensions: [
      { label: "Sweetness", value: 4, note: "Candy-sweet strawberry." },
      { label: "Cooling", value: 4, note: "Strong frosty finish." },
      { label: "All-day use", value: 4, note: "Refreshing if you enjoy ice." },
      { label: "Beginner friendly", value: 4, note: "Familiar fruit with clear ice." },
    ],
    sections: [
      {
        heading: "Flavour profile",
        paragraphs: [
          "Strawberry Ice leads with bright candy strawberry, then a frosty menthol breeze on the exhale. It is more confectionery than fresh-picked strawberry.",
          "Versus Strawberry Watermelon: same fruit family, but Ice adds menthol and drops watermelon. Versus Peach Ice: sweeter candy fruit and stronger chill.",
        ],
      },
      {
        heading: "Cooling level",
        paragraphs: [
          "Cooling sits with Grape Ice near the top of the range. Expect a clear throat chill — ideal for hot Australian days.",
        ],
      },
      {
        heading: "Who should choose Strawberry Ice?",
        paragraphs: [
          "Pick it if you already know you like iced strawberry disposables, or if Peach Ice felt too mild and too peachy.",
        ],
      },
    ],
    pros: ["Familiar strawberry", "Strong refreshing ice", "Easy iced recommendation"],
    cons: ["Candy-like for natural-fruit fans", "Too cold for soft profiles"],
    verdict: [
      "Strawberry Ice is the straightforward iced strawberry pick — sweet, cold and easy to recommend.",
      "Pair it with a non-ice fruit in a custom pack for variety across the day.",
    ],
    faq: [
      {
        question: "Strawberry Ice vs Strawberry Watermelon?",
        answer:
          "Strawberry Ice has a menthol finish and no watermelon. Strawberry Watermelon is a pure non-ice fruit blend.",
      },
      {
        question: "Is it colder than Peach Ice?",
        answer: "Yes — Strawberry Ice sits toward the stronger iced end of the range.",
      },
    ],
    relatedReviews: ["alibarbar-peach-ice-review", "alibarbar-strawberry-watermelon-review"],
  },
];

export function getReviewBySlug(slug: string | undefined): ReviewPost | undefined {
  if (!slug) return undefined;
  return reviewPosts.find((post) => post.slug === slug);
}

export function getReviewByProductSlug(productSlug: string | undefined): ReviewPost | undefined {
  if (!productSlug) return undefined;
  return reviewPosts.find((post) => post.productSlug === productSlug);
}

/** Average dimension score rounded to one decimal for Review schema. */
export function getReviewRatingValue(review: ReviewPost): number {
  if (review.dimensions.length === 0) return 4;
  const sum = review.dimensions.reduce((acc, d) => acc + d.value, 0);
  return Math.round((sum / review.dimensions.length) * 10) / 10;
}

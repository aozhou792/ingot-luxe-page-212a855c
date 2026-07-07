import { getProductBySlug, type Product } from "@/data/products";

export type FlavourProfile = {
  /** Matches the product slug so we can link straight to the buy page. */
  slug: string;
  name: string;
  /** Short one-liner for hub cards + meta. */
  tagline: string;
  /** Taste axes, each scored 1-5 for a quick visual profile. */
  sweetness: number;
  coolness: number;
  smoothness: number;
  /** Flavour family label. */
  family: string;
  /** 2-3 paragraph editorial tasting notes (distinct from the product copy). */
  tastingNotes: string[];
  /** Who tends to enjoy this flavour. */
  bestFor: string[];
  /** Slugs of similar flavours to cross-link. */
  similar: string[];
  faq: { question: string; answer: string }[];
};

export const flavourProfiles: FlavourProfile[] = [
  {
    slug: "quadruple-berry",
    name: "Quadruple Berry",
    tagline: "A four-berry medley of strawberry, raspberry, blackberry and blueberry.",
    sweetness: 4,
    coolness: 1,
    smoothness: 5,
    family: "Fruity",
    tastingNotes: [
      "Quadruple Berry is the all-rounder of the Alibarbar range. On the inhale you get jammy strawberry and raspberry, while the exhale leans darker with blackberry and blueberry rounding everything out.",
      "There is no menthol here, so it reads as a warm, ripe berry blend rather than an iced one. That makes it easy to vape all day without the flavour becoming sharp or one-note.",
      "If you like mixed-berry profiles and want something crowd-pleasing rather than polarising, this is the safest first pick in the collection.",
    ],
    bestFor: ["All-day fruity vapers", "Anyone who dislikes strong menthol", "First-time Alibarbar buyers"],
    similar: ["strawberry-watermelon", "lychee"],
    faq: [
      {
        question: "Is Quadruple Berry an iced flavour?",
        answer: "No. It is a pure fruit blend with no added menthol, so it is smooth rather than cold.",
      },
      {
        question: "Is it very sweet?",
        answer: "It sits at a medium-high sweetness — ripe and jammy, but balanced by the darker berries.",
      },
    ],
  },
  {
    slug: "fanta",
    name: "Fanta",
    tagline: "Fizzy orange-soda nostalgia with a bright citrus lift.",
    sweetness: 4,
    coolness: 1,
    smoothness: 4,
    family: "Citrus / Soda",
    tastingNotes: [
      "Fanta recreates the classic orange-soda experience — sweet, zesty and unmistakably fizzy. It is one of the few non-berry options in the range and a favourite for anyone who wants a break from fruit-ice profiles.",
      "The citrus is bright without turning sour, and there is a soft carbonated 'pop' on the exhale that gives it that soda character.",
      "Because it is distinctive, it works well as a change-up flavour in a mixed pack rather than something everyone vapes non-stop.",
    ],
    bestFor: ["Soda and citrus lovers", "Vapers wanting a non-berry option", "Mixed-pack variety"],
    similar: ["lychee", "mango-magic"],
    faq: [
      {
        question: "Does Fanta taste like real orange soda?",
        answer: "It aims for that sweet, fizzy orange-soda profile rather than fresh-squeezed orange juice.",
      },
    ],
  },
  {
    slug: "lychee",
    name: "Lychee",
    tagline: "Delicate, floral lychee sweetness — light and fragrant.",
    sweetness: 3,
    coolness: 1,
    smoothness: 5,
    family: "Fruity / Floral",
    tastingNotes: [
      "Lychee is the most refined flavour in the collection. It captures the perfumed, slightly floral sweetness of ripe lychee fruit without becoming cloying.",
      "It is lighter and more aromatic than the berry blends, which makes it a great option if you find some fruit flavours too heavy or candy-like.",
      "There is no ice, so the sweetness stays soft and rounded from the first puff to the last.",
    ],
    bestFor: ["Vapers who like subtle, aromatic flavours", "Anyone tired of heavy sweet blends"],
    similar: ["fanta", "peach-ice"],
    faq: [
      {
        question: "Is Lychee a strong flavour?",
        answer: "No, it is on the lighter, more delicate side — fragrant rather than intense.",
      },
    ],
  },
  {
    slug: "peach-ice",
    name: "Peach Ice",
    tagline: "Juicy orchard peach with a crisp, cooling finish.",
    sweetness: 4,
    coolness: 3,
    smoothness: 5,
    family: "Iced Fruit",
    tastingNotes: [
      "Peach Ice pairs soft, ripe orchard peach with a gentle menthol chill. The fruit leads, and the ice arrives on the exhale to keep it refreshing rather than sugary.",
      "The cooling here is moderate — noticeable, but not as aggressive as a straight menthol. That balance makes it one of the most popular iced options in the range.",
      "It is an ideal warm-weather flavour and a smooth introduction to iced profiles for people who normally vape pure fruit.",
    ],
    bestFor: ["Warm-weather vaping", "Fruit vapers curious about ice", "All-day iced flavour"],
    similar: ["strawberry-ice", "grape-ice"],
    faq: [
      {
        question: "How cold is Peach Ice?",
        answer: "The menthol is moderate — cooling and refreshing without being overpowering.",
      },
    ],
  },
  {
    slug: "blackberry-ice",
    name: "Blackberry Ice",
    tagline: "Dark, juicy blackberry with a clean menthol edge.",
    sweetness: 4,
    coolness: 4,
    smoothness: 4,
    family: "Iced Fruit",
    tastingNotes: [
      "Blackberry Ice combines the rich, slightly tart taste of ripe blackberries with a crisp icy twist. It is darker and deeper than the strawberry-based iced flavours.",
      "The menthol is more pronounced here, giving a cool, brisk finish that pairs nicely with the jammy berry base.",
      "If you like fruit-menthol combos with a bit more bite, this is one of the stronger iced choices in the collection.",
    ],
    bestFor: ["Menthol fans", "Dark-berry lovers", "Vapers who want a stronger chill"],
    similar: ["grape-ice", "peach-ice"],
    faq: [
      {
        question: "Is Blackberry Ice very minty?",
        answer: "It has a stronger cool finish than Peach Ice, but the blackberry still leads the flavour.",
      },
    ],
  },
  {
    slug: "mango-magic",
    name: "Mango Magic",
    tagline: "Ripe, luscious tropical mango — bold and juicy.",
    sweetness: 5,
    coolness: 1,
    smoothness: 5,
    family: "Tropical",
    tastingNotes: [
      "Mango Magic delivers ripe, juicy mango with a smooth, luscious finish. It is one of the sweetest and most full-bodied flavours in the range.",
      "There is no ice, so you get pure tropical fruit — rich and rounded rather than sharp. It is the kind of flavour that stays satisfying all day.",
      "For anyone who loves classic mango vapes, this is the flagship tropical option.",
    ],
    bestFor: ["Tropical-fruit lovers", "Sweet-tooth vapers", "All-day rich flavour"],
    similar: ["strawberry-coconut-watermelon", "quadruple-berry"],
    faq: [
      {
        question: "Is Mango Magic iced?",
        answer: "No, it is a pure tropical mango flavour with no menthol.",
      },
    ],
  },
  {
    slug: "strawberry-coconut-watermelon",
    name: "Strawberry Coconut Watermelon",
    tagline: "A creamy tropical layering of strawberry, coconut and watermelon.",
    sweetness: 5,
    coolness: 1,
    smoothness: 5,
    family: "Tropical",
    tastingNotes: [
      "This is the most complex flavour in the range. Jammy strawberry and juicy watermelon sit on top of a silky coconut cream base, giving it a smoothie-like richness.",
      "The coconut adds a soft, creamy layer that sets it apart from the straightforward fruit blends — it is indulgent without being heavy.",
      "If you enjoy dessert-adjacent, tropical, creamy profiles, this is the standout pick.",
    ],
    bestFor: ["Creamy / dessert flavour fans", "Tropical vapers", "Something more complex"],
    similar: ["mango-magic", "strawberry-watermelon"],
    faq: [
      {
        question: "Can you taste the coconut?",
        answer: "Yes — the coconut cream is a distinct, smooth layer under the strawberry and watermelon.",
      },
    ],
  },
  {
    slug: "grape-ice",
    name: "Grape Ice",
    tagline: "Bold, candy-like grape with a crisp icy finish.",
    sweetness: 5,
    coolness: 4,
    smoothness: 4,
    family: "Iced Fruit",
    tastingNotes: [
      "Grape Ice serves up bold, slightly candy-like grape flavour with a clean menthol finish. It is sweet and vivid on the inhale, cool and crisp on the exhale.",
      "The grape is closer to grape-soda or grape-candy than fresh grapes, which gives it a fun, punchy character.",
      "With a solid chill level, it is a top choice for people who like sweet-and-cold combinations.",
    ],
    bestFor: ["Sweet-and-cold vapers", "Grape-candy fans", "Warm-weather refreshment"],
    similar: ["blackberry-ice", "strawberry-ice"],
    faq: [
      {
        question: "Does Grape Ice taste like real grapes?",
        answer: "It leans towards a sweet grape-candy/soda profile rather than fresh grapes, with a cool finish.",
      },
    ],
  },
  {
    slug: "strawberry-watermelon",
    name: "Strawberry Watermelon",
    tagline: "Ripe strawberry punch meets juicy watermelon.",
    sweetness: 4,
    coolness: 1,
    smoothness: 5,
    family: "Fruity",
    tastingNotes: [
      "Strawberry Watermelon is a splashy, summery blend of ripe strawberry and juicy watermelon. It is sweet and refreshing without any menthol.",
      "The two fruits balance each other well — strawberry brings the depth, watermelon brings the light, watery juiciness.",
      "It is an easy, universally likeable flavour that works as a daily driver.",
    ],
    bestFor: ["Everyday fruit vaping", "Summer flavours", "Non-menthol preference"],
    similar: ["quadruple-berry", "strawberry-coconut-watermelon"],
    faq: [
      {
        question: "Is this the same as Strawberry Ice?",
        answer: "No — Strawberry Watermelon has no menthol, while Strawberry Ice adds a cool icy finish.",
      },
    ],
  },
  {
    slug: "strawberry-ice",
    name: "Strawberry Ice",
    tagline: "Candy-sweet strawberry wrapped in a frosty menthol breeze.",
    sweetness: 4,
    coolness: 4,
    smoothness: 5,
    family: "Iced Fruit",
    tastingNotes: [
      "Strawberry Ice is the iced counterpart to the classic strawberry profile. Sweet, candy-like strawberry leads, then a frosty menthol breeze cleans up the finish.",
      "It is bright and refreshing, with a chill level similar to Grape Ice. The strawberry keeps it approachable while the ice makes it crisp.",
      "A reliable pick if you want a familiar fruit flavour with a cooling twist.",
    ],
    bestFor: ["Strawberry fans wanting ice", "Refreshing daily vaping", "Warm-weather use"],
    similar: ["peach-ice", "grape-ice"],
    faq: [
      {
        question: "How does Strawberry Ice compare to Strawberry Watermelon?",
        answer: "Strawberry Ice adds a cool menthol finish; Strawberry Watermelon is a pure, non-iced fruit blend.",
      },
    ],
  },
];

export function getFlavourBySlug(slug: string | undefined): FlavourProfile | undefined {
  if (!slug) return undefined;
  return flavourProfiles.find((f) => f.slug === slug);
}

/** Convenience: the sellable product behind a flavour profile. */
export function getFlavourProduct(slug: string): Product | undefined {
  return getProductBySlug(slug);
}

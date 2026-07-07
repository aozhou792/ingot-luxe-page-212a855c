export type BlogSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  datePublished: string;
  dateModified: string;
  intro: string;
  sections: BlogSection[];
  relatedProducts?: string[];
  relatedGuides?: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "best-disposable-vape-australia-2026",
    title: "Best Disposable Vapes in Australia 2026: What to Look For",
    description:
      "A practical 2026 buyer's guide to choosing a disposable vape in Australia — puff count, capacity, display, flavour and value, with where the Alibarbar Ingot 9000 fits.",
    category: "Buying Guide",
    readTime: "7 min read",
    datePublished: "2026-04-01",
    dateModified: "2026-07-01",
    intro:
      "There are more disposable vapes on the Australian market than ever, and they are not all equal. This 2026 guide breaks down what actually matters when choosing one, so you can spend your money well.",
    sections: [
      {
        heading: "1. Puff count and e-liquid capacity",
        paragraphs: [
          "Puff count is the headline number, but it only means something alongside e-liquid capacity. A high puff rating with a small tank rarely delivers in practice.",
          "The Alibarbar Ingot 9000, for example, backs its up-to-9000 puff rating with a large 22ml e-liquid capacity and a 2350mAh battery, so the numbers line up.",
        ],
      },
      {
        heading: "2. A battery that matches the tank",
        paragraphs: [
          "In a non-rechargeable disposable, the battery has to last as long as the e-liquid. If it doesn't, you'll be throwing away a device with juice still in it. Look for devices where the battery is sized to the capacity.",
        ],
      },
      {
        heading: "3. An on-device display",
        paragraphs: [
          "A built-in LED display that shows battery and e-liquid level is genuinely useful — it lets you plan a replacement instead of being caught out mid-day. It's still relatively uncommon, so it's a real differentiator.",
        ],
      },
      {
        heading: "4. Flavour range and flexibility",
        paragraphs: [
          "The best brands offer a spread across fruity, iced and tropical profiles. Being able to mix flavours — like the Alibarbar 5 Flavour Custom Pack — is a bonus if you like variety or are still finding your favourite.",
        ],
      },
      {
        heading: "5. Authenticity and local delivery",
        paragraphs: [
          "Only buy genuine devices from sellers who ship locally and support adults 18+. Authenticity matters for consistency and safety, and local delivery means faster, more reliable arrival.",
        ],
      },
    ],
    relatedProducts: ["quadruple-berry", "custom-5-pack"],
    relatedGuides: ["what-is-alibarbar-ingot-9000", "how-to-use-a-disposable-vape"],
  },
  {
    slug: "top-alibarbar-flavours-ranked",
    title: "Top Alibarbar Ingot 9000 Flavours, Ranked by Type",
    description:
      "Our pick of the best Alibarbar Ingot 9000 flavours in Australia, grouped by fruity, iced and tropical, to help you choose your next device.",
    category: "Flavour Review",
    readTime: "6 min read",
    datePublished: "2026-04-08",
    dateModified: "2026-07-01",
    intro:
      "With ten flavours plus a custom pack, the Alibarbar range covers a lot of ground. Here are our favourites grouped by style, so you can jump straight to what you like.",
    sections: [
      {
        heading: "Best fruity flavours",
        paragraphs: [
          "Quadruple Berry is the standout all-rounder — a balanced four-berry blend with no menthol. Strawberry Watermelon is a close second for an easy, summery daily vape.",
        ],
      },
      {
        heading: "Best iced flavours",
        paragraphs: [
          "Peach Ice leads for a moderate, refreshing chill, while Grape Ice and Blackberry Ice bring a bigger cool hit. Strawberry Ice is the familiar, crowd-pleasing iced option.",
        ],
      },
      {
        heading: "Best tropical and unique flavours",
        paragraphs: [
          "Mango Magic is the flagship tropical pick, and Strawberry Coconut Watermelon adds a creamy twist for something richer. For a complete change of pace, Fanta and Lychee stand apart from the fruit-ice crowd.",
        ],
      },
      {
        heading: "Not sure? Build a custom pack",
        paragraphs: [
          "If you want to explore, the 5 Flavour Custom Pack lets you try five profiles in one order — the easiest way to find your favourite before committing.",
        ],
      },
    ],
    relatedProducts: ["mango-magic", "peach-ice", "custom-5-pack"],
    relatedGuides: ["best-alibarbar-flavours-australia"],
  },
  {
    slug: "how-to-make-your-disposable-vape-last-longer",
    title: "How to Make Your Disposable Vape Last Longer: 6 Tips",
    description:
      "Simple, practical tips to get more from every disposable vape, from puff technique to storage — so your Alibarbar Ingot 9000 lasts as long as possible.",
    category: "Tips",
    readTime: "5 min read",
    datePublished: "2026-04-15",
    dateModified: "2026-07-01",
    intro:
      "A disposable vape's rated puff count is an upper limit — how close you get depends on how you use it. These six habits will help you get the most from every device.",
    sections: [
      {
        heading: "1. Take shorter, gentler puffs",
        paragraphs: [
          "Long, hard draws burn through e-liquid and battery quickly. Shorter, steadier puffs are more efficient and keep the flavour consistent.",
        ],
      },
      {
        heading: "2. Pause between draws",
        paragraphs: [
          "Chain-vaping can flood or overwork the coil. Letting the device rest a moment between puffs helps it perform better across its life.",
        ],
      },
      {
        heading: "3. Store it upright and cool",
        paragraphs: [
          "Heat degrades both the battery and e-liquid. Keep your device out of hot cars and direct sunlight, and store it upright in a cool, dry place.",
        ],
      },
      {
        heading: "4. Watch the display",
        paragraphs: [
          "On devices with an LED display, like the Alibarbar Ingot 9000, keep an eye on the battery and e-liquid indicators so you can plan a replacement rather than run dry unexpectedly.",
        ],
      },
      {
        heading: "5. Don't leave it in extreme cold",
        paragraphs: [
          "Very low temperatures can temporarily reduce battery performance. Let a cold device return to room temperature before expecting full vapour.",
        ],
      },
      {
        heading: "6. Buy authentic",
        paragraphs: [
          "Genuine devices are built to hit their rated capacity. Counterfeits often underperform, so buy from a trusted seller.",
        ],
      },
    ],
    relatedGuides: ["how-long-does-alibarbar-ingot-9000-last", "how-many-puffs-does-alibarbar-ingot-9000-have"],
  },
];

export function getBlogPostBySlug(slug: string | undefined): BlogPost | undefined {
  if (!slug) return undefined;
  return blogPosts.find((p) => p.slug === slug);
}

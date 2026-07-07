export type GuideSection = {
  heading: string;
  paragraphs: string[];
  /** Optional bullet list rendered after the paragraphs. */
  bullets?: string[];
};

export type Guide = {
  slug: string;
  title: string;
  /** Meta description + hub card summary. */
  description: string;
  /** One-line label shown on hub cards. */
  category: string;
  /** Read time shown on cards, e.g. "5 min read". */
  readTime: string;
  datePublished: string;
  dateModified: string;
  /** Short lead paragraph under the H1. */
  intro: string;
  sections: GuideSection[];
  /** Optional guide-specific FAQ (also emitted as FAQPage schema). */
  faq?: { question: string; answer: string }[];
  /** Related product slugs surfaced at the end of the guide. */
  relatedProducts?: string[];
  /** Related guide slugs for internal linking. */
  relatedGuides?: string[];
};

export const guides: Guide[] = [
  {
    slug: "what-is-alibarbar-ingot-9000",
    title: "What Is the Alibarbar Ingot 9000? A Complete Guide",
    description:
      "Everything you need to know about the Alibarbar Ingot 9000 disposable vape — puff count, battery, e-liquid capacity, LED display, flavours and who it suits.",
    category: "Product Guide",
    readTime: "6 min read",
    datePublished: "2026-02-01",
    dateModified: "2026-07-01",
    intro:
      "The Alibarbar Ingot 9000 is a premium disposable vape built for adult users who want a long-lasting, no-fuss device. This guide explains exactly what it is, how it performs, and how to decide if it is right for you.",
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "The Alibarbar Ingot 9000 is a pre-filled, pre-charged disposable vape rated for up to 9000 puffs per device. It arrives ready to use straight out of the box — there is no filling, no charging and no buttons to press.",
          "Its signature feature is the gold ingot-bar design paired with a built-in smart LED display that shows the remaining battery and e-liquid at a glance, so you always know when it is time for a replacement.",
        ],
      },
      {
        heading: "Key specifications",
        paragraphs: ["Here are the core specs that define the Ingot 9000 experience:"],
        bullets: [
          "Up to 9000 puffs per device",
          "22ml pre-filled e-liquid capacity",
          "2350mAh built-in (non-rechargeable) battery",
          "Smart LED display for battery and e-liquid levels",
          "Inhale-activated — no buttons or setup",
          "Net weight around 90g",
        ],
      },
      {
        heading: "How it performs",
        paragraphs: [
          "Because the battery is sized to match the large 22ml e-liquid capacity, the Ingot delivers consistent vapour and flavour from the first puff to the last, without the fade you sometimes get from smaller devices.",
          "The inhale-activated draw is smooth and forgiving, which makes it a comfortable choice for adult vapers who prefer a simple mouth-to-lung style.",
        ],
      },
      {
        heading: "Who it is for",
        paragraphs: [
          "The Ingot 9000 suits existing adult smokers and vapers who want a dependable, long-lasting device without the maintenance of a refillable kit. It is not intended for non-smokers, anyone under 18, or people who are pregnant or breastfeeding.",
        ],
      },
    ],
    faq: [
      {
        question: "Is the Alibarbar Ingot 9000 rechargeable?",
        answer:
          "No. It is a non-rechargeable disposable device that comes pre-charged with a 2350mAh battery sized to last the full e-liquid capacity.",
      },
      {
        question: "How many puffs does it really give?",
        answer:
          "It is rated for up to 9000 puffs. The exact number depends on how long and hard you draw, but most users get many days of use per device.",
      },
    ],
    relatedProducts: ["quadruple-berry", "mango-magic", "custom-5-pack"],
    relatedGuides: ["how-long-does-alibarbar-ingot-9000-last", "how-to-use-a-disposable-vape"],
  },
  {
    slug: "how-long-does-alibarbar-ingot-9000-last",
    title: "How Long Does the Alibarbar Ingot 9000 Last?",
    description:
      "Find out how long an Alibarbar Ingot 9000 lasts based on your daily puff count, plus tips to make each device last longer.",
    category: "Usage Guide",
    readTime: "5 min read",
    datePublished: "2026-02-05",
    dateModified: "2026-07-01",
    intro:
      "One of the most common questions we get is how long a single Alibarbar Ingot 9000 will last. The honest answer is: it depends on how you vape. Here is a realistic breakdown.",
    sections: [
      {
        heading: "The simple maths",
        paragraphs: [
          "Each device is rated for up to 9000 puffs. If you divide that by your typical daily puff count, you get a rough estimate of how many days it will last.",
        ],
        bullets: [
          "Light use (~150 puffs/day): around 6 weeks",
          "Average use (~300 puffs/day): around 3-4 weeks",
          "Heavy use (~600 puffs/day): around 2 weeks",
        ],
      },
      {
        heading: "Why your mileage varies",
        paragraphs: [
          "Puff length matters. A long, deep draw uses far more e-liquid and battery than a short one, so two people with the same device can get very different lifespans.",
          "Temperature and storage also play a role. Leaving a device in a hot car or in direct sunlight can degrade the battery and e-liquid faster than normal.",
        ],
      },
      {
        heading: "How to make it last longer",
        paragraphs: ["A few small habits can noticeably extend the life of each device:"],
        bullets: [
          "Take shorter, gentler puffs instead of long hard draws",
          "Store it upright in a cool, dry place",
          "Avoid chain-vaping, which can flood the coil",
          "Check the LED display so you can plan a replacement before it runs out",
        ],
      },
    ],
    faq: [
      {
        question: "Why did my device run out early?",
        answer:
          "Long, hard draws and chain-vaping use e-liquid and battery much faster. Heat exposure can also shorten lifespan. Gentler puffs and cool storage help.",
      },
    ],
    relatedProducts: ["peach-ice", "grape-ice"],
    relatedGuides: ["what-is-alibarbar-ingot-9000", "how-many-puffs-does-alibarbar-ingot-9000-have"],
  },
  {
    slug: "how-many-puffs-does-alibarbar-ingot-9000-have",
    title: "How Many Puffs Does the Alibarbar Ingot 9000 Have?",
    description:
      "The Alibarbar Ingot 9000 is rated for up to 9000 puffs. Learn what that number means in practice and how puff counts are measured.",
    category: "Usage Guide",
    readTime: "4 min read",
    datePublished: "2026-02-08",
    dateModified: "2026-07-01",
    intro:
      "The '9000' in the name refers to the device's rated puff count. But what does 9000 puffs actually mean day to day? Here is a plain-English explanation.",
    sections: [
      {
        heading: "What 9000 puffs means",
        paragraphs: [
          "A puff rating is a manufacturer estimate of how many draws you can take before the e-liquid runs out, based on standardised short puffs in testing conditions.",
          "In real life, your puffs will usually be longer than the test puffs, so treat 9000 as an upper bound rather than a guarantee.",
        ],
      },
      {
        heading: "How puff count relates to e-liquid",
        paragraphs: [
          "The Ingot holds 22ml of e-liquid and pairs it with a 2350mAh battery. This large capacity is what allows the high puff rating, and it means the battery is designed to outlast typical usage without recharging.",
        ],
      },
      {
        heading: "Getting the most puffs",
        paragraphs: [
          "To get closer to the rated number, take steady, moderate puffs rather than long hard pulls, and let the coil rest a moment between draws. This keeps vapour production efficient across the life of the device.",
        ],
      },
    ],
    relatedProducts: ["strawberry-ice", "blackberry-ice"],
    relatedGuides: ["how-long-does-alibarbar-ingot-9000-last", "what-is-alibarbar-ingot-9000"],
  },
  {
    slug: "can-you-recharge-alibarbar-ingot-9000",
    title: "Can You Recharge the Alibarbar Ingot 9000?",
    description:
      "A clear safety guide explaining whether the Alibarbar Ingot 9000 can be recharged, how to read the LED display, and what to do when the device is finished.",
    category: "Battery Guide",
    readTime: "6 min read",
    datePublished: "2026-02-10",
    dateModified: "2026-07-07",
    intro:
      "Many people search for how to recharge the Alibarbar Ingot 9000. The important answer is simple: the Ingot 9000 is a non-rechargeable disposable device, so it should not be charged or modified. This guide explains why, how the battery is designed to work, and how to know when it is time to replace the device.",
    sections: [
      {
        heading: "Short answer: no, it is not rechargeable",
        paragraphs: [
          "The Alibarbar Ingot 9000 is designed as an all-in-one disposable vape. It comes pre-filled, pre-charged, and ready to use without cables, pods, tanks or setup.",
          "Unlike rechargeable pod systems, the Ingot 9000 does not have a consumer charging port intended for repeated use. If the battery or e-liquid is finished, the device has reached the end of its service life and should be replaced.",
        ],
      },
      {
        heading: "Why the battery is built this way",
        paragraphs: [
          "The device pairs a 2350mAh built-in battery with a 22ml e-liquid capacity. That battery is sized to support the full disposable life of the product under normal use, which is why there is no charging step in the user experience.",
          "This design keeps the device simple: remove it from the packaging, take a gentle draw, monitor the smart LED display, and replace it when the battery or e-liquid indicator reaches the end.",
        ],
      },
      {
        heading: "Why you should not try to charge it yourself",
        paragraphs: [
          "Trying to charge, open, pierce or modify a non-rechargeable disposable vape can create safety risks. The device was not designed for user servicing, and forcing a charge can damage the internal battery or electronics.",
          "If a guide or video suggests opening the device, adding wires, or using an improvised charger, do not follow it. The safer and intended approach is to replace the device when it is finished.",
        ],
        bullets: [
          "Do not open the casing",
          "Do not connect improvised charging wires",
          "Do not puncture or crush the battery area",
          "Do not leave a used device in extreme heat",
        ],
      },
      {
        heading: "How to tell when it is finished",
        paragraphs: [
          "The built-in LED display is the easiest way to understand the device's remaining life. If the e-liquid level is empty, the device is finished even if a small amount of battery remains. If the battery level is empty and vapour production drops, it is also time to replace it.",
          "A flashing light, weak vapour, burnt taste, or very little flavour usually means the device has reached the end of its usable life.",
        ],
      },
      {
        heading: "What to do with a finished device",
        paragraphs: [
          "Because disposable vapes contain a lithium battery, they should not be thrown loose into general household rubbish where battery recycling is available. Look for an e-waste or battery recycling drop-off point in your area.",
          "Store used devices away from children and pets until you can dispose of them responsibly.",
        ],
      },
    ],
    faq: [
      {
        question: "Does the Alibarbar Ingot 9000 have a charging port?",
        answer:
          "No. It is a non-rechargeable disposable vape and is not designed to be charged by the user.",
      },
      {
        question: "What should I do if the battery indicator is empty?",
        answer:
          "If the battery indicator is empty and vapour production has dropped, the device has reached the end of its life and should be replaced.",
      },
      {
        question: "Is it safe to open the device and charge the battery manually?",
        answer:
          "No. Opening or modifying a non-rechargeable disposable vape can damage the battery and electronics. Do not attempt it.",
      },
    ],
    relatedProducts: ["custom-5-pack", "peach-ice", "quadruple-berry"],
    relatedGuides: ["how-long-does-alibarbar-ingot-9000-last", "how-many-puffs-does-alibarbar-ingot-9000-have"],
  },
  {
    slug: "how-to-use-a-disposable-vape",
    title: "How to Use a Disposable Vape (Beginner's Guide)",
    description:
      "A simple step-by-step guide to using a disposable vape like the Alibarbar Ingot 9000, including draw technique, troubleshooting and storage.",
    category: "Beginner Guide",
    readTime: "5 min read",
    datePublished: "2026-02-12",
    dateModified: "2026-07-01",
    intro:
      "Disposable vapes are designed to be as simple as possible. If you have never used one before, this beginner's guide walks you through everything from the first puff to safe storage.",
    sections: [
      {
        heading: "Step 1: Unbox the device",
        paragraphs: [
          "Remove the Alibarbar Ingot from its packaging and take off any protective cap or sticker on the mouthpiece and air intake. The device is already charged and filled, so there is nothing to assemble.",
        ],
      },
      {
        heading: "Step 2: Take a gentle draw",
        paragraphs: [
          "The Ingot is inhale-activated, so you simply put the mouthpiece to your lips and draw — no buttons required. Start with a short, gentle puff to gauge the airflow and flavour before taking longer draws.",
        ],
      },
      {
        heading: "Step 3: Read the display",
        paragraphs: [
          "Glance at the built-in LED display to see the remaining battery and e-liquid. This helps you plan a replacement before the device runs out mid-day.",
        ],
      },
      {
        heading: "Troubleshooting",
        paragraphs: ["If the device is not producing vapour as expected, try these quick checks:"],
        bullets: [
          "Take a slightly gentler puff — drawing too hard can trigger the auto cut-off",
          "Make sure the air intake is not covered by your fingers",
          "If the light flashes and there is little vapour, the device has likely reached the end of its life",
        ],
      },
    ],
    faq: [
      {
        question: "Do I need to charge a disposable vape?",
        answer:
          "No. The Alibarbar Ingot is non-rechargeable and comes pre-charged. When the battery or e-liquid runs out, you replace the whole device.",
      },
    ],
    relatedProducts: ["custom-5-pack", "fanta"],
    relatedGuides: ["what-is-alibarbar-ingot-9000", "disposable-vape-laws-in-australia"],
  },
  {
    slug: "best-alibarbar-flavours-australia",
    title: "The Best Alibarbar Ingot 9000 Flavours in Australia",
    description:
      "A rundown of the most popular Alibarbar Ingot 9000 flavours in Australia, from fruity to iced, to help you choose your next device.",
    category: "Buying Guide",
    readTime: "6 min read",
    datePublished: "2026-02-16",
    dateModified: "2026-07-01",
    intro:
      "With ten flavours in the current line-up plus a build-your-own custom pack, choosing can be tricky. Here is a guide to the most popular Alibarbar Ingot 9000 flavours and who each one suits.",
    sections: [
      {
        heading: "Best for fruit lovers",
        paragraphs: [
          "If you like bright, juicy fruit without a heavy menthol chill, Quadruple Berry is a crowd favourite — it layers strawberry, raspberry, blackberry and blueberry into one lush blend. Mango Magic and Strawberry Watermelon are also excellent all-day fruit options.",
        ],
      },
      {
        heading: "Best iced flavours",
        paragraphs: [
          "For a cool finish, the iced range delivers. Peach Ice, Grape Ice, Blackberry Ice and Strawberry Ice all pair ripe fruit with a crisp menthol exhale, making them ideal for warm Australian days.",
        ],
      },
      {
        heading: "Best for something different",
        paragraphs: [
          "Fanta brings a fizzy orange-soda twist, while Lychee offers a delicate, floral sweetness that stands out from the usual berry and ice profiles. Strawberry Coconut Watermelon adds a creamy, tropical layer for those who want something richer.",
        ],
      },
      {
        heading: "Can't decide? Build a custom pack",
        paragraphs: [
          "If you want to sample several profiles, the 5 Flavour Custom Pack lets you choose any five flavours from the current collection in one order — a great way to find your favourite before committing to a single flavour.",
        ],
      },
    ],
    relatedProducts: ["quadruple-berry", "peach-ice", "custom-5-pack"],
    relatedGuides: ["what-is-alibarbar-ingot-9000", "how-to-use-a-disposable-vape"],
  },
  {
    slug: "disposable-vape-laws-in-australia",
    title: "Disposable Vape Laws in Australia: What Adults Should Know",
    description:
      "A general overview of vaping rules in Australia, including the 18+ age requirement and responsible-use guidance. Not legal advice.",
    category: "Australia Guide",
    readTime: "5 min read",
    datePublished: "2026-02-20",
    dateModified: "2026-07-01",
    intro:
      "Vaping regulation in Australia changes over time and can vary by state and territory. This is a general, plain-English overview for adult consumers — it is not legal advice, so always check the current rules that apply to you.",
    sections: [
      {
        heading: "Strictly 18+",
        paragraphs: [
          "Vaping products in Australia are for adults aged 18 and over. Alibarbar Australia requires every customer to confirm they meet the legal age requirement before ordering, and we do not sell to minors under any circumstances.",
        ],
      },
      {
        heading: "For existing smokers and vapers",
        paragraphs: [
          "Vaping products are intended to be used only by adults who already smoke or vape. They are not suitable for non-smokers, young people, or anyone who is pregnant or breastfeeding.",
        ],
      },
      {
        heading: "Use and store responsibly",
        paragraphs: [
          "Keep devices away from children and pets, store them out of direct heat, and dispose of used devices responsibly at an e-waste or battery recycling point rather than in general rubbish.",
        ],
      },
      {
        heading: "Rules can change",
        paragraphs: [
          "Because regulations are updated periodically and differ across jurisdictions, we encourage customers to stay informed about the current requirements in their own state or territory. This page is provided for general information only.",
        ],
      },
    ],
    relatedGuides: ["how-to-use-a-disposable-vape", "what-is-alibarbar-ingot-9000"],
  },
];

export function getGuideBySlug(slug: string | undefined): Guide | undefined {
  if (!slug) return undefined;
  return guides.find((g) => g.slug === slug);
}

import quadrupleBerry from "@/assets/flavor-quadruple-berry.png";
import fanta from "@/assets/flavor-fanta.png";
import lychee from "@/assets/flavor-lychee.png";
import peachIce from "@/assets/flavor-peach-ice.png";
import blackberry from "@/assets/flavor-blackberry.png";
import strawberryCoconutWatermelon from "@/assets/flavor-strawberry-coconut-watermelon.png";
import grape from "@/assets/flavor-grape.png";
import mango from "@/assets/flavor-mango.png";
import strawberryWatermelon from "@/assets/flavor-strawberry-watermelon.png";
import strawberryIce from "@/assets/flavor-strawberry-ice.png";
import custom5Pack from "@/assets/custom-5-pack.png";
import custom10Pack from "@/assets/Alibarbar-10-pcs_1800x.webp";
import custom20Pack from "@/assets/custom-20-pack.png";
import { CATALOGUE_PRICES_AUD, NICOTINE, PRODUCT_FAMILY } from "@/data/canonical-facts";
import { getFlavourBySlug } from "@/data/flavours";

export type Product = {
  slug: string;
  name: string;
  price: string;
  /** Original retail price shown struck-through when on promotion. */
  originalPrice?: string;
  img: string;
  tag: string;
  /** Short intro under title */
  excerpt: string;
  /** Long-form PDP copy */
  description: string;
  specs: string[];
  inStock: boolean;
  /** Reserved slot: placeholder art, not for sale yet */
  isPlaceholder?: boolean;
  /** Customers choose existing flavours on the PDP before checkout. */
  isCustomPack?: boolean;
  /** Number of flavour selector slots for a custom pack. */
  customPackSize?: number;
};

const DEVICE_NOTE = `Hardware is the same across single-flavour Ingot 9000 units: ${PRODUCT_FAMILY.puffSpec}, ${PRODUCT_FAMILY.eLiquidMl}ml pre-filled tank, ${PRODUCT_FAMILY.batteryMah}mAh non-rechargeable battery, mesh coil, inhale activation and a smart LED for battery and e-liquid. ${PRODUCT_FAMILY.puffNote}`;

const sharedSpecs = [
  "1 × ALIBARBAR Ingot 9000 sealed disposable",
  `Net weight: approx. ${PRODUCT_FAMILY.netWeightG}g`,
  "Pre-charged, inhale-activated — no buttons, filling or charging",
  PRODUCT_FAMILY.puffSpec,
  `${PRODUCT_FAMILY.eLiquidMl}ml tank · ${PRODUCT_FAMILY.batteryMah}mAh battery · ${PRODUCT_FAMILY.coil} coil`,
  "Smart LED for remaining battery and e-liquid",
];

const mangoMagicDescription = `${DEVICE_NOTE}

Mango Magic is ripe mango flesh — tropical, dense and almost ice-free. It sits warmer and sweeter than Lychee, and thicker than Strawberry Watermelon. Use it as a non-menthol daily fruit SKU; pair it with Peach Ice or Grape Ice in a custom pack if you want contrast.`;

const strawberryCoconutWatermelonDescription = `${DEVICE_NOTE}

Strawberry Coconut Watermelon stacks jammy strawberry, a coconut-cream middle and watermelon on the exhale. The coconut is what separates it from Strawberry Watermelon: creamier, slower, less “splashy”. Skip it if you want a single-note fruit or a strong ice finish.`;

const grapeIceDescription = `${DEVICE_NOTE}

Grape Ice is candy grape with a clear menthol finish. It is colder and more linear than Peach Ice, and less tart than Blackberry Ice. If you want grape without ice, this SKU is not that — cooling is part of the profile from the first draw.`;

const strawberryWatermelonOnlyDescription = `${DEVICE_NOTE}

Strawberry Watermelon is strawberry body plus watery watermelon, with no menthol. It is simpler and lighter than Quadruple Berry and has none of the coconut in Strawberry Coconut Watermelon. Choose Strawberry Ice instead if you want the same fruit family with a frosty finish.`;

const strawberryIceDescription = `${DEVICE_NOTE}

Strawberry Ice is candy strawberry with a strong icy exhale. It is colder than Peach Ice and more straightforward than Blackberry Ice (no dark-berry tartness). It is not the same SKU as Strawberry Watermelon — that listing has no menthol.`;

const quadrupleBerryDescription = `${DEVICE_NOTE}

Quadruple Berry is strawberry, raspberry, blackberry and blueberry in one mixed-berry profile — jammy, low ice. It is the default non-menthol fruit SKU if you do not already have a favourite. It is not blueberry-only; for ice, use Peach Ice, Grape Ice, Blackberry Ice or Strawberry Ice.`;

const fantaDescription = `${DEVICE_NOTE}

Fanta is orange-soda citrus — bright, sweet and fizzy-coded rather than fresh-squeezed orange. It is the only soda-style SKU in the current range. If you want fruit without the soft-drink note, Quadruple Berry or Mango Magic is a closer match.`;

const lycheeDescription = `${DEVICE_NOTE}

Lychee is light floral fruit, not candy. Sweetness sits below Quadruple Berry and Fanta; cooling is near zero. It is the contrast SKU in a mixed pack: use it when berry or ice flavours start to feel heavy.`;

const peachIceDescription = `${DEVICE_NOTE}

Peach Ice is orchard peach with a moderate icy finish — sweeter and less tart than Blackberry Ice, and less candy-cold than Strawberry Ice. Hardware is identical to other single-flavour Ingot 9000 units; the difference is the e-liquid, not the battery or tank.`;

const blackberryIceDescription = `${DEVICE_NOTE}

Blackberry Ice is dark blackberry with a strong icy finish — tart where Peach Ice is sweet, and darker than Grape Ice. Menthol is part of the SKU, not an optional layer. If you want mixed berry without ice, use Quadruple Berry.`;

export const products: Product[] = [
  {
    slug: "custom-5-pack",
    name: "5 Flavour Custom Pack",
    price: String(CATALOGUE_PRICES_AUD.pack5),
    originalPrice: "200",
    img: custom5Pack,
    tag: "Best Value",
    excerpt:
      "Choose any five Alibarbar Ingot flavours from the current collection and build your own mixed 5-piece pack.",
    description: `Build your own Alibarbar Ingot 5-piece pack by choosing any five flavours from the current collection.

Each pack includes five Alibarbar Ingot 9000 Puffs devices. Select your preferred flavour for each slot before adding the pack to cart, and your choices will be saved into the order for fulfilment.`,
    specs: [
      "5 × ALIBARBAR Ingot 9000 sealed disposables",
      "Choose any 5 flavours from the current collection",
      "Pre-charged and inhale-activated — no buttons, filling or charging",
      PRODUCT_FAMILY.puffSpec,
      "Smart LED for remaining battery and e-liquid",
    ],
    inStock: true,
    isCustomPack: true,
    customPackSize: 5,
  },
  {
    slug: "custom-10-pack",
    name: "10 Flavour Custom Pack",
    price: String(CATALOGUE_PRICES_AUD.pack10),
    originalPrice: "550",
    img: custom10Pack,
    tag: "Bulk Pack",
    excerpt:
      "Choose any ten Alibarbar Ingot flavours from the current collection and build your own mixed 10-piece pack.",
    description: `Build your own Alibarbar Ingot 10-piece pack by choosing any ten flavours from the current collection.

Each pack includes ten Alibarbar Ingot 9000 Puffs devices. Select your preferred flavour for each slot before adding the pack to cart, and your choices will be saved into the order for fulfilment.`,
    specs: [
      "10 × ALIBARBAR Ingot 9000 sealed disposables",
      "Choose any 10 flavours from the current collection",
      "Pre-charged and inhale-activated — no buttons, filling or charging",
      PRODUCT_FAMILY.puffSpec,
      "Smart LED for remaining battery and e-liquid",
    ],
    inStock: true,
    isCustomPack: true,
    customPackSize: 10,
  },
  {
    slug: "custom-20-pack",
    name: "20 Flavour Custom Pack",
    price: String(CATALOGUE_PRICES_AUD.pack20),
    originalPrice: "1100",
    img: custom20Pack,
    tag: "Free Shipping",
    excerpt:
      "Choose any twenty Alibarbar Ingot flavours from the current collection and build your own mixed 20-piece pack — free Regular Post shipping included.",
    description: `Build your own Alibarbar Ingot 20-piece pack by choosing any twenty flavours from the current collection.

Each pack includes twenty Alibarbar Ingot 9000 Puffs devices. Select your preferred flavour for each slot before adding the pack to cart, and your choices will be saved into the order for fulfilment. Orders of 20 or more devices ship free via Regular Post.`,
    specs: [
      "20 × ALIBARBAR Ingot 9000 sealed disposables",
      "Choose any 20 flavours from the current collection",
      "Free Regular Post shipping on this pack (20+ devices)",
      "Pre-charged and inhale-activated — no buttons, filling or charging",
      PRODUCT_FAMILY.puffSpec,
      "Smart LED for remaining battery and e-liquid",
    ],
    inStock: true,
    isCustomPack: true,
    customPackSize: 20,
  },
  {
    slug: "quadruple-berry",
    name: "Quadruple Berry",
    price: String(CATALOGUE_PRICES_AUD.single),
    originalPrice: "55",
    img: quadrupleBerry,
    tag: "Fruity",
    excerpt:
      "The Alibarbar Ingot Quadruple Berry blends strawberry, raspberry, blackberry, and blueberry into one bold berry fusion — lush, juicy, and refreshingly smooth from start to finish.",
    description: quadrupleBerryDescription,
    specs: sharedSpecs,
    inStock: true,
  },
  {
    slug: "fanta",
    name: "Fanta",
    price: String(CATALOGUE_PRICES_AUD.single),
    originalPrice: "55",
    img: fanta,
    tag: "Citrus",
    excerpt:
      "The Alibarbar Ingot Fanta delivers a burst of bright citrus fizz with sweet orange soda notes — bold, refreshing, and smooth from start to finish.",
    description: fantaDescription,
    specs: sharedSpecs,
    inStock: true,
  },
  {
    slug: "lychee",
    name: "Lychee",
    price: String(CATALOGUE_PRICES_AUD.single),
    originalPrice: "55",
    img: lychee,
    tag: "Fruity",
    excerpt:
      "The Alibarbar Ingot Lychee delivers delicate ripe lychee sweetness with a light floral lift — juicy, fragrant, and refreshingly smooth from start to finish.",
    description: lycheeDescription,
    specs: sharedSpecs,
    inStock: false,
  },
  {
    slug: "peach-ice",
    name: "Peach Ice",
    price: String(CATALOGUE_PRICES_AUD.single),
    originalPrice: "55",
    img: peachIce,
    tag: "Iced",
    excerpt:
      "The Alibarbar Ingot Peach Ice layers lush orchard peach with a crisp icy finish — sweet, juicy, and refreshingly cool from start to finish.",
    description: peachIceDescription,
    specs: sharedSpecs,
    inStock: true,
  },
  {
    slug: "blackberry-ice",
    name: "Blackberry Ice",
    price: String(CATALOGUE_PRICES_AUD.single),
    originalPrice: "55",
    img: blackberry,
    tag: "Iced",
    excerpt:
      "The Alibarbar Ingot 9000 Blackberry Ice combines the rich, juicy taste of ripe blackberries with a crisp icy twist. This refreshing fusion delivers a smooth, cooling sensation, making it an ideal choice for anyone who enjoys fruity flavours with a cool menthol edge.",
    description: blackberryIceDescription,
    specs: sharedSpecs,
    inStock: true,
  },
  {
    slug: "mango-magic",
    name: "Mango Magic",
    price: String(CATALOGUE_PRICES_AUD.single),
    originalPrice: "55",
    img: mango,
    tag: "Tropical",
    excerpt:
      "The Alibarbar Ingot Mango Magic delivers ripe, juicy mango sweetness with a smooth, luscious finish, creating a bold and tropical vape experience you'll love.",
    description: mangoMagicDescription,
    specs: sharedSpecs,
    inStock: true,
  },
  {
    slug: "strawberry-coconut-watermelon",
    name: "Strawberry Coconut Watermelon",
    price: String(CATALOGUE_PRICES_AUD.single),
    originalPrice: "55",
    img: strawberryCoconutWatermelon,
    tag: "Tropical",
    excerpt:
      "The Alibarbar Ingot Strawberry Coconut Watermelon blends ripe strawberry, silky coconut cream, and juicy watermelon — lush, tropical, and refreshingly smooth from start to finish.",
    description: strawberryCoconutWatermelonDescription,
    specs: sharedSpecs,
    inStock: true,
  },
  {
    slug: "grape-ice",
    name: "Grape Ice",
    price: String(CATALOGUE_PRICES_AUD.single),
    originalPrice: "55",
    img: grape,
    tag: "Iced",
    excerpt:
      "The Alibarbar Ingot Grape Ice delivers bold, juicy grape flavour with a crisp icy finish — vibrant, smooth, and refreshingly cool.",
    description: grapeIceDescription,
    specs: sharedSpecs,
    inStock: true,
  },
  {
    slug: "strawberry-watermelon",
    name: "Strawberry Watermelon",
    price: String(CATALOGUE_PRICES_AUD.single),
    originalPrice: "55",
    img: strawberryWatermelon,
    tag: "Fruity",
    excerpt:
      "The Alibarbar Ingot Strawberry Watermelon combines ripe strawberry punch with chilled watermelon juice — splashy, sweet, and refreshingly smooth.",
    description: strawberryWatermelonOnlyDescription,
    specs: sharedSpecs,
    inStock: true,
  },
  {
    slug: "strawberry-ice",
    name: "Strawberry Ice",
    price: String(CATALOGUE_PRICES_AUD.single),
    originalPrice: "55",
    img: strawberryIce,
    tag: "Iced",
    excerpt:
      "The Alibarbar Ingot Strawberry Ice pairs sweet ripe strawberry with an icy-cool exhale — juicy, crisp, and refreshingly smooth from start to finish.",
    description: strawberryIceDescription,
    specs: sharedSpecs,
    inStock: true,
  },
];

/** Technical specs shared by every single-device Alibarbar Ingot listing. */
export const deviceSpecifications: { label: string; value: string }[] = [
  { label: "Puff count", value: PRODUCT_FAMILY.puffSpec },
  { label: "E-liquid capacity", value: `${PRODUCT_FAMILY.eLiquidMl}ml (pre-filled)` },
  { label: "Battery", value: `${PRODUCT_FAMILY.batteryMah}mAh (non-rechargeable)` },
  { label: "Activation", value: "Inhale-activated, no buttons" },
  { label: "Display", value: "Smart LED battery & e-liquid indicator" },
  { label: "Coil", value: "Mesh coil for consistent flavour" },
  { label: "Net weight", value: `Approx. ${PRODUCT_FAMILY.netWeightG}g` },
  { label: "Nicotine", value: NICOTINE.short },
];

/** How-to-use steps shown on every product page. */
export const howToUseSteps: string[] = [
  "Remove the device from its packaging and take off any protective cap or sticker.",
  "Put the mouthpiece to your lips and take a gentle draw — it is inhale-activated, so there are no buttons.",
  "Check the built-in LED display to monitor remaining battery and e-liquid.",
  "When the display reads empty or the light flashes with little vapour, the device has reached the end of its life.",
];

/** Builds a product-specific FAQ used for both display and FAQPage schema. */
export function getProductFaq(product: Product): { question: string; answer: string }[] {
  if (product.isCustomPack) {
    const packSize = product.customPackSize ?? 5;
    const freeShipNote =
      packSize >= 20
        ? " This pack qualifies for free Regular Post shipping (20+ devices)."
        : "";
    return [
      {
        question: `How does the ${packSize} Flavour Custom Pack work?`,
        answer:
          `Choose any ${packSize} flavours from the current Alibarbar Ingot collection before adding the pack to your cart. Repeats are allowed and your selections are saved with your order for fulfilment.${freeShipNote}`,
      },
      {
        question: "Is the custom pack cheaper than buying singles?",
        answer:
          `Yes. The ${packSize} Flavour Custom Pack gives you a lower bundle price than buying the same number of single devices individually.`,
      },
      {
        question: "Can I choose the same flavour more than once?",
        answer: "Absolutely. You can pick the same flavour in multiple slots if you already know your favourite.",
      },
    ];
  }

  const flavour = getFlavourBySlug(product.slug);
  const faq: { question: string; answer: string }[] = [
    {
      question: `How many puffs does the ${product.name} give?`,
      answer:
        `Each Alibarbar Ingot device is ${PRODUCT_FAMILY.puffSpec.toLowerCase()}. ${PRODUCT_FAMILY.puffNote}`,
    },
  ];

  if (flavour) {
    const cooling =
      flavour.coolness >= 3
        ? " It has a noticeable iced finish."
        : flavour.coolness <= 1
          ? " It is a low-menthol, smooth fruit profile."
          : "";
    faq.push({
      question: `What does ${product.name} taste like?`,
      answer: `${flavour.tastingNotes[0]}${cooling} See the full taste profile at /flavours/${product.slug}.`,
    });
    if (flavour.faq[0]) {
      faq.push(flavour.faq[0]);
    }
  }

  faq.push(
    {
      question: `Is the ${product.name} rechargeable?`,
      answer:
        "No. It is a non-rechargeable disposable device that comes pre-charged with a 2350mAh battery sized to last the full 22ml of e-liquid.",
    },
    {
      question: "How long does delivery take in Australia?",
      answer:
        "Orders are dispatched after your bank transfer is confirmed and typically arrive within 3-7 business days, depending on your state. Shipping is A$15 for 1–9 devices, A$10 for 10–19 devices, and free for 20+ devices.",
    },
    {
      question: "Is this a genuine Alibarbar device?",
      answer:
        "Check ALIBARBAR branding, a working smart LED, and specs that match up to 9000 puffs, 22ml and 2350mAh. You can also photograph the honeycomb seal at /verify. See /guides/how-to-spot-fake-alibarbar-ingot for the full checklist.",
    },
    {
      question: "What nicotine strength is in this device?",
      answer: NICOTINE.statement,
    },
  );

  return faq;
}

export function getProductBySlug(slug: string | undefined): Product | undefined {
  if (!slug) return undefined;
  return products.find((p) => p.slug === slug);
}

export function getSelectableFlavorProducts(): Product[] {
  return products.filter((p) => !p.isPlaceholder && !p.isCustomPack && p.inStock);
}

export function getRelatedProducts(slug: string, limit = 4): Product[] {
  return products
    .filter((p) => p.slug !== slug && !p.isPlaceholder && p.inStock)
    .slice(0, limit);
}

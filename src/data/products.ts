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
import custom3Pack from "@/assets/Alibarbar-3-pcs_1800x.webp";
import custom5Pack from "@/assets/custom-5-pack.png";
import custom10Pack from "@/assets/Alibarbar-10-pcs_1800x.webp";

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

const sharedBody = `The Alibarbar Ingot 9000 Puffs is a high-quality disposable vape designed for users who want reliability, flavour, and extended use in one sleek device. Offering up to 9000 puffs per unit, this disposable vape is ideal for adult users seeking a long-lasting option without the hassle of refilling or charging.

With a generous 22ml e-liquid capacity and a strong 2350mAh built-in battery, the Alibarbar Ingot provides consistent vapour production from start to finish. This non-rechargeable disposable vape is inhale-activated, making it simple and convenient to use straight out of the box. Its advanced internal design ensures smooth draws and rich flavour delivery throughout the life of the device.

Perfect for those searching for high puff disposable vapes or a dependable everyday device, the Alibarbar Ingot 9000 Puffs combines performance with a clean, modern design.`;

const sharedSpecs = [
  "1 × ALIBARBAR Ingot disposable vape device",
  "Net weight: 90g",
  "Pre-charged and inhale-activated — ready to use out of the box",
  "Delivers up to 9000+ puffs per device",
  "Built-in LED display for monitoring battery level and e-liquid usage",
];

const mangoMagicDescription = `The Alibarbar Ingot 9000 Puffs is a high-quality disposable vape designed for users who want reliability, flavour, and extended use in one sleek device. Offering up to 9000 puffs per unit, this disposable vape is ideal for adult users seeking a long-lasting option without the hassle of refilling or charging.

With a generous 22ml e-liquid capacity and a strong 2350mAh built-in battery, the Alibarbar Ingot provides consistent vapour production from start to finish. This non-rechargeable disposable vape is inhale-activated, making it simple and convenient to use straight out of the box. Its advanced internal design ensures smooth draws and rich flavour delivery throughout the life of the device.

Perfect for those searching for high puff disposable vapes, Alibarbar Ingot flavours, or a dependable disposable vape in Australia, the Alibarbar Ingot 9000 Puffs combines performance with a clean, modern design. Whether for everyday use or as a reliable backup device, it delivers a premium vaping experience with no complications.`;

const mangoMagicSpecs = [
  "1 × ALIBARBAR Ingot disposable vape device",
  "Net weight: 90g",
  "Pre-charged and inhale-activated — ready to use out of the box",
  "Delivers up to 9000+ puffs per device",
  "Built-in LED display for monitoring battery level and e-liquid usage",
];

const strawberryCoconutWatermelonDescription = `The Alibarbar Ingot 9000 Puffs is a high-quality disposable vape designed for users who want reliability, flavour, and extended use in one sleek device. Offering up to 9000 puffs per unit, this disposable vape is ideal for adult users seeking a long-lasting option without the hassle of refilling or charging.

With a generous 22ml e-liquid capacity and a strong 2350mAh built-in battery, the Alibarbar Ingot provides consistent vapour production from start to finish. This non-rechargeable disposable vape is inhale-activated, making it simple and convenient to use straight out of the box. Its advanced internal design ensures smooth draws and rich flavour delivery throughout the life of the device.

Perfect for those searching for high puff disposable vapes, Alibarbar Ingot flavours, or a dependable disposable vape in Australia, the Alibarbar Ingot 9000 Puffs combines performance with a clean, modern design. Whether for everyday use or as a reliable backup device, it delivers a premium vaping experience with no complications.

Strawberry Coconut Watermelon layers jammy ripened strawberry with creamy coconut and chilled watermelon — tropical, bright, and lush from the first puff to the last.`;

const strawberryCoconutWatermelonSpecs = [
  "1 × ALIBARBAR Ingot disposable vape device",
  "Net weight: 90g",
  "Pre-charged and inhale-activated — ready to use out of the box",
  "Delivers up to 9000+ puffs per device",
  "Built-in LED display for monitoring battery level and e-liquid usage",
];

const grapeIceDescription = `The Alibarbar Ingot 9000 Puffs is a high-quality disposable vape designed for users who want reliability, flavour, and extended use in one sleek device. Offering up to 9000 puffs per unit, this disposable vape is ideal for adult users seeking a long-lasting option without the hassle of refilling or charging.

With a generous 22ml e-liquid capacity and a strong 2350mAh built-in battery, the Alibarbar Ingot provides consistent vapour production from start to finish. This non-rechargeable disposable vape is inhale-activated, making it simple and convenient to use straight out of the box. Its advanced internal design ensures smooth draws and rich flavour delivery throughout the life of the device.

Perfect for those searching for high puff disposable vapes, Alibarbar Ingot flavours, or a dependable disposable vape in Australia, the Alibarbar Ingot 9000 Puffs combines performance with a clean, modern design. Whether for everyday use or as a reliable backup device, it delivers a premium vaping experience with no complications.`;

const grapeIceSpecs = [
  "1 × ALIBARBAR Ingot disposable vape device",
  "Net weight: 90g",
  "Pre-charged and inhale-activated — ready to use out of the box",
  "Delivers up to 9000+ puffs per device",
  "Built-in LED display for monitoring battery level and e-liquid usage",
];

const strawberryWatermelonOnlyDescription = `The Alibarbar Ingot 9000 Puffs is a high-quality disposable vape designed for users who want reliability, flavour, and extended use in one sleek device. Offering up to 9000 puffs per unit, this disposable vape is ideal for adult users seeking a long-lasting option without the hassle of refilling or charging.

With a generous 22ml e-liquid capacity and a strong 2350mAh built-in battery, the Alibarbar Ingot provides consistent vapour production from start to finish. This non-rechargeable disposable vape is inhale-activated, making it simple and convenient to use straight out of the box. Its advanced internal design ensures smooth draws and rich flavour delivery throughout the life of the device.

Perfect for those searching for high puff disposable vapes, Alibarbar Ingot flavours, or a dependable disposable vape in Australia, the Alibarbar Ingot 9000 Puffs combines performance with a clean, modern design. Whether for everyday use or as a reliable backup device, it delivers a premium vaping experience with no complications.

Strawberry Watermelon pairs jam-packed berry sweetness with chilled, juicy watermelon — refreshing, splashy, and smooth from the first puff to the last.`;

const strawberryWatermelonOnlySpecs = [
  "1 × ALIBARBAR Ingot disposable vape device",
  "Net weight: 90g",
  "Pre-charged and inhale-activated — ready to use out of the box",
  "Delivers up to 9000+ puffs per device",
  "Built-in LED display for monitoring battery level and e-liquid usage",
];

const strawberryIceDescription = `The Alibarbar Ingot 9000 Puffs is a high-quality disposable vape designed for users who want reliability, flavour, and extended use in one sleek device. Offering up to 9000 puffs per unit, this disposable vape is ideal for adult users seeking a long-lasting option without the hassle of refilling or charging.

With a generous 22ml e-liquid capacity and a strong 2350mAh built-in battery, the Alibarbar Ingot provides consistent vapour production from start to finish. This non-rechargeable disposable vape is inhale-activated, making it simple and convenient to use straight out of the box. Its advanced internal design ensures smooth draws and rich flavour delivery throughout the life of the device.

Perfect for those searching for high puff disposable vapes, Alibarbar Ingot flavours, or a dependable disposable vape in Australia, the Alibarbar Ingot 9000 Puffs combines performance with a clean, modern design. Whether for everyday use or as a reliable backup device, it delivers a premium vaping experience with no complications.

Strawberry Ice wraps candy-sweet strawberry in a frosty menthol breeze — bright fruit up front, clean chill on the finish.`;

const quadrupleBerryDescription = `The Alibarbar Ingot 9000 Puffs is a high-quality disposable vape designed for users who want reliability, flavour, and extended use in one sleek device. Offering up to 9000 puffs per unit, this disposable vape is ideal for adult users seeking a long-lasting option without the hassle of refilling or charging.

With a generous 22ml e-liquid capacity and a strong 2350mAh built-in battery, the Alibarbar Ingot provides consistent vapour production from start to finish. This non-rechargeable disposable vape is inhale-activated, making it simple and convenient to use straight out of the box. Its advanced internal design ensures smooth draws and rich flavour delivery throughout the life of the device.

Perfect for those searching for high puff disposable vapes, Alibarbar Ingot flavours, or a dependable disposable vape in Australia, the Alibarbar Ingot 9000 Puffs combines performance with a clean, modern design. Whether for everyday use or as a reliable backup device, it delivers a premium vaping experience with no complications.

Quadruple Berry layers ripe strawberry, raspberry, blackberry, and blueberry into one lush berry medley — juicy, vibrant, and refreshingly smooth from the first puff to the last.`;

const fantaDescription = `The Alibarbar Ingot 9000 Puffs is a high-quality disposable vape designed for users who want reliability, flavour, and extended use in one sleek device. Offering up to 9000 puffs per unit, this disposable vape is ideal for adult users seeking a long-lasting option without the hassle of refilling or charging.

With a generous 22ml e-liquid capacity and a strong 2350mAh built-in battery, the Alibarbar Ingot provides consistent vapour production from start to finish. This non-rechargeable disposable vape is inhale-activated, making it simple and convenient to use straight out of the box. Its advanced internal design ensures smooth draws and rich flavour delivery throughout the life of the device.

Perfect for those searching for high puff disposable vapes, Alibarbar Ingot flavours, or a dependable disposable vape in Australia, the Alibarbar Ingot 9000 Puffs combines performance with a clean, modern design. Whether for everyday use or as a reliable backup device, it delivers a premium vaping experience with no complications.

Fanta Orange delivers a burst of bright citrus fizz with sweet orange soda notes — bold, refreshing, and unmistakably fizzy from the first draw to the last.`;

const lycheeDescription = `The Alibarbar Ingot 9000 Puffs is a high-quality disposable vape designed for users who want reliability, flavour, and extended use in one sleek device. Offering up to 9000 puffs per unit, this disposable vape is ideal for adult users seeking a long-lasting option without the hassle of refilling or charging.

With a generous 22ml e-liquid capacity and a strong 2350mAh built-in battery, the Alibarbar Ingot provides consistent vapour production from start to finish. This non-rechargeable disposable vape is inhale-activated, making it simple and convenient to use straight out of the box. Its advanced internal design ensures smooth draws and rich flavour delivery throughout the life of the device.

Perfect for those searching for high puff disposable vapes, Alibarbar Ingot flavours, or a dependable disposable vape in Australia, the Alibarbar Ingot 9000 Puffs combines performance with a clean, modern design. Whether for everyday use or as a reliable backup device, it delivers a premium vaping experience with no complications.

Lychee captures the delicate sweetness of ripe lychee fruit with a light floral lift — juicy, fragrant, and refreshingly smooth from the first puff to the last.`;

const peachIceDescription = `The Alibarbar Ingot 9000 Puffs is a high-quality disposable vape designed for users who want reliability, flavour, and extended use in one sleek device. Offering up to 9000 puffs per unit, this disposable vape is ideal for adult users seeking a long-lasting option without the hassle of refilling or charging.

With a generous 22ml e-liquid capacity and a strong 2350mAh built-in battery, the Alibarbar Ingot provides consistent vapour production from start to finish. This non-rechargeable disposable vape is inhale-activated, making it simple and convenient to use straight out of the box. Its advanced internal design ensures smooth draws and rich flavour delivery throughout the life of the device.

Perfect for those searching for high puff disposable vapes, Alibarbar Ingot flavours, or a dependable disposable vape in Australia, the Alibarbar Ingot 9000 Puffs combines performance with a clean, modern design. Whether for everyday use or as a reliable backup device, it delivers a premium vaping experience with no complications.

Peach Ice pairs lush orchard peach with a crisp icy finish — sweet, juicy, and refreshingly cool from the first puff to the last.`;

const strawberryIceSpecs = [
  "1 × ALIBARBAR Ingot disposable vape device",
  "Net weight: 90g",
  "Pre-charged and inhale-activated — ready to use out of the box",
  "Delivers up to 9000+ puffs per device",
  "Built-in LED display for monitoring battery level and e-liquid usage",
];

export const products: Product[] = [
  {
    slug: "custom-3-pack",
    name: "3 Flavour Custom Pack",
    price: "150",
    originalPrice: "180",
    img: custom3Pack,
    tag: "3 Pack",
    excerpt:
      "Choose any three Alibarbar Ingot flavours from the current collection and build your own mixed 3-piece pack.",
    description: `Build your own Alibarbar Ingot 3-piece pack by choosing any three flavours from the current collection.

Each pack includes three Alibarbar Ingot 9000 Puffs devices. Select your preferred flavour for each slot before adding the pack to cart, and your choices will be saved into the order for fulfilment.`,
    specs: [
      "3 × ALIBARBAR Ingot disposable vape devices",
      "Choose any 3 flavours from the current collection",
      "Pre-charged and inhale-activated — ready to use out of the box",
      "Delivers up to 9000+ puffs per device",
      "Built-in LED display for monitoring battery level and e-liquid usage",
    ],
    inStock: true,
    isCustomPack: true,
    customPackSize: 3,
  },
  {
    slug: "custom-5-pack",
    name: "5 Flavour Custom Pack",
    price: "240",
    originalPrice: "300",
    img: custom5Pack,
    tag: "Best Value",
    excerpt:
      "Choose any five Alibarbar Ingot flavours from the current collection and build your own mixed 5-piece pack.",
    description: `Build your own Alibarbar Ingot 5-piece pack by choosing any five flavours from the current collection.

Each pack includes five Alibarbar Ingot 9000 Puffs devices. Select your preferred flavour for each slot before adding the pack to cart, and your choices will be saved into the order for fulfilment.`,
    specs: [
      "5 × ALIBARBAR Ingot disposable vape devices",
      "Choose any 5 flavours from the current collection",
      "Pre-charged and inhale-activated — ready to use out of the box",
      "Delivers up to 9000+ puffs per device",
      "Built-in LED display for monitoring battery level and e-liquid usage",
    ],
    inStock: true,
    isCustomPack: true,
    customPackSize: 5,
  },
  {
    slug: "custom-10-pack",
    name: "10 Flavour Custom Pack",
    price: "400",
    originalPrice: "600",
    img: custom10Pack,
    tag: "Bulk Pack",
    excerpt:
      "Choose any ten Alibarbar Ingot flavours from the current collection and build your own mixed 10-piece pack.",
    description: `Build your own Alibarbar Ingot 10-piece pack by choosing any ten flavours from the current collection.

Each pack includes ten Alibarbar Ingot 9000 Puffs devices. Select your preferred flavour for each slot before adding the pack to cart, and your choices will be saved into the order for fulfilment.`,
    specs: [
      "10 × ALIBARBAR Ingot disposable vape devices",
      "Choose any 10 flavours from the current collection",
      "Pre-charged and inhale-activated — ready to use out of the box",
      "Delivers up to 9000+ puffs per device",
      "Built-in LED display for monitoring battery level and e-liquid usage",
    ],
    inStock: true,
    isCustomPack: true,
    customPackSize: 10,
  },
  {
    slug: "quadruple-berry",
    name: "Quadruple Berry",
    price: "55",
    originalPrice: "60",
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
    price: "55",
    originalPrice: "60",
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
    price: "55",
    originalPrice: "60",
    img: lychee,
    tag: "Fruity",
    excerpt:
      "The Alibarbar Ingot Lychee delivers delicate ripe lychee sweetness with a light floral lift — juicy, fragrant, and refreshingly smooth from start to finish.",
    description: lycheeDescription,
    specs: sharedSpecs,
    inStock: true,
  },
  {
    slug: "peach-ice",
    name: "Peach Ice",
    price: "55",
    originalPrice: "60",
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
    price: "55",
    originalPrice: "60",
    img: blackberry,
    tag: "Iced",
    excerpt:
      "The Alibarbar Ingot Blackberry Ice combines the rich, juicy taste of ripe blackberries with a crisp icy twist. This refreshing fusion delivers a smooth, cooling sensation, making it an ideal choice for anyone who enjoys fruity flavours with a cool menthol edge.",
    description: `${sharedBody}`,
    specs: sharedSpecs,
    inStock: true,
  },
  {
    slug: "mango-magic",
    name: "Mango Magic",
    price: "55",
    originalPrice: "60",
    img: mango,
    tag: "Tropical",
    excerpt:
      "The Alibarbar Ingot Mango Magic delivers ripe, juicy mango sweetness with a smooth, luscious finish, creating a bold and tropical vape experience you'll love.",
    description: mangoMagicDescription,
    specs: mangoMagicSpecs,
    inStock: true,
  },
  {
    slug: "strawberry-coconut-watermelon",
    name: "Strawberry Coconut Watermelon",
    price: "55",
    originalPrice: "60",
    img: strawberryCoconutWatermelon,
    tag: "Tropical",
    excerpt:
      "The Alibarbar Ingot Strawberry Coconut Watermelon blends ripe strawberry, silky coconut cream, and juicy watermelon — lush, tropical, and refreshingly smooth from start to finish.",
    description: strawberryCoconutWatermelonDescription,
    specs: strawberryCoconutWatermelonSpecs,
    inStock: true,
  },
  {
    slug: "grape-ice",
    name: "Grape Ice",
    price: "55",
    originalPrice: "60",
    img: grape,
    tag: "Iced",
    excerpt:
      "The Alibarbar Ingot Grape Ice delivers bold, juicy grape flavour with a crisp icy finish — vibrant, smooth, and refreshingly cool.",
    description: grapeIceDescription,
    specs: grapeIceSpecs,
    inStock: true,
  },
  {
    slug: "strawberry-watermelon",
    name: "Strawberry Watermelon",
    price: "55",
    originalPrice: "60",
    img: strawberryWatermelon,
    tag: "Fruity",
    excerpt:
      "The Alibarbar Ingot Strawberry Watermelon combines ripe strawberry punch with chilled watermelon juice — splashy, sweet, and refreshingly smooth.",
    description: strawberryWatermelonOnlyDescription,
    specs: strawberryWatermelonOnlySpecs,
    inStock: true,
  },
  {
    slug: "strawberry-ice",
    name: "Strawberry Ice",
    price: "55",
    originalPrice: "60",
    img: strawberryIce,
    tag: "Iced",
    excerpt:
      "The Alibarbar Ingot Strawberry Ice pairs sweet ripe strawberry with an icy-cool exhale — juicy, crisp, and refreshingly smooth from start to finish.",
    description: strawberryIceDescription,
    specs: strawberryIceSpecs,
    inStock: true,
  },
];

/** Technical specs shared by every single-device Alibarbar Ingot listing. */
export const deviceSpecifications: { label: string; value: string }[] = [
  { label: "Puff count", value: "Up to 9000 puffs" },
  { label: "E-liquid capacity", value: "22ml (pre-filled)" },
  { label: "Battery", value: "2350mAh (non-rechargeable)" },
  { label: "Activation", value: "Inhale-activated, no buttons" },
  { label: "Display", value: "Smart LED battery & e-liquid indicator" },
  { label: "Coil", value: "Mesh coil for consistent flavour" },
  { label: "Net weight", value: "Approx. 90g" },
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
    return [
      {
        question: `How does the ${packSize} Flavour Custom Pack work?`,
        answer:
          `Choose any ${packSize} flavours from the current Alibarbar Ingot collection before adding the pack to your cart. Repeats are allowed and your selections are saved with your order for fulfilment.`,
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

  return [
    {
      question: `How many puffs does the ${product.name} give?`,
      answer:
        "Each Alibarbar Ingot device is rated for up to 9000 puffs. The exact number depends on your puff length and draw style.",
    },
    {
      question: `Is the ${product.name} rechargeable?`,
      answer:
        "No. It is a non-rechargeable disposable device that comes pre-charged with a 2350mAh battery sized to last the full 22ml of e-liquid.",
    },
    {
      question: "How long does delivery take in Australia?",
      answer:
        "Orders are dispatched after your bank transfer is confirmed and typically arrive within 3-7 business days, depending on your state. Shipping is A$20 for under 10 devices and A$10 for 10+ devices.",
    },
    {
      question: "Is this a genuine Alibarbar device?",
      answer:
        "Yes. We only sell authentic ALIBARBAR Ingot 9000 devices with the built-in smart LED display, 22ml capacity and up to 9000 puffs.",
    },
  ];
}

export function getProductBySlug(slug: string | undefined): Product | undefined {
  if (!slug) return undefined;
  return products.find((p) => p.slug === slug);
}

export function getSelectableFlavorProducts(): Product[] {
  return products.filter((p) => !p.isPlaceholder && !p.isCustomPack);
}

export function getRelatedProducts(slug: string, limit = 4): Product[] {
  return products.filter((p) => p.slug !== slug).slice(0, limit);
}

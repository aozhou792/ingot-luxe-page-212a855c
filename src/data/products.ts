import peachWatermelon from "@/assets/flavor-peach-watermelon.png";
import blackberry from "@/assets/flavor-blackberry.png";
import california from "@/assets/flavor-california.png";
import strawberryCoconutWatermelon from "@/assets/flavor-strawberry-coconut-watermelon.png";
import grape from "@/assets/flavor-grape.png";
import mango from "@/assets/flavor-mango.png";
import rainbowCandy from "@/assets/flavor-rainbow-candy.png";
import strawberryWatermelon from "@/assets/flavor-strawberry-watermelon.png";
import blueberryBlast from "@/assets/flavor-blueberry-blast.png";
import strawberryIce from "@/assets/flavor-strawberry-ice.png";

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

const peachWatermelonDescription = `The Alibarbar Ingot 9000 Puffs is a high-quality disposable vape designed for users who want reliability, flavour, and extended use in one sleek device. Offering up to 9000 puffs per unit, this disposable vape is ideal for adult users seeking a long-lasting option without the hassle of refilling or charging.

With a generous 22ml e-liquid capacity and a strong 2350mAh built-in battery, the Alibarbar Ingot provides consistent vapour production from start to finish. This non-rechargeable disposable vape is inhale-activated, making it simple and convenient to use straight out of the box. Its advanced internal design ensures smooth draws and rich flavour delivery throughout the life of the device.

Perfect for those searching for high puff disposable vapes, Alibarbar Ingot flavours, or a dependable disposable vape in Australia, the Alibarbar Ingot 9000 Puffs combines performance with a clean, modern design. Whether for everyday use or as a reliable backup device, it delivers a premium vaping experience with no complications.

Peach Watermelon pairs lush orchard peach with chilled watermelon and a bright sparkling soda-style lift — sweet, juicy, and unmistakably tropical from the first draw to the last.`;

const peachWatermelonSpecs = [
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

const californiaSunsetDescription = `The Alibarbar Ingot 9000 Puffs is a high-quality disposable vape designed for users who want reliability, flavour, and extended use in one sleek device. Offering up to 9000 puffs per unit, this disposable vape is ideal for adult users seeking a long-lasting option without the hassle of refilling or charging.

With a generous 22ml e-liquid capacity and a strong 2350mAh built-in battery, the Alibarbar Ingot provides consistent vapour production from start to finish. This non-rechargeable disposable vape is inhale-activated, making it simple and convenient to use straight out of the box. Its advanced internal design ensures smooth draws and rich flavour delivery throughout the life of the device.

Perfect for those searching for high puff disposable vapes, Alibarbar Ingot flavours, or a dependable disposable vape in Australia, the Alibarbar Ingot 9000 Puffs combines performance with a clean, modern design. Whether for everyday use or as a reliable backup device, it delivers a premium vaping experience with no complications.`;

const californiaSunsetSpecs = [
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

const rainbowCandyDescription = `The Alibarbar Ingot 9000 Puffs is a high-quality disposable vape designed for users who want reliability, flavour, and extended use in one sleek device. Offering up to 9000 puffs per unit, this disposable vape is ideal for adult users seeking a long-lasting option without the hassle of refilling or charging.

With a generous 22ml e-liquid capacity and a strong 2350mAh built-in battery, the Alibarbar Ingot provides consistent vapour production from start to finish. This non-rechargeable disposable vape is inhale-activated, making it simple and convenient to use straight out of the box. Its advanced internal design ensures smooth draws and rich flavour delivery throughout the life of the device.

Perfect for those searching for high puff disposable vapes, Alibarbar Ingot flavours, or a dependable disposable vape in Australia, the Alibarbar Ingot 9000 Puffs combines performance with a clean, modern design. Whether for everyday use or as a reliable backup device, it delivers a premium vaping experience with no complications.

Rainbow Candy delivers a vivid rainbow candy medley — bright, playful sweetness layered over smooth vapour for a fun finish every time you inhale.`;

const rainbowCandySpecs = [
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

const blueberryBlastDescription = `The Alibarbar Ingot 9000 Puffs is a high-quality disposable vape designed for users who want reliability, flavour, and extended use in one sleek device. Offering up to 9000 puffs per unit, this disposable vape is ideal for adult users seeking a long-lasting option without the hassle of refilling or charging.

With a generous 22ml e-liquid capacity and a strong 2350mAh built-in battery, the Alibarbar Ingot provides consistent vapour production from start to finish. This non-rechargeable disposable vape is inhale-activated, making it simple and convenient to use straight out of the box. Its advanced internal design ensures smooth draws and rich flavour delivery throughout the life of the device.

Perfect for those searching for high puff disposable vapes, Alibarbar Ingot flavours, or a dependable disposable vape in Australia, the Alibarbar Ingot 9000 Puffs combines performance with a clean, modern design. Whether for everyday use or as a reliable backup device, it delivers a premium vaping experience with no complications.

Blueberry Blast fires off bold, ripe blueberry with an icy splash of mint-fresh cool — vibrant, juicy, and satisfyingly crisp on the exhale.`;

const blueberryBlastSpecs = [
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

const strawberryIceSpecs = [
  "1 × ALIBARBAR Ingot disposable vape device",
  "Net weight: 90g",
  "Pre-charged and inhale-activated — ready to use out of the box",
  "Delivers up to 9000+ puffs per device",
  "Built-in LED display for monitoring battery level and e-liquid usage",
];

export const products: Product[] = [
  {
    slug: "peach-watermelon",
    name: "Peach Watermelon",
    price: "30",
    originalPrice: "60",
    img: peachWatermelon,
    tag: "Fruity",
    excerpt:
      "The Alibarbar Ingot Peach Watermelon layers lush orchard peach with juicy watermelon and a playful soda-style finish — bold, sweet, and refreshingly smooth from start to finish.",
    description: peachWatermelonDescription,
    specs: peachWatermelonSpecs,
    inStock: true,
  },
  {
    slug: "blackberry-ice",
    name: "Blackberry Ice",
    price: "30",
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
    price: "30",
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
    slug: "california-sunset",
    name: "California Sunset",
    price: "30",
    originalPrice: "60",
    img: california,
    tag: "Citrus",
    excerpt:
      "The Alibarbar Ingot California Sunset delivers a burst of bright citrus fizz with sweet orange soda notes, creating a bold, refreshing vape experience inspired by classic Fanta.",
    description: californiaSunsetDescription,
    specs: californiaSunsetSpecs,
    inStock: true,
  },
  {
    slug: "strawberry-coconut-watermelon",
    name: "Strawberry Coconut Watermelon",
    price: "30",
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
    price: "30",
    originalPrice: "60",
    img: grape,
    tag: "Iced",
    excerpt:
      "The Alibarbar Ingot Blueberry Blast delivers a bold and juicy burst of ripe blueberry flavour, perfectly balanced with a refreshing finish. This smooth and satisfying blend is ideal for those who enjoy a vibrant and fruity vaping experience.",
    description: grapeIceDescription,
    specs: grapeIceSpecs,
    inStock: true,
  },
  {
    slug: "rainbow-candy",
    name: "Rainbow Candy",
    price: "30",
    originalPrice: "60",
    img: rainbowCandy,
    tag: "Sweet",
    excerpt:
      "The Alibarbar Ingot Rainbow Candy layers vivid rainbow candy sweetness with a playful sparkle — bold colour, smooth vapour, fun from the first puff.",
    description: rainbowCandyDescription,
    specs: rainbowCandySpecs,
    inStock: true,
  },
  {
    slug: "strawberry-watermelon",
    name: "Strawberry Watermelon",
    price: "30",
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
    slug: "blueberry-blast",
    name: "Blueberry Blast",
    price: "30",
    originalPrice: "60",
    img: blueberryBlast,
    tag: "Iced",
    excerpt:
      "The Alibarbar Ingot Blueberry Blast delivers a bold and juicy burst of ripe blueberry flavour, perfectly balanced with a refreshing finish — vibrant, smooth, and built for all-day flavour.",
    description: blueberryBlastDescription,
    specs: blueberryBlastSpecs,
    inStock: true,
  },
  {
    slug: "strawberry-ice",
    name: "Strawberry Ice",
    price: "30",
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

export function getProductBySlug(slug: string | undefined): Product | undefined {
  if (!slug) return undefined;
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(slug: string, limit = 4): Product[] {
  return products.filter((p) => p.slug !== slug).slice(0, limit);
}

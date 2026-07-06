/**
 * Export site products to WooCommerce CSV + image folder on Desktop.
 * Run: node scripts/export-woocommerce.mjs
 */
import fs from "node:fs";
import path from "node:path";

const SLUG_TO_IMAGE = {
  "peach-watermelon": "flavor-peach-watermelon.png",
  "blackberry-ice": "flavor-blackberry.png",
  "mango-magic": "flavor-mango.png",
  "california-sunset": "flavor-california.png",
  "strawberry-coconut-watermelon": "flavor-strawberry-coconut-watermelon.png",
  "grape-ice": "flavor-grape.png",
  "rainbow-candy": "flavor-rainbow-candy.png",
  "strawberry-watermelon": "flavor-strawberry-watermelon.png",
  "blueberry-blast": "flavor-blueberry-blast.png",
  "strawberry-ice": "flavor-strawberry-ice.png",
};

const products = [
  {
    slug: "peach-watermelon",
    name: "Peach Watermelon",
    price: "26",
    tag: "Fruity",
    excerpt:
      "The Alibarbar Ingot Peach Watermelon layers lush orchard peach with juicy watermelon and a playful soda-style finish — bold, sweet, and refreshingly smooth from start to finish.",
    description: `The Alibarbar Ingot 9000 Puffs is a high-quality disposable vape designed for users who want reliability, flavour, and extended use in one sleek device. Offering up to 9000 puffs per unit, this disposable vape is ideal for adult users seeking a long-lasting option without the hassle of refilling or charging.

With a generous 22ml e-liquid capacity and a strong 2350mAh built-in battery, the Alibarbar Ingot provides consistent vapour production from start to finish. This non-rechargeable disposable vape is inhale-activated, making it simple and convenient to use straight out of the box. Its advanced internal design ensures smooth draws and rich flavour delivery throughout the life of the device.

Perfect for those searching for high puff disposable vapes, Alibarbar Ingot flavours, or a dependable disposable vape in Australia, the Alibarbar Ingot 9000 Puffs combines performance with a clean, modern design. Whether for everyday use or as a reliable backup device, it delivers a premium vaping experience with no complications.

Peach Watermelon pairs lush orchard peach with chilled watermelon and a bright sparkling soda-style lift — sweet, juicy, and unmistakably tropical from the first draw to the last.`,
    specs: [
      "1 × ALIBARBAR Ingot disposable vape device",
      "Net weight: 90g",
      "Pre-charged and inhale-activated — ready to use out of the box",
      "Delivers up to 9000+ puffs per device",
      "Built-in LED display for monitoring battery level and e-liquid usage",
    ],
    inStock: true,
  },
  {
    slug: "blackberry-ice",
    name: "Blackberry Ice",
    price: "26",
    tag: "Iced",
    excerpt:
      "The Alibarbar Ingot Blackberry Ice combines the rich, juicy taste of ripe blackberries with a crisp icy twist. This refreshing fusion delivers a smooth, cooling sensation, making it an ideal choice for anyone who enjoys fruity flavours with a cool menthol edge.",
    description: `The Alibarbar Ingot 9000 Puffs is a high-quality disposable vape designed for users who want reliability, flavour, and extended use in one sleek device. Offering up to 9000 puffs per unit, this disposable vape is ideal for adult users seeking a long-lasting option without the hassle of refilling or charging.

With a generous 22ml e-liquid capacity and a strong 2350mAh built-in battery, the Alibarbar Ingot provides consistent vapour production from start to finish. This non-rechargeable disposable vape is inhale-activated, making it simple and convenient to use straight out of the box. Its advanced internal design ensures smooth draws and rich flavour delivery throughout the life of the device.

Perfect for those searching for high puff disposable vapes or a dependable everyday device, the Alibarbar Ingot 9000 Puffs combines performance with a clean, modern design.`,
    specs: [
      "1 × ALIBARBAR Ingot disposable vape device",
      "Net weight: 90g",
      "Pre-charged and inhale-activated — ready to use out of the box",
      "Delivers up to 9000+ puffs per device",
      "Built-in LED display for monitoring battery level and e-liquid usage",
    ],
    inStock: true,
  },
  {
    slug: "mango-magic",
    name: "Mango Magic",
    price: "26",
    tag: "Tropical",
    excerpt:
      "The Alibarbar Ingot Mango Magic delivers ripe, juicy mango sweetness with a smooth, luscious finish, creating a bold and tropical vape experience you'll love.",
    description: `The Alibarbar Ingot 9000 Puffs is a high-quality disposable vape designed for users who want reliability, flavour, and extended use in one sleek device. Offering up to 9000 puffs per unit, this disposable vape is ideal for adult users seeking a long-lasting option without the hassle of refilling or charging.

With a generous 22ml e-liquid capacity and a strong 2350mAh built-in battery, the Alibarbar Ingot provides consistent vapour production from start to finish. This non-rechargeable disposable vape is inhale-activated, making it simple and convenient to use straight out of the box. Its advanced internal design ensures smooth draws and rich flavour delivery throughout the life of the device.

Perfect for those searching for high puff disposable vapes, Alibarbar Ingot flavours, or a dependable disposable vape in Australia, the Alibarbar Ingot 9000 Puffs combines performance with a clean, modern design. Whether for everyday use or as a reliable backup device, it delivers a premium vaping experience with no complications.`,
    specs: [
      "1 × ALIBARBAR Ingot disposable vape device",
      "Net weight: 90g",
      "Pre-charged and inhale-activated — ready to use out of the box",
      "Delivers up to 9000+ puffs per device",
      "Built-in LED display for monitoring battery level and e-liquid usage",
    ],
    inStock: true,
  },
  {
    slug: "california-sunset",
    name: "California Sunset",
    price: "26",
    tag: "Citrus",
    excerpt:
      "The Alibarbar Ingot California Sunset delivers a burst of bright citrus fizz with sweet orange soda notes, creating a bold, refreshing vape experience inspired by classic Fanta.",
    description: `The Alibarbar Ingot 9000 Puffs is a high-quality disposable vape designed for users who want reliability, flavour, and extended use in one sleek device. Offering up to 9000 puffs per unit, this disposable vape is ideal for adult users seeking a long-lasting option without the hassle of refilling or charging.

With a generous 22ml e-liquid capacity and a strong 2350mAh built-in battery, the Alibarbar Ingot provides consistent vapour production from start to finish. This non-rechargeable disposable vape is inhale-activated, making it simple and convenient to use straight out of the box. Its advanced internal design ensures smooth draws and rich flavour delivery throughout the life of the device.

Perfect for those searching for high puff disposable vapes, Alibarbar Ingot flavours, or a dependable disposable vape in Australia, the Alibarbar Ingot 9000 Puffs combines performance with a clean, modern design. Whether for everyday use or as a reliable backup device, it delivers a premium vaping experience with no complications.`,
    specs: [
      "1 × ALIBARBAR Ingot disposable vape device",
      "Net weight: 90g",
      "Pre-charged and inhale-activated — ready to use out of the box",
      "Delivers up to 9000+ puffs per device",
      "Built-in LED display for monitoring battery level and e-liquid usage",
    ],
    inStock: true,
  },
  {
    slug: "strawberry-coconut-watermelon",
    name: "Strawberry Coconut Watermelon",
    price: "26",
    tag: "Tropical",
    excerpt:
      "The Alibarbar Ingot Strawberry Coconut Watermelon blends ripe strawberry, silky coconut cream, and juicy watermelon — lush, tropical, and refreshingly smooth from start to finish.",
    description: `The Alibarbar Ingot 9000 Puffs is a high-quality disposable vape designed for users who want reliability, flavour, and extended use in one sleek device. Offering up to 9000 puffs per unit, this disposable vape is ideal for adult users seeking a long-lasting option without the hassle of refilling or charging.

With a generous 22ml e-liquid capacity and a strong 2350mAh built-in battery, the Alibarbar Ingot provides consistent vapour production from start to finish. This non-rechargeable disposable vape is inhale-activated, making it simple and convenient to use straight out of the box. Its advanced internal design ensures smooth draws and rich flavour delivery throughout the life of the device.

Perfect for those searching for high puff disposable vapes, Alibarbar Ingot flavours, or a dependable disposable vape in Australia, the Alibarbar Ingot 9000 Puffs combines performance with a clean, modern design. Whether for everyday use or as a reliable backup device, it delivers a premium vaping experience with no complications.

Strawberry Coconut Watermelon layers jammy ripened strawberry with creamy coconut and chilled watermelon — tropical, bright, and lush from the first puff to the last.`,
    specs: [
      "1 × ALIBARBAR Ingot disposable vape device",
      "Net weight: 90g",
      "Pre-charged and inhale-activated — ready to use out of the box",
      "Delivers up to 9000+ puffs per device",
      "Built-in LED display for monitoring battery level and e-liquid usage",
    ],
    inStock: true,
  },
  {
    slug: "grape-ice",
    name: "Grape Ice",
    price: "26",
    tag: "Iced",
    excerpt:
      "The Alibarbar Ingot Blueberry Blast delivers a bold and juicy burst of ripe blueberry flavour, perfectly balanced with a refreshing finish. This smooth and satisfying blend is ideal for those who enjoy a vibrant and fruity vaping experience.",
    description: `The Alibarbar Ingot 9000 Puffs is a high-quality disposable vape designed for users who want reliability, flavour, and extended use in one sleek device. Offering up to 9000 puffs per unit, this disposable vape is ideal for adult users seeking a long-lasting option without the hassle of refilling or charging.

With a generous 22ml e-liquid capacity and a strong 2350mAh built-in battery, the Alibarbar Ingot provides consistent vapour production from start to finish. This non-rechargeable disposable vape is inhale-activated, making it simple and convenient to use straight out of the box. Its advanced internal design ensures smooth draws and rich flavour delivery throughout the life of the device.

Perfect for those searching for high puff disposable vapes, Alibarbar Ingot flavours, or a dependable disposable vape in Australia, the Alibarbar Ingot 9000 Puffs combines performance with a clean, modern design. Whether for everyday use or as a reliable backup device, it delivers a premium vaping experience with no complications.`,
    specs: [
      "1 × ALIBARBAR Ingot disposable vape device",
      "Net weight: 90g",
      "Pre-charged and inhale-activated — ready to use out of the box",
      "Delivers up to 9000+ puffs per device",
      "Built-in LED display for monitoring battery level and e-liquid usage",
    ],
    inStock: true,
  },
  {
    slug: "rainbow-candy",
    name: "Rainbow Candy",
    price: "26",
    tag: "Sweet",
    excerpt:
      "The Alibarbar Ingot Rainbow Candy layers vivid rainbow candy sweetness with a playful sparkle — bold colour, smooth vapour, fun from the first puff.",
    description: `The Alibarbar Ingot 9000 Puffs is a high-quality disposable vape designed for users who want reliability, flavour, and extended use in one sleek device. Offering up to 9000 puffs per unit, this disposable vape is ideal for adult users seeking a long-lasting option without the hassle of refilling or charging.

With a generous 22ml e-liquid capacity and a strong 2350mAh built-in battery, the Alibarbar Ingot provides consistent vapour production from start to finish. This non-rechargeable disposable vape is inhale-activated, making it simple and convenient to use straight out of the box. Its advanced internal design ensures smooth draws and rich flavour delivery throughout the life of the device.

Perfect for those searching for high puff disposable vapes, Alibarbar Ingot flavours, or a dependable disposable vape in Australia, the Alibarbar Ingot 9000 Puffs combines performance with a clean, modern design. Whether for everyday use or as a reliable backup device, it delivers a premium vaping experience with no complications.

Rainbow Candy delivers a vivid rainbow candy medley — bright, playful sweetness layered over smooth vapour for a fun finish every time you inhale.`,
    specs: [
      "1 × ALIBARBAR Ingot disposable vape device",
      "Net weight: 90g",
      "Pre-charged and inhale-activated — ready to use out of the box",
      "Delivers up to 9000+ puffs per device",
      "Built-in LED display for monitoring battery level and e-liquid usage",
    ],
    inStock: true,
  },
  {
    slug: "strawberry-watermelon",
    name: "Strawberry Watermelon",
    price: "26",
    tag: "Fruity",
    excerpt:
      "The Alibarbar Ingot Strawberry Watermelon combines ripe strawberry punch with chilled watermelon juice — splashy, sweet, and refreshingly smooth.",
    description: `The Alibarbar Ingot 9000 Puffs is a high-quality disposable vape designed for users who want reliability, flavour, and extended use in one sleek device. Offering up to 9000 puffs per unit, this disposable vape is ideal for adult users seeking a long-lasting option without the hassle of refilling or charging.

With a generous 22ml e-liquid capacity and a strong 2350mAh built-in battery, the Alibarbar Ingot provides consistent vapour production from start to finish. This non-rechargeable disposable vape is inhale-activated, making it simple and convenient to use straight out of the box. Its advanced internal design ensures smooth draws and rich flavour delivery throughout the life of the device.

Perfect for those searching for high puff disposable vapes, Alibarbar Ingot flavours, or a dependable disposable vape in Australia, the Alibarbar Ingot 9000 Puffs combines performance with a clean, modern design. Whether for everyday use or as a reliable backup device, it delivers a premium vaping experience with no complications.

Strawberry Watermelon pairs jam-packed berry sweetness with chilled, juicy watermelon — refreshing, splashy, and smooth from the first puff to the last.`,
    specs: [
      "1 × ALIBARBAR Ingot disposable vape device",
      "Net weight: 90g",
      "Pre-charged and inhale-activated — ready to use out of the box",
      "Delivers up to 9000+ puffs per device",
      "Built-in LED display for monitoring battery level and e-liquid usage",
    ],
    inStock: true,
  },
  {
    slug: "blueberry-blast",
    name: "Blueberry Blast",
    price: "26",
    tag: "Iced",
    excerpt:
      "The Alibarbar Ingot Blueberry Blast delivers a bold and juicy burst of ripe blueberry flavour, perfectly balanced with a refreshing finish — vibrant, smooth, and built for all-day flavour.",
    description: `The Alibarbar Ingot 9000 Puffs is a high-quality disposable vape designed for users who want reliability, flavour, and extended use in one sleek device. Offering up to 9000 puffs per unit, this disposable vape is ideal for adult users seeking a long-lasting option without the hassle of refilling or charging.

With a generous 22ml e-liquid capacity and a strong 2350mAh built-in battery, the Alibarbar Ingot provides consistent vapour production from start to finish. This non-rechargeable disposable vape is inhale-activated, making it simple and convenient to use straight out of the box. Its advanced internal design ensures smooth draws and rich flavour delivery throughout the life of the device.

Perfect for those searching for high puff disposable vapes, Alibarbar Ingot flavours, or a dependable disposable vape in Australia, the Alibarbar Ingot 9000 Puffs combines performance with a clean, modern design. Whether for everyday use or as a reliable backup device, it delivers a premium vaping experience with no complications.

Blueberry Blast fires off bold, ripe blueberry with an icy splash of mint-fresh cool — vibrant, juicy, and satisfyingly crisp on the exhale.`,
    specs: [
      "1 × ALIBARBAR Ingot disposable vape device",
      "Net weight: 90g",
      "Pre-charged and inhale-activated — ready to use out of the box",
      "Delivers up to 9000+ puffs per device",
      "Built-in LED display for monitoring battery level and e-liquid usage",
    ],
    inStock: true,
  },
  {
    slug: "strawberry-ice",
    name: "Strawberry Ice",
    price: "26",
    tag: "Iced",
    excerpt:
      "The Alibarbar Ingot Strawberry Ice pairs sweet ripe strawberry with an icy-cool exhale — juicy, crisp, and refreshingly smooth from start to finish.",
    description: `The Alibarbar Ingot 9000 Puffs is a high-quality disposable vape designed for users who want reliability, flavour, and extended use in one sleek device. Offering up to 9000 puffs per unit, this disposable vape is ideal for adult users seeking a long-lasting option without the hassle of refilling or charging.

With a generous 22ml e-liquid capacity and a strong 2350mAh built-in battery, the Alibarbar Ingot provides consistent vapour production from start to finish. This non-rechargeable disposable vape is inhale-activated, making it simple and convenient to use straight out of the box. Its advanced internal design ensures smooth draws and rich flavour delivery throughout the life of the device.

Perfect for those searching for high puff disposable vapes, Alibarbar Ingot flavours, or a dependable disposable vape in Australia, the Alibarbar Ingot 9000 Puffs combines performance with a clean, modern design. Whether for everyday use or as a reliable backup device, it delivers a premium vaping experience with no complications.

Strawberry Ice wraps candy-sweet strawberry in a frosty menthol breeze — bright fruit up front, clean chill on the finish.`,
    specs: [
      "1 × ALIBARBAR Ingot disposable vape device",
      "Net weight: 90g",
      "Pre-charged and inhale-activated — ready to use out of the box",
      "Delivers up to 9000+ puffs per device",
      "Built-in LED display for monitoring battery level and e-liquid usage",
    ],
    inStock: true,
  },
];

const HEADERS = [
  "Type",
  "SKU",
  "Name",
  "Published",
  "Is featured?",
  "Visibility in catalog",
  "Short description",
  "Description",
  "Date sale price starts",
  "Date sale price ends",
  "Tax status",
  "Tax class",
  "In stock?",
  "Stock",
  "Backorders allowed?",
  "Sold individually?",
  "Weight (kg)",
  "Length (cm)",
  "Width (cm)",
  "Height (cm)",
  "Allow customer reviews?",
  "Purchase note",
  "Sale price",
  "Regular price",
  "Categories",
  "Tags",
  "Shipping class",
  "Images",
  "Download limit",
  "Download expiry days",
  "Parent",
  "Grouped products",
  "Upsells",
  "Cross-sells",
  "External URL",
  "Button text",
  "Position",
];

function escapeCsv(value) {
  const s = value == null ? "" : String(value);
  if (/[",\r\n]/.test(s)) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

function toHtmlDescription(description, specs) {
  const paragraphs = description
    .split("\n\n")
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => `<p>${escapeHtml(p)}</p>`)
    .join("");

  const list = specs
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("");

  return `${paragraphs}<h3>What&apos;s in the box</h3><ul>${list}</ul>`;
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildRow(product, position) {
  const imageFile = SLUG_TO_IMAGE[product.slug];
  const sku = `ingot-9000-${product.slug}`;
  const name = `Alibarbar Ingot 9000 Puffs — ${product.name}`;
  const categories = "Disposable Vapes > Alibarbar Ingot";
  const tags = `Alibarbar, Ingot 9000, ${product.tag}, ${product.name}`;

  return [
    "simple",
    sku,
    name,
    "1",
    "0",
    "visible",
    product.excerpt,
    toHtmlDescription(product.description, product.specs),
    "",
    "",
    "taxable",
    "",
    product.inStock ? "1" : "0",
    product.inStock ? "999" : "0",
    "no",
    "0",
    "0.09",
    "",
    "",
    "",
    "1",
    "",
    "",
    product.price,
    categories,
    tags,
    "",
    imageFile,
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    String(position),
  ].map(escapeCsv);
}

const root = path.resolve(import.meta.dirname, "..");
const assetsDir = path.join(root, "src", "assets");
/** CSV + images in one folder. Override: node scripts/export-woocommerce.mjs <path> */
const outDir = process.argv[2] ? path.resolve(process.argv[2]) : path.join(root, "woocommerce-export");
const csvPath = path.join(outDir, "woocommerce-products.csv");
const readmePath = path.join(outDir, "README-import.txt");

fs.mkdirSync(outDir, { recursive: true });

const rows = [HEADERS.map(escapeCsv).join(",")];
let position = 0;

for (const product of products) {
  const imageFile = SLUG_TO_IMAGE[product.slug];
  const srcImage = path.join(assetsDir, imageFile);
  if (!fs.existsSync(srcImage)) {
    console.error(`Missing image: ${srcImage}`);
    process.exit(1);
  }
  fs.copyFileSync(srcImage, path.join(outDir, imageFile));
  rows.push(buildRow(product, position).join(","));
  position += 1;
}

fs.writeFileSync(csvPath, `\uFEFF${rows.join("\r\n")}\r\n`, "utf8");

const readme = `Luage 站点 → WooCommerce 导入包
================================

导出目录：${outDir}

本文件夹内：
- woocommerce-products.csv   （10 个在售口味商品）
- flavor-*.png               （与 CSV Images 列同名的产品图，与 CSV 同目录）

推荐导入步骤（WooCommerce 内置导入器）：
1. 将本文件夹内全部 .png 图片上传到 WordPress「媒体库」
   （可在 媒体 → 添加 中批量上传）。
2. WooCommerce → 产品 → 导入 → 选择 woocommerce-products.csv
3. 列映射保持默认（表头已与 WooCommerce 标准一致）。
4. Images 列填写的是文件名（如 flavor-peach-watermelon.png）。
   导入时 WooCommerce 会在当前月份的上传目录中按文件名匹配已上传的图片。
   若未自动关联，请在媒体库确认文件名与 CSV 完全一致后重新导入。

说明：
- 价格 Regular price 为 26（与站点 AUD $26.00 一致，请在 WooCommerce 货币设置中设为 AUD）。
- SKU 格式：ingot-9000-{slug}
- 共 ${products.length} 个 simple 产品，分类：Disposable Vapes > Alibarbar Ingot
`;

fs.writeFileSync(readmePath, readme, "utf8");

console.log(`Export folder: ${outDir}`);
console.log(`CSV: ${csvPath}`);
console.log(`Images: ${products.length} PNG files (same folder)`);
console.log(`Readme: ${readmePath}`);

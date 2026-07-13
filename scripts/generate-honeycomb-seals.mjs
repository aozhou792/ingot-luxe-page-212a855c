/**
 * Generate 5 QR-free packaging seals (orange ring + hex + 点阵).
 * Style matches packaging Authentication sticker — photo compare only.
 *
 *   node scripts/generate-honeycomb-seals.mjs
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import QRCode from "qrcode";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "../public/authenticity");
const SIZE = 1400;
const CX = SIZE / 2;
const CY = SIZE / 2;
const ORANGE = "#F07828";
const ORANGE_INNER = "#E86A1C";
const SITE = "https://www.alibarbar.mom";
const VERIFY = `${SITE}/verify`;

const SEALS = ["ABSEAL01", "ABSEAL02", "ABSEAL03", "ABSEAL04", "ABSEAL05"];

/**
 * Satellite hollow hexes with center dots — angles in degrees (0 = right, CCW).
 * Layout inspired by packaging: roughly top / lower-right / lower-left triangle.
 */
const LAYOUTS = {
  ABSEAL01: {
    sats: [
      { deg: -90, r: 300 },
      { deg: 30, r: 300 },
      { deg: 150, r: 300 },
    ],
    dots: [
      [-35, -195],
      [55, -230],
      [95, -200],
      [75, -165],
      [25, -145],
      [-120, -80],
      [-160, -40],
      [-145, 10],
      [-190, 55],
      [-155, 95],
      [-200, 130],
      [-120, 160],
      [130, -40],
      [175, 10],
      [210, 55],
      [165, 95],
      [200, 140],
      [145, 175],
      [230, 110],
      [100, 200],
      [40, 215],
      [-40, 200],
      [0, 160],
      [-80, -150],
    ],
  },
  ABSEAL02: {
    sats: [
      { deg: -80, r: 295 },
      { deg: 40, r: 305 },
      { deg: 160, r: 295 },
    ],
    dots: [
      [0, -240],
      [70, -255],
      [110, -215],
      [40, -175],
      [-70, -210],
      [-180, -60],
      [-220, -10],
      [-195, 50],
      [-230, 100],
      [-170, 140],
      [-210, 180],
      [160, -70],
      [210, -20],
      [240, 40],
      [190, 90],
      [230, 140],
      [170, 185],
      [120, 220],
      [20, 230],
      [-50, 215],
      [90, 150],
      [-100, 80],
      [50, -120],
      [-30, 120],
    ],
  },
  ABSEAL03: {
    sats: [
      { deg: -100, r: 305 },
      { deg: 20, r: 295 },
      { deg: 140, r: 300 },
    ],
    dots: [
      [20, -250],
      [85, -235],
      [125, -265],
      [60, -185],
      [-45, -220],
      [-100, -170],
      [-200, -30],
      [-240, 30],
      [-185, 80],
      [-225, 130],
      [-160, 170],
      [150, -50],
      [200, 0],
      [235, 60],
      [185, 115],
      [220, 165],
      [155, 200],
      [80, 225],
      [-10, 240],
      [-70, 190],
      [110, 80],
      [-130, 40],
      [0, -160],
      [45, 140],
    ],
  },
  ABSEAL04: {
    sats: [
      { deg: -95, r: 290 },
      { deg: 35, r: 310 },
      { deg: 155, r: 290 },
    ],
    dots: [
      [-15, -245],
      [50, -270],
      [100, -230],
      [70, -190],
      [-80, -195],
      [-140, -100],
      [-195, -45],
      [-230, 20],
      [-175, 75],
      [-215, 125],
      [-150, 175],
      [140, -90],
      [190, -35],
      [225, 25],
      [175, 80],
      [215, 130],
      [250, 100],
      [180, 180],
      [110, 215],
      [30, 225],
      [-40, 210],
      [90, -140],
      [-60, 100],
      [20, 155],
    ],
  },
  ABSEAL05: {
    sats: [
      { deg: -85, r: 300 },
      { deg: 25, r: 300 },
      { deg: 145, r: 305 },
    ],
    dots: [
      [15, -235],
      [75, -260],
      [120, -220],
      [90, -180],
      [-55, -200],
      [-110, -140],
      [-185, -50],
      [-225, 10],
      [-190, 70],
      [-235, 120],
      [-170, 160],
      [-100, 200],
      [165, -55],
      [215, -5],
      [245, 55],
      [195, 105],
      [235, 155],
      [160, 195],
      [95, 230],
      [0, 220],
      [55, -145],
      [-40, 140],
      [130, 140],
      [-130, 90],
    ],
  },
};

function hexPoints(x, y, r) {
  const pts = [];
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 180) * (60 * i - 30);
    pts.push(`${(x + r * Math.cos(a)).toFixed(2)},${(y + r * Math.sin(a)).toFixed(2)}`);
  }
  return pts.join(" ");
}

function arcPath(cx, cy, r, startDeg, endDeg) {
  let sweep = endDeg - startDeg;
  while (sweep < 0) sweep += 360;
  const s = (Math.PI / 180) * startDeg;
  const e = (Math.PI / 180) * (startDeg + sweep);
  const x1 = cx + r * Math.cos(s);
  const y1 = cy + r * Math.sin(s);
  const x2 = cx + r * Math.cos(e);
  const y2 = cy + r * Math.sin(e);
  const large = sweep > 180 ? 1 : 0;
  return `M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`;
}

function sealSvg(id) {
  const { sats, dots } = LAYOUTS[id];
  const outerR = SIZE * 0.485;
  const orangeR = SIZE * 0.458;
  const thinR = SIZE * 0.42;
  const centerHexR = 125;
  const satHexR = 58;

  // ~6 orange segments with white gaps (poker-chip ring)
  const gap = 14;
  const sweep = 46;
  const segs = [];
  for (let i = 0; i < 6; i++) {
    segs.push({ start: -90 + i * 60 + gap / 2, sweep });
  }

  const parts = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">`,
    `<defs><clipPath id="disc"><circle cx="${CX}" cy="${CY}" r="${outerR}"/></clipPath></defs>`,
    `<rect width="${SIZE}" height="${SIZE}" fill="#ffffff"/>`,
    `<circle cx="${CX}" cy="${CY}" r="${outerR}" fill="#ffffff"/>`,
    `<g clip-path="url(#disc)">`,
  ];

  for (const seg of segs) {
    parts.push(
      `<path d="${arcPath(CX, CY, orangeR, seg.start, seg.start + seg.sweep)}" fill="none" stroke="${ORANGE}" stroke-width="54" stroke-linecap="butt"/>`,
    );
  }
  parts.push(`<circle cx="${CX}" cy="${CY}" r="${thinR}" fill="none" stroke="${ORANGE_INNER}" stroke-width="8"/>`);

  // Center solid hex
  parts.push(`<polygon points="${hexPoints(CX, CY, centerHexR)}" fill="#1a1a1a"/>`);

  // Satellite hexes + center dots
  for (const sat of sats) {
    const a = (sat.deg * Math.PI) / 180;
    const sx = CX + Math.cos(a) * sat.r;
    const sy = CY + Math.sin(a) * sat.r;
    parts.push(
      `<polygon points="${hexPoints(sx, sy, satHexR)}" fill="#ffffff" stroke="#1a1a1a" stroke-width="16"/>`,
      `<circle cx="${sx.toFixed(1)}" cy="${sy.toFixed(1)}" r="14" fill="#1a1a1a"/>`,
    );
  }

  for (const [dx, dy] of dots) {
    const r = 11 + ((Math.abs(dx * 3 + dy * 7) % 9));
    parts.push(`<circle cx="${(CX + dx).toFixed(1)}" cy="${(CY + dy).toFixed(1)}" r="${r}" fill="#1a1a1a"/>`);
  }

  parts.push(`</g></svg>`);
  return parts.join("");
}

await mkdir(outDir, { recursive: true });

const tokens = [];
for (const id of SEALS) {
  const svg = Buffer.from(sealSvg(id));
  const pngPath = path.join(outDir, `honeycomb-${id}.png`);
  await sharp(svg).png().toFile(pngPath);
  await writeFile(path.join(outDir, `honeycomb-${id}.svg`), sealSvg(id));
  tokens.push({ id, file: `honeycomb-${id}.png`, kind: "photo-template" });
  console.log(`✓ ${id}`);
}

// Keep user style reference available
const styleSrc = path.join(outDir, "seal-style-reference.png");
try {
  await sharp(styleSrc)
    .resize(SIZE, SIZE, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .png()
    .toFile(path.join(outDir, "seal-style-reference-square.png"));
} catch {
  // optional
}

const entryPng = await QRCode.toBuffer(VERIFY, {
  type: "png",
  width: 512,
  margin: 2,
  errorCorrectionLevel: "M",
  color: { dark: "#111111", light: "#ffffff" },
});
await sharp(entryPng).png().toFile(path.join(outDir, "entry-verify.png"));

await writeFile(
  path.join(outDir, "manifest.json"),
  JSON.stringify(
    {
      mode: "photo-compare",
      note: "Left = QR-free orange-ring 点阵 seal (5 templates). Right QR opens /verify only.",
      verifyUrl: VERIFY,
      seals: tokens,
      entryQr: "entry-verify.png",
      styleReference: "seal-style-reference.png",
    },
    null,
    2,
  ),
);

await writeFile(
  path.join(outDir, "tokens.json"),
  JSON.stringify(
    {
      mode: "photo-compare",
      seals: SEALS.map((id) => ({ id, method: "photo" })),
      note: "No QR token inside seals — authenticity is photo match only.",
    },
    null,
    2,
  ),
);

await writeFile(
  path.join(outDir, "README.txt"),
  `Alibarbar AU — photo-compare honeycomb authenticity
====================================================

模式: 5 个共享点阵标（随机印，拍中任一即正品）
验真: 拍照上传 → 服务器与官方模板比对（蜂窝内无 QR）

RIGHT: entry-verify.png → ${VERIFY}
LEFT:  honeycomb-ABSEAL01.png … 05.png
样式: 橙环 + 实心中心六边形 + 3 个带心点的卫星六边形 + 点阵

顾客:
  1. 扫右边方码进 /verify
  2. 拍摄/上传左边点阵标
  3. 与官方模板匹配 → 正品
`,
);

console.log(`\nWrote seals + entry QR → ${outDir}`);

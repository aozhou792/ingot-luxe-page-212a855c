/**
 * Generate packaging QR assets:
 * - Right: standard square entry QR
 * - Left: circular honeycomb-style dotted seals (matches box artwork)
 *
 *   node scripts/generate-honeycomb-qrs.mjs
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import QRCode from "qrcode";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "../public/authenticity");
const SITE = "https://www.alibarbar.mom";
const VERIFY = `${SITE}/verify`;
const SEALS = ["ABSEAL01", "ABSEAL02", "ABSEAL03", "ABSEAL04", "ABSEAL05"];

const SIZE = 1200;
const ORANGE = "#E86B1A"; // packaging ring colour
const ORANGE_SOFT = "#F4A261";
const INK = "#111111";
const PAPER = "#f7f7f5";
const GOLD = "#C9A227";

function hexPoints(x, y, r) {
  const pts = [];
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 180) * (60 * i - 30);
    pts.push(`${(x + r * Math.cos(a)).toFixed(2)},${(y + r * Math.sin(a)).toFixed(2)}`);
  }
  return pts.join(" ");
}

function arcPath(cx, cy, r, startDeg, endDeg) {
  const s = (Math.PI / 180) * startDeg;
  const e = (Math.PI / 180) * endDeg;
  const x1 = cx + r * Math.cos(s);
  const y1 = cy + r * Math.sin(s);
  const x2 = cx + r * Math.cos(e);
  const y2 = cy + r * Math.sin(e);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
}

function isFinder(row, col, n) {
  const inTL = row < 7 && col < 7;
  const inTR = row < 7 && col >= n - 7;
  const inBL = row >= n - 7 && col < 7;
  return inTL || inTR || inBL;
}

function finderCenter(row, col, n) {
  if (row < 7 && col < 7) return { fr: 3, fc: 3 };
  if (row < 7 && col >= n - 7) return { fr: 3, fc: n - 4 };
  if (row >= n - 7 && col < 7) return { fr: n - 4, fc: 3 };
  return null;
}

/** Decorative honeycomb lattice in the centre (visual only). */
function honeycombLattice(cx, cy, maxR, cell) {
  const parts = [];
  const gap = cell * 1.15;
  for (let row = -14; row <= 14; row++) {
    for (let col = -14; col <= 14; col++) {
      const x = cx + col * gap + (row % 2 === 0 ? 0 : gap / 2);
      const y = cy + row * gap * 0.86;
      const dist = Math.hypot(x - cx, y - cy);
      if (dist > maxR || dist < cell * 2.8) continue;
      const r = cell * 0.22;
      parts.push(
        `<polygon points="${hexPoints(x, y, r)}" fill="${INK}" opacity="0.12"/>`,
      );
    }
  }
  return parts.join("");
}

/**
 * Circular dotted QR — orange ring + round finders like the Ingot box seal.
 */
function honeycombQrSvg(payload) {
  const qr = QRCode.create(payload, { errorCorrectionLevel: "H" });
  const modules = qr.modules;
  const n = modules.size;
  const cx = SIZE / 2;
  const cy = SIZE / 2;
  const ringOuter = SIZE * 0.49;
  const ringMid = SIZE * 0.455;
  const ringInner = SIZE * 0.42;
  const codeR = SIZE * 0.385;
  const quiet = 2;
  const cell = (codeR * 2) / (n + quiet * 2);
  const originX = cx - codeR;
  const originY = cy - codeR;
  const dotR = cell * 0.34;
  const centerClear = cell * 3.8;

  const parts = [];
  parts.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">`);
  parts.push(`<defs>`);
  parts.push(`<clipPath id="disc"><circle cx="${cx}" cy="${cy}" r="${ringInner - 4}"/></clipPath>`);
  parts.push(`</defs>`);
  parts.push(`<rect width="100%" height="100%" fill="${PAPER}"/>`);

  // Orange packaging ring (thick outer band)
  parts.push(`<circle cx="${cx}" cy="${cy}" r="${ringOuter}" fill="none" stroke="${ORANGE}" stroke-width="28"/>`);
  parts.push(`<circle cx="${cx}" cy="${cy}" r="${ringMid}" fill="none" stroke="#ffffff" stroke-width="6"/>`);
  parts.push(`<circle cx="${cx}" cy="${cy}" r="${ringInner}" fill="none" stroke="${INK}" stroke-width="2.5"/>`);

  // Subtle gold accent arcs on ring
  parts.push(
    `<path d="${arcPath(cx, cy, ringOuter - 14, -55, 55)}" fill="none" stroke="${GOLD}" stroke-width="8" stroke-linecap="round" opacity="0.85"/>`,
  );
  parts.push(
    `<path d="${arcPath(cx, cy, ringOuter - 14, 125, 235)}" fill="none" stroke="${GOLD}" stroke-width="8" stroke-linecap="round" opacity="0.85"/>`,
  );

  // Inner paper disc
  parts.push(`<circle cx="${cx}" cy="${cy}" r="${ringInner - 5}" fill="${PAPER}"/>`);
  parts.push(`<g clip-path="url(#disc)">`);
  parts.push(honeycombLattice(cx, cy, centerClear * 0.95, cell));

  // Circular finder targets (bullseye style like packaging)
  const finderCenters = [
    { fr: 3, fc: 3 },
    { fr: 3, fc: n - 4 },
    { fr: n - 4, fc: 3 },
  ];
  for (const { fr, fc } of finderCenters) {
    const fx = originX + (fc + quiet + 0.5) * cell;
    const fy = originY + (fr + quiet + 0.5) * cell;
    parts.push(`<circle cx="${fx.toFixed(2)}" cy="${fy.toFixed(2)}" r="${(cell * 3.2).toFixed(2)}" fill="${INK}"/>`);
    parts.push(`<circle cx="${fx.toFixed(2)}" cy="${fy.toFixed(2)}" r="${(cell * 2.2).toFixed(2)}" fill="${PAPER}"/>`);
    parts.push(`<circle cx="${fx.toFixed(2)}" cy="${fy.toFixed(2)}" r="${(cell * 1.1).toFixed(2)}" fill="${INK}"/>`);
  }

  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      if (!modules.get(row, col)) continue;
      if (isFinder(row, col, n)) continue;

      const x = originX + (col + quiet + 0.5) * cell;
      const y = originY + (row + quiet + 0.5) * cell;
      const dist = Math.hypot(x - cx, y - cy);
      if (dist > codeR - cell * 0.15) continue;
      if (dist < centerClear) continue;

      const fc = finderCenter(row, col, n);
      if (fc) {
        const fdx = Math.abs(col - fc.fc);
        const fdy = Math.abs(row - fc.fr);
        if (fdx <= 3 && fdy <= 3) continue;
      }

      const honey = (row + col) % 4 === 0;
      if (honey) {
        parts.push(`<polygon points="${hexPoints(x, y, dotR * 1.05)}" fill="${INK}"/>`);
      } else {
        parts.push(`<circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="${dotR.toFixed(2)}" fill="${INK}"/>`);
      }
    }
  }

  parts.push(`</g>`);

  // Centre brand hex (like box artwork)
  const hr = cell * 2.5;
  parts.push(`<polygon points="${hexPoints(cx, cy, hr)}" fill="#e8e8e8" stroke="${INK}" stroke-width="2"/>`);
  parts.push(`<polygon points="${hexPoints(cx, cy, hr * 0.58)}" fill="#d4d4d4" stroke="${INK}" stroke-width="1.5"/>`);
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 180) * (60 * i - 30);
    const hx = cx + hr * 0.78 * Math.cos(a);
    const hy = cy + hr * 0.78 * Math.sin(a);
    parts.push(`<polygon points="${hexPoints(hx, hy, cell * 0.35)}" fill="${INK}" opacity="0.35"/>`);
  }

  parts.push(
    `<text x="${cx}" y="${cy + ringInner + 36}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="700" letter-spacing="4" fill="${ORANGE}">ALIBARBAR</text>`,
  );
  parts.push(`</svg>`);
  return parts.join("");
}

async function writeHoneycombPng(filePath, payload) {
  const svg = honeycombQrSvg(payload);
  const svgPath = filePath.replace(/\.png$/i, ".svg");
  await writeFile(svgPath, svg);
  await sharp(Buffer.from(svg)).png().toFile(filePath);
}

await mkdir(outDir, { recursive: true });

await QRCode.toFile(path.join(outDir, "entry-verify.png"), VERIFY, {
  type: "png",
  width: 1024,
  margin: 2,
  errorCorrectionLevel: "H",
  color: { dark: "#0a0a0a", light: "#ffffff" },
});

const manifest = {
  entryQr: {
    file: "entry-verify.png",
    url: VERIFY,
    use: "Right-side square packaging QR — opens verify page only",
  },
  honeycombSeals: [],
  note: "Honeycomb seals: circular orange-ring dotted QRs matching box artwork. Scannable on verify page.",
};

for (const id of SEALS) {
  const url = `${VERIFY}?seal=${id}`;
  const file = `honeycomb-${id}.png`;
  await writeHoneycombPng(path.join(outDir, file), url);
  manifest.honeycombSeals.push({
    id,
    file,
    svg: `honeycomb-${id}.svg`,
    url,
    use: "Left honeycomb anti-counterfeit seal — print any of these 5",
  });
  console.log(`✓ ${file} (+svg) → ${url}`);
}

await writeFile(
  path.join(outDir, "README.txt"),
  `Alibarbar packaging authenticity codes
=======================================

RIGHT (square QR — same on every box):
  entry-verify.png
  → ${VERIFY}

LEFT (蜂窝状圆形码 — 5 个任选打印):
${SEALS.map((id) => `  honeycomb-${id}.png / .svg → ${VERIFY}?seal=${id}`).join("\n")}

说明:
  左边是圆形橙环 + 点阵蜂窝风格（仿包装盒 Authentication 左侧图案），
  手机相机和验证页「扫描/上传照片」都能识别。

Customer flow:
  1. Scan right QR → /verify
  2. On page, scan or upload left honeycomb seal
  3. Match → Genuine; else → Not genuine
`,
);

await writeFile(path.join(outDir, "manifest.json"), JSON.stringify(manifest, null, 2));
console.log(`\nWrote honeycomb-style seals to ${outDir}`);

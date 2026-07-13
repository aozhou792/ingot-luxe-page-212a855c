/**
 * Generate scannable honeycomb seals:
 * clean QR (token) + packaging orange ring OUTSIDE the QR (does not cover modules).
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

const SIZE = 1400;
const CX = SIZE / 2;
const CY = SIZE / 2;
const QR_SIZE = 860; // stays well inside orange rings
const ORANGE = "#E36A1A";
const ORANGE_INNER = "#D45F14";

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

function hexPoints(x, y, r) {
  const pts = [];
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 180) * (60 * i - 30);
    pts.push(`${(x + r * Math.cos(a)).toFixed(2)},${(y + r * Math.sin(a)).toFixed(2)}`);
  }
  return pts.join(" ");
}

function frameSvg() {
  const outerR = SIZE * 0.485;
  const orangeR = SIZE * 0.462;
  const thinR = SIZE * 0.428;
  // Decorative hexes live in the RING BAND only (outside QR corner radius ~ QR_SIZE/2 * sqrt(2) ≈ 607)
  // QR half-diagonal ≈ 607; keep decorations beyond ~640 from centre... actually put small hexes on the ring band between thinR and orangeR? Better: 5 tiny hex marks just outside QR corners in the white margin between QR and thin ring.
  const qrHalf = QR_SIZE / 2;
  const decoR = qrHalf + 55; // in quiet white band between QR and orange rings

  const segs = [
    { start: -110, sweep: 95 },
    { start: 0, sweep: 70 },
    { start: 85, sweep: 50 },
    { start: 150, sweep: 85 },
    { start: 250, sweep: 80 },
  ];

  const parts = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">`,
    `<circle cx="${CX}" cy="${CY}" r="${outerR}" fill="#ffffff" stroke="#222" stroke-width="2.5"/>`,
  ];

  for (const seg of segs) {
    parts.push(
      `<path d="${arcPath(CX, CY, orangeR, seg.start, seg.start + seg.sweep)}" fill="none" stroke="${ORANGE}" stroke-width="38" stroke-linecap="butt"/>`,
    );
  }
  parts.push(`<circle cx="${CX}" cy="${CY}" r="${thinR}" fill="none" stroke="${ORANGE_INNER}" stroke-width="4"/>`);

  // Packaging-style satellite hexes in the margin (NOT over QR)
  for (const deg of [-90, -18, 54, 126, 198]) {
    const a = (deg * Math.PI) / 180;
    const sx = CX + Math.cos(a) * decoR;
    const sy = CY + Math.sin(a) * decoR;
    parts.push(
      `<polygon points="${hexPoints(sx, sy, 22)}" fill="#fff" stroke="#111" stroke-width="4"/>`,
    );
    parts.push(`<circle cx="${sx.toFixed(2)}" cy="${sy.toFixed(2)}" r="5" fill="#111"/>`);
  }

  // Small centre mesh hex — OPTIONAL; skip overlay on QR for max scan reliability
  parts.push(`</svg>`);
  return parts.join("");
}

async function writeHoneycombSeal(sealId, payload) {
  const qrPng = await QRCode.toBuffer(payload, {
    type: "png",
    width: QR_SIZE,
    margin: 2,
    errorCorrectionLevel: "H",
    color: { dark: "#111111", light: "#ffffff" },
  });

  await sharp({
    create: { width: SIZE, height: SIZE, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 1 } },
  })
    .composite([
      { input: Buffer.from(frameSvg()), gravity: "centre" },
      { input: qrPng, gravity: "centre" },
    ])
    .png()
    .toFile(path.join(outDir, `honeycomb-${sealId}.png`));
}

await mkdir(outDir, { recursive: true });

await QRCode.toFile(path.join(outDir, "entry-verify.png"), VERIFY, {
  type: "png",
  width: 1024,
  margin: 2,
  errorCorrectionLevel: "H",
  color: { dark: "#0a0a0a", light: "#ffffff" },
});

const tokensDoc = {
  protocol: "alibarbar-au-seal-tokens-v1",
  note: "Shared token library (5 codes). Any seal encoding one of these is genuine. Not one-per-unit.",
  tokens: SEALS,
  payloads: Object.fromEntries(SEALS.map((id) => [id, `${VERIFY}?seal=${id}`])),
};

await writeFile(path.join(outDir, "tokens.json"), JSON.stringify(tokensDoc, null, 2));

const manifest = {
  protocol: tokensDoc.protocol,
  entryQr: { file: "entry-verify.png", url: VERIFY },
  tokenLibrary: "tokens.json",
  honeycombSeals: [],
};

for (const id of SEALS) {
  const payload = `${VERIFY}?seal=${id}`;
  await writeHoneycombSeal(id, payload);
  await QRCode.toFile(path.join(outDir, `token-qr-${id}.png`), payload, {
    type: "png",
    width: 1024,
    margin: 2,
    errorCorrectionLevel: "H",
    color: { dark: "#0a0a0a", light: "#ffffff" },
  });
  manifest.honeycombSeals.push({ id, file: `honeycomb-${id}.png`, payload, tokenQr: `token-qr-${id}.png` });
  console.log(`✓ honeycomb-${id}.png → ${payload}`);
}

await writeFile(
  path.join(outDir, "README.txt"),
  `Alibarbar AU — 5-token honeycomb authenticity
==============================================

模式: 5 个共享 token（随机印，扫中任一即正品）
验真: 扫蜂窝图中的可读 QR → 对照 tokens.json 码库

RIGHT: entry-verify.png → ${VERIFY}
LEFT:  honeycomb-ABSEAL01.png … 05.png  （橙环蜂窝框 + 中间标准 QR）
备用:  token-qr-ABSEAL0N.png
码库: tokens.json

顾客:
  1. 扫右边方码进 /verify
  2. 页内扫/上传左边蜂窝
  3. 读出 ABSEAL0x，在码库内 → 正品
`,
);

await writeFile(path.join(outDir, "manifest.json"), JSON.stringify(manifest, null, 2));
console.log(`\nDone → ${outDir}`);

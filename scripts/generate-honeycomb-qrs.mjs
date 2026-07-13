/**
 * Generate packaging authenticity artwork matching ALIBARBAR box honeycomb seals.
 *
 * Looks like the proprietary circular seal (centre mesh hex + satellite hexes +
 * data dots + segmented orange ring). Each of 5 variants has a unique seeded
 * dot pattern. Verification on /verify uses visual template match (not QR).
 *
 *   node scripts/generate-honeycomb-qrs.mjs
 */
import { createHash } from "node:crypto";
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
const ORANGE = "#E86B1A";
const ORANGE_DEEP = "#D45A0F";
const INK = "#1a1a1a";
const MESH = "#6b6b6b";
const PAPER = "#ffffff";

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
  return `M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`;
}

/** Deterministic PRNG from seal id */
function rng(seed) {
  let h = createHash("sha256").update(seed).digest();
  let i = 0;
  return () => {
    if (i >= h.length) {
      h = createHash("sha256").update(h).digest();
      i = 0;
    }
    const v = h[i++] / 255;
    return v;
  };
}

function meshFill(cx, cy, r, id) {
  const parts = [];
  const clipId = `mesh-${id}`;
  parts.push(`<clipPath id="${clipId}"><polygon points="${hexPoints(cx, cy, r)}"/></clipPath>`);
  parts.push(`<g clip-path="url(#${clipId})">`);
  parts.push(`<rect x="${cx - r}" y="${cy - r}" width="${r * 2}" height="${r * 2}" fill="#9a9a9a"/>`);
  // Fine screen / mesh pattern like packaging
  const step = 4.2;
  for (let y = cy - r; y < cy + r; y += step) {
    for (let x = cx - r; x < cx + r; x += step) {
      const ox = ((Math.floor(y / step) % 2) * step) / 2;
      parts.push(
        `<circle cx="${(x + ox).toFixed(2)}" cy="${y.toFixed(2)}" r="1.15" fill="${MESH}"/>`,
      );
    }
  }
  parts.push(`</g>`);
  parts.push(
    `<polygon points="${hexPoints(cx, cy, r)}" fill="none" stroke="${INK}" stroke-width="2.2"/>`,
  );
  return parts.join("");
}

/**
 * Proprietary-look honeycomb seal — visual match to Ingot box Authentication mark.
 * Dot layout is unique per sealId so photo matching can tell variants apart.
 */
function honeycombSealSvg(sealId) {
  const rand = rng(`alibarbar-honeycomb-${sealId}`);
  const outerR = SIZE * 0.46;
  const midR = SIZE * 0.425;
  const innerR = SIZE * 0.395;
  const codeR = SIZE * 0.355;
  const centreHexR = SIZE * 0.105;
  const satHexR = SIZE * 0.055;

  // 5 satellite hexes around centre (like packaging)
  const satAngles = [-90, -18, 54, 126, 198].map((a, i) => a + (rand() - 0.5) * 4 + i * 0.2);
  const satDist = SIZE * 0.2;

  const parts = [];
  parts.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">`);
  parts.push(`<defs>`);
  parts.push(`<clipPath id="disc-${sealId}"><circle cx="${CX}" cy="${CY}" r="${innerR - 2}"/></clipPath>`);
  parts.push(`</defs>`);
  parts.push(`<rect width="100%" height="100%" fill="${PAPER}"/>`);

  // Segmented orange outer ring (3 arcs of uneven length — packaging style)
  const segments = [
    { start: -40 + rand() * 8, sweep: 95 + rand() * 20 },
    { start: 80 + rand() * 10, sweep: 55 + rand() * 15 },
    { start: 170 + rand() * 12, sweep: 110 + rand() * 25 },
  ];
  for (const seg of segments) {
    parts.push(
      `<path d="${arcPath(CX, CY, outerR, seg.start, seg.start + seg.sweep)}" fill="none" stroke="${ORANGE}" stroke-width="22" stroke-linecap="butt"/>`,
    );
  }
  // Thin continuous orange guide ring
  parts.push(`<circle cx="${CX}" cy="${CY}" r="${midR}" fill="none" stroke="${ORANGE_DEEP}" stroke-width="3.5"/>`);
  parts.push(`<circle cx="${CX}" cy="${CY}" r="${innerR}" fill="none" stroke="#cccccc" stroke-width="1.5"/>`);
  parts.push(`<circle cx="${CX}" cy="${CY}" r="${innerR - 3}" fill="${PAPER}"/>`);

  parts.push(`<g clip-path="url(#disc-${sealId})">`);

  // Data dots — intentional clusters (unique per seal)
  const dotCount = 180 + Math.floor(rand() * 40);
  for (let i = 0; i < dotCount; i++) {
    const ang = rand() * Math.PI * 2;
    const dist = codeR * (0.28 + rand() * 0.68);
    const x = CX + Math.cos(ang) * dist;
    const y = CY + Math.sin(ang) * dist;
    // Keep clear of centre hex and satellite hexes
    if (Math.hypot(x - CX, y - CY) < centreHexR * 1.15) continue;
    let nearSat = false;
    for (const a of satAngles) {
      const sx = CX + Math.cos((a * Math.PI) / 180) * satDist;
      const sy = CY + Math.sin((a * Math.PI) / 180) * satDist;
      if (Math.hypot(x - sx, y - sy) < satHexR * 1.35) {
        nearSat = true;
        break;
      }
    }
    if (nearSat) continue;
    const rr = 2.2 + rand() * 2.8;
    parts.push(`<circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="${rr.toFixed(2)}" fill="${INK}"/>`);
  }

  // Extra structured ring of mid-size dots
  for (let i = 0; i < 36; i++) {
    if (rand() < 0.22) continue;
    const a = (i / 36) * Math.PI * 2 + rand() * 0.08;
    const dist = codeR * (0.72 + rand() * 0.12);
    const x = CX + Math.cos(a) * dist;
    const y = CY + Math.sin(a) * dist;
    parts.push(`<circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="${(2.6 + rand()).toFixed(2)}" fill="${INK}"/>`);
  }

  // Satellite hexagons with white centre dots
  for (const aDeg of satAngles) {
    const a = (aDeg * Math.PI) / 180;
    const sx = CX + Math.cos(a) * satDist;
    const sy = CY + Math.sin(a) * satDist;
    parts.push(
      `<polygon points="${hexPoints(sx, sy, satHexR)}" fill="${PAPER}" stroke="${INK}" stroke-width="5.5"/>`,
    );
    parts.push(`<circle cx="${sx.toFixed(2)}" cy="${sy.toFixed(2)}" r="6.5" fill="${INK}"/>`);
  }

  // Centre mesh hexagon
  parts.push(meshFill(CX, CY, centreHexR, sealId));

  parts.push(`</g>`);
  parts.push(`</svg>`);
  return parts.join("");
}

await mkdir(outDir, { recursive: true });

// Right-side entry QR (standard square)
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
  note: "Honeycomb seals match proprietary box artwork style. Verify page uses visual template matching.",
};

for (const id of SEALS) {
  const svg = honeycombSealSvg(id);
  const file = `honeycomb-${id}.png`;
  const svgFile = `honeycomb-${id}.svg`;
  await writeFile(path.join(outDir, svgFile), svg);
  await sharp(Buffer.from(svg)).png().toFile(path.join(outDir, file));
  manifest.honeycombSeals.push({
    id,
    file,
    svg: svgFile,
    url: `${VERIFY}?seal=${id}`,
    use: "Left honeycomb anti-counterfeit seal — print any of these 5",
  });
  console.log(`✓ ${file} (+svg)`);
}

await writeFile(
  path.join(outDir, "README.txt"),
  `Alibarbar packaging authenticity codes
=======================================

RIGHT (方码，全箱同一个):
  entry-verify.png → ${VERIFY}

LEFT (蜂窝状圆形防伪标 — 5 个任选打印，外观仿原厂 Authentication 贴纸):
${SEALS.map((id) => `  honeycomb-${id}.png / .svg`).join("\n")}

验证方式:
  1. 扫右边方码 → 打开 /verify
  2. 在页面里拍照 / 上传左边蜂窝标
  3. 网站用图像比对判断正品 / 非正品

说明:
  原厂蜂窝是专有点阵协议，我们无法复制其解码系统。
  这边生成的是「外观接近 + 自家可验证」的印刷稿，不需要再下设计软件。
`,
);

await writeFile(path.join(outDir, "manifest.json"), JSON.stringify(manifest, null, 2));
console.log(`\nWrote seals to ${outDir}`);

/**
 * Generate packaging authenticity seals matching the ALIBARBAR box mark:
 * centre mesh hex + 5 black satellite hexes (white cores) + clustered dots
 * + segmented orange ring. Own visual protocol — verified on /verify by photo match.
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
const ORANGE_DEEP = "#C45A12";
const INK = "#1a1a1a";
const MESH = "#4a4a4a";
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

function rng(seed) {
  let h = createHash("sha256").update(seed).digest();
  let i = 0;
  return () => {
    if (i >= h.length) {
      h = createHash("sha256").update(h).digest();
      i = 0;
    }
    return h[i++] / 255;
  };
}

/** Centre hex filled with fine mesh / screen (packaging look). */
function meshFill(cx, cy, r, id) {
  const parts = [];
  const clipId = `mesh-${id}`;
  parts.push(`<clipPath id="${clipId}"><polygon points="${hexPoints(cx, cy, r)}"/></clipPath>`);
  parts.push(`<g clip-path="url(#${clipId})">`);
  parts.push(`<rect x="${cx - r}" y="${cy - r}" width="${r * 2}" height="${r * 2}" fill="#6e6e6e"/>`);
  const step = 3.6;
  for (let y = cy - r; y < cy + r; y += step) {
    for (let x = cx - r; x < cx + r; x += step) {
      const ox = ((Math.floor(y / step) % 2) * step) / 2;
      parts.push(`<circle cx="${(x + ox).toFixed(2)}" cy="${y.toFixed(2)}" r="1.05" fill="${MESH}"/>`);
    }
  }
  // Soft highlight like printed mesh
  parts.push(
    `<ellipse cx="${(cx - r * 0.2).toFixed(2)}" cy="${(cy - r * 0.25).toFixed(2)}" rx="${(r * 0.55).toFixed(2)}" ry="${(r * 0.4).toFixed(2)}" fill="#ffffff" opacity="0.12"/>`,
  );
  parts.push(`</g>`);
  parts.push(`<polygon points="${hexPoints(cx, cy, r)}" fill="none" stroke="${INK}" stroke-width="2.4"/>`);
  return parts.join("");
}

function nearAny(x, y, points, minDist) {
  for (const p of points) {
    if (Math.hypot(x - p.x, y - p.y) < minDist) return true;
  }
  return false;
}

/**
 * Packaging-style honeycomb seal (own protocol artwork).
 * Unique seeded dots per sealId for visual template matching on /verify.
 */
function honeycombSealSvg(sealId) {
  const rand = rng(`alibarbar-honeycomb-v2-${sealId}`);
  const outerR = SIZE * 0.455;
  const midR = SIZE * 0.418;
  const innerR = SIZE * 0.388;
  const codeR = SIZE * 0.348;
  const centreHexR = SIZE * 0.098;
  const satHexR = SIZE * 0.058;
  const satDist = SIZE * 0.205;

  // Four satellite hexes (packaging layout) + slight seed jitter
  const baseAngles = [-50, 40, 130, 220];
  const satAngles = baseAngles.map((a) => a + (rand() - 0.5) * 6);
  const satCenters = satAngles.map((aDeg) => {
    const a = (aDeg * Math.PI) / 180;
    return { x: CX + Math.cos(a) * satDist, y: CY + Math.sin(a) * satDist };
  });

  const keepOut = [{ x: CX, y: CY, r: centreHexR * 1.2 }, ...satCenters.map((p) => ({ ...p, r: satHexR * 1.4 }))];

  const parts = [];
  parts.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">`);
  parts.push(`<defs>`);
  parts.push(`<clipPath id="disc-${sealId}"><circle cx="${CX}" cy="${CY}" r="${innerR - 2}"/></clipPath>`);
  parts.push(`</defs>`);
  parts.push(`<rect width="100%" height="100%" fill="${PAPER}"/>`);

  // Outer thin black ring
  parts.push(`<circle cx="${CX}" cy="${CY}" r="${outerR + 8}" fill="none" stroke="${INK}" stroke-width="2.5"/>`);

  // Segmented orange ring (uneven arcs like packaging)
  const segments = [
    { start: -35 + rand() * 6, sweep: 88 + rand() * 18 },
    { start: 72 + rand() * 8, sweep: 48 + rand() * 14 },
    { start: 145 + rand() * 10, sweep: 70 + rand() * 16 },
    { start: 240 + rand() * 8, sweep: 55 + rand() * 12 },
  ];
  for (const seg of segments) {
    parts.push(
      `<path d="${arcPath(CX, CY, outerR, seg.start, seg.start + seg.sweep)}" fill="none" stroke="${ORANGE}" stroke-width="20" stroke-linecap="butt"/>`,
    );
  }
  parts.push(`<circle cx="${CX}" cy="${CY}" r="${midR}" fill="none" stroke="${ORANGE_DEEP}" stroke-width="2.8"/>`);
  parts.push(`<circle cx="${CX}" cy="${CY}" r="${innerR}" fill="none" stroke="#bbbbbb" stroke-width="1.2"/>`);
  parts.push(`<circle cx="${CX}" cy="${CY}" r="${innerR - 2}" fill="${PAPER}"/>`);

  parts.push(`<g clip-path="url(#disc-${sealId})">`);

  // Clustered / short-arc data dots (packaging style — not uniform noise)
  const clusterCount = 28 + Math.floor(rand() * 8);
  for (let c = 0; c < clusterCount; c++) {
    const ang = rand() * Math.PI * 2;
    const dist = codeR * (0.32 + rand() * 0.62);
    const bx = CX + Math.cos(ang) * dist;
    const by = CY + Math.sin(ang) * dist;
    if (nearAny(bx, by, keepOut, keepOut[0].r)) continue;

    const kind = rand();
    if (kind < 0.35) {
      // Short curved line of 3–5 dots
      const n = 3 + Math.floor(rand() * 3);
      const tang = ang + Math.PI / 2;
      for (let k = 0; k < n; k++) {
        const t = (k - (n - 1) / 2) * (4.5 + rand() * 2);
        const bend = Math.sin(k * 0.7) * 2.2;
        const x = bx + Math.cos(tang) * t + Math.cos(ang) * bend;
        const y = by + Math.sin(tang) * t + Math.sin(ang) * bend;
        if (nearAny(x, y, keepOut, keepOut[0].r * 0.9)) continue;
        if (Math.hypot(x - CX, y - CY) > codeR) continue;
        parts.push(`<circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="${(2.1 + rand() * 1.4).toFixed(2)}" fill="${INK}"/>`);
      }
    } else if (kind < 0.7) {
      // Tight cluster 3–4 dots
      const n = 3 + Math.floor(rand() * 2);
      for (let k = 0; k < n; k++) {
        const x = bx + (rand() - 0.5) * 10;
        const y = by + (rand() - 0.5) * 10;
        if (nearAny(x, y, keepOut, keepOut[0].r * 0.9)) continue;
        if (Math.hypot(x - CX, y - CY) > codeR) continue;
        parts.push(`<circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="${(2.3 + rand() * 1.8).toFixed(2)}" fill="${INK}"/>`);
      }
    } else {
      // Single mid/large dot
      parts.push(`<circle cx="${bx.toFixed(2)}" cy="${by.toFixed(2)}" r="${(2.8 + rand() * 2.2).toFixed(2)}" fill="${INK}"/>`);
    }
  }

  // Sparse filler dots
  for (let i = 0; i < 55; i++) {
    const ang = rand() * Math.PI * 2;
    const dist = codeR * (0.3 + rand() * 0.65);
    const x = CX + Math.cos(ang) * dist;
    const y = CY + Math.sin(ang) * dist;
    if (nearAny(x, y, keepOut, keepOut[0].r)) continue;
    parts.push(`<circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="${(1.6 + rand() * 1.2).toFixed(2)}" fill="${INK}"/>`);
  }

  // Satellite hexagons — thick black outline, white fill, black centre dot (packaging)
  for (const p of satCenters) {
    parts.push(
      `<polygon points="${hexPoints(p.x, p.y, satHexR)}" fill="${PAPER}" stroke="${INK}" stroke-width="7"/>`,
    );
    parts.push(`<circle cx="${p.x.toFixed(2)}" cy="${p.y.toFixed(2)}" r="5.5" fill="${INK}"/>`);
  }

  // Centre mesh hexagon
  parts.push(meshFill(CX, CY, centreHexR, sealId));

  parts.push(`</g>`);
  parts.push(`</svg>`);
  return parts.join("");
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
  protocol: "alibarbar-au-honeycomb-v2",
  entryQr: {
    file: "entry-verify.png",
    url: VERIFY,
    use: "Right-side square QR — opens verify page",
  },
  honeycombSeals: [],
  note: "Own visual protocol (packaging-style honeycomb). Verified on /verify by photo template match — not manufacturer SDK.",
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
    use: "Left honeycomb seal — print any of these 5",
  });
  console.log(`✓ ${file}`);
}

await writeFile(
  path.join(outDir, "README.txt"),
  `Alibarbar AU — own honeycomb authenticity protocol
==================================================

外观：仿包装 Authentication 圆章（中心网纹六边形 + 5 个黑六边形白芯 + 点阵簇 + 橙环）
验真：自家网站 /verify 拍照比对模板（不依赖原厂协议）

RIGHT 方码（全箱同一个）:
  entry-verify.png → ${VERIFY}

LEFT 蜂窝点阵（5 选一印刷）:
${SEALS.map((id) => `  honeycomb-${id}.png / .svg`).join("\n")}

流程:
  1. 扫右边方码 → /verify
  2. 拍照 / 上传左边蜂窝标
  3. 匹配模板 → 正品页；否则 → 非正品页
`,
);

await writeFile(path.join(outDir, "manifest.json"), JSON.stringify(manifest, null, 2));
console.log(`\nWrote seals to ${outDir}`);

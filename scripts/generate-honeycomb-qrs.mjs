/**
 * Generate honeycomb seals to match ALIBARBAR packaging Authentication sticker.
 * Reference: packaging circular mark (centre mesh hex + 5 outline hexes + data dots + orange rings).
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

const SIZE = 1600;
const CX = SIZE / 2;
const CY = SIZE / 2;

// Colours matched from packaging photo
const ORANGE = "#E36A1A";
const ORANGE_INNER = "#D45F14";
const INK = "#1c1c1c";
const MESH_BG = "#7a7a7a";
const MESH_DOT = "#2e2e2e";
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
  let sweep = endDeg - startDeg;
  while (sweep < 0) sweep += 360;
  while (sweep >= 360) sweep -= 360;
  const s = (Math.PI / 180) * startDeg;
  const e = (Math.PI / 180) * (startDeg + sweep);
  const x1 = cx + r * Math.cos(s);
  const y1 = cy + r * Math.sin(s);
  const x2 = cx + r * Math.cos(e);
  const y2 = cy + r * Math.sin(e);
  const large = sweep > 180 ? 1 : 0;
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

function centreMesh(cx, cy, r, id) {
  const parts = [];
  const clip = `mesh-${id}`;
  parts.push(`<clipPath id="${clip}"><polygon points="${hexPoints(cx, cy, r)}"/></clipPath>`);
  parts.push(`<g clip-path="url(#${clip})">`);
  parts.push(`<rect x="${cx - r}" y="${cy - r}" width="${r * 2}" height="${r * 2}" fill="${MESH_BG}"/>`);
  // Fine halftone mesh like packaging centre hex
  const step = 2.8;
  for (let y = cy - r - step; y <= cy + r + step; y += step) {
    for (let x = cx - r - step; x <= cx + r + step; x += step) {
      const ox = (Math.floor((y - (cy - r)) / step) % 2) * (step / 2);
      parts.push(
        `<circle cx="${(x + ox).toFixed(2)}" cy="${y.toFixed(2)}" r="1.05" fill="${MESH_DOT}"/>`,
      );
    }
  }
  // Soft top highlight (printed plastic look)
  parts.push(
    `<ellipse cx="${cx}" cy="${(cy - r * 0.15).toFixed(2)}" rx="${(r * 0.72).toFixed(2)}" ry="${(r * 0.55).toFixed(2)}" fill="#ffffff" opacity="0.14"/>`,
  );
  parts.push(`</g>`);
  parts.push(`<polygon points="${hexPoints(cx, cy, r)}" fill="none" stroke="${INK}" stroke-width="1.8"/>`);
  return parts.join("");
}

function blocked(x, y, zones) {
  for (const z of zones) {
    if (Math.hypot(x - z.x, y - z.y) < z.r) return true;
  }
  return false;
}

/**
 * Match packaging Authentication circular sticker as closely as possible.
 * Dot layout unique per sealId (own verify protocol).
 */
function honeycombSealSvg(sealId) {
  const rand = rng(`pack-match-v3-${sealId}`);

  // Proportions from packaging photo
  const outerR = SIZE * 0.448;
  const orangeR = SIZE * 0.428;
  const thinOrangeR = SIZE * 0.395;
  const discR = SIZE * 0.382;
  const codeR = SIZE * 0.335;
  const centreR = SIZE * 0.1;
  const satR = SIZE * 0.05;
  const satDist = SIZE * 0.178;

  // Five satellite hexes — packaging pentagon (tip roughly at top)
  const satAngles = [-90, -18, 54, 126, 198].map((a) => a + (rand() - 0.5) * 1.5);
  const sats = satAngles.map((deg) => {
    const a = (deg * Math.PI) / 180;
    return { x: CX + Math.cos(a) * satDist, y: CY + Math.sin(a) * satDist };
  });

  const zones = [
    { x: CX, y: CY, r: centreR * 1.25 },
    ...sats.map((s) => ({ x: s.x, y: s.y, r: satR * 1.45 })),
  ];

  const parts = [];
  parts.push(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">`,
  );
  parts.push(`<defs>`);
  parts.push(`<clipPath id="disc-${sealId}"><circle cx="${CX}" cy="${CY}" r="${discR}"/></clipPath>`);
  parts.push(`</defs>`);
  parts.push(`<rect width="100%" height="100%" fill="${PAPER}"/>`);

  // White sticker disc + thin black outer rim (like cut sticker edge)
  parts.push(`<circle cx="${CX}" cy="${CY}" r="${outerR}" fill="${PAPER}" stroke="#222222" stroke-width="2"/>`);

  // Thick segmented orange outer ring — packaging is mostly continuous with a few gaps
  const baseSegs = [
    { start: -110, sweep: 95 },
    { start: 0, sweep: 70 },
    { start: 85, sweep: 50 },
    { start: 150, sweep: 85 },
    { start: 250, sweep: 80 },
  ];
  for (const seg of baseSegs) {
    const start = seg.start + (rand() - 0.5) * 2;
    const sweep = seg.sweep + (rand() - 0.5) * 3;
    parts.push(
      `<path d="${arcPath(CX, CY, orangeR, start, start + sweep)}" fill="none" stroke="${ORANGE}" stroke-width="34" stroke-linecap="butt"/>`,
    );
  }

  // Continuous thinner orange ring inside (packaging)
  parts.push(
    `<circle cx="${CX}" cy="${CY}" r="${thinOrangeR}" fill="none" stroke="${ORANGE_INNER}" stroke-width="4"/>`,
  );
  // Hairline grey guide
  parts.push(`<circle cx="${CX}" cy="${CY}" r="${discR}" fill="none" stroke="#c8c8c8" stroke-width="1"/>`);
  parts.push(`<circle cx="${CX}" cy="${CY}" r="${discR - 1}" fill="${PAPER}"/>`);

  parts.push(`<g clip-path="url(#disc-${sealId})">`);

  // --- Data dots: clusters + short lines + isolates (packaging character) ---
  // Pre-planned cluster anchors around the ring (then seed jitter per seal)
  const clusterAnchors = [
    { a: -70, d: 0.78, n: 5 },
    { a: -30, d: 0.55, n: 4 },
    { a: 10, d: 0.82, n: 6 },
    { a: 55, d: 0.62, n: 3 },
    { a: 95, d: 0.8, n: 4 },
    { a: 140, d: 0.58, n: 5 },
    { a: 175, d: 0.75, n: 3 },
    { a: 210, d: 0.52, n: 4 },
    { a: 250, d: 0.84, n: 5 },
    { a: 290, d: 0.6, n: 3 },
    { a: 320, d: 0.72, n: 4 },
    { a: 350, d: 0.48, n: 3 },
  ];

  for (const cl of clusterAnchors) {
    const ang = ((cl.a + (rand() - 0.5) * 8) * Math.PI) / 180;
    const dist = codeR * (cl.d + (rand() - 0.5) * 0.06);
    const bx = CX + Math.cos(ang) * dist;
    const by = CY + Math.sin(ang) * dist;
    if (blocked(bx, by, zones)) continue;

    const mode = rand();
    if (mode < 0.4) {
      // Short nearly-straight / slight-curve line
      const tang = ang + Math.PI / 2 + (rand() - 0.5) * 0.4;
      for (let k = 0; k < cl.n; k++) {
        const t = (k - (cl.n - 1) / 2) * (5.2 + rand() * 1.8);
        const bend = Math.sin(k * 0.9 + rand()) * 1.8;
        const x = bx + Math.cos(tang) * t + Math.cos(ang) * bend;
        const y = by + Math.sin(tang) * t + Math.sin(ang) * bend;
        if (blocked(x, y, zones)) continue;
        if (Math.hypot(x - CX, y - CY) > codeR * 0.98) continue;
        const rr = 2.0 + rand() * 1.6;
        parts.push(`<circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="${rr.toFixed(2)}" fill="${INK}"/>`);
      }
    } else {
      // Tight irregular cluster
      for (let k = 0; k < cl.n; k++) {
        const x = bx + (rand() - 0.5) * 14;
        const y = by + (rand() - 0.5) * 14;
        if (blocked(x, y, zones)) continue;
        if (Math.hypot(x - CX, y - CY) > codeR * 0.98) continue;
        const rr = 2.2 + rand() * 2.0;
        parts.push(`<circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="${rr.toFixed(2)}" fill="${INK}"/>`);
      }
    }
  }

  // Sparse isolated dots
  for (let i = 0; i < 48; i++) {
    const ang = rand() * Math.PI * 2;
    const dist = codeR * (0.38 + rand() * 0.55);
    const x = CX + Math.cos(ang) * dist;
    const y = CY + Math.sin(ang) * dist;
    if (blocked(x, y, zones)) continue;
    parts.push(`<circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="${(1.7 + rand() * 1.5).toFixed(2)}" fill="${INK}"/>`);
  }

  // Five satellite hex outlines + centre dots (packaging finder marks)
  for (const s of sats) {
    parts.push(
      `<polygon points="${hexPoints(s.x, s.y, satR)}" fill="${PAPER}" stroke="${INK}" stroke-width="10" stroke-linejoin="miter"/>`,
    );
    parts.push(`<circle cx="${s.x.toFixed(2)}" cy="${s.y.toFixed(2)}" r="5.8" fill="${INK}"/>`);
  }

  // Centre mesh hexagon
  parts.push(centreMesh(CX, CY, centreR, sealId));

  parts.push(`</g>`);
  parts.push(`</svg>`);
  return parts.join("");
}

/** Full AUTHENTICATION panel mock (for print layout reference). */
function panelSvg(sealId) {
  const seal = honeycombSealSvg(sealId);
  // Extract inner content without outer svg wrapper — simpler: embed as image via nested svg
  const inner = seal
    .replace(/<svg[^>]*>/, "")
    .replace(/<\/svg>/, "")
    .replace(/width="1600" height="1600"/, "");

  const W = 900;
  const H = 1100;
  const sealSize = 520;
  const sx = (W - sealSize) / 2;
  const sy = 120;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="100%" height="100%" fill="#C9A84A"/>
  <rect x="24" y="24" width="${W - 48}" height="${H - 48}" fill="none" stroke="#1a1a1a" stroke-width="2"/>
  <text x="${W / 2}" y="88" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="42" font-weight="700" letter-spacing="1" fill="#1a1a1a">AUTHENTICATION</text>
  <svg x="${sx}" y="${sy}" width="${sealSize}" height="${sealSize}" viewBox="0 0 1600 1600">${inner}</svg>
  <text x="${W / 2}" y="720" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="22" fill="#1a1a1a">Open <tspan font-weight="700">www.alibarbar.mom/verify</tspan></text>
  <text x="${W / 2}" y="752" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="20" fill="#1a1a1a">to verify your ALIBARBAR's</text>
  <text x="${W / 2}" y="784" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="20" fill="#1a1a1a">authenticity</text>
  <text x="${W / 2}" y="860" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="14" fill="#333333">Seal ${sealId} · Alibarbar Australia</text>
</svg>`;
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
  protocol: "alibarbar-au-honeycomb-v3",
  entryQr: { file: "entry-verify.png", url: VERIFY },
  honeycombSeals: [],
  note: "Visual match to packaging Authentication sticker. Verified on /verify by photo template match.",
};

for (const id of SEALS) {
  const svg = honeycombSealSvg(id);
  const file = `honeycomb-${id}.png`;
  const svgFile = `honeycomb-${id}.svg`;
  await writeFile(path.join(outDir, svgFile), svg);
  await sharp(Buffer.from(svg)).png().toFile(path.join(outDir, file));

  const panel = panelSvg(id);
  const panelPng = `panel-${id}.png`;
  await writeFile(path.join(outDir, `panel-${id}.svg`), panel);
  await sharp(Buffer.from(panel)).png().toFile(path.join(outDir, panelPng));

  manifest.honeycombSeals.push({ id, file, svg: svgFile, panel: panelPng });
  console.log(`✓ ${file} + ${panelPng}`);
}

await writeFile(
  path.join(outDir, "README.txt"),
  `Packaging-matched honeycomb seals (Alibarbar AU own verify protocol)
===================================================================

LEFT circular seal (print on box Authentication area):
${SEALS.map((id) => `  honeycomb-${id}.png`).join("\n")}

Full panel mock (gold AUTHENTICATION layout reference):
${SEALS.map((id) => `  panel-${id}.png`).join("\n")}

RIGHT entry QR:
  entry-verify.png → ${VERIFY}

Verify: scan right QR → photograph left seal on /verify
`,
);

await writeFile(path.join(outDir, "manifest.json"), JSON.stringify(manifest, null, 2));
console.log(`\nDone → ${outDir}`);

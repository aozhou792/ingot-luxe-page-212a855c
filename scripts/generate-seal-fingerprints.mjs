/**
 * Precompute grayscale fingerprints for the honeycomb templates.
 * Used by /api/verify-authenticity photo matching.
 *
 *   node scripts/generate-seal-fingerprints.mjs
 */
import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const SAMPLE = 64;
const SEALS = ["ABSEAL01", "ABSEAL02", "ABSEAL03", "ABSEAL04", "ABSEAL05", "ABSEAL06"];

async function fingerprintPng(filePath) {
  const { data, info } = await sharp(filePath)
    .rotate() // honour EXIF
    .resize(SAMPLE, SAMPLE, { fit: "cover", position: "centre" })
    .greyscale()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const n = info.width * info.height;
  const out = new Float64Array(n);
  let sum = 0;
  const cx = (info.width - 1) / 2;
  const cy = (info.height - 1) / 2;
  const rMax = Math.min(cx, cy) * 0.98;

  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const i = y * info.width + x;
      const dist = Math.hypot(x - cx, y - cy);
      // Circular mask — ignore square corners outside the sticker disc
      const g = dist > rMax ? 0.5 : data[i] / 255;
      out[i] = g;
      sum += g;
    }
  }

  const mean = sum / n;
  let norm = 0;
  for (let i = 0; i < n; i++) {
    out[i] -= mean;
    norm += out[i] * out[i];
  }
  norm = Math.sqrt(norm) || 1;
  const fp = new Array(n);
  for (let i = 0; i < n; i++) fp[i] = Number((out[i] / norm).toFixed(8));

  const hash = createHash("sha256").update(Buffer.from(data)).digest("hex").slice(0, 16);
  return { fp, hash, sample: SAMPLE };
}

const seals = [];
for (const id of SEALS) {
  const file = path.join(root, "public/authenticity", `honeycomb-${id}.png`);
  const { fp, hash, sample } = await fingerprintPng(file);
  seals.push({ id, hash, sample, fp });
  console.log(`✓ ${id} hash=${hash}`);
}

const outDir = path.join(root, "api/_lib");
await mkdir(outDir, { recursive: true });
const payload = {
  version: 1,
  sample: SAMPLE,
  threshold: 0.75,
  generatedAt: new Date().toISOString(),
  seals,
  note: "Photo match fingerprints for Alibarbar AU honeycomb seals (6 shared templates).",
};

await writeFile(path.join(outDir, "seal-fingerprints.json"), JSON.stringify(payload));
console.log(`\nWrote api/_lib/seal-fingerprints.json (${seals.length} seals, sample=${SAMPLE})`);

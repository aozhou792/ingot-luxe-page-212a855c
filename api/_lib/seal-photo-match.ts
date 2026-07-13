import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

type SealFp = { id: string; sample: number; fp: number[] };
type FpFile = { sample: number; threshold: number; seals: SealFp[] };

const __dirname = dirname(fileURLToPath(import.meta.url));
const fingerprints = JSON.parse(readFileSync(join(__dirname, "seal-fingerprints.json"), "utf8")) as FpFile;

export type PhotoMatchResult =
  | { matched: true; id: string; score: number }
  | { matched: false; id: string; score: number };

const SAMPLE = fingerprints.sample ?? 64;
export const THRESHOLD = fingerprints.threshold ?? 0.75;
const SEALS = fingerprints.seals;

function correlation(a: Float64Array | number[], b: number[]): number {
  let s = 0;
  const n = Math.min(a.length, b.length);
  for (let i = 0; i < n; i++) s += Number(a[i]) * b[i]!;
  return s;
}

export function fingerprintFromGrey(data: Buffer | Uint8Array, width: number, height: number): Float64Array {
  const n = width * height;
  const out = new Float64Array(n);
  let sum = 0;
  const cx = (width - 1) / 2;
  const cy = (height - 1) / 2;
  const rMax = Math.min(cx, cy) * 0.98;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = y * width + x;
      const dist = Math.hypot(x - cx, y - cy);
      const g = dist > rMax ? 0.5 : data[i]! / 255;
      out[i] = g;
      sum += g;
    }
  }

  const mean = sum / n;
  let norm = 0;
  for (let i = 0; i < n; i++) {
    out[i]! -= mean;
    norm += out[i]! * out[i]!;
  }
  norm = Math.sqrt(norm) || 1;
  for (let i = 0; i < n; i++) out[i]! /= norm;
  return out;
}

export async function fingerprintFromImageBuffer(buf: Buffer): Promise<Float64Array> {
  const { data, info } = await sharp(buf)
    .rotate()
    .resize(SAMPLE, SAMPLE, { fit: "cover", position: "centre" })
    .greyscale()
    .raw()
    .toBuffer({ resolveWithObject: true });
  return fingerprintFromGrey(data, info.width, info.height);
}

export function matchFingerprint(fp: Float64Array | number[]): PhotoMatchResult {
  let bestId = SEALS[0]?.id ?? "UNKNOWN";
  let bestScore = -1;
  for (const seal of SEALS) {
    const score = correlation(fp, seal.fp);
    if (score > bestScore) {
      bestScore = score;
      bestId = seal.id;
    }
  }
  if (bestScore >= THRESHOLD) {
    return { matched: true, id: bestId, score: bestScore };
  }
  return { matched: false, id: bestId, score: bestScore };
}

export async function matchSealPhotoBuffer(buf: Buffer): Promise<PhotoMatchResult> {
  const fp = await fingerprintFromImageBuffer(buf);
  return matchFingerprint(fp);
}

export function parseDataUrlImage(dataUrl: string): Buffer | null {
  const m = dataUrl.match(/^data:image\/[a-zA-Z0-9+.+-]+;base64,(.+)$/);
  if (!m?.[1]) return null;
  try {
    return Buffer.from(m[1], "base64");
  } catch {
    return null;
  }
}

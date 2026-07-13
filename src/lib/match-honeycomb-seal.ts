/**
 * Visual match of an uploaded / captured honeycomb seal photo
 * against the official print templates in /authenticity/.
 */
import { HONEYCOMB_SEALS, type HoneycombSealId } from "@/data/authenticity-codes";

const SAMPLE = 48;
/** Minimum correlation to accept as a genuine seal (0–1). */
const MATCH_THRESHOLD = 0.7;

async function loadImage(src: string | Blob): Promise<HTMLImageElement> {
  const url = typeof src === "string" ? src : URL.createObjectURL(src);
  try {
    return await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.crossOrigin = "anonymous";
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error("Could not load image"));
      el.src = url;
    });
  } finally {
    if (typeof src !== "string") URL.revokeObjectURL(url);
  }
}

/** Crop to the largest centred square and downsample to SAMPLE×SAMPLE grayscale. */
function fingerprint(img: HTMLImageElement | HTMLCanvasElement): Float32Array {
  const canvas = document.createElement("canvas");
  canvas.width = SAMPLE;
  canvas.height = SAMPLE;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("Canvas unsupported");

  const w = img instanceof HTMLImageElement ? img.naturalWidth || img.width : img.width;
  const h = img instanceof HTMLImageElement ? img.naturalHeight || img.height : img.height;
  const side = Math.min(w, h) || 1;
  const sx = (w - side) / 2;
  const sy = (h - side) / 2;
  ctx.drawImage(img, sx, sy, side, side, 0, 0, SAMPLE, SAMPLE);

  const { data } = ctx.getImageData(0, 0, SAMPLE, SAMPLE);
  const out = new Float32Array(SAMPLE * SAMPLE);
  let sum = 0;
  for (let i = 0; i < out.length; i++) {
    const o = i * 4;
    const g = (data[o]! * 0.299 + data[o + 1]! * 0.587 + data[o + 2]! * 0.114) / 255;
    out[i] = g;
    sum += g;
  }
  const mean = sum / out.length;
  let norm = 0;
  for (let i = 0; i < out.length; i++) {
    out[i]! -= mean;
    norm += out[i]! * out[i]!;
  }
  norm = Math.sqrt(norm) || 1;
  for (let i = 0; i < out.length; i++) out[i]! /= norm;
  return out;
}

function correlation(a: Float32Array, b: Float32Array): number {
  let s = 0;
  for (let i = 0; i < a.length; i++) s += a[i]! * b[i]!;
  return s;
}

let templateCache: { id: HoneycombSealId; fp: Float32Array }[] | null = null;

async function loadTemplates() {
  if (templateCache) return templateCache;
  const loaded = await Promise.all(
    HONEYCOMB_SEALS.map(async (seal) => {
      const img = await loadImage(`/authenticity/honeycomb-${seal.id}.png`);
      return { id: seal.id, fp: fingerprint(img) };
    }),
  );
  templateCache = loaded;
  return loaded;
}

export type VisualMatchResult =
  | { matched: true; id: HoneycombSealId; score: number }
  | { matched: false; id: string; score: number };

/** Compare a photo/blob/canvas of a honeycomb seal against the 5 official templates. */
export async function matchHoneycombPhoto(source: Blob | HTMLCanvasElement): Promise<VisualMatchResult> {
  const templates = await loadTemplates();
  const fp =
    source instanceof Blob ? fingerprint(await loadImage(source)) : fingerprint(source);

  let bestId: HoneycombSealId = templates[0]!.id;
  let bestScore = -1;
  for (const t of templates) {
    const score = correlation(fp, t.fp);
    if (score > bestScore) {
      bestScore = score;
      bestId = t.id;
    }
  }

  if (bestScore >= MATCH_THRESHOLD) {
    return { matched: true, id: bestId, score: bestScore };
  }
  return { matched: false, id: bestId, score: bestScore };
}

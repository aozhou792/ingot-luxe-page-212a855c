import { SITE_URL } from "@/data/site";

/** Right packaging QR — opens the verify page only. */
export const VERIFY_PAGE_URL = `${SITE_URL}/verify`;

export const HONEYCOMB_SEALS = [
  { id: "ABSEAL01", label: "Seal A" },
  { id: "ABSEAL02", label: "Seal B" },
  { id: "ABSEAL03", label: "Seal C" },
  { id: "ABSEAL04", label: "Seal D" },
  { id: "ABSEAL05", label: "Seal E" },
] as const;

export type HoneycombSealId = (typeof HONEYCOMB_SEALS)[number]["id"];

export function honeycombSealUrl(id: string): string {
  return `${VERIFY_PAGE_URL}?seal=${encodeURIComponent(id)}`;
}

export type VerifySealApiResult =
  | {
      ok: true;
      authentic: true;
      code: string;
      message: string;
      method?: string;
      score?: number;
      productHint?: string;
    }
  | {
      ok: true;
      authentic: false;
      code?: string;
      message: string;
      method?: string;
      score?: number;
    }
  | { ok: false; authentic: false; error: string };

/** Compress an image File/Blob to a JPEG data URL for the verify API. */
export async function fileToVerifyDataUrl(file: Blob, maxEdge = 1200, quality = 0.72): Promise<string> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxEdge / Math.max(bitmap.width, bitmap.height));
  const w = Math.max(1, Math.round(bitmap.width * scale));
  const h = Math.max(1, Math.round(bitmap.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas unsupported");
  ctx.drawImage(bitmap, 0, 0, w, h);
  bitmap.close();
  return canvas.toDataURL("image/jpeg", quality);
}

/** Photo comparison against official templates (server-side). */
export async function verifySealPhoto(imageDataUrl: string): Promise<VerifySealApiResult> {
  const res = await fetch("/api/verify-authenticity", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ imageBase64: imageDataUrl }),
  });
  return (await res.json()) as VerifySealApiResult;
}

/** Optional legacy token path (deprecated — seals are photo-only). */
export async function verifySealToken(raw: string): Promise<VerifySealApiResult> {
  const res = await fetch("/api/verify-authenticity", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code: raw }),
  });
  return (await res.json()) as VerifySealApiResult;
}

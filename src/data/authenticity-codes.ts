import { SITE_URL } from "@/data/site";

/** Right packaging QR — opens the verify page only (no seal token). */
export const VERIFY_PAGE_URL = `${SITE_URL}/verify`;

/**
 * Shared authenticity token library (5 codes — not one-per-unit).
 * Must stay in sync with api/_lib/seal-tokens.ts and public/authenticity/tokens.json.
 */
export const HONEYCOMB_SEALS = [
  { id: "ABSEAL01", label: "Seal A", token: "ABSEAL01" },
  { id: "ABSEAL02", label: "Seal B", token: "ABSEAL02" },
  { id: "ABSEAL03", label: "Seal C", token: "ABSEAL03" },
  { id: "ABSEAL04", label: "Seal D", token: "ABSEAL04" },
  { id: "ABSEAL05", label: "Seal E", token: "ABSEAL05" },
] as const;

export type HoneycombSealId = (typeof HONEYCOMB_SEALS)[number]["id"];

/** Payload encoded inside each honeycomb QR. */
export function honeycombSealUrl(id: string): string {
  return `${VERIFY_PAGE_URL}?seal=${encodeURIComponent(id)}`;
}

export function normalizeSealPayload(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return "";

  try {
    if (trimmed.includes("://") || trimmed.startsWith("www.")) {
      const url = new URL(trimmed.startsWith("www.") ? `https://${trimmed}` : trimmed);
      const seal = url.searchParams.get("seal") ?? url.searchParams.get("code") ?? url.searchParams.get("token");
      if (seal) return seal.trim().toUpperCase().replace(/[\s\-_.]/g, "");
    }
  } catch {
    // not a URL
  }

  const sealMatch = trimmed.match(/[?&](?:seal|code|token)=([A-Za-z0-9_-]+)/i);
  if (sealMatch?.[1]) return sealMatch[1].toUpperCase().replace(/[\s\-_.]/g, "");

  return trimmed.toUpperCase().replace(/[\s\-_.]/g, "");
}

export type VerifySealApiResult =
  | { ok: true; authentic: true; code: string; message: string; productHint?: string }
  | { ok: true; authentic: false; code: string; message: string }
  | { ok: false; authentic: false; error: string };

/** Call authenticity API — server checks the 5-token library. */
export async function verifySealToken(raw: string): Promise<VerifySealApiResult> {
  const res = await fetch("/api/verify-authenticity", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code: raw }),
  });
  const data = (await res.json()) as VerifySealApiResult;
  return data;
}

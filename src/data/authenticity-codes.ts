import { SITE_URL } from "@/data/site";

/** Right packaging QR — opens the verify page only (no seal token). */
export const VERIFY_PAGE_URL = `${SITE_URL}/verify`;

/**
 * Shared authenticity token library (5 codes — not one-per-unit).
 * Each honeycomb seal encodes one of these as a scannable QR payload.
 * Print any of the 5 randomly on boxes; scanning any = genuine.
 */
export const HONEYCOMB_SEALS = [
  { id: "ABSEAL01", label: "Seal A", token: "ABSEAL01" },
  { id: "ABSEAL02", label: "Seal B", token: "ABSEAL02" },
  { id: "ABSEAL03", label: "Seal C", token: "ABSEAL03" },
  { id: "ABSEAL04", label: "Seal D", token: "ABSEAL04" },
  { id: "ABSEAL05", label: "Seal E", token: "ABSEAL05" },
] as const;

export type HoneycombSealId = (typeof HONEYCOMB_SEALS)[number]["id"];

const SEAL_SET = new Set<string>(HONEYCOMB_SEALS.map((s) => s.id));

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

export function isGenuineHoneycombSeal(
  raw: string,
): { genuine: true; id: HoneycombSealId } | { genuine: false; id: string } {
  const id = normalizeSealPayload(raw);
  if (SEAL_SET.has(id)) {
    return { genuine: true, id: id as HoneycombSealId };
  }
  return { genuine: false, id };
}

/** Fetch static token library (/authenticity/tokens.json). Falls back to built-in list. */
export async function loadAuthTokenLibrary(): Promise<Set<string>> {
  try {
    const res = await fetch("/authenticity/tokens.json", { cache: "no-store" });
    if (!res.ok) throw new Error("tokens fetch failed");
    const data = (await res.json()) as { tokens?: string[] };
    if (Array.isArray(data.tokens) && data.tokens.length > 0) {
      return new Set(data.tokens.map((t) => t.toUpperCase().replace(/[\s\-_.]/g, "")));
    }
  } catch {
    // use built-in
  }
  return new Set(HONEYCOMB_SEALS.map((s) => s.id));
}

export async function verifySealToken(
  raw: string,
): Promise<{ genuine: true; id: string } | { genuine: false; id: string }> {
  const id = normalizeSealPayload(raw);
  const library = await loadAuthTokenLibrary();
  if (id && library.has(id)) {
    return { genuine: true, id };
  }
  return { genuine: false, id };
}

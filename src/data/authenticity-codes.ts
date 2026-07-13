import { SITE_URL } from "@/data/site";

/** Right packaging QR — opens the verify page only. */
export const VERIFY_PAGE_URL = `${SITE_URL}/verify`;

/**
 * Shared honeycomb seal IDs (5 print variants — not one-per-unit).
 * Artwork: /authenticity/honeycomb-{id}.png
 * Verify page matches uploaded/captured photos against these templates.
 */
export const HONEYCOMB_SEALS = [
  { id: "ABSEAL01", label: "Seal A" },
  { id: "ABSEAL02", label: "Seal B" },
  { id: "ABSEAL03", label: "Seal C" },
  { id: "ABSEAL04", label: "Seal D" },
  { id: "ABSEAL05", label: "Seal E" },
] as const;

export type HoneycombSealId = (typeof HONEYCOMB_SEALS)[number]["id"];

const SEAL_SET = new Set<string>(HONEYCOMB_SEALS.map((s) => s.id));

export function honeycombSealUrl(id: string): string {
  return `${VERIFY_PAGE_URL}?seal=${encodeURIComponent(id)}`;
}

export function normalizeSealPayload(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return "";

  try {
    if (trimmed.includes("://") || trimmed.startsWith("www.")) {
      const url = new URL(trimmed.startsWith("www.") ? `https://${trimmed}` : trimmed);
      const seal = url.searchParams.get("seal") ?? url.searchParams.get("code");
      if (seal) return seal.trim().toUpperCase().replace(/[\s\-_.]/g, "");
    }
  } catch {
    // not a URL — treat as raw code
  }

  // Path style /verify?seal=… already handled; also accept bare IDs
  const sealMatch = trimmed.match(/[?&]seal=([A-Za-z0-9_-]+)/i);
  if (sealMatch?.[1]) return sealMatch[1].toUpperCase().replace(/[\s\-_.]/g, "");

  return trimmed.toUpperCase().replace(/[\s\-_.]/g, "");
}

export function isGenuineHoneycombSeal(raw: string): { genuine: true; id: HoneycombSealId } | { genuine: false; id: string } {
  const id = normalizeSealPayload(raw);
  if (SEAL_SET.has(id)) {
    return { genuine: true, id: id as HoneycombSealId };
  }
  return { genuine: false, id };
}

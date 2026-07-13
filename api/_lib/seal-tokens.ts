/** Shared authenticity token library (5 seals — not one-per-unit). */
export const HONEYCOMB_SEALS = [
  { id: "ABSEAL01", label: "Seal A" },
  { id: "ABSEAL02", label: "Seal B" },
  { id: "ABSEAL03", label: "Seal C" },
  { id: "ABSEAL04", label: "Seal D" },
  { id: "ABSEAL05", label: "Seal E" },
] as const;

export type HoneycombSealId = (typeof HONEYCOMB_SEALS)[number]["id"];

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

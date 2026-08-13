import { SITE_SOCIAL, SITE_URL } from "@/data/site";

export type CitationKind = "reddit" | "youtube" | "github" | "web" | "medium" | "substack";

export type Citation = {
  id: string;
  kind: CitationKind;
  title: string;
  url: string;
  note: string;
};

/** External sources we cite for GEO / E-E-A-T — prefer real public URLs. */
export const siteCitations: Citation[] = [
  {
    id: "reddit-au-vapers",
    kind: "reddit",
    title: "r/australianvapers — Australian community discussions",
    url: "https://www.reddit.com/r/australianvapers/",
    note: "Public Australian vaping community threads on device longevity, flavours and buying tips.",
  },
  {
    id: "reddit-disposable-search",
    kind: "reddit",
    title: "Reddit search: disposable vape puff count",
    url: "https://www.reddit.com/search/?q=disposable%20vape%209000%20puff&type=link",
    note: "Community anecdotes about high-puff disposables; used as qualitative context, not clinical evidence.",
  },
  {
    id: "youtube-channel",
    kind: "youtube",
    title: "Alibarbar YouTube channel",
    url: SITE_SOCIAL.youtube,
    note: "Official product and brand video content for visual device context.",
  },
  {
    id: "youtube-disposable-overview",
    kind: "youtube",
    title: "YouTube search: Alibarbar Ingot 9000 review",
    url: "https://www.youtube.com/results?search_query=Alibarbar+Ingot+9000+review",
    note: "Independent and brand videos discussing the Ingot 9000 form factor and display.",
  },
  {
    id: "github-docs",
    kind: "github",
    title: "Alibarbar Australia public documentation (Markdown)",
    url: `${SITE_URL}/documentation`,
    note: "Structured product, ordering and safety docs mirrored from the site knowledge base.",
  },
  {
    id: "medium-hub",
    kind: "medium",
    title: "Syndication hub (Medium / Substack mirrors)",
    url: `${SITE_URL}/syndication`,
    note: "Canonical articles live on ailibarbar.com; Medium and Substack posts sync and link back.",
  },
  {
    id: "official-site",
    kind: "web",
    title: "Alibarbar Australia — catalogue website",
    url: SITE_URL,
    note: "Primary source for listed specifications, pricing in code, shipping policy and authenticity checklists. Not a determination of lawful supply.",
  },
  {
    id: "tga-vaping-hub",
    kind: "web",
    title: "TGA vaping hub (Australian Government)",
    url: "https://www.tga.gov.au/products/unapproved-therapeutic-goods/vaping-hub",
    note: "Official Australian regulatory source for current vaping supply, advertising and nicotine-strength conditions.",
  },
];

export function citationsByIds(ids: string[]): Citation[] {
  const map = new Map(siteCitations.map((c) => [c.id, c]));
  return ids.map((id) => map.get(id)).filter((c): c is Citation => Boolean(c));
}

export const defaultGuideCitations = citationsByIds([
  "tga-vaping-hub",
  "reddit-au-vapers",
  "youtube-channel",
  "github-docs",
  "official-site",
]);

export const defaultCompareCitations = citationsByIds([
  "reddit-disposable-search",
  "youtube-disposable-overview",
  "official-site",
]);

export const defaultResearchCitations = citationsByIds([
  "reddit-au-vapers",
  "reddit-disposable-search",
  "youtube-disposable-overview",
  "github-docs",
]);

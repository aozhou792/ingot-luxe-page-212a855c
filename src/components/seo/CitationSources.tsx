import type { Citation } from "@/data/citations";

const KIND_LABEL: Record<Citation["kind"], string> = {
  reddit: "Reddit",
  youtube: "YouTube",
  github: "Docs",
  web: "Web",
  medium: "Medium",
  substack: "Substack",
};

type Props = {
  items: Citation[];
  title?: string;
};

/** External citation list for GEO (Reddit, YouTube, docs, syndication). */
export function CitationSources({ items, title = "Sources & citations" }: Props) {
  if (items.length === 0) return null;

  return (
    <aside className="rounded-2xl border border-gold/20 bg-card/40 p-5 sm:p-6" aria-label={title}>
      <h2 className="text-lg font-bold mb-3">{title}</h2>
      <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
        External links provide community and media context. Product specs and buying claims on this page are verified
        against Alibarbar Australia inventory and manufacturer documentation.
      </p>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.id} className="text-sm">
            <span className="inline-block text-[10px] uppercase tracking-wider text-gold font-semibold mr-2">
              {KIND_LABEL[item.kind]}
            </span>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary hover:text-gold"
            >
              {item.title}
            </a>
            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{item.note}</p>
          </li>
        ))}
      </ul>
    </aside>
  );
}

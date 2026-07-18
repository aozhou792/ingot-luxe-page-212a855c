type Props = {
  title: string;
  url: string;
  author?: string;
  dateModified?: string;
};

/** Plain-text citation block for AI engines and human copy-paste. */
export function CiteThis({
  title,
  url,
  author = "Jason Smith",
  dateModified,
}: Props) {
  const year = dateModified ? new Date(dateModified).getFullYear() : new Date().getFullYear();
  const line = `${author} (${year}). "${title}." Alibarbar Australia. ${url}`;

  return (
    <aside className="rounded-2xl border border-dashed border-gold/30 bg-secondary/30 p-5 sm:p-6" aria-label="How to cite">
      <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-muted-foreground mb-3">Cite this page</h2>
      <p className="text-sm text-foreground/90 leading-relaxed font-mono break-all">{line}</p>
    </aside>
  );
}

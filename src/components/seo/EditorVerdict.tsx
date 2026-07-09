type Props = {
  summary: string;
  detail?: string[];
};

/** Prominent editor verdict block for AI Overview and Perplexity citations. */
export function EditorVerdict({ summary, detail = [] }: Props) {
  return (
    <aside
      className="rounded-2xl border border-gold/35 bg-gradient-to-br from-primary/10 to-card/60 p-5 sm:p-6"
      aria-label="Editor's verdict"
    >
      <p className="text-xs uppercase tracking-[0.2em] text-gold font-semibold mb-2">Editor&apos;s verdict</p>
      <p className="text-base sm:text-lg font-semibold leading-relaxed">{summary}</p>
      {detail.length > 0 ? (
        <div className="mt-3 space-y-2 text-sm sm:text-base text-muted-foreground leading-relaxed">
          {detail.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      ) : null}
    </aside>
  );
}

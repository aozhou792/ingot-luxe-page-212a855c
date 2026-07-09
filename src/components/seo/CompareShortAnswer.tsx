type Props = {
  competitor: string;
  alibarbar: string;
  competitorPick: string;
};

/** "Which is better?" block placed at the top of comparison articles. */
export function CompareShortAnswer({ competitor, alibarbar, competitorPick }: Props) {
  return (
    <aside
      className="rounded-2xl border border-gold/30 bg-gradient-to-br from-card/80 to-secondary/40 p-5 sm:p-6"
      aria-label="Which is better"
    >
      <p className="text-xs uppercase tracking-[0.2em] text-gold font-semibold mb-2">Which is better?</p>
      <h2 className="text-base sm:text-lg font-bold leading-snug mb-3">
        Alibarbar Ingot 9000 vs {competitor}
      </h2>
      <div className="space-y-2 text-sm sm:text-base text-muted-foreground leading-relaxed">
        <p>
          <span className="font-semibold text-foreground">Short answer: </span>
          {alibarbar}
        </p>
        <p>{competitorPick}</p>
      </div>
    </aside>
  );
}

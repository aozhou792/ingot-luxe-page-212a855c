import type { QuickAnswer as QuickAnswerType } from "@/lib/content-geo";

type Props = {
  data: QuickAnswerType;
};

/** AI-citable answer block placed directly under the H1. */
export function QuickAnswer({ data }: Props) {
  return (
    <aside
      className="mt-6 rounded-2xl border border-gold/30 bg-gradient-to-br from-card/80 to-secondary/40 p-5 sm:p-6"
      aria-label="Quick answer"
    >
      <p className="text-xs uppercase tracking-[0.2em] text-gold font-semibold mb-2">Quick answer</p>
      <h2 className="text-base sm:text-lg font-bold leading-snug">{data.question}</h2>
      <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed">{data.answer}</p>
    </aside>
  );
}

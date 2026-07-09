import { Check, X } from "lucide-react";

type Props = {
  bestFor: string[];
  avoidFor?: string[];
};

/** Audience-fit block favoured by AI search engines for product and review pages. */
export function BestFor({ bestFor, avoidFor = [] }: Props) {
  if (bestFor.length === 0 && avoidFor.length === 0) return null;

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {bestFor.length > 0 ? (
        <aside
          className="rounded-2xl border border-gold/25 bg-card/60 p-5 sm:p-6"
          aria-label="Who should buy"
        >
          <h2 className="text-lg sm:text-xl font-bold mb-4">Best for</h2>
          <ul className="space-y-2">
            {bestFor.map((item) => (
              <li key={item} className="flex gap-2 text-sm sm:text-base text-muted-foreground">
                <Check className="w-4 h-4 mt-1 text-primary shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </aside>
      ) : null}
      {avoidFor.length > 0 ? (
        <aside
          className="rounded-2xl border border-gold/20 bg-card/40 p-5 sm:p-6"
          aria-label="Who should avoid"
        >
          <h2 className="text-lg sm:text-xl font-bold mb-4">Not ideal for</h2>
          <ul className="space-y-2">
            {avoidFor.map((item) => (
              <li key={item} className="flex gap-2 text-sm sm:text-base text-muted-foreground">
                <X className="w-4 h-4 mt-1 text-primary shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </aside>
      ) : null}
    </div>
  );
}

import { Check } from "lucide-react";

type Props = {
  items: string[];
};

/** Scannable summary block favoured by AI search engines. */
export function KeyTakeaways({ items }: Props) {
  if (items.length === 0) return null;

  return (
    <aside
      className="rounded-2xl border border-gold/25 bg-card/60 p-5 sm:p-6"
      aria-label="Key takeaways"
    >
      <h2 className="text-lg sm:text-xl font-bold mb-4">Key takeaways</h2>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-sm sm:text-base text-muted-foreground">
            <Check className="w-4 h-4 mt-1 text-primary shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

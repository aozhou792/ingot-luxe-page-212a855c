import { cn } from "@/lib/utils";
import { formatAud } from "@/lib/format";

type ProductPriceProps = {
  price: string;
  originalPrice?: string;
  className?: string;
  priceClassName?: string;
  originalClassName?: string;
};

/** Sale price with optional struck-through original retail price. */
export function ProductPrice({
  price,
  originalPrice,
  className,
  priceClassName,
  originalClassName,
}: ProductPriceProps) {
  const sale = Number.parseFloat(price);
  const original = originalPrice ? Number.parseFloat(originalPrice) : NaN;
  const showOriginal = Number.isFinite(original) && original > sale;

  return (
    <div className={cn("flex flex-wrap items-baseline gap-2", className)}>
      <span className={cn("font-bold text-gold tabular-nums", priceClassName)}>{formatAud(sale)}</span>
      {showOriginal ? (
        <span className={cn("text-sm text-muted-foreground line-through tabular-nums", originalClassName)}>
          {formatAud(original)}
        </span>
      ) : null}
    </div>
  );
}

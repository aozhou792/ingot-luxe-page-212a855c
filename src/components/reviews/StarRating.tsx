import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

type StarRatingProps = {
  value: number;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeMap = {
  sm: "w-3.5 h-3.5",
  md: "w-4 h-4",
  lg: "w-5 h-5",
} as const;

const filledStar = "fill-primary text-primary";
const emptyStar = "fill-transparent text-muted-foreground/35";

/** Read-only star display; full stars use solid gold fill. */
export const StarRating = ({ value, size = "md", className }: StarRatingProps) => {
  const cls = sizeMap[size];
  const score = Math.max(0, Math.min(5, value));

  return (
    <div className={cn("inline-flex items-center gap-0.5", className)} aria-label={`${score} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => {
        const fill = Math.max(0, Math.min(1, score - (star - 1)));
        const isFull = fill >= 1;
        const isEmpty = fill <= 0;

        if (isFull) {
          return <Star key={star} className={cn(cls, filledStar)} strokeWidth={1.5} />;
        }

        if (isEmpty) {
          return <Star key={star} className={cn(cls, emptyStar)} strokeWidth={1.5} />;
        }

        // Partial star (e.g. 4.5): clip a filled star over an empty outline.
        return (
          <span key={star} className="relative inline-flex">
            <Star className={cn(cls, emptyStar)} strokeWidth={1.5} />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <Star className={cn(cls, filledStar)} strokeWidth={1.5} />
            </span>
          </span>
        );
      })}
    </div>
  );
};

type StarInputProps = {
  value: number;
  onChange: (value: number) => void;
  size?: "sm" | "md" | "lg";
};

export const StarInput = ({ value, onChange, size = "lg" }: StarInputProps) => {
  const cls = sizeMap[size];
  return (
    <div className="inline-flex items-center gap-1" role="radiogroup" aria-label="Your rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          role="radio"
          aria-checked={value === star}
          aria-label={`${star} star${star > 1 ? "s" : ""}`}
          onClick={() => onChange(star)}
          className="p-1 transition-transform hover:scale-110"
        >
          <Star
            className={cn(cls, star <= value ? filledStar : emptyStar)}
            strokeWidth={1.5}
          />
        </button>
      ))}
    </div>
  );
};

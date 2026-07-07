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

/** Read-only star display supporting half-star fills via clip. */
export const StarRating = ({ value, size = "md", className }: StarRatingProps) => {
  const cls = sizeMap[size];
  return (
    <div className={cn("inline-flex items-center gap-0.5", className)} aria-label={`${value} out of 5 stars`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, value - i));
        return (
          <span key={i} className="relative inline-block">
            <Star className={cn(cls, "text-muted-foreground/40")} strokeWidth={1.5} />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <Star className={cn(cls, "text-gold fill-gold")} strokeWidth={1.5} />
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
            className={cn(cls, star <= value ? "text-gold fill-gold" : "text-muted-foreground/50")}
            strokeWidth={1.5}
          />
        </button>
      ))}
    </div>
  );
};

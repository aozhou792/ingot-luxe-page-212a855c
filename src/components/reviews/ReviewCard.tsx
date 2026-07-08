import { BadgeCheck } from "lucide-react";
import { StarRating } from "@/components/reviews/StarRating";
import { ReviewPhotoGrid } from "@/components/reviews/ReviewPhotoGrid";
import { getProductBySlug } from "@/data/products";
import type { ShowcaseReview } from "@/data/product-showcase-reviews";
import type { PublicReview } from "@/lib/reviews-api";

type ReviewCardProps = {
  review: PublicReview | ShowcaseReview;
  showProduct?: boolean;
  variant?: "default" | "showcase";
};

function formatDate(value: string): string {
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] = value.split("-");
    return `${year}/${month}/${day}`;
  }
  return new Date(value)
    .toLocaleDateString("en-AU", { year: "numeric", month: "2-digit", day: "2-digit" })
    .replace(/-/g, "/");
}

function PhotoGrid({ photos, large }: { photos: string[]; large?: boolean }) {
  return <ReviewPhotoGrid photos={photos} large={large} />;
}

export const ReviewCard = ({ review, showProduct = false, variant = "default" }: ReviewCardProps) => {
  const product =
    showProduct && "productSlug" in review ? getProductBySlug(review.productSlug) : null;
  const qualified = "qualified" in review && review.qualified;
  const photos = review.photos ?? [];
  const title = "title" in review ? review.title : "";

  if (variant === "showcase") {
    return (
      <article className="rounded-xl sm:rounded-2xl border border-gold/25 bg-card/50 p-4 sm:p-5 flex flex-col gap-4">
        <PhotoGrid photos={photos} large />
        {qualified ? (
          <div className="inline-flex items-center gap-1.5 self-start rounded-full border border-gold/30 bg-background/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-primary">
            <BadgeCheck className="h-3.5 w-3.5" aria-hidden />
            Qualified
          </div>
        ) : null}
        <p className="text-sm leading-relaxed text-foreground/90">{review.body}</p>
        <div className="flex items-center justify-between gap-3 border-t border-gold/15 pt-3">
          <div className="space-y-1">
            <StarRating value={review.rating} size="sm" />
            <p className="text-sm font-semibold text-foreground">{review.author}</p>
          </div>
          <time className="text-xs text-muted-foreground shrink-0">{formatDate(review.createdAt)}</time>
        </div>
      </article>
    );
  }

  return (
    <article className="rounded-xl sm:rounded-2xl border border-gold/20 bg-card/60 p-4 sm:p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1 min-w-0">
          <StarRating value={review.rating} size="sm" />
          <p className="text-sm font-semibold text-foreground">{review.author}</p>
        </div>
        <time className="text-xs text-muted-foreground shrink-0">{formatDate(review.createdAt)}</time>
      </div>
      {title ? <h3 className="text-sm sm:text-base font-bold leading-snug">{title}</h3> : null}
      <p className="text-sm text-muted-foreground leading-relaxed">{review.body}</p>
      <PhotoGrid photos={photos} />
      {showProduct && product ? (
        <p className="text-xs text-muted-foreground border-t border-gold/15 pt-3">{product.name}</p>
      ) : null}
    </article>
  );
};

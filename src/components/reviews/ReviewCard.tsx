import { StarRating } from "@/components/reviews/StarRating";
import { getProductBySlug } from "@/data/products";
import type { PublicReview } from "@/lib/reviews-api";

type ReviewCardProps = {
  review: PublicReview;
  showProduct?: boolean;
};

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString("en-AU", { year: "numeric", month: "short", day: "numeric" });
}

export const ReviewCard = ({ review, showProduct = false }: ReviewCardProps) => {
  const product = showProduct ? getProductBySlug(review.productSlug) : null;

  return (
    <article className="rounded-xl sm:rounded-2xl border border-gold/20 bg-card/60 p-4 sm:p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1 min-w-0">
          <StarRating value={review.rating} size="sm" />
          <p className="text-sm font-semibold text-foreground">{review.author}</p>
        </div>
        <time className="text-xs text-muted-foreground shrink-0">{formatDate(review.createdAt)}</time>
      </div>

      {review.title ? <h3 className="text-sm sm:text-base font-bold leading-snug">{review.title}</h3> : null}
      <p className="text-sm text-muted-foreground leading-relaxed">{review.body}</p>

      {review.photos && review.photos.length > 0 ? (
        <ul className="flex flex-wrap gap-2">
          {review.photos.map((photo, index) => (
            <li key={photo}>
              <a href={photo} target="_blank" rel="noopener noreferrer" className="block">
                <img
                  src={photo}
                  alt={`Review photo ${index + 1}`}
                  className="h-20 w-20 sm:h-24 sm:w-24 rounded-lg object-cover border border-gold/20"
                  loading="lazy"
                />
              </a>
            </li>
          ))}
        </ul>
      ) : null}

      {showProduct && product ? (
        <p className="text-xs text-muted-foreground border-t border-gold/15 pt-3">{product.name}</p>
      ) : null}
    </article>
  );
};

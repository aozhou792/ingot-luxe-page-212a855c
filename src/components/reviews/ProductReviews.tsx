import { useCallback, useEffect, useState } from "react";
import { StarRating } from "@/components/reviews/StarRating";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { ReviewForm } from "@/components/reviews/ReviewForm";
import { fetchReviews, type PublicReview } from "@/lib/reviews-api";

type ProductReviewsProps = {
  slug: string;
  onAggregate?: (aggregate: { count: number; average: number }) => void;
};

export const ProductReviews = ({ slug, onAggregate }: ProductReviewsProps) => {
  const [reviews, setReviews] = useState<PublicReview[]>([]);
  const [summary, setSummary] = useState<{ count: number; average: number }>({ count: 0, average: 0 });
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const data = await fetchReviews(slug);
      setReviews(data.reviews);
      const productSummary = data.aggregate.perProduct[slug] ?? { count: 0, average: 0 };
      setSummary(productSummary);
      onAggregate?.(productSummary);
    } catch {
      /* keep silent — reviews are non-critical */
    } finally {
      setLoading(false);
    }
  }, [slug, onAggregate]);

  useEffect(() => {
    setLoading(true);
    void load();
  }, [load]);

  return (
    <section className="mt-10 sm:mt-16 rounded-2xl sm:rounded-[1.75rem] border border-gold/25 bg-gradient-to-b from-card/70 to-background/90 p-4 sm:p-6 md:p-9">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">Customer reviews</h2>
          <div className="mt-2 flex items-center gap-2">
            <StarRating value={summary.average} size="md" />
            <span className="text-sm text-muted-foreground">
              {summary.count > 0
                ? `${summary.average.toFixed(1)} · ${summary.count} review${summary.count > 1 ? "s" : ""}`
                : "No reviews yet"}
            </span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_360px] gap-6 lg:gap-8 items-start">
        <div className="space-y-4 order-2 lg:order-1">
          {loading ? (
            <p className="text-sm text-muted-foreground">Loading reviews…</p>
          ) : reviews.length === 0 ? (
            <p className="text-sm text-muted-foreground">Be the first to review this flavour.</p>
          ) : (
            reviews.map((review) => <ReviewCard key={review.id} review={review} />)
          )}
        </div>

        <div className="order-1 lg:order-2">
          <ReviewForm productSlug={slug} onSubmitted={() => void load()} />
        </div>
      </div>
    </section>
  );
};

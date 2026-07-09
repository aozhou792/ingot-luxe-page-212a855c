import { useCallback, useEffect, useMemo, useState } from "react";
import { StarRating } from "@/components/reviews/StarRating";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { ReviewForm } from "@/components/reviews/ReviewForm";
import {
  getShowcaseAggregate,
  getShowcaseReviews,
  mergeAndSortReviews,
  mergeReviewAggregate,
} from "@/data/product-showcase-reviews";
import { fetchReviews, type PublicReview } from "@/lib/reviews-api";

type ProductReviewsProps = {
  slug: string;
  onAggregate?: (aggregate: { count: number; average: number }) => void;
  onSchemaData?: (liveReviews: PublicReview[], liveAggregate: { count: number; average: number }) => void;
};

export const ProductReviews = ({ slug, onAggregate, onSchemaData }: ProductReviewsProps) => {
  const showcaseReviews = useMemo(() => getShowcaseReviews(slug), [slug]);
  const showcaseAggregate = useMemo(() => getShowcaseAggregate(slug), [slug]);

  const [liveReviews, setLiveReviews] = useState<PublicReview[]>([]);
  const [liveAggregate, setLiveAggregate] = useState({ count: 0, average: 0 });
  const [loading, setLoading] = useState(true);

  const summary = useMemo(
    () => mergeReviewAggregate(showcaseAggregate, liveAggregate),
    [showcaseAggregate, liveAggregate],
  );

  const displayReviews = useMemo(
    () => mergeAndSortReviews(liveReviews, showcaseReviews),
    [liveReviews, showcaseReviews],
  );

  const load = useCallback(async () => {
    try {
      const data = await fetchReviews(slug);
      setLiveReviews(data.reviews);
      const productSummary = data.aggregate.perProduct[slug] ?? { count: 0, average: 0 };
      setLiveAggregate(productSummary);
    } catch {
      /* keep silent — reviews are non-critical */
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    setLoading(true);
    void load();
  }, [load]);

  useEffect(() => {
    onAggregate?.(summary);
  }, [onAggregate, summary]);

  useEffect(() => {
    onSchemaData?.(liveReviews, liveAggregate);
  }, [liveAggregate, liveReviews, onSchemaData]);

  return (
    <section className="mt-10 sm:mt-16 rounded-2xl sm:rounded-[1.75rem] border border-gold/25 bg-gradient-to-b from-card/70 to-background/90 p-4 sm:p-6 md:p-9">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">Customer reviews</h2>
          <div className="mt-2 flex items-center gap-2">
            <StarRating value={summary.average || 5} size="md" />
            <span className="text-sm text-muted-foreground">
              {summary.count > 0
                ? `${summary.average.toFixed(1)} · ${summary.count} review${summary.count > 1 ? "s" : ""}`
                : "Verified customer feedback"}
            </span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_360px] gap-6 lg:gap-8 items-start">
        <div className="space-y-4 order-2 lg:order-1">
          {loading && liveReviews.length === 0 ? (
            <p className="text-sm text-muted-foreground">Loading more reviews…</p>
          ) : null}
          {displayReviews.map((review) => (
            <ReviewCard key={review.id} review={review} variant="showcase" />
          ))}
        </div>

        <div className="order-1 lg:order-2">
          <ReviewForm productSlug={slug} onSubmitted={() => void load()} />
        </div>
      </div>
    </section>
  );
};

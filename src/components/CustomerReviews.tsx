import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { StarRating } from "@/components/reviews/StarRating";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { ReviewForm } from "@/components/reviews/ReviewForm";
import {
  getHomeShowcaseAggregate,
  hasReviewPhotos,
  homeShowcaseReviews,
  mergeAndSortReviews,
  mergeReviewAggregate,
  sortReviewsForDisplay,
} from "@/data/product-showcase-reviews";
import { products } from "@/data/products";
import { fetchReviews, type PublicReview } from "@/lib/reviews-api";

const reviewProducts = products
  .filter((product) => !product.isPlaceholder)
  .map((product) => ({ slug: product.slug, name: product.name }));

export const CustomerReviews = () => {
  const showcaseAggregate = useMemo(() => getHomeShowcaseAggregate(), []);

  const [liveReviews, setLiveReviews] = useState<PublicReview[]>([]);
  const [liveAggregate, setLiveAggregate] = useState({ count: 0, average: 0 });
  const [loading, setLoading] = useState(true);

  const summary = useMemo(
    () => mergeReviewAggregate(showcaseAggregate, liveAggregate),
    [showcaseAggregate, liveAggregate],
  );

  const photoReviews = useMemo(
    () => mergeAndSortReviews(liveReviews.filter(hasReviewPhotos), homeShowcaseReviews),
    [liveReviews],
  );

  const textReviews = useMemo(
    () => sortReviewsForDisplay(liveReviews.filter((review) => !hasReviewPhotos(review))),
    [liveReviews],
  );

  const load = useCallback(async () => {
    try {
      const data = await fetchReviews();
      setLiveReviews(data.reviews);
      setLiveAggregate(data.aggregate.overall);
    } catch {
      /* reviews are non-critical */
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const defaultSlug = reviewProducts[0]?.slug ?? "quadruple-berry";

  return (
    <section id="reviews" className="py-10 sm:py-12 md:py-16 relative scroll-mt-20 border-t border-gold/15">
      <div className="absolute inset-0 -z-10 opacity-40" style={{ background: "var(--gradient-radial)" }} />
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 reveal px-1">
          <p className="text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary mb-3 sm:mb-4">
            What Others Say About Us
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
            Loved by <span className="text-gold">Australian Vapers</span>
          </h2>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <StarRating value={summary.average} size="lg" />
            <span className="text-sm sm:text-base text-muted-foreground">
              {summary.average.toFixed(1)} out of 5 · {summary.count} reviews
            </span>
          </div>
          <div className="gold-divider mt-6 sm:mt-8 max-w-xs mx-auto" />
        </div>

        <div className="grid lg:grid-cols-[minmax(0,1fr)_360px] gap-6 lg:gap-8 items-start">
          <div className="order-2 lg:order-1 space-y-4">
            {loading && liveReviews.length === 0 ? (
              <p className="text-sm text-muted-foreground">Loading more reviews…</p>
            ) : null}
            {photoReviews.length > 0 ? (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
                {photoReviews.map((review) => (
                  <ReviewCard key={review.id} review={review} variant="showcase" showProduct />
                ))}
              </div>
            ) : null}

            {textReviews.length > 0 ? (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 pt-2">
                {textReviews.map((review) => (
                  <ReviewCard key={review.id} review={review} variant="showcase" showProduct />
                ))}
              </div>
            ) : null}

            {liveReviews.length > 6 ? (
              <div className="text-center pt-2">
                <Link to="/reviews" className="text-sm font-semibold text-primary hover:text-gold transition-colors">
                  View all reviews →
                </Link>
              </div>
            ) : null}
          </div>

          <div className="order-1 lg:order-2">
            <ReviewForm
              productSlug={defaultSlug}
              productOptions={reviewProducts}
              onSubmitted={() => void load()}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

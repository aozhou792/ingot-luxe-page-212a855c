import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { StarRating } from "@/components/reviews/StarRating";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { ReviewForm } from "@/components/reviews/ReviewForm";
import { products } from "@/data/products";
import { fetchReviews, type PublicReview, type ReviewAggregate } from "@/lib/reviews-api";

const reviewProducts = products
  .filter((product) => !product.isPlaceholder)
  .map((product) => ({ slug: product.slug, name: product.name }));

export const CustomerReviews = () => {
  const [reviews, setReviews] = useState<PublicReview[]>([]);
  const [aggregate, setAggregate] = useState<ReviewAggregate["overall"]>({ count: 0, average: 0 });
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const data = await fetchReviews();
      setReviews(data.reviews);
      setAggregate(data.aggregate.overall);
    } catch {
      /* reviews are non-critical */
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const featured = useMemo(() => reviews.slice(0, 6), [reviews]);
  const defaultSlug = reviewProducts[0]?.slug ?? "quadruple-berry";

  return (
    <section id="reviews" className="py-10 sm:py-12 md:py-16 relative scroll-mt-20">
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
            <StarRating value={aggregate.count > 0 ? aggregate.average : 5} size="lg" />
            <span className="text-sm sm:text-base text-muted-foreground">
              {aggregate.count > 0
                ? `${aggregate.average.toFixed(1)} out of 5 · ${aggregate.count} reviews`
                : "Be the first to leave a review"}
            </span>
          </div>
          <div className="gold-divider mt-6 sm:mt-8 max-w-xs mx-auto" />
        </div>

        <div className="grid lg:grid-cols-[minmax(0,1fr)_360px] gap-6 lg:gap-8 items-start">
          <div className="order-2 lg:order-1 space-y-4">
            {loading ? (
              <p className="text-sm text-muted-foreground">Loading reviews…</p>
            ) : featured.length === 0 ? (
              <p className="text-sm text-muted-foreground rounded-2xl border border-gold/20 bg-card/40 p-5">
                No published reviews yet. Share your rating and photos below — they appear here after approval.
              </p>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                {featured.map((review) => (
                  <ReviewCard key={review.id} review={review} showProduct />
                ))}
              </div>
            )}

            {reviews.length > 6 ? (
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

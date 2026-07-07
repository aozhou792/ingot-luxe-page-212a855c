import { useEffect, useMemo, useState } from "react";
import { StarRating } from "@/components/reviews/StarRating";
import { getProductBySlug } from "@/data/products";
import { fetchReviews, type PublicReview, type ReviewAggregate } from "@/lib/reviews-api";

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString("en-AU", { year: "numeric", month: "short", day: "numeric" });
}

export const CustomerReviews = () => {
  const [reviews, setReviews] = useState<PublicReview[]>([]);
  const [aggregate, setAggregate] = useState<ReviewAggregate["overall"]>({ count: 0, average: 0 });

  useEffect(() => {
    let cancelled = false;
    fetchReviews()
      .then((data) => {
        if (cancelled) return;
        setReviews(data.reviews);
        setAggregate(data.aggregate.overall);
      })
      .catch(() => {
        /* reviews are non-critical */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const featured = useMemo(() => reviews.slice(0, 6), [reviews]);

  if (aggregate.count === 0) return null;

  return (
    <section id="reviews" className="py-10 sm:py-12 md:py-14 relative scroll-mt-20">
      <div className="absolute inset-0 -z-10 opacity-40" style={{ background: "var(--gradient-radial)" }} />
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 reveal px-1">
          <p className="text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary mb-3 sm:mb-4">
            What Others Say About Us
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
            Loved by <span className="text-gold">Australian Vapers</span>
          </h2>
          <div className="mt-4 flex items-center justify-center gap-3">
            <StarRating value={aggregate.average} size="lg" />
            <span className="text-sm sm:text-base text-muted-foreground">
              {aggregate.average.toFixed(1)} out of 5 · {aggregate.count} reviews
            </span>
          </div>
          <div className="gold-divider mt-6 sm:mt-8 max-w-xs mx-auto" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {featured.map((review) => {
            const product = getProductBySlug(review.productSlug);
            return (
              <article key={review.id} className="reveal rounded-2xl border border-gold/20 bg-card/60 p-5 flex flex-col gap-3">
                <StarRating value={review.rating} size="sm" />
                {review.title ? <h3 className="text-base font-bold leading-snug">{review.title}</h3> : null}
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{review.body}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-gold/15 pt-3">
                  <span className="font-semibold text-foreground">{review.author}</span>
                  <span>{product ? product.name : formatDate(review.createdAt)}</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

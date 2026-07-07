import { useCallback, useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { StarRating, StarInput } from "@/components/reviews/StarRating";
import { AuthModal } from "@/components/AuthModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext";
import { fetchReviews, submitReview, type PublicReview } from "@/lib/reviews-api";

type ProductReviewsProps = {
  slug: string;
  onAggregate?: (aggregate: { count: number; average: number }) => void;
};

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString("en-AU", { year: "numeric", month: "short", day: "numeric" });
}

export const ProductReviews = ({ slug, onAggregate }: ProductReviewsProps) => {
  const { user, token } = useAuth();
  const [reviews, setReviews] = useState<PublicReview[]>([]);
  const [summary, setSummary] = useState<{ count: number; average: number }>({ count: 0, average: 0 });
  const [loading, setLoading] = useState(true);
  const [authOpen, setAuthOpen] = useState(false);

  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);

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

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!token) {
      setAuthOpen(true);
      return;
    }
    if (body.trim().length < 4) {
      toast.error("Please write a short review.");
      return;
    }
    setSubmitting(true);
    try {
      await submitReview(token, { productSlug: slug, rating, title, body });
      toast.success("Thanks! Your review is awaiting approval.");
      setTitle("");
      setBody("");
      setRating(5);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not submit review.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mt-10 sm:mt-16 rounded-2xl sm:rounded-[1.75rem] border border-gold/25 bg-gradient-to-b from-card/70 to-background/90 p-4 sm:p-6 md:p-9">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">Customer reviews</h2>
          <div className="mt-2 flex items-center gap-2">
            <StarRating value={summary.average} size="md" />
            <span className="text-sm text-muted-foreground">
              {summary.count > 0 ? `${summary.average.toFixed(1)} · ${summary.count} review${summary.count > 1 ? "s" : ""}` : "No reviews yet"}
            </span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">
        <div className="space-y-4 order-2 lg:order-1">
          {loading ? (
            <p className="text-sm text-muted-foreground">Loading reviews…</p>
          ) : reviews.length === 0 ? (
            <p className="text-sm text-muted-foreground">Be the first to review this flavour.</p>
          ) : (
            reviews.map((review) => (
              <article key={review.id} className="rounded-xl border border-gold/15 bg-background/50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <StarRating value={review.rating} size="sm" />
                    <span className="text-sm font-semibold">{review.author}</span>
                  </div>
                  <time className="text-xs text-muted-foreground">{formatDate(review.createdAt)}</time>
                </div>
                {review.title ? <h3 className="mt-2 text-sm font-semibold">{review.title}</h3> : null}
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{review.body}</p>
              </article>
            ))
          )}
        </div>

        <div className="order-1 lg:order-2 rounded-2xl border border-gold/30 bg-background/60 p-5">
          <h3 className="text-sm uppercase tracking-[0.2em] text-gold font-bold mb-4">Write a review</h3>
          {user ? (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Your rating</p>
                <StarInput value={rating} onChange={setRating} />
              </div>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title (optional)" />
              <Textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Share your experience with this flavour"
                rows={4}
              />
              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? "Submitting…" : "Submit review"}
              </Button>
              <p className="text-xs text-muted-foreground">Reviews appear after approval.</p>
            </form>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">Sign in to share your review.</p>
              <Button type="button" className="w-full" onClick={() => setAuthOpen(true)}>
                Sign in to review
              </Button>
            </div>
          )}
        </div>
      </div>

      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
    </section>
  );
};

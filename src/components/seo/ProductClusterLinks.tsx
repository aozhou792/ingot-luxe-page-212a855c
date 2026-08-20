import { Link } from "react-router-dom";
import { getReviewByProductSlug } from "@/data/reviews";
import { comparisons } from "@/data/comparisons";

type ProductClusterLinksProps = {
  productSlug: string;
  productName: string;
  isCustomPack?: boolean;
};

const TRUST_LINKS = [
  { label: "Shipping & delivery", to: "/shipping" },
  { label: "Verify authenticity seal", to: "/verify" },
  { label: "How to spot fakes", to: "/guides/how-to-spot-fake-alibarbar-ingot" },
  { label: "Why trust us", to: "/why-trust-us" },
  { label: "Price guide (AU)", to: "/guides/alibarbar-ingot-9000-price-guide-australia" },
] as const;

/** Cross-cluster internal links for PDP → review / compare / trust pages. */
export function ProductClusterLinks({ productSlug, productName, isCustomPack }: ProductClusterLinksProps) {
  const review = !isCustomPack ? getReviewByProductSlug(productSlug) : undefined;
  const compareLinks = comparisons.slice(0, 3).map((c) => ({
    label: `Alibarbar vs ${c.competitor}`,
    to: `/compare/${c.slug}`,
  }));

  return (
    <section className="mt-8 sm:mt-12 rounded-2xl border border-gold/25 bg-card/50 p-5 sm:p-7" aria-label="Related guides and trust pages">
      <h2 className="text-lg sm:text-xl font-bold mb-2">Guides, reviews &amp; trust</h2>
      <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
        Editorial resources for {productName} — so you can verify authenticity, compare options, and buy with confidence.
      </p>

      <div className="grid sm:grid-cols-3 gap-5 sm:gap-6">
        <div>
          <h3 className="text-xs uppercase tracking-[0.2em] text-gold font-bold mb-3">Editorial</h3>
          <ul className="space-y-2 text-sm">
            {review ? (
              <li>
                <Link to={`/reviews/${review.slug}`} className="text-primary font-semibold hover:text-gold">
                  {productName} review
                </Link>
              </li>
            ) : (
              <li>
                <Link to="/reviews/alibarbar-ingot-9000-review" className="text-primary font-semibold hover:text-gold">
                  Ingot 9000 device review
                </Link>
              </li>
            )}
            {!isCustomPack ? (
              <li>
                <Link to={`/flavours/${productSlug}`} className="text-primary font-semibold hover:text-gold">
                  Taste profile guide
                </Link>
              </li>
            ) : null}
            <li>
              <Link to="/guides/alibarbar-buying-guide-australia" className="text-primary font-semibold hover:text-gold">
                Australia buying guide
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-[0.2em] text-gold font-bold mb-3">Compare</h3>
          <ul className="space-y-2 text-sm">
            {compareLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-primary font-semibold hover:text-gold">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/compare" className="text-muted-foreground hover:text-primary">
                All comparisons →
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-[0.2em] text-gold font-bold mb-3">Shipping &amp; authenticity</h3>
          <ul className="space-y-2 text-sm">
            {TRUST_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-primary font-semibold hover:text-gold">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

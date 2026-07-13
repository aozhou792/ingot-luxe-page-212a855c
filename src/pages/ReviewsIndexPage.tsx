import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Seo, breadcrumbNode } from "@/components/Seo";
import { reviewPosts } from "@/data/reviews";
import { getProductBySlug } from "@/data/products";
import { useReveal } from "@/hooks/use-reveal";

const ReviewsIndexPage = () => {
  useReveal();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "Alibarbar Flavour Reviews",
        description: "Editorial reviews of Alibarbar Ingot 9000 flavours available in Australia.",
        url: "https://www.alibarbar.mom/reviews",
      },
      breadcrumbNode([
        { name: "Home", path: "/" },
        { name: "Reviews", path: "/reviews" },
      ]),
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Alibarbar Flavour Reviews | Ingot 9000 Australia"
        description="Read detailed Alibarbar Ingot 9000 flavour reviews, including Quadruple Berry, Peach Ice and Fanta taste notes, pros, cons and buying advice."
        path="/reviews"
        jsonLd={jsonLd}
      />
      <Navbar />
      <main className="pt-[calc(6rem+env(safe-area-inset-top))] pb-16 sm:pb-24">
        <div className="container max-w-5xl">
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Reviews</span>
          </nav>

          <header className="mb-10 sm:mb-14 max-w-2xl">
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3 font-semibold">Reviews</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
              Alibarbar <span className="text-gold">flavour reviews</span>
            </h1>
            <p className="text-muted-foreground mt-4 text-sm sm:text-base leading-relaxed">
              Editorial reviews focused on real buying questions: what each flavour tastes like, who it suits, what it
              does well, and where another flavour may be a better fit.
            </p>
          </header>

          <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
            {reviewPosts.map((review) => {
              const product = getProductBySlug(review.productSlug);
              return (
                <Link
                  key={review.slug}
                  to={`/reviews/${review.slug}`}
                  className="reveal group rounded-2xl border border-gold/20 bg-card/60 overflow-hidden flex flex-col hover:border-gold/50 transition-colors"
                >
                  {product ? (
                    <div className="relative aspect-square bg-gradient-to-br from-secondary to-background">
                      <img
                        src={product.img}
                        alt={`Alibarbar Ingot 9000 ${product.name} review`}
                        loading="lazy"
                        className="w-full h-full object-contain p-5 group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : null}
                  <div className="p-4 sm:p-5 flex flex-col gap-2 border-t border-gold/15 flex-1">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-primary">
                      <Star className="w-4 h-4" />
                      {review.readTime}
                    </div>
                    <h2 className="text-base sm:text-lg font-bold leading-snug group-hover:text-primary transition-colors">
                      {review.title}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">{review.description}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-gold">
                      Read review <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ReviewsIndexPage;

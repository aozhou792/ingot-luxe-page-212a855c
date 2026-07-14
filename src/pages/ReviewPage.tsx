import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowRight, Check, ChevronRight, X } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ProductPrice } from "@/components/ProductPrice";
import { ContentByline } from "@/components/seo/ContentByline";
import { ContentHubLinks } from "@/components/seo/ContentHubLinks";
import { BestFor } from "@/components/seo/BestFor";
import { EditorVerdict } from "@/components/seo/EditorVerdict";
import { KeyTakeaways } from "@/components/seo/KeyTakeaways";
import { QuickAnswer } from "@/components/seo/QuickAnswer";
import { Seo, reviewJsonLd, type BreadcrumbEntry } from "@/components/Seo";
import { getProductBySlug } from "@/data/products";
import { getReviewBySlug, getReviewRatingValue, reviewPosts } from "@/data/reviews";
import { deriveKeyTakeaways, deriveQuickAnswer, deriveWhoShouldAvoid, deriveWhoShouldBuy } from "@/lib/content-geo";
import { useReveal } from "@/hooks/use-reveal";

function DimensionBar({ label, value, note }: { label: string; value: number; note: string }) {
  return (
    <div>
      <div className="flex justify-between text-xs text-muted-foreground mb-1">
        <span>{label}</span>
        <span>{value}/5</span>
      </div>
      <div className="h-2 rounded-full bg-secondary overflow-hidden">
        <div className="h-full rounded-full bg-gradient-to-r from-primary/70 to-gold" style={{ width: `${(value / 5) * 100}%` }} />
      </div>
      <p className="text-xs text-muted-foreground mt-1">{note}</p>
    </div>
  );
}

const ReviewPage = () => {
  useReveal();
  const { slug } = useParams<{ slug: string }>();
  const review = getReviewBySlug(slug);

  if (!review) return <Navigate to="/reviews" replace />;

  const product = getProductBySlug(review.productSlug);
  const path = `/reviews/${review.slug}`;
  const breadcrumbs: BreadcrumbEntry[] = [
    { name: "Home", path: "/" },
    { name: "Reviews", path: "/reviews" },
    { name: review.title, path },
  ];
  const relatedReviews = (review.relatedReviews ?? [])
    .map((relatedSlug) => reviewPosts.find((item) => item.slug === relatedSlug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const jsonLd = reviewJsonLd({
    title: review.title,
    description: review.description,
    path,
    image: product?.img,
    datePublished: review.datePublished,
    dateModified: review.dateModified,
    productName: product ? `Alibarbar Ingot 9000 ${product.name}` : review.title,
    productPath: product ? `/product/${product.slug}` : path,
    ratingValue: getReviewRatingValue(review),
    breadcrumbs,
    faq: review.faq,
  });

  const quickAnswer = deriveQuickAnswer(review.title, review.intro, review.quickAnswer);
  const keyTakeaways = deriveKeyTakeaways(review.keyTakeaways, review.pros);
  const whoShouldBuy = deriveWhoShouldBuy(review.whoShouldBuy ?? review.pros);
  const whoShouldAvoid = deriveWhoShouldAvoid(review.whoShouldAvoid ?? review.cons);

  return (
    <div className="min-h-screen bg-background">
      <Seo title={`${review.title} | Alibarbar Australia`} description={review.description} path={path} image={product?.img} jsonLd={jsonLd} />
      <Navbar />
      <main className="pt-[calc(6rem+env(safe-area-inset-top))] pb-16 sm:pb-24">
        <article className="container max-w-4xl">
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/reviews" className="hover:text-primary">Reviews</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{review.category}</span>
          </nav>

          <div className="grid md:grid-cols-[1fr_1.2fr] gap-8 items-start">
            {product ? (
              <div className="relative rounded-2xl border border-gold/25 bg-gradient-to-b from-secondary/80 to-background overflow-hidden aspect-square">
                <img
                  src={product.img}
                  alt={`Alibarbar Ingot 9000 ${product.name} flavour review`}
                  className="w-full h-full object-contain p-8"
                />
              </div>
            ) : null}

            <header>
              <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3 font-semibold">
                {review.category} · {review.readTime}
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">{review.title}</h1>
              <ContentByline datePublished={review.datePublished} dateModified={review.dateModified} />
              <QuickAnswer data={quickAnswer} />
              {product ? (
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <ProductPrice price={product.price} originalPrice={product.originalPrice} priceClassName="text-2xl" />
                  <Link
                    to={`/product/${product.slug}`}
                    className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-full bg-gold text-primary-foreground font-bold uppercase tracking-widest text-xs shadow-gold hover:opacity-95 transition"
                  >
                    Shop {product.name}
                  </Link>
                </div>
              ) : null}
            </header>
          </div>

          <div className="mt-8 space-y-6">
            <KeyTakeaways items={keyTakeaways} />
            <EditorVerdict summary={review.verdict[0]} detail={review.verdict.slice(1)} />
            <BestFor bestFor={whoShouldBuy} avoidFor={whoShouldAvoid} />
          </div>

          <section className="mt-12 rounded-2xl border border-gold/20 bg-card/50 p-5 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-5">Review snapshot</h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {review.dimensions.map((dimension) => (
                <DimensionBar key={dimension.label} {...dimension} />
              ))}
            </div>
          </section>

          <div className="mt-12 space-y-8">
            {review.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-xl sm:text-2xl font-bold mb-3">{section.heading}</h2>
                <div className="space-y-3 text-muted-foreground leading-[1.75] text-sm sm:text-base">
                  {section.paragraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
                {section.bullets ? (
                  <ul className="mt-4 space-y-2">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-2 text-sm sm:text-base text-muted-foreground">
                        <ChevronRight className="w-4 h-4 mt-1 text-primary shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>

          <section className="mt-12 grid sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-gold/25 bg-card/50 p-5">
              <h2 className="text-base font-bold mb-3 text-gold">Pros</h2>
              <ul className="space-y-2">
                {review.pros.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-gold/20 bg-card/40 p-5">
              <h2 className="text-base font-bold mb-3">Cons</h2>
              <ul className="space-y-2">
                {review.cons.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-muted-foreground">
                    <X className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-xl sm:text-2xl font-bold mb-3">Full verdict</h2>
            <div className="space-y-3 text-muted-foreground leading-[1.75] text-sm sm:text-base">
              {review.verdict.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">FAQ</h2>
            <div className="space-y-4">
              {review.faq.map((item) => (
                <div key={item.question} className="rounded-xl border border-gold/20 bg-card/50 p-4">
                  <h3 className="text-sm sm:text-base font-semibold">{item.question}</h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {relatedReviews.length > 0 ? (
            <section className="mt-14">
              <h2 className="text-xl sm:text-2xl font-bold mb-5">More reviews</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {relatedReviews.map((item) => (
                  <Link
                    key={item.slug}
                    to={`/reviews/${item.slug}`}
                    className="group rounded-2xl border border-gold/20 bg-card/60 p-5 flex flex-col gap-2 hover:border-gold/50 transition-colors"
                  >
                    <h3 className="text-base font-bold leading-snug group-hover:text-primary transition-colors">{item.title}</h3>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-gold">
                      Read review <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          <ContentHubLinks />
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default ReviewPage;

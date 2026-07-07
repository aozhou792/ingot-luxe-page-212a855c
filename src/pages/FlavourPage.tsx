import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductPrice } from "@/components/ProductPrice";
import { Seo, articleJsonLd, type BreadcrumbEntry } from "@/components/Seo";
import { flavourProfiles, getFlavourBySlug, getFlavourProduct } from "@/data/flavours";
import { useReveal } from "@/hooks/use-reveal";

function TasteBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex justify-between text-xs text-muted-foreground mb-1">
        <span>{label}</span>
        <span>{value}/5</span>
      </div>
      <div className="h-2 rounded-full bg-secondary overflow-hidden">
        <div className="h-full rounded-full bg-gradient-to-r from-primary/70 to-gold" style={{ width: `${(value / 5) * 100}%` }} />
      </div>
    </div>
  );
}

const FlavourPage = () => {
  useReveal();
  const { slug } = useParams<{ slug: string }>();
  const flavour = getFlavourBySlug(slug);

  if (!flavour) return <Navigate to="/flavours" replace />;

  const product = getFlavourProduct(flavour.slug);
  const path = `/flavours/${flavour.slug}`;
  const breadcrumbs: BreadcrumbEntry[] = [
    { name: "Home", path: "/" },
    { name: "Flavours", path: "/flavours" },
    { name: flavour.name, path },
  ];

  const similar = flavour.similar
    .map((s) => flavourProfiles.find((f) => f.slug === s))
    .filter((f): f is NonNullable<typeof f> => Boolean(f));

  const jsonLd = articleJsonLd({
    title: `Alibarbar Ingot 9000 ${flavour.name} Flavour`,
    description: flavour.tagline,
    path,
    image: product?.img,
    breadcrumbs,
  });

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={`${flavour.name} Flavour Guide | Alibarbar Ingot 9000 Australia`}
        description={`${flavour.name}: ${flavour.tagline} Taste notes, sweetness and cooling ratings, and who it suits.`}
        path={path}
        image={product?.img}
        jsonLd={jsonLd}
      />
      <Navbar />
      <main className="pt-[calc(6rem+env(safe-area-inset-top))] pb-16 sm:pb-24">
        <div className="container max-w-4xl">
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/flavours" className="hover:text-primary">Flavours</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{flavour.name}</span>
          </nav>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            {product ? (
              <div className="relative rounded-2xl border border-gold/25 bg-gradient-to-b from-secondary/80 to-background overflow-hidden aspect-square">
                <img
                  src={product.img}
                  alt={`Alibarbar Ingot 9000 ${flavour.name} disposable vape Australia`}
                  className="w-full h-full object-contain p-8"
                />
              </div>
            ) : null}

            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-primary mb-2 font-semibold">{flavour.family}</p>
              <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">{flavour.name}</h1>
              <p className="text-muted-foreground mt-3 text-base leading-relaxed">{flavour.tagline}</p>

              <div className="mt-6 space-y-3 rounded-2xl border border-gold/20 bg-card/50 p-5">
                <p className="text-xs uppercase tracking-wide text-gold font-semibold mb-1">Taste profile</p>
                <TasteBar label="Sweetness" value={flavour.sweetness} />
                <TasteBar label="Cooling / Ice" value={flavour.coolness} />
                <TasteBar label="Smoothness" value={flavour.smoothness} />
              </div>

              {product ? (
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <ProductPrice price={product.price} originalPrice={product.originalPrice} priceClassName="text-2xl" />
                  <Link
                    to={`/product/${product.slug}`}
                    className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-full bg-gold text-primary-foreground font-bold uppercase tracking-widest text-xs shadow-gold hover:opacity-95 transition"
                  >
                    Shop {flavour.name}
                  </Link>
                </div>
              ) : null}
            </div>
          </div>

          <section className="mt-12">
            <h2 className="text-xl sm:text-2xl font-bold mb-3">Tasting notes</h2>
            <div className="space-y-3 text-muted-foreground leading-[1.75] text-sm sm:text-base">
              {flavour.tastingNotes.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-xl sm:text-2xl font-bold mb-3">Who it's best for</h2>
            <ul className="space-y-2">
              {flavour.bestFor.map((b) => (
                <li key={b} className="flex gap-2 text-sm sm:text-base text-muted-foreground">
                  <ChevronRight className="w-4 h-4 mt-1 text-primary shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </section>

          {flavour.faq.length > 0 ? (
            <section className="mt-10">
              <h2 className="text-xl sm:text-2xl font-bold mb-4">FAQ</h2>
              <div className="space-y-4">
                {flavour.faq.map((item) => (
                  <div key={item.question} className="rounded-xl border border-gold/20 bg-card/50 p-4">
                    <h3 className="text-sm sm:text-base font-semibold">{item.question}</h3>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {similar.length > 0 ? (
            <section className="mt-12">
              <h2 className="text-xl sm:text-2xl font-bold mb-5">Similar flavours</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-5">
                {similar.map((f) => {
                  const fp = getFlavourProduct(f.slug);
                  return (
                    <Link
                      key={f.slug}
                      to={`/flavours/${f.slug}`}
                      className="luxe-card rounded-xl overflow-hidden group flex flex-col border border-gold/20"
                    >
                      {fp ? (
                        <div className="relative aspect-square bg-gradient-to-br from-secondary to-background">
                          <img
                            src={fp.img}
                            alt={`Alibarbar Ingot 9000 ${f.name} disposable vape`}
                            loading="lazy"
                            className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      ) : null}
                      <div className="p-3 border-t border-gold/15">
                        <h3 className="text-xs sm:text-sm font-bold leading-snug group-hover:text-primary transition-colors line-clamp-2">
                          {f.name}
                        </h3>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          ) : null}

          <div className="mt-12 text-sm text-muted-foreground">
            Explore all options in the{" "}
            <Link to="/flavours" className="text-primary font-semibold hover:text-gold">Flavour Centre</Link> or read the{" "}
            <Link to="/guides/best-alibarbar-flavours-australia" className="text-primary font-semibold hover:text-gold">
              best flavours guide
            </Link>
            .
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FlavourPage;

import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Seo, breadcrumbNode } from "@/components/Seo";
import { flavourProfiles, getFlavourProduct } from "@/data/flavours";
import { useReveal } from "@/hooks/use-reveal";

const FlavoursIndexPage = () => {
  useReveal();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "Alibarbar Ingot 9000 Flavours",
        description: "Explore every Alibarbar Ingot 9000 flavour with taste profiles, sweetness and cooling ratings.",
        url: "https://www.alibarbar.mom/flavours",
      },
      breadcrumbNode([
        { name: "Home", path: "/" },
        { name: "Flavours", path: "/flavours" },
      ]),
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="All Alibarbar Ingot 9000 Flavours | Taste Guide Australia"
        description="Browse every Alibarbar Ingot 9000 flavour — from Quadruple Berry to Peach Ice. Compare sweetness, cooling and taste notes to find your favourite."
        path="/flavours"
        jsonLd={jsonLd}
      />
      <Navbar />
      <main className="pt-[calc(6rem+env(safe-area-inset-top))] pb-16 sm:pb-24">
        <div className="container max-w-5xl">
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Flavours</span>
          </nav>

          <header className="mb-10 sm:mb-14 max-w-2xl">
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3 font-semibold">Flavour Centre</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
              Alibarbar Ingot 9000 <span className="text-gold">Flavours</span>
            </h1>
            <p className="text-muted-foreground mt-4 text-sm sm:text-base leading-relaxed">
              Every flavour in the current Alibarbar Ingot 9000 range, with honest taste notes, sweetness and cooling
              ratings, and who each one suits. Tap a flavour to read the full profile.
            </p>
          </header>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {flavourProfiles.map((flavour) => {
              const product = getFlavourProduct(flavour.slug);
              return (
                <Link
                  key={flavour.slug}
                  to={`/flavours/${flavour.slug}`}
                  className="reveal group rounded-2xl border border-gold/20 bg-card/60 overflow-hidden flex flex-col hover:border-gold/50 transition-colors"
                >
                  {product ? (
                    <div className="relative aspect-square bg-gradient-to-br from-secondary to-background">
                      <img
                        src={product.img}
                        alt={`Alibarbar Ingot 9000 ${flavour.name} disposable vape Australia`}
                        loading="lazy"
                        className="w-full h-full object-contain p-5 group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : null}
                  <div className="p-4 sm:p-5 flex flex-col gap-2 border-t border-gold/15 flex-1">
                    <span className="text-[10px] uppercase tracking-wide text-primary">{flavour.family}</span>
                    <h2 className="text-base sm:text-lg font-bold leading-snug group-hover:text-primary transition-colors">
                      {flavour.name}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">{flavour.tagline}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-gold">
                      View profile <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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

export default FlavoursIndexPage;

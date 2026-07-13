import { Link } from "react-router-dom";
import { ArrowRight, Tag } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Seo, breadcrumbNode } from "@/components/Seo";
import { brands } from "@/data/brands";
import { useReveal } from "@/hooks/use-reveal";

const BrandsIndexPage = () => {
  useReveal();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "Vape Brand Guides",
        description: "Guides to disposable vape brands and how they compare with Alibarbar.",
        url: "https://www.alibarbar.mom/brands",
      },
      breadcrumbNode([
        { name: "Home", path: "/" },
        { name: "Brands", path: "/brands" },
      ]),
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Vape Brand Guides | Alibarbar, IGET, HQD, Gunnpod, KUZ"
        description="Learn about the major disposable vape brands in Australia and how each compares with the Alibarbar Ingot 9000."
        path="/brands"
        jsonLd={jsonLd}
      />
      <Navbar />
      <main className="pt-[calc(6rem+env(safe-area-inset-top))] pb-16 sm:pb-24">
        <div className="container max-w-4xl">
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Brands</span>
          </nav>

          <header className="mb-10 sm:mb-14 max-w-2xl">
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3 font-semibold">Brand Centre</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
              Vape <span className="text-gold">brand guides</span>
            </h1>
            <p className="text-muted-foreground mt-4 text-sm sm:text-base leading-relaxed">
              Neutral overviews of the disposable vape brands Australian vapers ask about — what each is known for, and
              how it compares with the Alibarbar Ingot 9000.
            </p>
          </header>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {brands.map((brand) => (
              <Link
                key={brand.slug}
                to={`/brands/${brand.slug}`}
                className="reveal group rounded-2xl border border-gold/20 bg-card/60 p-6 flex flex-col gap-3 hover:border-gold/50 transition-colors"
              >
                <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-primary">
                  <Tag className="w-4 h-4" />
                  {brand.isOwn ? "Our brand" : "Brand guide"}
                </div>
                <h2 className="text-lg font-bold leading-snug group-hover:text-primary transition-colors">{brand.name}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{brand.description}</p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-gold">
                  Read guide <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BrandsIndexPage;

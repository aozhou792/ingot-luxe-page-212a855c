import { Link } from "react-router-dom";
import { ArrowRight, GitCompare } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Seo, breadcrumbNode } from "@/components/Seo";
import { comparisons } from "@/data/comparisons";
import { useReveal } from "@/hooks/use-reveal";

const CompareIndexPage = () => {
  useReveal();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "Alibarbar Vape Comparisons",
        description: "SKU-vs-SKU comparisons: Alibarbar Ingot 9000 against named competitor devices, plus flavour-vs-flavour pages.",
        url: "https://www.ailibarbar.com/compare",
      },
      breadcrumbNode([
        { name: "Home", path: "/" },
        { name: "Compare", path: "/compare" },
      ]),
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Alibarbar SKU Comparisons | Ingot 9000 vs Named Devices"
        description="Side-by-side SKU comparisons: Ingot 9000 vs IGET Bar, HQD Cuvie Plus, Gunnpod 2000, KUZ x10000, Geek Bar Pulse and RELX Infinity — plus Peach Ice vs Blackberry Ice and other flavour pages."
        path="/compare"
        jsonLd={jsonLd}
      />
      <Navbar />
      <main className="pt-[calc(6rem+env(safe-area-inset-top))] pb-16 sm:pb-24">
        <div className="container max-w-4xl">
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Compare</span>
          </nav>

          <header className="mb-10 sm:mb-14 max-w-2xl">
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3 font-semibold">Compare</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
              Alibarbar vs <span className="text-gold">named SKUs</span>
            </h1>
            <p className="text-muted-foreground mt-4 text-sm sm:text-base leading-relaxed">
              Side-by-side tables for the Alibarbar Ingot 9000 against a named competitor device — not a whole brand catalogue — plus flavour SKU vs SKU pages on the same hardware.
            </p>
          </header>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {comparisons.map((c) => (
              <Link
                key={c.slug}
                to={`/compare/${c.slug}`}
                className="reveal group rounded-2xl border border-gold/20 bg-card/60 p-6 flex flex-col gap-3 hover:border-gold/50 transition-colors"
              >
                <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-primary">
                  <GitCompare className="w-4 h-4" />
                  {c.leftLabel ?? "Alibarbar Ingot 9000"} vs {c.rightLabel ?? c.competitor}
                </div>
                <h2 className="text-lg font-bold leading-snug group-hover:text-primary transition-colors">{c.title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{c.description}</p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-gold">
                  Read comparison <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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

export default CompareIndexPage;

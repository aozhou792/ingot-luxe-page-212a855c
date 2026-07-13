import { Link } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { guides } from "@/data/guides";
import { useReveal } from "@/hooks/use-reveal";

const GuidesIndexPage = () => {
  useReveal();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "Alibarbar Vape Guides",
        description: "Guides and resources for Alibarbar Ingot 9000 disposable vapes in Australia.",
        url: "https://www.alibarbar.mom/guides",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.alibarbar.mom/" },
          { "@type": "ListItem", position: 2, name: "Guides", item: "https://www.alibarbar.mom/guides" },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Vape Guides & Resources | Alibarbar Australia"
        description="Read Alibarbar Ingot 9000 guides — how disposable vapes work, how long they last, puff counts, flavour picks and Australian vaping basics."
        path="/guides"
        jsonLd={jsonLd}
      />
      <Navbar />
      <main className="pt-[calc(6rem+env(safe-area-inset-top))] pb-16 sm:pb-24">
        <div className="container max-w-5xl">
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Guides</span>
          </nav>

          <header className="mb-10 sm:mb-14 max-w-2xl">
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3 font-semibold">Knowledge Centre</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
              Alibarbar <span className="text-gold">Vape Guides</span>
            </h1>
            <p className="text-muted-foreground mt-4 text-sm sm:text-base leading-relaxed">
              Clear, practical guides to the Alibarbar Ingot 9000 — how it works, how long it lasts, how to choose a
              flavour, and what adult vapers in Australia should know.
            </p>
          </header>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {guides.map((guide) => (
              <Link
                key={guide.slug}
                to={`/guides/${guide.slug}`}
                className="reveal group rounded-2xl border border-gold/20 bg-card/60 p-6 flex flex-col gap-3 hover:border-gold/50 transition-colors"
              >
                <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-primary">
                  <BookOpen className="w-4 h-4" />
                  {guide.category} · {guide.readTime}
                </div>
                <h2 className="text-lg sm:text-xl font-bold leading-snug group-hover:text-primary transition-colors">
                  {guide.title}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{guide.description}</p>
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

export default GuidesIndexPage;

import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Seo, breadcrumbNode } from "@/components/Seo";
import { researchArticles } from "@/data/research";
import { useReveal } from "@/hooks/use-reveal";

const ResearchIndexPage = () => {
  useReveal();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "Alibarbar Australia Research",
        url: "https://www.ailibarbar.com/research",
        description:
          "Original research notes from Alibarbar Australia on disposable vape capacity, specifications and Australian buying context.",
      },
      breadcrumbNode([
        { name: "Home", path: "/" },
        { name: "Research", path: "/research" },
      ]),
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Research | Alibarbar Australia"
        description="Original research notes on high-puff disposable capacity and Alibarbar Ingot 9000 specifications for Australian adult buyers."
        path="/research"
        jsonLd={jsonLd}
      />
      <Navbar />
      <main className="pt-[calc(6rem+env(safe-area-inset-top))] pb-16 sm:pb-24">
        <div className="container max-w-3xl">
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Research</span>
          </nav>

          <header className="mb-10">
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3 font-semibold">Original research</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
              Research <span className="text-gold">Notes</span>
            </h1>
            <p className="text-muted-foreground mt-4 text-sm sm:text-base leading-relaxed">
              Dated, method-stated research for AI citation and human reference — not marketing blurbs.
            </p>
            <div className="gold-divider mt-6 max-w-[6rem]" />
          </header>

          <ul className="space-y-4">
            {researchArticles.map((article) => (
              <li key={article.slug}>
                <Link
                  to={`/research/${article.slug}`}
                  className="reveal group block rounded-2xl border border-gold/20 bg-card/50 p-5 sm:p-6 hover:border-gold/50 transition-colors"
                >
                  <p className="text-xs text-muted-foreground mb-2">
                    {article.readTime} · Updated {article.dateModified}
                  </p>
                  <h2 className="text-lg sm:text-xl font-bold group-hover:text-gold transition-colors">{article.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{article.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    Read research <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ResearchIndexPage;

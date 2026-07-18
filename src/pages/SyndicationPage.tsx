import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContentHubLinks } from "@/components/seo/ContentHubLinks";
import { CitationSources } from "@/components/seo/CitationSources";
import { Seo, breadcrumbNode } from "@/components/Seo";
import { citationsByIds } from "@/data/citations";
import { SITE_URL } from "@/data/site";
import { syndicationHub } from "@/data/syndication";
import { useReveal } from "@/hooks/use-reveal";

const SyndicationPage = () => {
  useReveal();
  const path = "/syndication";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: syndicationHub.title,
        description: syndicationHub.description,
        url: `${SITE_URL}${path}`,
        dateModified: syndicationHub.dateModified,
      },
      breadcrumbNode([
        { name: "Home", path: "/" },
        { name: "Syndication", path },
      ]),
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Medium & Substack Syndication | Alibarbar Australia"
        description={syndicationHub.description}
        path={path}
        jsonLd={jsonLd}
      />
      <Navbar />
      <main className="pt-[calc(6rem+env(safe-area-inset-top))] pb-16 sm:pb-24">
        <div className="container max-w-3xl">
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Syndication</span>
          </nav>

          <header className="mb-10">
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3 font-semibold">Content sync</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
              Medium &amp; Substack <span className="text-gold">Syndication</span>
            </h1>
            <p className="text-muted-foreground mt-4 text-sm sm:text-base leading-relaxed">{syndicationHub.intro}</p>
            <div className="gold-divider mt-6 max-w-[6rem]" />
          </header>

          <section className="mb-10">
            <h2 className="text-xl font-bold mb-3">Sync rules</h2>
            <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
              {syndicationHub.rules.map((rule) => (
                <li key={rule}>• {rule}</li>
              ))}
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold mb-4">Articles ready to sync</h2>
            <ul className="space-y-4">
              {syndicationHub.articles.map((article) => (
                <li key={article.slug} className="rounded-2xl border border-gold/20 bg-card/50 p-5">
                  <h3 className="text-base font-bold">{article.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{article.excerpt}</p>
                  <p className="mt-3 text-xs text-muted-foreground">
                    Platforms: {article.platforms.map((p) => p[0].toUpperCase() + p.slice(1)).join(" · ")} · Published{" "}
                    {article.datePublished}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                    <Link to={article.canonicalPath} className="font-semibold text-primary hover:text-gold">
                      Canonical page →
                    </Link>
                    {article.mediumUrl ? (
                      <a
                        href={article.mediumUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-primary hover:text-gold"
                      >
                        Read on Medium →
                      </a>
                    ) : null}
                    {article.substackUrl ? (
                      <a
                        href={article.substackUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-primary hover:text-gold"
                      >
                        Read on Substack →
                      </a>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <div className="mb-10 rounded-2xl border border-gold/20 bg-card/40 p-5 text-sm text-muted-foreground leading-relaxed">
            <p>
              When Medium or Substack publication URLs are live, add them to site social metadata and link them from each
              mirrored post back to the canonical path above. Until then, this page is the public syndication contract.
            </p>
          </div>

          <div className="mb-10">
            <CitationSources items={citationsByIds(["medium-hub", "official-site", "github-docs"])} />
          </div>

          <ContentHubLinks />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SyndicationPage;

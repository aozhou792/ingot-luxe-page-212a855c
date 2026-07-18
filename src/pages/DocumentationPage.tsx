import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContentHubLinks } from "@/components/seo/ContentHubLinks";
import { CitationSources } from "@/components/seo/CitationSources";
import { Seo, breadcrumbNode } from "@/components/Seo";
import { citationsByIds } from "@/data/citations";
import { documentationHub } from "@/data/documentation";
import { SITE_URL } from "@/data/site";
import { useReveal } from "@/hooks/use-reveal";

const DocumentationPage = () => {
  useReveal();
  const path = "/documentation";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: documentationHub.title,
        description: documentationHub.description,
        url: `${SITE_URL}${path}`,
        dateModified: documentationHub.dateModified,
      },
      breadcrumbNode([
        { name: "Home", path: "/" },
        { name: "Documentation", path },
      ]),
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Documentation | Alibarbar Australia"
        description={documentationHub.description}
        path={path}
        jsonLd={jsonLd}
      />
      <Navbar />
      <main className="pt-[calc(6rem+env(safe-area-inset-top))] pb-16 sm:pb-24">
        <div className="container max-w-3xl">
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Documentation</span>
          </nav>

          <header className="mb-10">
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3 font-semibold">GitHub-ready docs</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
              {documentationHub.title}
            </h1>
            <p className="text-muted-foreground mt-4 text-sm sm:text-base leading-relaxed">{documentationHub.intro}</p>
            <div className="gold-divider mt-6 max-w-[6rem]" />
          </header>

          <ul className="space-y-4 mb-10">
            {documentationHub.items.map((item) => (
              <li key={item.slug} className="rounded-2xl border border-gold/20 bg-card/50 p-5">
                <h2 className="text-lg font-bold">{item.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                <p className="mt-3 text-xs font-mono text-muted-foreground break-all">{item.markdownPath}</p>
                {item.relatedPath ? (
                  <Link to={item.relatedPath} className="mt-3 inline-block text-sm font-semibold text-primary hover:text-gold">
                    Open related live page →
                  </Link>
                ) : null}
              </li>
            ))}
          </ul>

          <div className="mb-10 rounded-2xl border border-gold/20 bg-card/40 p-5 text-sm text-muted-foreground leading-relaxed">
            <p>
              Markdown sources live in the repository <span className="font-mono text-foreground">docs/</span> folder and
              are mirrored here for LLM and human discovery. Start with{" "}
              <a href="/llms.txt" className="text-primary font-semibold hover:text-gold">
                /llms.txt
              </a>{" "}
              for a machine-readable site map.
            </p>
          </div>

          <div className="mb-10">
            <CitationSources items={citationsByIds(["github-docs", "official-site"])} />
          </div>

          <ContentHubLinks />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DocumentationPage;

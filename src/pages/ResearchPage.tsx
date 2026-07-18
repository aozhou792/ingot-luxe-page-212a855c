import { Link, Navigate, useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContentByline } from "@/components/seo/ContentByline";
import { ContentHubLinks } from "@/components/seo/ContentHubLinks";
import { CitationSources } from "@/components/seo/CitationSources";
import { CiteThis } from "@/components/seo/CiteThis";
import { KeyTakeaways } from "@/components/seo/KeyTakeaways";
import { QuickAnswer } from "@/components/seo/QuickAnswer";
import { Seo, articleJsonLd, type BreadcrumbEntry } from "@/components/Seo";
import { citationsByIds } from "@/data/citations";
import { SITE_URL } from "@/data/site";
import { getResearchBySlug } from "@/data/research";
import { useReveal } from "@/hooks/use-reveal";

const ResearchPage = () => {
  useReveal();
  const { slug } = useParams<{ slug: string }>();
  const article = getResearchBySlug(slug);

  if (!article) return <Navigate to="/research" replace />;

  const path = `/research/${article.slug}`;
  const breadcrumbs: BreadcrumbEntry[] = [
    { name: "Home", path: "/" },
    { name: "Research", path: "/research" },
    { name: article.title, path },
  ];

  const jsonLd = articleJsonLd({
    title: article.title,
    description: article.description,
    path,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    breadcrumbs,
    faq: article.faq,
  });

  return (
    <div className="min-h-screen bg-background">
      <Seo title={`${article.title} | Alibarbar Australia`} description={article.description} path={path} jsonLd={jsonLd} />
      <Navbar />
      <main className="pt-[calc(6rem+env(safe-area-inset-top))] pb-16 sm:pb-24">
        <article className="container max-w-3xl">
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/research" className="hover:text-primary">Research</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Note</span>
          </nav>

          <header className="mb-8">
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3 font-semibold">
              Research · {article.readTime}
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">{article.title}</h1>
            <ContentByline datePublished={article.datePublished} dateModified={article.dateModified} />
            <QuickAnswer data={article.quickAnswer} />
            <div className="gold-divider mt-6 max-w-[6rem]" />
          </header>

          <div className="mb-10">
            <KeyTakeaways items={article.keyTakeaways} />
          </div>

          <section className="mb-10">
            <h2 className="text-xl sm:text-2xl font-bold mb-3">Methodology</h2>
            <ul className="space-y-2 text-sm sm:text-base text-muted-foreground leading-relaxed">
              {article.methodology.map((item) => (
                <li key={item} className="pl-4 border-l border-gold/30">{item}</li>
              ))}
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">Key findings</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {article.findings.map((finding) => (
                <div key={finding.label} className="rounded-2xl border border-gold/20 bg-card/50 p-4">
                  <p className="text-xs uppercase tracking-wide text-primary font-semibold">{finding.label}</p>
                  <p className="text-lg font-bold mt-1">{finding.value}</p>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{finding.detail}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="space-y-8 mb-10">
            {article.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-xl sm:text-2xl font-bold mb-3">{section.heading}</h2>
                <div className="space-y-3 text-muted-foreground leading-[1.75] text-sm sm:text-base">
                  {section.paragraphs.map((p) => (
                    <p key={p.slice(0, 48)}>{p}</p>
                  ))}
                </div>
                {section.bullets ? (
                  <ul className="mt-3 space-y-1.5 text-sm sm:text-base text-muted-foreground">
                    {section.bullets.map((b) => (
                      <li key={b}>• {b}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>

          <section className="mb-10 rounded-2xl border border-border/60 bg-card/30 p-5">
            <h2 className="text-lg font-bold mb-3">Limitations</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {article.limitations.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </section>

          {article.faq.length > 0 ? (
            <section className="mb-10">
              <h2 className="text-xl sm:text-2xl font-bold mb-4">FAQ</h2>
              <div className="space-y-4">
                {article.faq.map((item) => (
                  <div key={item.question} className="rounded-xl border border-gold/20 bg-card/50 p-4">
                    <h3 className="text-sm sm:text-base font-semibold">{item.question}</h3>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          <div className="space-y-6 mb-10">
            <CitationSources items={citationsByIds(article.citationIds)} />
            <CiteThis title={article.title} url={`${SITE_URL}${path}`} dateModified={article.dateModified} />
          </div>

          <ContentHubLinks />
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default ResearchPage;

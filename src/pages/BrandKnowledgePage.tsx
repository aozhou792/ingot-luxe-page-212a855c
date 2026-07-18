import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContentHubLinks } from "@/components/seo/ContentHubLinks";
import { CitationSources } from "@/components/seo/CitationSources";
import { CiteThis } from "@/components/seo/CiteThis";
import { KeyTakeaways } from "@/components/seo/KeyTakeaways";
import { QuickAnswer } from "@/components/seo/QuickAnswer";
import { Seo, articleJsonLd, type BreadcrumbEntry } from "@/components/Seo";
import { brandKnowledge } from "@/data/brand-knowledge";
import { defaultGuideCitations } from "@/data/citations";
import { SITE_URL } from "@/data/site";
import { useReveal } from "@/hooks/use-reveal";

const BrandKnowledgePage = () => {
  useReveal();
  const path = "/brand-knowledge";
  const breadcrumbs: BreadcrumbEntry[] = [
    { name: "Home", path: "/" },
    { name: "Brand Knowledge", path },
  ];

  const jsonLd = articleJsonLd({
    title: brandKnowledge.title,
    description: brandKnowledge.description,
    path,
    datePublished: brandKnowledge.datePublished,
    dateModified: brandKnowledge.dateModified,
    breadcrumbs,
    faq: [...brandKnowledge.faq],
  });

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={`${brandKnowledge.title} | Alibarbar Australia`}
        description={brandKnowledge.description}
        path={path}
        jsonLd={jsonLd}
      />
      <Navbar />
      <main className="pt-[calc(6rem+env(safe-area-inset-top))] pb-16 sm:pb-24">
        <article className="container max-w-3xl">
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Brand Knowledge</span>
          </nav>

          <header className="mb-8">
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3 font-semibold">Entity hub</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">{brandKnowledge.title}</h1>
            <p className="text-muted-foreground mt-4 text-sm sm:text-base leading-relaxed">{brandKnowledge.intro}</p>
            <QuickAnswer data={brandKnowledge.quickAnswer} />
            <div className="gold-divider mt-6 max-w-[6rem]" />
          </header>

          <div className="mb-10">
            <KeyTakeaways items={[...brandKnowledge.keyTakeaways]} />
          </div>

          <div className="space-y-8 mb-10">
            {brandKnowledge.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-xl sm:text-2xl font-bold mb-3">{section.heading}</h2>
                <div className="space-y-3 text-muted-foreground leading-[1.75] text-sm sm:text-base">
                  {section.paragraphs.map((p) => (
                    <p key={p.slice(0, 40)}>{p}</p>
                  ))}
                </div>
                {section.bullets ? (
                  <ul className="mt-3 space-y-1.5 text-sm sm:text-base text-muted-foreground">
                    {section.bullets.map((b) => (
                      <li key={b} className="flex gap-2">
                        <ChevronRight className="w-4 h-4 mt-1 text-primary shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>

          <section className="mb-10">
            <h2 className="text-xl font-bold mb-4">Related knowledge</h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {brandKnowledge.entityLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="block rounded-xl border border-gold/15 bg-card/50 p-3 text-sm font-semibold text-primary hover:border-gold/40 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold mb-4">FAQ</h2>
            <div className="space-y-4">
              {brandKnowledge.faq.map((item) => (
                <div key={item.question} className="rounded-xl border border-gold/20 bg-card/50 p-4">
                  <h3 className="text-sm sm:text-base font-semibold">{item.question}</h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="space-y-6 mb-10">
            <CitationSources items={defaultGuideCitations} />
            <CiteThis
              title={brandKnowledge.title}
              url={`${SITE_URL}${path}`}
              dateModified={brandKnowledge.dateModified}
            />
          </div>

          <ContentHubLinks />
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BrandKnowledgePage;

import { Link, Navigate, useParams } from "react-router-dom";
import { Check, ChevronRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContentByline } from "@/components/seo/ContentByline";
import { ContentHubLinks } from "@/components/seo/ContentHubLinks";
import { CitationSources } from "@/components/seo/CitationSources";
import { CiteThis } from "@/components/seo/CiteThis";
import { CompareShortAnswer } from "@/components/seo/CompareShortAnswer";
import { KeyTakeaways } from "@/components/seo/KeyTakeaways";
import { QuickAnswer } from "@/components/seo/QuickAnswer";
import { Seo, articleJsonLd, type BreadcrumbEntry } from "@/components/Seo";
import { defaultCompareCitations } from "@/data/citations";
import { getComparisonBySlug } from "@/data/comparisons";
import { SITE_URL } from "@/data/site";
import { deriveCompareShortAnswer, deriveKeyTakeaways, deriveQuickAnswer } from "@/lib/content-geo";
import { useReveal } from "@/hooks/use-reveal";

const ComparePage = () => {
  useReveal();
  const { slug } = useParams<{ slug: string }>();
  const comparison = getComparisonBySlug(slug);

  if (!comparison) return <Navigate to="/compare" replace />;

  const path = `/compare/${comparison.slug}`;
  const leftLabel = comparison.leftLabel ?? "Alibarbar Ingot 9000";
  const rightLabel = comparison.rightLabel ?? comparison.competitor;

  const breadcrumbs: BreadcrumbEntry[] = [
    { name: "Home", path: "/" },
    { name: "Compare", path: "/compare" },
    { name: `${leftLabel} vs ${rightLabel}`, path },
  ];

  const jsonLd = articleJsonLd({
    title: comparison.title,
    description: comparison.description,
    path,
    datePublished: comparison.datePublished,
    dateModified: comparison.dateModified,
    breadcrumbs,
    faq: comparison.faq,
  });

  const quickAnswer = deriveQuickAnswer(comparison.title, comparison.intro, comparison.quickAnswer);
  const keyTakeaways = deriveKeyTakeaways(comparison.keyTakeaways, comparison.alibarbarStrengths);
  const shortAnswer = deriveCompareShortAnswer(comparison);

  return (
    <div className="min-h-screen bg-background">
      <Seo title={`${comparison.title} | Alibarbar Australia`} description={comparison.description} path={path} type="article" jsonLd={jsonLd} />
      <Navbar />
      <main className="pt-[calc(6rem+env(safe-area-inset-top))] pb-16 sm:pb-24">
        <article className="container max-w-3xl">
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/compare" className="hover:text-primary">Compare</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">vs {rightLabel}</span>
          </nav>

          <header className="mb-8">
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3 font-semibold">Comparison</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">{comparison.title}</h1>
            <ContentByline datePublished={comparison.datePublished} dateModified={comparison.dateModified} />
            <div className="mt-6 space-y-6">
              <CompareShortAnswer
                competitor={comparison.competitor}
                leftLabel={leftLabel}
                rightLabel={rightLabel}
                alibarbar={shortAnswer.alibarbar}
                competitorPick={shortAnswer.competitor}
              />
              <QuickAnswer data={quickAnswer} />
            </div>
            <div className="gold-divider mt-6 max-w-[6rem]" />
          </header>

          <div className="mb-10">
            <KeyTakeaways items={keyTakeaways} />
          </div>

          <section className="mb-10">
            <h2 className="text-xl sm:text-2xl font-bold mb-3">About {rightLabel}</h2>
            <div className="space-y-3 text-muted-foreground leading-[1.75] text-sm sm:text-base">
              {comparison.competitorOverview.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">Side-by-side comparison</h2>

            <div className="md:hidden space-y-3">
              {comparison.rows.map((row) => (
                <div key={row.feature} className="rounded-2xl border border-gold/25 bg-card/50 p-4 space-y-3">
                  <p className="font-semibold text-sm">{row.feature}</p>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase tracking-wide text-gold mb-1 font-semibold">{leftLabel}</p>
                      <p className="leading-snug">{row.alibarbar}</p>
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase tracking-wide text-muted-foreground mb-1 font-semibold">
                        {rightLabel}
                      </p>
                      <p className="text-muted-foreground leading-snug">{row.competitor}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="hidden md:block overflow-x-auto rounded-2xl border border-gold/25">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-card/70 text-left">
                    <th className="p-3 font-semibold">Feature</th>
                    <th className="p-3 font-semibold text-gold">{leftLabel}</th>
                    <th className="p-3 font-semibold">{rightLabel}</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.rows.map((row) => (
                    <tr key={row.feature} className="border-t border-gold/15">
                      <td className="p-3 font-medium text-muted-foreground">{row.feature}</td>
                      <td className="p-3">{row.alibarbar}</td>
                      <td className="p-3 text-muted-foreground">{row.competitor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-10 grid sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-gold/25 bg-card/50 p-5">
              <h2 className="text-base font-bold mb-3 text-gold">{leftLabel} strengths</h2>
              <ul className="space-y-2">
                {comparison.alibarbarStrengths.map((s) => (
                  <li key={s} className="flex gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-gold/20 bg-card/40 p-5">
              <h2 className="text-base font-bold mb-3">{rightLabel} strengths</h2>
              <ul className="space-y-2">
                {comparison.competitorStrengths.map((s) => (
                  <li key={s} className="flex gap-2 text-sm text-muted-foreground">
                    <ChevronRight className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-xl sm:text-2xl font-bold mb-3">Verdict</h2>
            <div className="space-y-3 text-muted-foreground leading-[1.75] text-sm sm:text-base">
              {comparison.verdict.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>

          {comparison.faq.length > 0 ? (
            <section className="mb-10">
              <h2 className="text-xl sm:text-2xl font-bold mb-4">FAQ</h2>
              <div className="space-y-4">
                {comparison.faq.map((item) => (
                  <div key={item.question} className="rounded-xl border border-gold/20 bg-card/50 p-4">
                    <h3 className="text-sm sm:text-base font-semibold">{item.question}</h3>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          <div className="rounded-2xl border border-gold/25 bg-card/60 p-6 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              {comparison.flavourCompare
                ? "Both SKUs use the same Ingot 9000 hardware — choose the fill."
                : "Ready to try the Alibarbar Ingot 9000 for yourself?"}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center">
              {comparison.flavourCompare && comparison.leftProductSlug && comparison.rightProductSlug ? (
                <>
                  <Link
                    to={`/product/${comparison.leftProductSlug}`}
                    className="inline-flex items-center justify-center min-h-[48px] px-8 rounded-full bg-gold text-primary-foreground font-bold uppercase tracking-widest text-xs shadow-gold hover:opacity-95 transition"
                  >
                    Shop {leftLabel}
                  </Link>
                  <Link
                    to={`/product/${comparison.rightProductSlug}`}
                    className="inline-flex items-center justify-center min-h-[48px] px-8 rounded-full border border-gold text-primary font-bold uppercase tracking-widest text-xs hover:bg-primary/10 transition"
                  >
                    Shop {rightLabel}
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/shop"
                    className="inline-flex items-center justify-center min-h-[48px] px-8 rounded-full bg-gold text-primary-foreground font-bold uppercase tracking-widest text-xs shadow-gold hover:opacity-95 transition"
                  >
                    Shop Ingot 9000
                  </Link>
                  <Link
                    to="/flavours"
                    className="inline-flex items-center justify-center min-h-[48px] px-8 rounded-full border border-gold text-primary font-bold uppercase tracking-widest text-xs hover:bg-primary/10 transition"
                  >
                    Explore flavours
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="mt-10 space-y-6">
            <CitationSources items={defaultCompareCitations} />
            <CiteThis
              title={comparison.title}
              url={`${SITE_URL}${path}`}
              dateModified={comparison.dateModified}
            />
          </div>

          <ContentHubLinks />
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default ComparePage;

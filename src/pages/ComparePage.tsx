import { Link, Navigate, useParams } from "react-router-dom";
import { Check, ChevronRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Seo, articleJsonLd, type BreadcrumbEntry } from "@/components/Seo";
import { getComparisonBySlug } from "@/data/comparisons";
import { useReveal } from "@/hooks/use-reveal";

const ComparePage = () => {
  useReveal();
  const { slug } = useParams<{ slug: string }>();
  const comparison = getComparisonBySlug(slug);

  if (!comparison) return <Navigate to="/compare" replace />;

  const path = `/compare/${comparison.slug}`;
  const breadcrumbs: BreadcrumbEntry[] = [
    { name: "Home", path: "/" },
    { name: "Compare", path: "/compare" },
    { name: `Alibarbar vs ${comparison.competitor}`, path },
  ];

  const jsonLd = articleJsonLd({
    title: comparison.title,
    description: comparison.description,
    path,
    datePublished: comparison.datePublished,
    dateModified: comparison.dateModified,
    breadcrumbs,
  });

  return (
    <div className="min-h-screen bg-background">
      <Seo title={`${comparison.title} | Alibarbar Australia`} description={comparison.description} path={path} jsonLd={jsonLd} />
      <Navbar />
      <main className="pt-[calc(6rem+env(safe-area-inset-top))] pb-16 sm:pb-24">
        <article className="container max-w-3xl">
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/compare" className="hover:text-primary">Compare</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">vs {comparison.competitor}</span>
          </nav>

          <header className="mb-8">
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3 font-semibold">Comparison</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">{comparison.title}</h1>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed">{comparison.intro}</p>
            <div className="gold-divider mt-6 max-w-[6rem]" />
          </header>

          <section className="mb-10">
            <h2 className="text-xl sm:text-2xl font-bold mb-3">About {comparison.competitor}</h2>
            <div className="space-y-3 text-muted-foreground leading-[1.75] text-sm sm:text-base">
              {comparison.competitorOverview.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">Side-by-side comparison</h2>
            <div className="overflow-x-auto rounded-2xl border border-gold/25">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-card/70 text-left">
                    <th className="p-3 font-semibold">Feature</th>
                    <th className="p-3 font-semibold text-gold">Alibarbar Ingot 9000</th>
                    <th className="p-3 font-semibold">{comparison.competitor}</th>
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
              <h2 className="text-base font-bold mb-3 text-gold">Alibarbar Ingot 9000 strengths</h2>
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
              <h2 className="text-base font-bold mb-3">{comparison.competitor} strengths</h2>
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
            <p className="text-sm text-muted-foreground mb-4">Ready to try the Alibarbar Ingot 9000 for yourself?</p>
            <Link
              to="/flavours"
              className="inline-flex items-center justify-center min-h-[48px] px-8 rounded-full bg-gold text-primary-foreground font-bold uppercase tracking-widest text-xs shadow-gold hover:opacity-95 transition"
            >
              Explore flavours
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default ComparePage;

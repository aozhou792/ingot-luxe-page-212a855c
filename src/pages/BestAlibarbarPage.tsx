import { Link } from "react-router-dom";
import { ArrowRight, Check, ChevronRight, MapPin } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ContentByline } from "@/components/seo/ContentByline";
import { ContentHubLinks } from "@/components/seo/ContentHubLinks";
import { CitationSources } from "@/components/seo/CitationSources";
import { CiteThis } from "@/components/seo/CiteThis";
import { KeyTakeaways } from "@/components/seo/KeyTakeaways";
import { QuickAnswer } from "@/components/seo/QuickAnswer";
import { Seo, articleJsonLd, type BreadcrumbEntry } from "@/components/Seo";
import { bestAlibarbarPage } from "@/data/best-alibarbar";
import { defaultGuideCitations } from "@/data/citations";
import { SITE_URL } from "@/data/site";
import { useReveal } from "@/hooks/use-reveal";

const PODIUM_STYLE = {
  gold: { badge: "🥇", border: "border-gold/50", bg: "bg-primary/8" },
  silver: { badge: "🥈", border: "border-gold/30", bg: "bg-card/60" },
  bronze: { badge: "🥉", border: "border-gold/20", bg: "bg-card/40" },
} as const;

const BestAlibarbarPage = () => {
  useReveal();
  const page = bestAlibarbarPage;
  const path = page.path;
  const breadcrumbs: BreadcrumbEntry[] = [
    { name: "Home", path: "/" },
    { name: "Best Alibarbar Australia", path },
  ];

  const jsonLd = articleJsonLd({
    title: page.title,
    description: page.description,
    path,
    datePublished: page.datePublished,
    dateModified: page.dateModified,
    breadcrumbs,
    faq: [...page.faq],
    itemList: page.rankingTable.map((row, index) => ({
      position: index + 1,
      name: `Alibarbar Ingot 9000 ${row.flavour}`,
      url: `/product/${row.productSlug}`,
      description: `${row.category} · Cooling ${row.cooling} · Best for ${row.bestFor}`,
    })),
  });

  return (
    <div className="min-h-screen bg-background">
      <Seo title={page.title} description={page.description} path={path} jsonLd={jsonLd} />
      <Navbar />
      <main className="pt-[calc(6rem+env(safe-area-inset-top))] pb-16 sm:pb-24">
        <article className="container max-w-3xl">
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Best Alibarbar Australia</span>
          </nav>

          <header className="mb-8">
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3 font-semibold">
              Ranked Guide · 2026
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">{page.h1}</h1>
            <ContentByline datePublished={page.datePublished} dateModified={page.dateModified} />
            <p className="mt-4 text-muted-foreground leading-[1.75] text-sm sm:text-base">{page.intro}</p>
            <QuickAnswer data={page.quickAnswer} />
            <div className="gold-divider mt-6 max-w-[6rem]" />
          </header>

          <div className="mb-10">
            <KeyTakeaways items={[...page.keyTakeaways]} />
          </div>

          <section className="mb-12">
            <h2 className="text-xl sm:text-2xl font-bold mb-2">Best Alibarbar Australia 2026</h2>
            <p className="text-sm text-muted-foreground mb-5">Quick winners from our current Ingot 9000 tasting set.</p>
            <div className="grid gap-3">
              {page.podium.map((winner) => {
                const style = PODIUM_STYLE[winner.place];
                return (
                  <div
                    key={winner.place}
                    className={`rounded-2xl border ${style.border} ${style.bg} p-4 sm:p-5 flex gap-4 items-start`}
                  >
                    <span className="text-2xl shrink-0" aria-hidden>
                      {style.badge}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs uppercase tracking-wide text-primary font-semibold">{winner.label}</p>
                      <h3 className="text-lg font-bold mt-0.5">
                        <Link to={`/product/${winner.productSlug}`} className="hover:text-primary">
                          Alibarbar {winner.flavour}
                        </Link>
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{winner.reason}</p>
                      <Link
                        to={winner.reviewPath}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-gold mt-2"
                      >
                        Read review <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">Flavour comparison table</h2>
            <div className="overflow-x-auto rounded-xl border border-gold/20">
              <table className="w-full min-w-[640px] text-sm border-collapse">
                <thead>
                  <tr className="border-b border-gold/30 bg-card/50 text-left">
                    <th className="py-3 px-3 font-semibold">Flavour</th>
                    <th className="py-3 px-3 font-semibold">Category</th>
                    <th className="py-3 px-3 font-semibold">Cooling</th>
                    <th className="py-3 px-3 font-semibold">Sweetness</th>
                    <th className="py-3 px-3 font-semibold">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  {page.rankingTable.map((row) => (
                    <tr key={row.productSlug} className="border-b border-gold/10">
                      <td className="py-3 px-3 font-semibold">
                        <Link to={`/product/${row.productSlug}`} className="hover:text-primary">
                          {row.flavour}
                        </Link>
                        {row.reviewSlug ? (
                          <>
                            {" · "}
                            <Link
                              to={`/reviews/${row.reviewSlug}`}
                              className="text-xs font-medium text-gold hover:underline"
                            >
                              Review
                            </Link>
                          </>
                        ) : null}
                      </td>
                      <td className="py-3 px-3 text-muted-foreground">{row.category}</td>
                      <td className="py-3 px-3 text-muted-foreground">{row.cooling}</td>
                      <td className="py-3 px-3 text-muted-foreground">{row.sweetness}</td>
                      <td className="py-3 px-3 text-muted-foreground">{row.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-xl sm:text-2xl font-bold mb-3">{page.testingMethod.heading}</h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-[1.75] mb-4">
              {page.testingMethod.intro}
            </p>
            <ul className="space-y-2 mb-4">
              {page.testingMethod.criteria.map((item) => (
                <li key={item} className="flex gap-2 text-sm sm:text-base text-muted-foreground">
                  <Check className="w-4 h-4 mt-1 text-primary shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted-foreground leading-relaxed border-l-2 border-gold/40 pl-4">
              {page.testingMethod.note}{" "}
              <Link to="/editorial-policy" className="text-primary hover:underline">
                Editorial Policy
              </Link>
              .
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-xl sm:text-2xl font-bold mb-3">{page.australiaLocal.heading}</h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-[1.75] mb-5">
              {page.australiaLocal.intro}
            </p>
            <div className="space-y-3">
              {page.australiaLocal.cities.map((city) => (
                <div key={city.name} className="rounded-xl border border-gold/20 bg-card/40 p-4">
                  <h3 className="font-semibold text-sm sm:text-base flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary shrink-0" />
                    {city.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{city.tip}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-xl sm:text-2xl font-bold mb-3">{page.alsoSearched.heading}</h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-[1.75] mb-4">
              {page.alsoSearched.intro}
            </p>
            <ul className="space-y-2">
              {page.alsoSearched.bullets.map((b) => (
                <li key={b} className="flex gap-2 text-sm sm:text-base text-muted-foreground">
                  <ChevronRight className="w-4 h-4 mt-1 text-primary shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">Topic cluster — keep reading</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {page.clusterLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="group rounded-xl border border-gold/20 bg-card/50 p-4 hover:border-gold/50 transition-colors"
                >
                  <h3 className="text-sm font-bold group-hover:text-primary transition-colors">{link.label}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{link.description}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">Frequently asked questions</h2>
            <div className="space-y-4">
              {page.faq.map((item) => (
                <div key={item.question} className="rounded-xl border border-gold/20 bg-card/50 p-4">
                  <h3 className="text-sm sm:text-base font-semibold">{item.question}</h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-14 space-y-6">
            <CitationSources items={defaultGuideCitations} />
            <CiteThis title={page.h1} url={`${SITE_URL}${path}`} dateModified={page.dateModified} />
          </div>

          <ContentHubLinks />
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BestAlibarbarPage;

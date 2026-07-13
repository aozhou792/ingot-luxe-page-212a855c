import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductPrice } from "@/components/ProductPrice";
import { ContentByline } from "@/components/seo/ContentByline";
import { ContentHubLinks } from "@/components/seo/ContentHubLinks";
import { KeyTakeaways } from "@/components/seo/KeyTakeaways";
import { QuickAnswer } from "@/components/seo/QuickAnswer";
import { Seo, articleJsonLd, type BreadcrumbEntry } from "@/components/Seo";
import { getGuideBySlug, guides } from "@/data/guides";
import { getProductBySlug } from "@/data/products";
import { deriveKeyTakeaways, deriveQuickAnswer } from "@/lib/content-geo";
import { useReveal } from "@/hooks/use-reveal";

const GuidePage = () => {
  useReveal();
  const { slug } = useParams<{ slug: string }>();
  const guide = getGuideBySlug(slug);

  if (!guide) return <Navigate to="/guides" replace />;

  const path = `/guides/${guide.slug}`;
  const breadcrumbs: BreadcrumbEntry[] = [
    { name: "Home", path: "/" },
    { name: "Guides", path: "/guides" },
    { name: guide.title, path },
  ];

  const relatedProducts = (guide.relatedProducts ?? [])
    .map((s) => getProductBySlug(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const relatedGuides = (guide.relatedGuides ?? [])
    .map((s) => guides.find((g) => g.slug === s))
    .filter((g): g is NonNullable<typeof g> => Boolean(g));

  const howToSteps =
    guide.slug === "how-to-use-a-disposable-vape" || guide.slug === "how-to-open-alibarbar-vape"
      ? guide.sections
          .filter((s) => s.heading.toLowerCase().startsWith("step"))
          .map((s) => ({
            name: s.heading.replace(/^Step \d+:\s*/i, ""),
            text: s.paragraphs.join(" "),
          }))
      : undefined;

  const jsonLd = articleJsonLd({
    title: guide.title,
    description: guide.description,
    path,
    datePublished: guide.datePublished,
    dateModified: guide.dateModified,
    breadcrumbs,
    faq: guide.faq,
    howToSteps,
    howToTotalTime: howToSteps ? "PT5M" : undefined,
  });

  const quickAnswer = deriveQuickAnswer(guide.title, guide.intro, guide.quickAnswer);
  const keyTakeaways = deriveKeyTakeaways(
    guide.keyTakeaways,
    guide.sections.find((s) => s.bullets)?.bullets,
    guide.faq?.map((f) => f.answer),
  );

  return (
    <div className="min-h-screen bg-background">
      <Seo title={`${guide.title} | Alibarbar Australia`} description={guide.description} path={path} jsonLd={jsonLd} />
      <Navbar />
      <main className="pt-[calc(6rem+env(safe-area-inset-top))] pb-16 sm:pb-24">
        <article className="container max-w-3xl">
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/guides" className="hover:text-primary">Guides</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{guide.category}</span>
          </nav>

          <header className="mb-8">
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3 font-semibold">
              {guide.category} · {guide.readTime}
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">{guide.title}</h1>
            <ContentByline datePublished={guide.datePublished} dateModified={guide.dateModified} />
            <QuickAnswer data={quickAnswer} />
            <div className="gold-divider mt-6 max-w-[6rem]" />
          </header>

          <div className="mb-10">
            <KeyTakeaways items={keyTakeaways} />
          </div>

          <div className="space-y-8">
            {guide.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-xl sm:text-2xl font-bold mb-3">{section.heading}</h2>
                <div className="space-y-3 text-muted-foreground leading-[1.75] text-sm sm:text-base">
                  {section.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                {section.bullets ? (
                  <ul className="mt-4 space-y-2">
                    {section.bullets.map((b) => (
                      <li key={b} className="flex gap-2 text-sm sm:text-base text-muted-foreground">
                        <ChevronRight className="w-4 h-4 mt-1 text-primary shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>

          {guide.faq && guide.faq.length > 0 ? (
            <section className="mt-12">
              <h2 className="text-xl sm:text-2xl font-bold mb-4">Frequently asked questions</h2>
              <div className="space-y-4">
                {guide.faq.map((item) => (
                  <div key={item.question} className="rounded-xl border border-gold/20 bg-card/50 p-4">
                    <h3 className="text-sm sm:text-base font-semibold">{item.question}</h3>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {relatedProducts.length > 0 ? (
            <section className="mt-14">
              <h2 className="text-xl sm:text-2xl font-bold mb-5">Shop related flavours</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-5">
                {relatedProducts.map((p) => (
                  <Link
                    key={p.slug}
                    to={`/product/${p.slug}`}
                    className="luxe-card rounded-xl overflow-hidden group flex flex-col border border-gold/20"
                  >
                    <div className="relative aspect-square bg-gradient-to-br from-secondary to-background overflow-hidden">
                      <img
                        src={p.img}
                        alt={`Alibarbar Ingot 9000 ${p.name} disposable vape Australia`}
                        loading="lazy"
                        className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-3 flex flex-col gap-1 border-t border-gold/15">
                      <h3 className="text-xs sm:text-sm font-bold leading-snug group-hover:text-primary transition-colors line-clamp-2">
                        {p.name}
                      </h3>
                      <ProductPrice price={p.price} originalPrice={p.originalPrice} priceClassName="text-sm" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          {relatedGuides.length > 0 ? (
            <section className="mt-14">
              <h2 className="text-xl sm:text-2xl font-bold mb-5">Keep reading</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {relatedGuides.map((g) => (
                  <Link
                    key={g.slug}
                    to={`/guides/${g.slug}`}
                    className="group rounded-2xl border border-gold/20 bg-card/60 p-5 flex flex-col gap-2 hover:border-gold/50 transition-colors"
                  >
                    <h3 className="text-base font-bold leading-snug group-hover:text-primary transition-colors">
                      {g.title}
                    </h3>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-gold">
                      Read <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          <ContentHubLinks />
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default GuidePage;

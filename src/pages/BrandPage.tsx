import { Link, Navigate, useParams } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContentByline } from "@/components/seo/ContentByline";
import { KeyTakeaways } from "@/components/seo/KeyTakeaways";
import { QuickAnswer } from "@/components/seo/QuickAnswer";
import { Seo, articleJsonLd, type BreadcrumbEntry } from "@/components/Seo";
import { getBrandBySlug } from "@/data/brands";
import { deriveKeyTakeaways, deriveQuickAnswer } from "@/lib/content-geo";
import { useReveal } from "@/hooks/use-reveal";

const BrandPage = () => {
  useReveal();
  const { slug } = useParams<{ slug: string }>();
  const brand = getBrandBySlug(slug);

  if (!brand) return <Navigate to="/brands" replace />;

  const path = `/brands/${brand.slug}`;
  const breadcrumbs: BreadcrumbEntry[] = [
    { name: "Home", path: "/" },
    { name: "Brands", path: "/brands" },
    { name: brand.name, path },
  ];

  const quickAnswer = deriveQuickAnswer(brand.title, brand.intro, brand.quickAnswer);
  const keyTakeaways = deriveKeyTakeaways(brand.knownFor);

  const jsonLd = articleJsonLd({
    title: brand.title,
    description: brand.description,
    path,
    datePublished: brand.datePublished,
    dateModified: brand.dateModified,
    breadcrumbs,
    faq: brand.faq,
  });

  return (
    <div className="min-h-screen bg-background">
      <Seo title={`${brand.title} | Alibarbar Australia`} description={brand.description} path={path} jsonLd={jsonLd} />
      <Navbar />
      <main className="pt-[calc(6rem+env(safe-area-inset-top))] pb-16 sm:pb-24">
        <article className="container max-w-3xl">
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/brands" className="hover:text-primary">Brands</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{brand.name}</span>
          </nav>

          <header className="mb-8">
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3 font-semibold">
              {brand.isOwn ? "Our brand" : "Brand guide"}
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">{brand.title}</h1>
            <ContentByline datePublished={brand.datePublished} dateModified={brand.dateModified} />
            <QuickAnswer data={quickAnswer} />
            <div className="gold-divider mt-6 max-w-[6rem]" />
          </header>

          <div className="mb-10">
            <KeyTakeaways items={keyTakeaways} />
          </div>

          <section className="mb-10">
            <h2 className="text-xl sm:text-2xl font-bold mb-3">Overview</h2>
            <div className="space-y-3 text-muted-foreground leading-[1.75] text-sm sm:text-base">
              {brand.overview.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-xl sm:text-2xl font-bold mb-3">Known for</h2>
            <ul className="space-y-2">
              {brand.knownFor.map((k) => (
                <li key={k} className="flex gap-2 text-sm sm:text-base text-muted-foreground">
                  <ChevronRight className="w-4 h-4 mt-1 text-primary shrink-0" />
                  <span>{k}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl sm:text-2xl font-bold mb-3">
              {brand.isOwn ? "Positioning" : `${brand.name} vs Alibarbar`}
            </h2>
            <div className="space-y-3 text-muted-foreground leading-[1.75] text-sm sm:text-base">
              {brand.positioning.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            {brand.compareSlug ? (
              <Link
                to={`/compare/${brand.compareSlug}`}
                className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-primary hover:text-gold"
              >
                Full comparison: Alibarbar vs {brand.name} →
              </Link>
            ) : null}
          </section>

          {brand.faq && brand.faq.length > 0 ? (
            <section className="mb-10">
              <h2 className="text-xl sm:text-2xl font-bold mb-4">Frequently asked questions</h2>
              <div className="space-y-4">
                {brand.faq.map((item) => (
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
              {brand.isOwn
                ? "Ready to shop the Alibarbar Ingot 9000?"
                : "Want to see what Alibarbar offers?"}
            </p>
            <Link
              to="/flavours"
              className="inline-flex items-center justify-center min-h-[48px] px-8 rounded-full bg-gold text-primary-foreground font-bold uppercase tracking-widest text-xs shadow-gold hover:opacity-95 transition"
            >
              Explore Alibarbar flavours
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BrandPage;

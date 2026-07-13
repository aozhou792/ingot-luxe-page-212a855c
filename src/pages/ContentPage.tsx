import { Link, Navigate, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Seo, breadcrumbNode } from "@/components/Seo";
import { ContentByline } from "@/components/seo/ContentByline";
import { KeyTakeaways } from "@/components/seo/KeyTakeaways";
import { QuickAnswer } from "@/components/seo/QuickAnswer";
import { getContentPageBySlug } from "@/data/content-pages";
import { deriveKeyTakeaways, deriveQuickAnswer } from "@/lib/content-geo";
import { useReveal } from "@/hooks/use-reveal";

const ContentPage = () => {
  useReveal();
  const { pathname } = useLocation();
  const slug = pathname.replace(/^\/+/, "").split("/")[0];
  const page = getContentPageBySlug(slug);

  if (!page) return <Navigate to="/" replace />;

  const path = `/${page.slug}`;
  const quickAnswer = deriveQuickAnswer(page.title, page.intro);
  const keyTakeaways = deriveKeyTakeaways(
    page.sections.find((s) => s.bullets)?.bullets,
  );
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: page.title,
        description: page.description,
        url: `https://www.alibarbar.mom${path}`,
        dateModified: page.updated,
      },
      breadcrumbNode([
        { name: "Home", path: "/" },
        { name: page.title, path },
      ]),
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <Seo title={`${page.title} | Alibarbar Australia`} description={page.description} path={path} jsonLd={jsonLd} />
      <Navbar />
      <main className="pt-[calc(6rem+env(safe-area-inset-top))] pb-16 sm:pb-24">
        <div className="container max-w-3xl">
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{page.title}</span>
          </nav>

          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">{page.title}</h1>
            <ContentByline dateModified={page.updated} reviewedBy="Alibarbar Team" />
            <div className="mt-5">
              <QuickAnswer data={quickAnswer} />
            </div>
            {keyTakeaways.length > 0 ? (
              <div className="mt-6">
                <KeyTakeaways items={keyTakeaways} />
              </div>
            ) : null}
            <p className="text-xs text-muted-foreground mt-3">Last updated: {page.updated}</p>
            <div className="gold-divider mt-6 max-w-[6rem]" />
          </header>

          <div className="space-y-8">
            {page.sections.map((section) => (
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
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContentPage;

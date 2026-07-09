import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Seo, breadcrumbNode } from "@/components/Seo";
import { topicHubs } from "@/data/topics";
import { useReveal } from "@/hooks/use-reveal";

const TopicsIndexPage = () => {
  useReveal();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "Disposable Vape Topic Hubs | Alibarbar Australia",
        description:
          "Entity hubs for mesh coil, 9000 puff disposables, buying in Australia, Alibarbar Ingot 9000 and competitor comparisons.",
        url: "https://www.ailibarbar.com/topics",
      },
      breadcrumbNode([
        { name: "Home", path: "/" },
        { name: "Topics", path: "/topics" },
      ]),
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Topic Hubs: Disposable Vapes Australia | Alibarbar"
        description="Explore entity hubs for mesh coil technology, 9000 puff disposables, buying guides, Alibarbar Ingot 9000 and Alibarbar vs IGET comparisons."
        path="/topics"
        jsonLd={jsonLd}
      />
      <Navbar />
      <main className="pt-[calc(6rem+env(safe-area-inset-top))] pb-16 sm:pb-24">
        <div className="container max-w-5xl">
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Topics</span>
          </nav>

          <header className="mb-10 sm:mb-14 max-w-2xl">
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3 font-semibold">Entity Hubs</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
              Disposable Vape <span className="text-gold">Topic Hubs</span>
            </h1>
            <p className="text-muted-foreground mt-4 text-sm sm:text-base leading-relaxed">
              Structured knowledge hubs for brand, flavour and comparison long-tail searches. Each hub links guides,
              products, reviews and comparisons in one place.
            </p>
          </header>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {topicHubs.map((topic) => (
              <Link
                key={topic.slug}
                to={`/topics/${topic.slug}`}
                className="group rounded-2xl border border-gold/20 bg-card/60 p-5 sm:p-6 flex flex-col gap-3 hover:border-gold/50 transition-colors"
              >
                <h2 className="text-lg font-bold leading-snug group-hover:text-primary transition-colors">{topic.title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{topic.description}</p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-gold">
                  Read hub <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TopicsIndexPage;

import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContentByline } from "@/components/seo/ContentByline";
import { ContentHubLinks } from "@/components/seo/ContentHubLinks";
import { KeyTakeaways } from "@/components/seo/KeyTakeaways";
import { QuickAnswer } from "@/components/seo/QuickAnswer";
import { Seo, articleJsonLd, type BreadcrumbEntry } from "@/components/Seo";
import { getTopicBySlug } from "@/data/topics";
import { useReveal } from "@/hooks/use-reveal";

function TopicLinkSection({ title, links }: { title: string; links: { label: string; path: string; description: string }[] }) {
  if (links.length === 0) return null;
  return (
    <section className="mt-10">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">{title}</h2>
      <div className="grid sm:grid-cols-2 gap-3">
        {links.map((link) => (
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
  );
}

const TopicPage = () => {
  useReveal();
  const { slug } = useParams<{ slug: string }>();
  const topic = getTopicBySlug(slug);

  if (!topic) return <Navigate to="/topics" replace />;

  const path = `/topics/${topic.slug}`;
  const breadcrumbs: BreadcrumbEntry[] = [
    { name: "Home", path: "/" },
    { name: "Topics", path: "/topics" },
    { name: topic.title, path },
  ];

  const jsonLd = articleJsonLd({
    title: topic.title,
    description: topic.description,
    path,
    datePublished: topic.datePublished,
    dateModified: topic.dateModified,
    breadcrumbs,
    faq: topic.faq,
  });

  return (
    <div className="min-h-screen bg-background">
      <Seo title={`${topic.title} | Alibarbar Australia`} description={topic.description} path={path} jsonLd={jsonLd} />
      <Navbar />
      <main className="pt-[calc(6rem+env(safe-area-inset-top))] pb-16 sm:pb-24">
        <article className="container max-w-3xl">
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/topics" className="hover:text-primary">Topics</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{topic.slug}</span>
          </nav>

          <header className="mb-8">
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3 font-semibold">Topic Hub</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">{topic.title}</h1>
            <ContentByline datePublished={topic.datePublished} dateModified={topic.dateModified} />
            <QuickAnswer data={topic.quickAnswer} />
            <div className="gold-divider mt-6 max-w-[6rem]" />
          </header>

          <div className="mb-10">
            <KeyTakeaways items={topic.keyTakeaways} />
          </div>

          <div className="space-y-8 text-muted-foreground leading-[1.75] text-sm sm:text-base">
            <p>{topic.intro}</p>
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3">Definition</h2>
              <p>{topic.definition}</p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3">Key facts</h2>
              <ul className="space-y-2">
                {topic.stats.map((s) => (
                  <li key={s} className="flex gap-2">
                    <ChevronRight className="w-4 h-4 mt-1 text-primary shrink-0" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </section>

            <div className="grid sm:grid-cols-2 gap-6">
              <section>
                <h2 className="text-lg font-bold text-foreground mb-3">Pros</h2>
                <ul className="space-y-2">
                  {topic.pros.map((p) => (
                    <li key={p} className="flex gap-2 text-sm">
                      <ChevronRight className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </section>
              <section>
                <h2 className="text-lg font-bold text-foreground mb-3">Cons</h2>
                <ul className="space-y-2">
                  {topic.cons.map((c) => (
                    <li key={c} className="flex gap-2 text-sm">
                      <ChevronRight className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>

          <TopicLinkSection title="Guides" links={topic.guides} />
          <TopicLinkSection title="Products" links={topic.products} />
          <TopicLinkSection title="Comparisons" links={topic.comparisons} />
          <TopicLinkSection title="Reviews" links={topic.reviews} />
          <TopicLinkSection title="Flavours" links={topic.flavours} />

          {topic.relatedTopics.length > 0 ? (
            <section className="mt-10">
              <h2 className="text-xl sm:text-2xl font-bold mb-4">Related topics</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {topic.relatedTopics.map((t) => (
                  <Link
                    key={t.path}
                    to={t.path}
                    className="group flex items-center justify-between rounded-xl border border-gold/20 bg-card/50 p-4 hover:border-gold/50 transition-colors"
                  >
                    <div>
                      <h3 className="text-sm font-bold group-hover:text-primary transition-colors">{t.label}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{t.description}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gold shrink-0" />
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          {topic.faq.length > 0 ? (
            <section className="mt-14">
              <h2 className="text-xl sm:text-2xl font-bold mb-5">FAQ</h2>
              <div className="space-y-4">
                {topic.faq.map((item) => (
                  <div key={item.question} className="rounded-xl border border-gold/15 bg-card/40 p-4">
                    <h3 className="font-semibold text-sm sm:text-base">{item.question}</h3>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{item.answer}</p>
                  </div>
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

export default TopicPage;

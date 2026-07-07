import { Link, Navigate, useParams } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Seo, faqPageJsonLd } from "@/components/Seo";
import { getFaqTopicBySlug } from "@/data/faq-topics";
import { useReveal } from "@/hooks/use-reveal";

const FaqTopicPage = () => {
  useReveal();
  const { slug } = useParams<{ slug: string }>();
  const topic = getFaqTopicBySlug(slug);

  if (!topic) return <Navigate to="/faq" replace />;

  const path = `/faq/${topic.slug}`;
  const jsonLd = faqPageJsonLd(topic.items, [
    { name: "Home", path: "/" },
    { name: "FAQ", path: "/faq" },
    { name: topic.title, path },
  ]);

  return (
    <div className="min-h-screen bg-background">
      <Seo title={`${topic.title} | Alibarbar Australia`} description={topic.description} path={path} jsonLd={jsonLd} />
      <Navbar />
      <main className="pt-[calc(6rem+env(safe-area-inset-top))] pb-16 sm:pb-24">
        <div className="container max-w-3xl">
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/faq" className="hover:text-primary">FAQ</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{topic.title}</span>
          </nav>

          <header className="mb-10">
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3 font-semibold">FAQ Hub</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">{topic.title}</h1>
            <p className="text-muted-foreground mt-4 text-sm sm:text-base leading-relaxed">{topic.intro}</p>
          </header>

          <Accordion type="single" collapsible className="rounded-2xl border border-gold/25 bg-card/50 px-4 sm:px-6">
            {topic.items.map((item, index) => (
              <AccordionItem key={item.question} value={`faq-topic-${index}`} className="border-gold/15">
                <AccordionTrigger className="text-left text-sm sm:text-base font-semibold hover:text-primary">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-10 rounded-2xl border border-gold/20 bg-card/50 p-6 text-center">
            <p className="text-sm sm:text-base text-muted-foreground">
              Still need help? Email{" "}
              <a href="mailto:orders@ailibarbar.com" className="text-primary font-semibold hover:text-gold">
                orders@ailibarbar.com
              </a>{" "}
              with your order number.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FaqTopicPage;

import { Link } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Seo, faqPageJsonLd } from "@/components/Seo";
import { QuickAnswer } from "@/components/seo/QuickAnswer";
import { faqItems, type FaqItem } from "@/data/faq";
import { faqTopics } from "@/data/faq-topics";
import { useReveal } from "@/hooks/use-reveal";

const CATEGORY_ORDER: NonNullable<FaqItem["category"]>[] = [
  "Product & Usage",
  "Ordering & Shipping",
  "Payment",
  "Legal & Safety",
];

const FaqPage = () => {
  useReveal();

  const grouped = CATEGORY_ORDER.map((category) => ({
    category,
    items: faqItems.filter((item) => item.category === category),
  })).filter((group) => group.items.length > 0);

  const jsonLd = faqPageJsonLd(faqItems, [
    { name: "Home", path: "/" },
    { name: "FAQ", path: "/faq" },
  ]);

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Frequently Asked Questions | Alibarbar Australia"
        description="Answers about Alibarbar Ingot 9000 disposable vapes — shipping, payment, puff counts, flavours, storage, and Australian age requirements."
        path="/faq"
        jsonLd={jsonLd}
      />
      <Navbar />
      <main className="pt-[calc(6rem+env(safe-area-inset-top))] pb-16 sm:pb-24">
        <div className="container max-w-3xl">
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">FAQ</span>
          </nav>

          <header className="mb-10">
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3 font-semibold">Help Centre</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
              Frequently Asked <span className="text-gold">Questions</span>
            </h1>
            <p className="text-muted-foreground mt-4 text-sm sm:text-base leading-relaxed">
              Everything Australian customers ask about the Alibarbar Ingot 9000 — from delivery and payment to puff
              counts, flavours and safe use.
            </p>
            <div className="mt-6">
              <QuickAnswer
                data={{
                  question: "What does this FAQ cover?",
                  answer:
                    "This FAQ answers the most common questions about Alibarbar Ingot 9000 disposable vapes in Australia — including shipping (A$20 under 5 devices, A$10 for 5+), bank transfer payment, puff counts (up to 9000), 10+ flavours, authenticity, age requirements (18+) and safe storage.",
                }}
              />
            </div>
          </header>

          <section className="grid sm:grid-cols-2 gap-4 mb-10">
            {faqTopics.map((topic) => (
              <Link
                key={topic.slug}
                to={`/faq/${topic.slug}`}
                className="rounded-2xl border border-gold/20 bg-card/60 p-5 hover:border-gold/50 transition-colors"
              >
                <p className="text-xs uppercase tracking-wide text-primary mb-2">Deep FAQ</p>
                <h2 className="text-lg font-bold mb-2">{topic.title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{topic.description}</p>
              </Link>
            ))}
          </section>

          <div className="space-y-10">
            {grouped.map((group) => (
              <section key={group.category}>
                <h2 className="text-lg sm:text-xl font-bold mb-3 text-gold">{group.category}</h2>
                <Accordion type="single" collapsible className="rounded-2xl border border-gold/25 bg-card/50 px-4 sm:px-6">
                  {group.items.map((item, index) => (
                    <AccordionItem key={item.question} value={`${group.category}-${index}`} className="border-gold/15">
                      <AccordionTrigger className="text-left text-sm sm:text-base font-semibold hover:text-primary">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-gold/20 bg-card/50 p-6 text-center">
            <p className="text-sm sm:text-base text-muted-foreground">
              Still have a question? Email us at{" "}
              <a href="mailto:orders@ailibarbar.com" className="text-primary font-semibold hover:text-gold">
                orders@ailibarbar.com
              </a>{" "}
              or read our{" "}
              <Link to="/guides" className="text-primary font-semibold hover:text-gold">
                vape guides
              </Link>
              .
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FaqPage;

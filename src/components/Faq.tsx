import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqItems } from "@/data/faq";

export const Faq = () => {
  return (
    <section id="faq" className="py-16 sm:py-20 md:py-28 relative scroll-mt-20">
      <div className="container max-w-3xl">
        <div className="text-center mb-8 sm:mb-12 reveal px-1">
          <p className="text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary mb-3 sm:mb-4">
            Need Help?
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
            Frequently Asked <span className="text-gold">Questions</span>
          </h2>
          <p className="text-muted-foreground mt-3 sm:mt-4 text-sm sm:text-base px-2">
            Shipping, payment, and ordering answers for Australian customers.
          </p>
          <div className="gold-divider mt-6 sm:mt-8 max-w-xs mx-auto" />
        </div>

        <Accordion type="single" collapsible className="reveal rounded-2xl border border-gold/25 bg-card/50 px-4 sm:px-6">
          {faqItems.map((item, index) => (
            <AccordionItem key={item.question} value={`faq-${index}`} className="border-gold/15">
              <AccordionTrigger className="text-left text-sm sm:text-base font-semibold hover:text-primary">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

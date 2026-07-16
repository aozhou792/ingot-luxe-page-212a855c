import { ShoppingBag, Banknote, Truck, ShieldCheck, BadgeCheck, Headset, PackageCheck } from "lucide-react";

const steps = [
  {
    icon: ShoppingBag,
    title: "1. Choose your device",
    desc: "Pick a signature flavour or build a 3, 5 or 10 Flavour Custom Pack, then add it to your cart and check out.",
  },
  {
    icon: Banknote,
    title: "2. Pay by bank transfer",
    desc: "Transfer your total using your order number as the reference and upload your payment screenshot to confirm.",
  },
  {
    icon: Truck,
    title: "3. Fast local delivery",
    desc: "Once your payment is verified we dispatch Australia-wide, with delivery usually in 3-7 business days.",
  },
];

const reasons = [
  { icon: BadgeCheck, title: "100% authentic", desc: "Genuine ALIBARBAR Ingot 9000 devices only." },
  { icon: ShieldCheck, title: "Strictly 18+", desc: "Age-verified checkout for adult customers." },
  { icon: PackageCheck, title: "Tiered shipping", desc: "A$20 under 10 devices, A$10 for 10+ devices." },
  { icon: Headset, title: "Local support", desc: "Email help, usually within one business day." },
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="pt-10 sm:pt-12 md:pt-14 pb-10 sm:pb-12 md:pb-14 relative scroll-mt-20">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 reveal px-1">
          <p className="text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary mb-3 sm:mb-4">
            Simple &amp; secure
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
            How it <span className="text-gold">works</span>
          </h2>
          <p className="text-muted-foreground mt-3 sm:mt-4 text-sm sm:text-base">
            Ordering your Alibarbar Ingot 9000 in Australia takes three easy steps.
          </p>
          <div className="gold-divider mt-6 sm:mt-8 max-w-xs mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 md:gap-8 mb-10 sm:mb-14">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className="reveal luxe-card rounded-2xl p-6 sm:p-8"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 border border-gold bg-primary/5">
                <s.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 text-gold">{s.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="reveal grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {reasons.map((r) => (
            <div
              key={r.title}
              className="rounded-2xl border border-gold/20 bg-card/50 p-4 sm:p-5 flex flex-col gap-2"
            >
              <r.icon className="w-6 h-6 text-primary" />
              <h3 className="text-sm sm:text-base font-bold">{r.title}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-snug">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

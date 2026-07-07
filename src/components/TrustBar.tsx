import { BadgeCheck, CreditCard, Headphones, PackageCheck, ShieldCheck, Truck } from "lucide-react";

const trustItems = [
  {
    icon: BadgeCheck,
    title: "100% genuine",
    sub: "Authentic Alibarbar stock",
  },
  {
    icon: Headphones,
    title: "Customer care",
    sub: "AU-based email support",
  },
  {
    icon: PackageCheck,
    title: "Trackable orders",
    sub: "Australia Post delivery",
  },
  {
    icon: CreditCard,
    title: "Secure payments",
    sub: "Verified bank transfer",
  },
  {
    icon: ShieldCheck,
    title: "Verified retailer",
    sub: "Independent AU store",
  },
  {
    icon: Truck,
    title: "Fast delivery",
    sub: "Australia-wide shipping",
  },
] as const;

export const TrustBar = () => {
  return (
    <section
      aria-label="Why customers trust Alibarbar Australia"
      className="relative border-y border-gold/20 bg-card/40 backdrop-blur-sm"
    >
      <div className="container py-6 sm:py-8">
        <p className="reveal text-center text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.28em] text-primary font-semibold mb-5 sm:mb-6">
          Trusted by adult vapers across Australia
        </p>
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5 md:gap-6">
          {trustItems.map((item, i) => (
            <li
              key={item.title}
              className="reveal flex flex-col items-center text-center gap-2 sm:gap-2.5 min-w-0"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <span className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-gold/30 bg-primary/5 text-primary shrink-0">
                <item.icon className="w-5 h-5 sm:w-[1.35rem] sm:h-[1.35rem]" strokeWidth={2} aria-hidden />
              </span>
              <div className="min-w-0 space-y-0.5">
                <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wide text-foreground leading-snug">
                  {item.title}
                </p>
                <p className="text-[10px] sm:text-[11px] text-muted-foreground leading-snug">{item.sub}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

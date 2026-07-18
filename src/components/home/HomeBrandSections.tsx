import { Link } from "react-router-dom";
import { ArrowRight, Check, ShieldCheck, Truck, BadgeCheck } from "lucide-react";
import { deviceSpecifications } from "@/data/products";
import { comparisons } from "@/data/comparisons";
import { reviewPosts } from "@/data/reviews";
import { blogPosts } from "@/data/blog";
import { guides } from "@/data/guides";

const sectionPad = "py-12 sm:py-16 md:py-20 relative scroll-mt-20";

export const HomeIntroduction = () => (
  <section id="about-alibarbar" className={sectionPad}>
    <div className="container max-w-3xl">
      <div className="reveal space-y-5 text-muted-foreground leading-[1.8] text-sm sm:text-base">
        <p className="text-xs uppercase tracking-[0.25em] text-primary font-semibold">Alibarbar Australia</p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground leading-tight">
          Australia&apos;s dedicated Alibarbar Ingot 9000 store
        </h2>
        <p>
          Alibarbar Australia is an independent online retailer built around one product family: the{" "}
          <strong className="text-foreground font-semibold">Alibarbar Ingot 9000</strong> disposable vape. Rather than
          listing dozens of unrelated brands, we focus on authentic Ingot devices, accurate specifications, and clear
          guidance so adult Australian customers can buy with confidence.
        </p>
        <p>
          Every device we sell is a genuine Alibarbar Ingot 9000 with the signature gold ingot design, built-in smart LED
          display, 22ml pre-filled e-liquid capacity and up to 9000 puffs per unit. We ship Australia-wide with tiered
          Regular Post rates — A$20 for orders under five devices and A$10 for five or more — and accept payment by
          secure bank transfer.
        </p>
        <p>
          Whether you are new to disposables or already know the Ingot line, this site is designed as a{" "}
          <strong className="text-foreground font-semibold">brand resource centre</strong> as well as a store: browse
          flavour profiles, read guides on battery life and usage, compare Alibarbar with other popular brands, and find
          answers in our FAQ before you check out.
        </p>
      </div>
    </div>
  </section>
);

export const HomeIngotExplained = () => (
  <section id="ingot-explained" className={`${sectionPad} bg-card/30`}>
    <div className="container max-w-3xl">
      <div className="reveal space-y-5">
        <p className="text-xs uppercase tracking-[0.25em] text-primary font-semibold">Product deep-dive</p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight">
          Alibarbar Ingot 9000 <span className="text-gold">explained</span>
        </h2>
        <div className="space-y-4 text-muted-foreground leading-[1.8] text-sm sm:text-base">
          <p>
            The Alibarbar Ingot 9000 is a pre-filled, pre-charged disposable vape aimed at adult users who want a
            long-lasting device without refilling, coil changes or button controls. The name reflects two things: the
            distinctive gold-bar industrial design, and the up-to-9000 puff rating backed by a large 22ml e-liquid tank
            and a 2350mAh battery sized to last the full capacity.
          </p>
          <p>
            Unlike smaller disposables that run out in a few days, the Ingot 9000 is built for extended daily use. A
            built-in <strong className="text-foreground font-semibold">smart LED display</strong> shows remaining
            battery and e-liquid levels so you are never guessing when to replace the device. Activation is
            inhale-draw —{" "}
            <Link to="/guides/how-to-open-alibarbar-vape" className="text-primary font-semibold hover:text-gold">
              open the pack
            </Link>
            , remove the cap, puff gently, and the mesh coil delivers consistent vapour from the first draw to the
            last.
          </p>
          <p>
            The Ingot 9000 is <strong className="text-foreground font-semibold">not rechargeable</strong>. The battery
            and e-liquid are matched so that when the display reads empty or the device flashes with little vapour, it
            has reached end of life and should be recycled responsibly. For a full walkthrough, read our{" "}
            <Link to="/guides/how-many-puffs-does-alibarbar-ingot-9000-have" className="text-primary font-semibold hover:text-gold">
              how many puffs in an Alibarbar guide
            </Link>
            ,{" "}
            <Link to="/guides/how-long-does-alibarbar-ingot-9000-last" className="text-primary font-semibold hover:text-gold">
              how long does it last guide
            </Link>{" "}
            and{" "}
            <Link to="/guides/can-you-recharge-alibarbar-ingot-9000" className="text-primary font-semibold hover:text-gold">
              how to recharge an Alibarbar guide
            </Link>
            .
          </p>
        </div>
        <Link
          to="/guides/what-is-alibarbar-ingot-9000"
          className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-gold transition-colors"
        >
          Read the full Ingot 9000 guide <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  </section>
);

const whyReasons = [
  {
    icon: BadgeCheck,
    title: "100% authentic stock",
    desc: "Genuine ALIBARBAR Ingot 9000 devices sourced from authorised supply — buy with confidence from Alibarbar Australia.",
  },
  {
    icon: ShieldCheck,
    title: "Strictly 18+",
    desc: "Age verification at checkout. Products are for existing adult smokers and vapers only.",
  },
  {
    icon: Truck,
    title: "Tiered AU shipping",
    desc: "A$20 under 10 devices, A$10 for 10+ devices. Dispatched after payment confirmation, typically 3–7 business days.",
  },
  {
    icon: Check,
    title: "Knowledge centre",
    desc: "Guides, comparisons, flavour profiles and 28+ FAQs — not just a checkout button.",
  },
];

export const HomeWhyChoose = () => (
  <section id="why-choose" className={sectionPad}>
    <div className="container">
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 reveal px-1">
        <p className="text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary mb-3">Why Alibarbar Australia</p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
          Why choose <span className="text-gold">us</span>
        </h2>
        <p className="text-muted-foreground mt-3 text-sm sm:text-base">
          A specialist store with transparent pricing, local support and the content you need to choose the right
          flavour and device.
        </p>
        <div className="gold-divider mt-6 max-w-xs mx-auto" />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 reveal">
        {whyReasons.map((r) => (
          <div key={r.title} className="rounded-2xl border border-gold/20 bg-card/50 p-5 flex flex-col gap-2">
            <r.icon className="w-6 h-6 text-primary" />
            <h3 className="font-bold text-sm sm:text-base">{r.title}</h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
          </div>
        ))}
      </div>
      <p className="text-center mt-8 text-sm text-muted-foreground reveal max-w-2xl mx-auto leading-relaxed">
        Learn more about our standards on the{" "}
        <Link to="/why-trust-us" className="text-primary font-semibold hover:text-gold">Why Trust Us</Link>,{" "}
        <Link to="/brand-knowledge" className="text-primary font-semibold hover:text-gold">Brand Knowledge</Link>,{" "}
        <Link to="/research" className="text-primary font-semibold hover:text-gold">Research</Link> and{" "}
        <Link to="/editorial-policy" className="text-primary font-semibold hover:text-gold">Editorial Policy</Link> pages.
      </p>
    </div>
  </section>
);

export const HomeProductSpecs = () => (
  <section id="specs" className={`${sectionPad} bg-card/20`}>
    <div className="container max-w-3xl">
      <div className="reveal">
        <p className="text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-3">Technical specifications</p>
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-6">Alibarbar Ingot 9000 at a glance</h2>
        <dl className="rounded-2xl border border-gold/25 bg-card/50 divide-y divide-gold/10 overflow-hidden">
          {deviceSpecifications.map((spec) => (
            <div key={spec.label} className="flex items-start justify-between gap-4 px-5 py-3.5 text-sm sm:text-base">
              <dt className="text-muted-foreground">{spec.label}</dt>
              <dd className="font-medium text-right">{spec.value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
          Puff counts are manufacturer estimates; actual performance depends on draw length and frequency. Full
          per-flavour details are on each{" "}
          <Link to="/flavours" className="text-primary font-semibold hover:text-gold">flavour profile page</Link>.
        </p>
      </div>
    </div>
  </section>
);

export const HomeCompareHub = () => {
  const featured = comparisons.slice(0, 3);
  return (
    <section id="compare" className={sectionPad}>
      <div className="container">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 reveal">
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">Honest comparisons</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
              Alibarbar vs <span className="text-gold">other brands</span>
            </h2>
            <p className="text-muted-foreground mt-3 text-sm sm:text-base">
              Objective side-by-side comparisons with IGET, HQD, Gunnpod, KUZ and more — so you can decide what suits
              you, not just what we sell.
            </p>
          </div>
          <Link to="/compare" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-gold self-start">
            All comparisons <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-3 gap-4 reveal">
          {featured.map((c) => (
            <Link
              key={c.slug}
              to={`/compare/${c.slug}`}
              className="rounded-2xl border border-gold/20 bg-card/60 p-5 hover:border-gold/45 transition-colors group"
            >
              <p className="text-[10px] uppercase tracking-wide text-primary mb-2">vs {c.competitor}</p>
              <h3 className="font-bold text-sm sm:text-base leading-snug group-hover:text-primary transition-colors">
                {c.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export const HomeLatestReviews = () => {
  const featured = reviewPosts.slice(0, 3);
  return (
    <section id="latest-reviews" className={sectionPad}>
      <div className="container">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 reveal">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">Editorial reviews</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold">Latest flavour reviews</h2>
          </div>
          <Link to="/reviews" className="text-sm font-semibold text-primary hover:text-gold self-start inline-flex items-center gap-1">
            All reviews <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-3 gap-4 reveal">
          {featured.map((r) => (
            <Link
              key={r.slug}
              to={`/reviews/${r.slug}`}
              className="rounded-2xl border border-gold/20 bg-card/60 p-5 hover:border-gold/45 transition-colors"
            >
              <p className="text-[10px] uppercase text-primary mb-2">{r.readTime}</p>
              <h3 className="font-bold text-sm sm:text-base leading-snug">{r.title}</h3>
              <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{r.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export const HomeLatestBlog = () => {
  const featured = blogPosts.slice(0, 2);
  const longevityGuide = guides.find((g) => g.slug === "how-long-does-alibarbar-ingot-9000-last");
  return (
    <section id="latest-articles" className={`${sectionPad} bg-card/20`}>
      <div className="container">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 reveal">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">From the blog</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold">Latest articles</h2>
          </div>
          <Link to="/blog" className="text-sm font-semibold text-primary hover:text-gold self-start inline-flex items-center gap-1">
            All articles <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 reveal">
          {featured.map((b) => (
            <Link
              key={b.slug}
              to={`/blog/${b.slug}`}
              className="rounded-2xl border border-gold/20 bg-card/60 p-5 hover:border-gold/45 transition-colors"
            >
              <p className="text-[10px] uppercase text-primary mb-2">{b.category} · {b.readTime}</p>
              <h3 className="font-bold text-base leading-snug">{b.title}</h3>
              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{b.description}</p>
            </Link>
          ))}
        </div>
        {longevityGuide ? (
          <p className="mt-6 text-sm text-muted-foreground reveal">
            Popular guide:{" "}
            <Link to={`/guides/${longevityGuide.slug}`} className="text-primary font-semibold hover:text-gold">
              {longevityGuide.title}
            </Link>
          </p>
        ) : null}
      </div>
    </section>
  );
};

export const HomeShippingTrust = () => (
  <section id="shipping-trust" className={sectionPad}>
    <div className="container max-w-3xl">
      <div className="reveal rounded-2xl border border-gold/25 bg-card/50 p-6 sm:p-8 space-y-4">
        <p className="text-xs uppercase tracking-[0.25em] text-primary font-semibold">Shipping &amp; trust</p>
        <h2 className="text-2xl sm:text-3xl font-extrabold">Fast local delivery &amp; EEAT transparency</h2>
        <p className="text-muted-foreground text-sm sm:text-base leading-[1.8]">
          We dispatch Australia-wide via Regular Post after your bank transfer is verified. Shipping is A$20 for orders
          under five devices and A$10 for five or more. Most metro deliveries arrive within 3–7 business days. Payment is
          by direct bank transfer only — we never store card numbers.
        </p>
        <p className="text-muted-foreground text-sm sm:text-base leading-[1.8]">
          Alibarbar Australia is strictly 18+. By ordering you confirm you meet the legal age in your state or territory.
          Our editorial comparisons and reviews follow an independent, factual approach — see our policies below.
        </p>
        <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
          {[
            { label: "Shipping policy", to: "/shipping" },
            { label: "Returns & refunds", to: "/returns" },
            { label: "Privacy", to: "/privacy" },
            { label: "Age verification", to: "/age-verification" },
            { label: "Why trust us", to: "/why-trust-us" },
            { label: "Contact", to: "/contact" },
          ].map((l) => (
            <li key={l.to}>
              <Link to={l.to} className="text-primary font-semibold hover:text-gold">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

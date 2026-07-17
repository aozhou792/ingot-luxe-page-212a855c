import { Link } from "react-router-dom";
import { Instagram, Twitter, Facebook, Youtube } from "lucide-react";
import { guides } from "@/data/guides";
import { SITE_SOCIAL } from "@/data/site";
import logoHeader from "@/assets/logo-header.png";

const shopLinks = [
  { label: "Wholesale", to: "/wholesale" },
  { label: "All Flavours", to: "/flavours" },
  { label: "3 Flavour Custom Pack", to: "/product/custom-3-pack" },
  { label: "5 Flavour Custom Pack", to: "/product/custom-5-pack" },
  { label: "10 Flavour Custom Pack", to: "/product/custom-10-pack" },
  { label: "Quadruple Berry", to: "/product/quadruple-berry" },
];

const exploreLinks = [
  { label: "Topics", to: "/topics" },
  { label: "Guides", to: "/guides" },
  { label: "Compare", to: "/compare" },
  { label: "Reviews", to: "/reviews" },
  { label: "Brands", to: "/brands" },
  { label: "Blog", to: "/blog" },
  { label: "FAQ", to: "/faq" },
  { label: "Product FAQ", to: "/faq/product" },
  { label: "Shipping FAQ", to: "/faq/shipping" },
  { label: "Payment FAQ", to: "/faq/payment" },
  { label: "Authenticity FAQ", to: "/faq/authenticity" },
  { label: "Legal FAQ", to: "/faq/legal" },
];

const companyLinks = [
  { label: "About Us", to: "/about" },
  { label: "Our Authors", to: "/author/jason-smith" },
  { label: "Why Trust Us", to: "/why-trust-us" },
  { label: "Editorial Policy", to: "/editorial-policy" },
  { label: "Age Verification", to: "/age-verification" },
  { label: "Contact", to: "/contact" },
];

const policyLinks = [
  { label: "Shipping & Delivery", to: "/shipping" },
  { label: "Returns & Refunds", to: "/returns" },
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms of Service", to: "/terms" },
];

export const Footer = () => (
  <footer
    id="contact"
    className="border-t border-gold/30 bg-card/50 mt-8 sm:mt-10 scroll-mt-20 pb-[env(safe-area-inset-bottom)]"
  >
    <div className="container py-10 sm:py-14 md:py-16 grid grid-cols-2 md:grid-cols-6 gap-8 sm:gap-10">
      <div className="col-span-2 space-y-3 sm:space-y-4 text-center md:text-left">
        <Link to="/" className="inline-flex justify-center md:justify-start" aria-label="Alibarbar Australia home">
          <img
            src={logoHeader}
            alt="ALI BARBAR"
            className="h-10 sm:h-12 w-auto max-w-[14rem] object-contain"
            width={280}
            height={72}
            decoding="async"
          />
        </Link>
        <p className="text-muted-foreground max-w-md mx-auto md:mx-0 text-sm sm:text-base">
          Australia's destination for authentic Alibarbar Ingot 9000 disposable vapes. Premium flavours, fast local
          delivery, and secure checkout for adults 18+.
        </p>
        <div className="flex gap-3 pt-2 justify-center md:justify-start">
          {(
            [
              { Icon: Instagram, href: SITE_SOCIAL.instagram, label: "Instagram" },
              { Icon: Twitter, href: SITE_SOCIAL.x, label: "X (Twitter)" },
              { Icon: Facebook, href: SITE_SOCIAL.facebook, label: "Facebook" },
              { Icon: Youtube, href: SITE_SOCIAL.youtube, label: "YouTube" },
            ] as const
          ).map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-11 h-11 sm:w-10 sm:h-10 min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0 rounded-full border border-gold flex items-center justify-center text-primary hover:bg-gold hover:text-primary-foreground transition-colors"
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>

      <div className="text-center md:text-left">
        <h4 className="text-sm uppercase tracking-widest text-gold mb-3 sm:mb-4">Shop</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {shopLinks.map((link) => (
            <li key={link.label}>
              <Link to={link.to} className="hover:text-primary">{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="text-center md:text-left">
        <h4 className="text-sm uppercase tracking-widest text-gold mb-3 sm:mb-4">Explore</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {exploreLinks.map((link) => (
            <li key={link.label}>
              <Link to={link.to} className="hover:text-primary">{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="text-center md:text-left">
        <h4 className="text-sm uppercase tracking-widest text-gold mb-3 sm:mb-4">Company</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {companyLinks.map((link) => (
            <li key={link.label}>
              <Link to={link.to} className="hover:text-primary">{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="text-center md:text-left">
        <h4 className="text-sm uppercase tracking-widest text-gold mb-3 sm:mb-4">Policies</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {policyLinks.map((link) => (
            <li key={link.label}>
              <Link to={link.to} className="hover:text-primary">{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>

    <div className="border-t border-gold/20">
      <div className="container py-6">
        <h4 className="text-xs uppercase tracking-widest text-gold mb-3 text-center md:text-left">Popular guides</h4>
        <ul className="flex flex-wrap gap-x-4 gap-y-2 justify-center md:justify-start text-xs text-muted-foreground">
          {guides.map((guide) => (
            <li key={guide.slug}>
              <Link to={`/guides/${guide.slug}`} className="hover:text-primary">{guide.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>

    <div className="border-t border-gold/20">
      <div className="container py-5 sm:py-6 flex flex-col gap-3 items-center md:items-stretch text-xs text-muted-foreground text-center md:text-left px-2">
        <div className="flex flex-col md:flex-row gap-3 md:gap-2 items-center justify-between">
          <p>© 2026 Alibarbar Australia. All rights reserved.</p>
          <p>Strictly for adults 18+. Please vape responsibly.</p>
        </div>
        <p>
          Independent reviews and buying guides:{" "}
          <a href="https://podpickguide.com" className="hover:text-primary">
            PodPick Guide
          </a>
        </p>
      </div>
    </div>
  </footer>
);

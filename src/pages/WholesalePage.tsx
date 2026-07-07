import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Seo, breadcrumbNode } from "@/components/Seo";
import { useReveal } from "@/hooks/use-reveal";
import { wholesaleProducts } from "@/data/wholesale";
import { buildWhatsAppUrl, wholesaleContacts } from "@/lib/whatsapp";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M19.05 4.94A9.86 9.86 0 0 0 12 2C6.49 2 2 6.49 2 12c0 1.76.46 3.49 1.34 5.02L2 22l5.09-1.33A9.95 9.95 0 0 0 12 22c5.51 0 10-4.49 10-10 0-2.67-1.04-5.18-2.95-7.06ZM12 20.29a8.28 8.28 0 0 1-4.2-1.15l-.3-.18-3.02.79.81-2.95-.2-.31A8.27 8.27 0 0 1 3.71 12c0-4.57 3.72-8.29 8.29-8.29 2.21 0 4.28.86 5.85 2.43a8.21 8.21 0 0 1 2.43 5.86c0 4.57-3.71 8.29-8.28 8.29Zm4.55-6.17c-.25-.13-1.48-.73-1.71-.82-.23-.08-.39-.13-.56.13-.16.25-.64.82-.79.99-.14.17-.28.2-.53.07-.25-.12-1.05-.39-2-1.24-.73-.64-1.23-1.43-1.37-1.67-.14-.24-.01-.37.1-.49.11-.1.25-.28.37-.42.12-.14.16-.24.24-.4.08-.17.04-.32-.02-.45-.06-.12-.56-1.35-.76-1.85-.2-.47-.4-.4-.56-.4h-.48c-.17 0-.45.06-.69.32-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.12.16 1.76 2.68 4.26 3.76 2.5 1.07 2.5.72 2.95.68.45-.04 1.48-.61 1.69-1.21.21-.6.21-1.11.15-1.21-.06-.1-.22-.17-.47-.3Z"
      />
    </svg>
  );
}

const WholesalePage = () => {
  useReveal();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: "Wholesale Alibarbar Ingot 9000 Australia",
        url: "https://www.ailibarbar.com/wholesale",
        description:
          "Wholesale and bulk pricing for authentic Alibarbar Ingot 9000 disposable vapes. Australia-wide supply via WhatsApp.",
      },
      breadcrumbNode([
        { name: "Home", path: "/" },
        { name: "Wholesale", path: "/wholesale" },
      ]),
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Wholesale Alibarbar Ingot 9000 Australia | Bulk Pricing"
        description="Wholesale Alibarbar Ingot 9000 disposable vapes for Australian retailers and bulk buyers. Contact us on WhatsApp for AU warehouse pricing."
        path="/wholesale"
        jsonLd={jsonLd}
      />
      <Navbar />

      <div className="bg-primary/10 border-b border-gold/20 text-center py-2.5 px-4 text-xs sm:text-sm font-medium text-foreground/90 mt-[calc(4rem+env(safe-area-inset-top))] sm:mt-[calc(5rem+env(safe-area-inset-top))]">
        We only deliver to Australia · Authentic Alibarbar stock · Adults 18+ only
      </div>

      <main className="pb-16 sm:pb-24">
        <section className="border-b border-gold/20 bg-card/30">
          <div className="container py-10 sm:py-14">
            <div className="reveal max-w-2xl mx-auto text-center rounded-2xl border border-gold/30 bg-background/60 px-6 py-10 sm:px-10 sm:py-12">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
                Let&apos;s <span className="text-gold">talk</span>
              </h1>
              <p className="mt-4 text-muted-foreground text-sm sm:text-base leading-relaxed">
                Interested in wholesale or bulk orders? Contact us on WhatsApp for pricing, availability and mixed-flavour
                packs from our AU supply line.
              </p>
            </div>

            <ul className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 max-w-5xl mx-auto">
              {wholesaleContacts.map((contact) => (
                <li
                  key={contact.phone}
                  className="reveal flex flex-col items-center rounded-2xl border border-gold/25 bg-card/50 p-6 sm:p-8 text-center"
                >
                  <p className="text-lg sm:text-xl font-bold text-foreground">{contact.phone}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{contact.name}</p>
                  <a
                    href={buildWhatsAppUrl("Hi Gavin, I'd like to enquire about wholesale Alibarbar Ingot 9000 pricing.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#1FBE5C] transition-colors"
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                    Chat
                  </a>
                </li>
              ))}
              <li className="reveal flex flex-col items-center justify-center rounded-2xl border border-dashed border-gold/20 bg-card/20 p-6 sm:p-8 text-center sm:col-span-1 lg:col-span-3">
                <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
                  Prefer to scan a QR code? Use our{" "}
                  <Link to="/whatsapp-qr" className="text-primary font-semibold hover:text-gold">
                    WhatsApp QR page
                  </Link>{" "}
                  to add Gavin and message us directly.
                </p>
              </li>
            </ul>
          </div>
        </section>

        <section className="py-12 sm:py-16 md:py-20">
          <div className="container">
            <header className="reveal text-center mb-8 sm:mb-12">
              <p className="text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-3">AU warehouse</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">
                Wholesale <span className="text-gold">line-up</span>
              </h2>
              <p className="text-muted-foreground mt-3 text-sm sm:text-base max-w-xl mx-auto">
                Authentic Alibarbar Ingot 9000 devices and mixed custom packs. Tap Get pricing to open WhatsApp with your
                product enquiry.
              </p>
              <div className="gold-divider mt-6 max-w-xs mx-auto" />
            </header>

            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {wholesaleProducts.map((product, i) => (
                <li
                  key={product.name}
                  className="reveal luxe-card rounded-xl sm:rounded-2xl overflow-hidden flex flex-col border border-gold/20"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <div className="aspect-square bg-background/50 p-4 sm:p-5 flex items-center justify-center">
                    <img
                      src={product.img}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-col flex-1 p-4 sm:p-5 border-t border-gold/15 bg-card/40">
                    <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wide text-primary leading-snug min-h-[2.5rem]">
                      {product.name}
                    </h3>
                    <dl className="mt-3 space-y-1 text-[10px] sm:text-xs text-muted-foreground">
                      <div className="flex justify-between gap-2">
                        <dt>Puffs</dt>
                        <dd className="text-foreground/80 font-medium">{product.puffs}</dd>
                      </div>
                      <div className="flex justify-between gap-2">
                        <dt>Flavours</dt>
                        <dd className="text-foreground/80 font-medium">{product.flavours}</dd>
                      </div>
                      <div className="flex justify-between gap-2">
                        <dt>Nicotine</dt>
                        <dd className="text-foreground/80 font-medium">{product.nicotine}</dd>
                      </div>
                      <div className="flex justify-between gap-2">
                        <dt>Type</dt>
                        <dd className="text-foreground/80 font-medium">{product.type}</dd>
                      </div>
                    </dl>
                    <a
                      href={buildWhatsAppUrl(product.whatsappMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex min-h-[40px] items-center justify-center text-sm font-semibold text-[#25D366] hover:text-[#1FBE5C] transition-colors"
                    >
                      Get pricing →
                    </a>
                  </div>
                </li>
              ))}
            </ul>

            <div className="reveal mt-10 sm:mt-14 rounded-2xl border border-gold/20 bg-card/40 p-6 sm:p-8 max-w-3xl mx-auto text-center">
              <h3 className="text-lg font-bold mb-2">Retail orders</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                For single-unit or small mixed packs, shop online with secure bank transfer checkout.{" "}
                <Link to="/#flavors" className="text-primary font-semibold hover:text-gold">
                  Browse flavours
                </Link>{" "}
                or{" "}
                <Link to="/contact" className="text-primary font-semibold hover:text-gold">
                  email support
                </Link>
                .
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default WholesalePage;

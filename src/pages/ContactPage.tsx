import { Link } from "react-router-dom";
import { Mail, Clock, MapPin } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Seo, breadcrumbNode } from "@/components/Seo";
import { useReveal } from "@/hooks/use-reveal";

const ContactPage = () => {
  useReveal();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        name: "Contact Alibarbar Australia",
        url: "https://www.alibarbar.mom/contact",
      },
      breadcrumbNode([
        { name: "Home", path: "/" },
        { name: "Contact", path: "/contact" },
      ]),
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Contact Us | Alibarbar Australia"
        description="Contact Alibarbar Australia for help with orders, delivery and product questions about Alibarbar Ingot 9000 disposable vapes."
        path="/contact"
        jsonLd={jsonLd}
      />
      <Navbar />
      <main className="pt-[calc(6rem+env(safe-area-inset-top))] pb-16 sm:pb-24">
        <div className="container max-w-3xl">
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Contact</span>
          </nav>

          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
              Get in <span className="text-gold">Touch</span>
            </h1>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed">
              Have a question about your order, delivery, or the Alibarbar Ingot 9000? We're here to help. Email is the
              fastest way to reach our Australian support team.
            </p>
            <div className="gold-divider mt-6 max-w-[6rem]" />
          </header>

          <div className="grid sm:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-gold/20 bg-card/50 p-6 flex flex-col gap-2">
              <Mail className="w-6 h-6 text-primary" />
              <h2 className="text-base font-bold">Email</h2>
              <a href="mailto:orders@ailibarbar.com" className="text-sm text-muted-foreground hover:text-primary break-all">
                orders@ailibarbar.com
              </a>
            </div>
            <div className="rounded-2xl border border-gold/20 bg-card/50 p-6 flex flex-col gap-2">
              <Clock className="w-6 h-6 text-primary" />
              <h2 className="text-base font-bold">Response time</h2>
              <p className="text-sm text-muted-foreground">We aim to reply within one business day.</p>
            </div>
            <div className="rounded-2xl border border-gold/20 bg-card/50 p-6 flex flex-col gap-2">
              <MapPin className="w-6 h-6 text-primary" />
              <h2 className="text-base font-bold">Ships from</h2>
              <p className="text-sm text-muted-foreground">Australia-wide delivery via Regular Post.</p>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-gold/20 bg-card/50 p-6">
            <h2 className="text-lg font-bold mb-2">Before you email</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              For the quickest help with an existing order, include your order number. Many common questions about
              shipping, payment and the device are already answered in our{" "}
              <Link to="/faq" className="text-primary font-semibold hover:text-gold">FAQ</Link> and{" "}
              <Link to="/guides" className="text-primary font-semibold hover:text-gold">guides</Link>.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;

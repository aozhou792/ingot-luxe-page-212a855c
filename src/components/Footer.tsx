import { Instagram, Twitter, Facebook, Youtube } from "lucide-react";

export const Footer = () => (
  <footer id="contact" className="border-t border-gold/30 bg-card/50 mt-10">
    <div className="container py-16 grid md:grid-cols-4 gap-10">
      <div className="md:col-span-2 space-y-4">
        <h3 className="text-2xl font-extrabold tracking-[0.15em] shimmer-text">ALIBARBAR</h3>
        <p className="text-muted-foreground max-w-md">
          Premium luxury disposable vaping. Crafted for connoisseurs who demand the extraordinary.
        </p>
        <div className="flex gap-3 pt-2">
          {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
            <a
              key={i}
              href="#"
              aria-label="Social"
              className="w-10 h-10 rounded-full border border-gold flex items-center justify-center text-primary hover:bg-gold hover:text-primary-foreground transition-colors"
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm uppercase tracking-widest text-gold mb-4">Shop</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li><a href="#flavors" className="hover:text-primary">Flavors</a></li>
          <li><a href="#" className="hover:text-primary">Bundles</a></li>
          <li><a href="#" className="hover:text-primary">Accessories</a></li>
        </ul>
      </div>

      <div>
        <h4 className="text-sm uppercase tracking-widest text-gold mb-4">Company</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li><a href="#" className="hover:text-primary">About</a></li>
          <li><a href="#" className="hover:text-primary">Contact</a></li>
          <li><a href="#" className="hover:text-primary">Privacy</a></li>
        </ul>
      </div>
    </div>
    <div className="border-t border-gold/20">
      <div className="container py-6 flex flex-col md:flex-row gap-2 items-center justify-between text-xs text-muted-foreground">
        <p>© 2026 Alibarbar. All rights reserved.</p>
        <p>Strictly for adults 21+. Please vape responsibly.</p>
      </div>
    </div>
  </footer>
);

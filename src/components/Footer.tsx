import { Instagram, Twitter, Facebook, Youtube } from "lucide-react";

export const Footer = () => (
  <footer
    id="contact"
    className="border-t border-gold/30 bg-card/50 mt-8 sm:mt-10 scroll-mt-20 pb-[env(safe-area-inset-bottom)]"
  >
    <div className="container py-10 sm:py-14 md:py-16 grid md:grid-cols-4 gap-8 sm:gap-10">
      <div className="md:col-span-2 space-y-3 sm:space-y-4 text-center md:text-left">
        <h3 className="text-xl sm:text-2xl font-extrabold tracking-[0.12em] sm:tracking-[0.15em] shimmer-text">
          ALIBARBAR
        </h3>
        <p className="text-muted-foreground max-w-md mx-auto md:mx-0 text-sm sm:text-base">
          Premium luxury disposable vaping. Crafted for connoisseurs who demand the extraordinary.
        </p>
        <div className="flex gap-3 pt-2 justify-center md:justify-start">
          {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
            <a
              key={i}
              href="#"
              aria-label="Social"
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
          <li><a href="#flavors" className="hover:text-primary">Flavors</a></li>
          <li><a href="#" className="hover:text-primary">Bundles</a></li>
          <li><a href="#" className="hover:text-primary">Accessories</a></li>
        </ul>
      </div>

      <div className="text-center md:text-left">
        <h4 className="text-sm uppercase tracking-widest text-gold mb-3 sm:mb-4">Company</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li><a href="#" className="hover:text-primary">About</a></li>
          <li><a href="#" className="hover:text-primary">Contact</a></li>
          <li><a href="#" className="hover:text-primary">Privacy</a></li>
        </ul>
      </div>
    </div>
    <div className="border-t border-gold/20">
      <div className="container py-5 sm:py-6 flex flex-col md:flex-row gap-3 md:gap-2 items-center justify-between text-xs text-muted-foreground text-center md:text-left px-2">
        <p>© 2026 Alibarbar. All rights reserved.</p>
        <p>Strictly for adults 21+. Please vape responsibly.</p>
      </div>
    </div>
  </footer>
);

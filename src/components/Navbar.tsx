import { ShoppingCart, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";

const links = [
  { label: "Home", to: "/#home" },
  { label: "Flavors", to: "/#flavors" },
  { label: "Features", to: "/#features" },
  { label: "Contact", to: "/#contact" },
] as const;

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { itemCount } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 pt-[env(safe-area-inset-top)] transition-all duration-500 ${
        scrolled ? "bg-background/85 backdrop-blur-xl border-b border-gold" : "bg-transparent"
      }`}
    >
      <nav className="container flex items-center justify-between h-16 sm:h-20">
        <Link
          to="/"
          className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-[0.12em] sm:tracking-[0.15em] shimmer-text min-w-0 shrink"
        >
          ALIBARBAR
        </Link>

        <ul className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className="text-sm uppercase tracking-widest text-foreground/80 hover:text-primary transition-colors relative after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-gold after:transition-all hover:after:w-full"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <Link
            to="/cart"
            aria-label="Cart"
            className="relative p-2.5 min-h-[44px] min-w-[44px] rounded-full border border-gold text-primary hover:bg-primary/10 active:bg-primary/15 transition-colors flex items-center justify-center"
          >
            <ShoppingCart className="w-5 h-5" />
            {itemCount > 0 ? (
              <span className="absolute -top-1 -right-1 min-w-[1.25rem] h-5 px-1 rounded-full bg-gold text-primary-foreground text-[10px] font-bold flex items-center justify-center tabular-nums">
                {itemCount > 99 ? "99+" : itemCount}
              </span>
            ) : null}
          </Link>
          <button
            type="button"
            className="md:hidden p-2.5 min-h-[44px] min-w-[44px] text-primary flex items-center justify-center -mr-1"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label="Menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {open && (
        <>
          <button
            type="button"
            aria-label="Close menu"
            className="fixed inset-x-0 bottom-0 top-[calc(env(safe-area-inset-top)+4rem)] z-40 bg-black/60 md:hidden sm:top-[calc(env(safe-area-inset-top)+5rem)]"
            onClick={() => setOpen(false)}
          />
          <div className="relative z-50 md:hidden bg-background/98 backdrop-blur-xl border-t border-gold max-h-[min(70dvh,calc(100dvh-env(safe-area-inset-top)-4rem))] overflow-y-auto overscroll-contain">
            <ul className="container py-5 space-y-1">
              {links.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-sm uppercase tracking-widest text-foreground/80 hover:text-primary active:text-primary"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </header>
  );
};

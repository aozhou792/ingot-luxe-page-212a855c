import { ShoppingCart, Menu, X, User, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { AuthModal } from "@/components/AuthModal";
import logoHeader from "@/assets/logo-header.png";

const links = [
  { label: "Shop", to: "/#flavors" },
  { label: "Flavours", to: "/flavours" },
  { label: "Guides", to: "/guides" },
  { label: "Compare", to: "/compare" },
  { label: "Reviews", to: "/reviews" },
  { label: "FAQ", to: "/faq" },
  { label: "Wholesale", to: "/wholesale" },
] as const;

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const { itemCount } = useCart();
  const { user, logout } = useAuth();

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
        <Link to="/" className="min-w-0 shrink flex items-center" aria-label="Alibarbar Australia home">
          <img
            src={logoHeader}
            alt="ALI BARBAR"
            className="h-8 sm:h-10 md:h-11 w-auto max-w-[min(52vw,14rem)] object-contain object-left"
            width={280}
            height={72}
            decoding="async"
          />
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
          {user ? (
            <button
              type="button"
              onClick={logout}
              className="hidden sm:inline-flex items-center gap-2 h-11 px-3 rounded-full border border-gold text-primary hover:bg-primary/10 transition-colors text-sm font-medium max-w-[10rem]"
              aria-label="Sign out"
              title="Sign out"
            >
              <User className="w-4 h-4 shrink-0" />
              <span className="truncate">{user.displayName}</span>
              <LogOut className="w-3.5 h-3.5 shrink-0 opacity-70" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setAuthOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 h-11 px-4 rounded-full border border-gold text-primary hover:bg-primary/10 transition-colors text-sm font-medium"
            >
              <User className="w-4 h-4" />
              Sign in
            </button>
          )}
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
                    className="flex min-h-[44px] items-center py-3 text-sm uppercase tracking-widest text-foreground/80 hover:text-primary active:text-primary"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                {user ? (
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setOpen(false);
                    }}
                    className="flex w-full min-h-[44px] items-center py-3 text-left text-sm uppercase tracking-widest text-foreground/80 hover:text-primary"
                  >
                    Sign out ({user.displayName})
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      setAuthOpen(true);
                    }}
                    className="flex w-full min-h-[44px] items-center py-3 text-left text-sm uppercase tracking-widest text-foreground/80 hover:text-primary"
                  >
                    Sign in
                  </button>
                )}
              </li>
            </ul>
          </div>
        </>
      )}

      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
    </header>
  );
};

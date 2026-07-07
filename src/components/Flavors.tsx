import { Link, useNavigate } from "react-router-dom";
import { products, type Product } from "@/data/products";
import { ProductPrice } from "@/components/ProductPrice";
import { useCart } from "@/context/CartContext";
import type { ProductLocationState } from "@/types/navigation";

type FlavorCardProps = {
  f: Product;
  revealIndex: number;
  goToProduct: (slug: string) => void;
};

const FlavorCard = ({ f, revealIndex, goToProduct }: FlavorCardProps) => {
  const navigate = useNavigate();
  const { addToCart, buyNow } = useCart();

  const cartItem = { slug: f.slug, name: f.name, price: f.price, image: f.img };

  const handleAdd = () => {
    if (f.isCustomPack) {
      goToProduct(f.slug);
      return;
    }
    addToCart(cartItem);
  };

  const handleBuyNow = () => {
    if (f.isCustomPack) {
      goToProduct(f.slug);
      return;
    }
    buyNow(cartItem);
    navigate("/checkout");
  };

  return (
    <article
      className="reveal luxe-card rounded-xl sm:rounded-2xl overflow-hidden group flex flex-col min-w-0"
      style={{ transitionDelay: `${revealIndex * 80}ms` }}
    >
      <Link
        to={`/product/${f.slug}`}
        onClick={(e) => {
          e.preventDefault();
          goToProduct(f.slug);
        }}
        className="relative aspect-square bg-gradient-to-br from-secondary to-background overflow-hidden block text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-label={`View ${f.name} product page`}
      >
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: "var(--gradient-gold-soft)" }}
        />
        <img
          src={f.img}
          alt={`${f.name} Alibarbar Ingot 9000 puffs flavor`}
          loading="lazy"
          className="w-full h-full object-contain p-3 sm:p-5 md:p-6 group-hover:scale-110 transition-transform duration-700"
        />
        <span className="absolute top-2 left-2 sm:top-3 sm:left-3 text-[8px] sm:text-[10px] uppercase tracking-widest px-2 py-0.5 sm:px-3 sm:py-1 rounded-full border border-gold bg-background/60 backdrop-blur text-primary max-w-[calc(100%-0.75rem)] truncate">
          {f.tag}
        </span>
      </Link>

      <div className="p-2.5 sm:p-4 md:p-6 flex flex-col gap-2 sm:gap-3 md:gap-4 flex-1">
        <div className="flex flex-col gap-1 min-[480px]:flex-row min-[480px]:items-start min-[480px]:justify-between gap-x-2">
          <Link
            to={`/product/${f.slug}`}
            onClick={(e) => {
              e.preventDefault();
              goToProduct(f.slug);
            }}
            className="text-sm min-[480px]:text-base sm:text-lg font-bold leading-snug break-words hover:text-primary transition-colors min-w-0 line-clamp-2"
          >
            {f.name}
          </Link>
          <ProductPrice
            price={f.price}
            originalPrice={f.originalPrice}
            className="shrink-0"
            priceClassName="text-sm sm:text-base md:text-lg"
          />
        </div>
        <p className="text-[10px] sm:text-xs text-muted-foreground leading-snug line-clamp-2 min-h-[2lh]">
          {f.isCustomPack ? "5 pcs · Choose any 5 flavours" : "9000 puffs · Smart display · Mesh coil"}
        </p>

        {f.inStock ? (
          <div className="mt-auto grid grid-cols-2 gap-2">
            <button
              type="button"
              className="min-h-[40px] sm:min-h-[44px] py-2 sm:py-2.5 rounded-full border border-gold text-primary font-semibold uppercase tracking-tight sm:tracking-wider text-[9px] sm:text-[11px] hover:bg-gold/15 active:bg-gold/25 transition-all"
              onClick={handleAdd}
            >
              {f.isCustomPack ? "Choose" : "Add"}
            </button>
            <button
              type="button"
              className="min-h-[40px] sm:min-h-[44px] py-2 sm:py-2.5 rounded-full bg-gold text-primary-foreground font-semibold uppercase tracking-tight sm:tracking-wider text-[9px] sm:text-[11px] hover:opacity-95 active:opacity-90 transition-all"
              onClick={handleBuyNow}
            >
              {f.isCustomPack ? "Select" : "Buy now"}
            </button>
          </div>
        ) : (
          <button
            type="button"
            disabled
            className="mt-auto w-full min-h-[40px] sm:min-h-[44px] py-2 sm:py-3 rounded-full border border-gold text-primary font-semibold uppercase tracking-wider sm:tracking-widest text-[10px] sm:text-xs opacity-45 pointer-events-none"
          >
            {f.isPlaceholder ? "Coming soon" : "Unavailable"}
          </button>
        )}
      </div>
    </article>
  );
};

export const Flavors = () => {
  const navigate = useNavigate();

  const goToProduct = (slug: string) => {
    navigate(`/product/${slug}`, {
      state: { homeScrollY: window.scrollY } satisfies ProductLocationState,
    });
  };

  const regularProducts = products.filter((p) => !p.isPlaceholder);
  const placeholderProducts = products.filter((p) => p.isPlaceholder);

  return (
    <section id="flavors" className="py-16 sm:py-20 md:py-28 relative scroll-mt-20">
      <div className="absolute inset-0 -z-10 opacity-50" style={{ background: "var(--gradient-radial)" }} />
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 md:mb-16 reveal px-1">
          <p className="text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary mb-3 sm:mb-4">
            The Collection
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
            Explore Our <span className="text-gold">Signature Flavors</span>
          </h2>
          <p className="text-muted-foreground mt-3 sm:mt-4 text-sm sm:text-base px-2">
            Ten masterful blends plus a 5-piece custom pack.
          </p>
          <div className="gold-divider mt-6 sm:mt-8 max-w-xs mx-auto" />
        </div>

        {/* In-stock & full listings: 2 cols mobile, 3 cols desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 md:gap-6 lg:gap-8">
          {regularProducts.map((f, i) => (
            <FlavorCard key={f.slug} f={f} revealIndex={i} goToProduct={goToProduct} />
          ))}
        </div>

        {/* Placeholders: always their own last row (two cards) */}
        {placeholderProducts.length > 0 ? (
          <div className="mt-6 sm:mt-8 md:mt-10">
            <div className="grid grid-cols-2 gap-3 sm:gap-5 md:gap-6 lg:gap-8 lg:max-w-4xl lg:mx-auto">
              {placeholderProducts.map((f, i) => (
                <FlavorCard
                  key={f.slug}
                  f={f}
                  revealIndex={regularProducts.length + i}
                  goToProduct={goToProduct}
                />
              ))}
            </div>
          </div>
        ) : null}

        <div className="text-center mt-8 sm:mt-12 reveal">
          <Link
            to="/flavours"
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-gold transition-colors"
          >
            Compare all flavours in the Flavour Centre →
          </Link>
        </div>
      </div>
    </section>
  );
};

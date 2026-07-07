import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { Link, Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  deviceSpecifications,
  getProductBySlug,
  getProductFaq,
  getRelatedProducts,
  getSelectableFlavorProducts,
  howToUseSteps,
} from "@/data/products";
import { getFlavourBySlug } from "@/data/flavours";
import { ProductPrice } from "@/components/ProductPrice";
import { ProductReviews } from "@/components/reviews/ProductReviews";
import { Seo, productJsonLd, type BreadcrumbEntry } from "@/components/Seo";
import { useCart } from "@/context/CartContext";
import { useReveal } from "@/hooks/use-reveal";
import { ArrowLeft, Check, ChevronRight, Minus, Package, Plus, Sparkles, Truck } from "lucide-react";
import type { HomeRestoreState, ProductLocationState } from "@/types/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const highlights = [
  { icon: Sparkles, label: "Up to 9000 smooth puffs" },
  { icon: Package, label: "Wide flavour selection" },
  { icon: Check, label: "No setup — inhale & enjoy" },
  { icon: Truck, label: "Fast fulfilment" },
] as const;

const ProductPage = () => {
  useReveal();
  const location = useLocation();
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug);
  const customPackSize = product?.customPackSize ?? 5;
  const homeScrollY = (location.state as ProductLocationState | null)?.homeScrollY;
  const backHomeState: HomeRestoreState | undefined =
    typeof homeScrollY === "number" && !Number.isNaN(homeScrollY)
      ? { homeScrollY, restoreHomeScroll: true }
      : undefined;
  const preserveHomeScroll: ProductLocationState | undefined =
    backHomeState != null ? { homeScrollY: backHomeState.homeScrollY } : undefined;
  const navigate = useNavigate();
  const { addToCart, buyNow } = useCart();
  const [qty, setQty] = useState(1);
  const [selectedCustomFlavors, setSelectedCustomFlavors] = useState<string[]>(() => Array(customPackSize).fill(""));
  const [reviewRating, setReviewRating] = useState<{ average: number; count: number }>({ average: 0, count: 0 });
  const handleReviewAggregate = useCallback((aggregate: { average: number; count: number }) => {
    setReviewRating(aggregate);
  }, []);

  const related = useMemo(() => (product ? getRelatedProducts(product.slug) : []), [product]);
  const selectableFlavors = useMemo(() => getSelectableFlavorProducts(), []);

  /** Instant jump to top (no smooth scroll). Global `html { scroll-behavior: smooth }` would otherwise animate scrollTo. */
  useLayoutEffect(() => {
    if (!slug) return;
    const root = document.documentElement;
    const prevBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    root.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo(0, 0);
    root.style.scrollBehavior = prevBehavior;
  }, [slug]);

  useEffect(() => {
    const prev = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    return () => {
      window.history.scrollRestoration = prev;
    };
  }, []);

  useEffect(() => {
    setQty(1);
    setSelectedCustomFlavors(Array(customPackSize).fill(""));
  }, [customPackSize, slug]);

  if (!product) {
    return <Navigate to="/" replace />;
  }

  const paragraphs = product.description.split("\n\n").filter(Boolean);
  const productPath = `/product/${product.slug}`;
  const seoDescription = product.excerpt.length > 155 ? `${product.excerpt.slice(0, 152).trim()}...` : product.excerpt;
  const productFaq = getProductFaq(product);
  const flavourProfile = getFlavourBySlug(product.slug);
  const breadcrumbs: BreadcrumbEntry[] = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/#flavors" },
    { name: product.name, path: productPath },
  ];

  const isCustomPackComplete =
    !product.isCustomPack ||
    (selectedCustomFlavors.length === customPackSize && selectedCustomFlavors.every(Boolean));
  const cartItem = product.isCustomPack
    ? {
        slug: `${product.slug}-${selectedCustomFlavors.map((flavor) => flavor.toLowerCase().replace(/[^a-z0-9]+/g, "-")).join("-")}`,
        name: `${product.name} (${selectedCustomFlavors.join(", ")})`,
        price: product.price,
        image: product.img,
      }
    : { slug: product.slug, name: product.name, price: product.price, image: product.img };

  const handleAddToCart = () => {
    if (!product.inStock || !isCustomPackComplete) return;
    addToCart({ ...cartItem, qty });
  };

  const handleBuyNow = () => {
    if (!product.inStock || !isCustomPackComplete) return;
    buyNow({ ...cartItem, qty });
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-background relative">
      <Seo
        title={`${product.name} | Alibarbar Ingot 9000 Australia`}
        description={seoDescription}
        path={productPath}
        image={product.img}
        type="product"
        jsonLd={productJsonLd({
          name: `Alibarbar Ingot 9000 ${product.name}`,
          description: product.excerpt,
          image: product.img,
          price: product.price,
          inStock: product.inStock,
          path: productPath,
          rating: reviewRating,
          breadcrumbs,
          faq: productFaq,
        })}
      />
      {/* Ambient background — matches landing luxury feel */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[15%] -left-[10%] w-[min(90vw,520px)] h-[min(90vw,520px)] bg-primary/12 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] -right-[15%] w-[min(85vw,480px)] h-[min(85vw,480px)] bg-primary-glow/10 rounded-full blur-[100px]" />
      </div>

      <Navbar />
      <main className="pt-[calc(5rem+env(safe-area-inset-top))] sm:pt-[calc(6rem+env(safe-area-inset-top))] pb-14 sm:pb-20 md:pb-24">
        <div className="container max-w-6xl">
          <nav aria-label="Breadcrumb" className="mb-8 sm:mb-10 px-1 flex flex-wrap items-center gap-x-2 gap-y-1">
            <Link
              to="/"
              state={backHomeState}
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors -ml-2 px-2 py-2 sm:py-0 rounded-lg sm:rounded-none hover:bg-primary/5 sm:hover:bg-transparent"
            >
              <ArrowLeft className="w-4 h-4 shrink-0 opacity-80" />
              Home
            </Link>
            <span className="text-muted-foreground/50 text-sm">/</span>
            <Link to="/#flavors" state={backHomeState} className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Shop
            </Link>
            <span className="text-muted-foreground/50 text-sm">/</span>
            <span className="text-sm text-foreground font-medium truncate max-w-[12rem]">{product.name}</span>
          </nav>

          <div className="grid lg:grid-cols-[1.05fr_1fr] gap-8 sm:gap-10 lg:gap-14 xl:gap-16 items-start">
            {/* Gallery */}
            <div className="lg:sticky lg:top-[calc(5.5rem+env(safe-area-inset-top))] xl:top-[calc(6rem+env(safe-area-inset-top))] w-full max-w-xl mx-auto lg:max-w-none lg:mx-0">
              <div className="relative">
                <div
                  className="absolute -inset-3 sm:-inset-4 rounded-[2rem] opacity-60 blur-2xl pointer-events-none"
                  style={{ background: "var(--gradient-gold-soft)" }}
                />
                <div className="relative rounded-[1.75rem] sm:rounded-[2rem] overflow-hidden border border-gold/35 bg-gradient-to-b from-secondary/90 to-background shadow-[0_24px_80px_-20px_rgba(0,0,0,0.85),inset_0_1px_0_hsl(45_75%_52%/0.12)] aspect-square">
                  <div
                    className="absolute inset-0 opacity-[0.35] pointer-events-none"
                    style={{
                      backgroundImage:
                        "radial-gradient(ellipse 80% 60% at 50% 0%, hsl(45 75% 52% / 0.2), transparent 55%)",
                    }}
                  />
                  <img
                    src={product.img}
                    alt={`${product.name} — Alibarbar Ingot 9000`}
                    className="relative z-[1] w-full h-full object-contain p-4 sm:p-8 md:p-10 lg:p-14 drop-shadow-[0_20px_50px_rgba(0,0,0,0.45)]"
                  />
                  <div className="absolute top-2 left-2 sm:top-4 sm:left-4 md:top-5 md:left-5 z-[2] flex flex-wrap gap-1.5 sm:gap-2 max-w-[calc(100%-1rem)]">
                    <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] px-2 py-1 sm:px-3 sm:py-1.5 rounded-full border border-gold/60 bg-background/75 backdrop-blur-md text-primary font-semibold shadow-lg">
                      {product.tag}
                    </span>
                    <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] px-2 py-1 sm:px-3 sm:py-1.5 rounded-full border border-gold/40 bg-primary/15 backdrop-blur-md text-primary font-semibold">
                      9000 puffs
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Product info */}
            <div className="space-y-7 sm:space-y-8 min-w-0">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <p className="text-[11px] sm:text-xs uppercase tracking-[0.28em] text-primary/90 font-semibold">
                    Alibarbar Ingot
                  </p>
                  <span
                    className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${
                      product.inStock
                        ? "border-emerald-500/40 text-emerald-400/95 bg-emerald-500/10"
                        : product.isPlaceholder
                          ? "border-primary/45 text-primary bg-primary/10"
                          : "border-destructive/50 text-destructive bg-destructive/10"
                    }`}
                  >
                    {product.inStock ? "In stock" : product.isPlaceholder ? "Coming soon" : "Out of stock"}
                  </span>
                </div>

                <h1 className="text-2xl min-[400px]:text-3xl sm:text-4xl lg:text-[2.75rem] xl:text-5xl font-extrabold leading-[1.12] tracking-tight">
                  {product.name}
                </h1>

                <div className="flex flex-wrap items-end gap-2 sm:gap-4 pt-1">
                  <ProductPrice
                    price={product.price}
                    originalPrice={product.originalPrice}
                    priceClassName="text-3xl sm:text-4xl md:text-5xl"
                    originalClassName="text-lg sm:text-xl pb-1 sm:pb-1.5"
                  />
                  <span className="text-xs sm:text-sm text-muted-foreground pb-1 sm:pb-1.5 max-w-[12rem] sm:max-w-none leading-snug">
                    {product.isCustomPack
                      ? `${customPackSize} devices · choose your flavours`
                      : "per device · incl. smart display"}
                  </span>
                </div>
              </div>

              {product.isPlaceholder ? (
                <p className="text-xs sm:text-sm text-primary/85 font-medium leading-relaxed">
                  Placeholder listing — final hero photography and on-sale date TBA.
                </p>
              ) : null}

              <blockquote className="pl-3 sm:pl-5 border-l-[3px] border-primary/75 text-muted-foreground leading-relaxed text-sm sm:text-base md:text-lg rounded-sm">
                {product.excerpt}
              </blockquote>

              {flavourProfile ? (
                <p className="text-sm text-muted-foreground">
                  New to this one?{" "}
                  <Link to={`/flavours/${flavourProfile.slug}`} className="text-primary font-semibold hover:text-gold">
                    Read the full {product.name} flavour profile
                  </Link>{" "}
                  — taste notes, sweetness &amp; cooling.
                </p>
              ) : null}

              {product.isCustomPack ? (
                <div className="rounded-2xl border border-gold/35 bg-card/70 p-4 sm:p-6 space-y-4">
                  <div>
                    <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-primary/80 font-semibold">
                      Choose {customPackSize} flavours
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Select any {customPackSize} from the current flavour collection. Repeats are allowed.
                    </p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {selectedCustomFlavors.map((value, index) => (
                      <Select
                        key={index}
                        value={value}
                        onValueChange={(nextValue) =>
                          setSelectedCustomFlavors((prev) =>
                            prev.map((current, currentIndex) => (currentIndex === index ? nextValue : current)),
                          )
                        }
                      >
                        <SelectTrigger className="bg-background/70 min-h-[44px] text-base md:text-sm">
                          <SelectValue placeholder={`Flavour ${index + 1}`} />
                        </SelectTrigger>
                        <SelectContent>
                          {selectableFlavors.map((flavor) => (
                            <SelectItem key={flavor.slug} value={flavor.name}>
                              {flavor.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ))}
                  </div>
                  {!isCustomPackComplete ? (
                    <p className="text-xs text-primary">
                      Please choose all {customPackSize} flavours before adding this pack to cart.
                    </p>
                  ) : null}
                </div>
              ) : null}

              {/* Purchase panel */}
              <div className="rounded-2xl border border-gold/35 bg-gradient-to-br from-card/95 via-card/60 to-background/95 p-4 sm:p-6 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.5)]">
                <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-primary/80 mb-3 sm:mb-4 font-semibold">
                  {product.isCustomPack ? "Pack quantity & checkout" : "Quantity & checkout"}
                </p>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center rounded-xl border border-gold/45 bg-background/50 overflow-hidden shrink-0">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      className="min-h-[44px] min-w-[44px] flex items-center justify-center hover:bg-primary/15 active:bg-primary/20 transition-colors disabled:opacity-35"
                      disabled={qty <= 1}
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="min-w-[3rem] text-center text-base font-bold tabular-nums">{qty}</span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      className="min-h-[44px] min-w-[44px] flex items-center justify-center hover:bg-primary/15 active:bg-primary/20 transition-colors"
                      onClick={() => setQty((q) => q + 1)}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 w-full sm:flex-1 sm:min-w-0 sm:max-w-xl">
                    <button
                      type="button"
                      disabled={!product.inStock || !isCustomPackComplete}
                      onClick={handleAddToCart}
                      className="flex-1 min-h-[52px] px-6 rounded-xl border-2 border-gold bg-transparent text-primary font-bold uppercase tracking-[0.12em] text-sm hover:bg-gold/15 active:scale-[0.99] transition-all disabled:opacity-40 disabled:pointer-events-none"
                    >
                      Add to cart
                    </button>
                    <button
                      type="button"
                      disabled={!product.inStock || !isCustomPackComplete}
                      onClick={handleBuyNow}
                      className="flex-1 min-h-[52px] px-6 rounded-xl bg-gold text-primary-foreground font-bold uppercase tracking-[0.12em] text-sm shadow-gold hover:opacity-[0.97] active:scale-[0.99] transition-all disabled:opacity-40 disabled:pointer-events-none"
                    >
                      Buy now
                    </button>
                  </div>
                </div>
              </div>

              {/* Trust chips */}
              <ul className="flex flex-wrap gap-2 sm:gap-3">
                {highlights.map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="inline-flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs md:text-sm text-muted-foreground border border-gold/20 rounded-full pl-1.5 pr-2.5 sm:pl-2 sm:pr-3 py-1.5 sm:py-2 bg-card/40 max-w-full sm:max-w-[calc(50%-0.25rem)] lg:max-w-none"
                  >
                    <span className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-primary/15 text-primary shrink-0">
                      <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" strokeWidth={2.25} />
                    </span>
                    <span className="leading-snug">{label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Detail block — full width */}
          <section className="mt-10 sm:mt-16 md:mt-20 lg:mt-24 rounded-2xl sm:rounded-[1.75rem] md:rounded-[2rem] border border-gold/25 bg-gradient-to-b from-card/70 via-card/40 to-background/90 p-4 sm:p-6 md:p-9 lg:p-11 shadow-[inset_0_1px_0_hsl(45_75%_52%/0.08)]">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 lg:items-start">
              <div className="lg:col-span-7 space-y-5">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold mb-1">Product description</h2>
                  <div className="gold-divider max-w-[4rem] mt-3 mb-6 opacity-90" />
                </div>
                <div className="space-y-5 text-muted-foreground leading-[1.75] text-sm sm:text-base">
                  {paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-2xl border border-gold/30 bg-background/60 p-6 sm:p-7 h-full">
                  <h3 className="text-xs uppercase tracking-[0.25em] text-gold font-bold mb-5">What&apos;s included</h3>
                  <ul className="space-y-3.5">
                    {product.specs.map((s) => (
                      <li key={s} className="flex gap-3 text-sm text-muted-foreground leading-snug">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                          <Check className="w-3 h-3" strokeWidth={3} />
                        </span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Specifications + how to use */}
          <section className="mt-8 sm:mt-12 grid lg:grid-cols-2 gap-4 sm:gap-6">
            {!product.isCustomPack ? (
              <div className="rounded-2xl border border-gold/25 bg-card/50 p-5 sm:p-7">
                <h2 className="text-lg sm:text-xl font-bold mb-4">Specifications</h2>
                <dl className="divide-y divide-gold/10">
                  {deviceSpecifications.map((spec) => (
                    <div key={spec.label} className="flex items-start justify-between gap-4 py-2.5">
                      <dt className="text-sm text-muted-foreground">{spec.label}</dt>
                      <dd className="text-sm font-medium text-right">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ) : null}

            <div className={`rounded-2xl border border-gold/25 bg-card/50 p-5 sm:p-7 ${product.isCustomPack ? "lg:col-span-2" : ""}`}>
              <h2 className="text-lg sm:text-xl font-bold mb-4">How to use</h2>
              <ol className="space-y-3">
                {howToUseSteps.map((step, i) => (
                  <li key={step} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary text-xs font-bold">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* Product FAQ */}
          {productFaq.length > 0 ? (
            <section className="mt-8 sm:mt-12 rounded-2xl border border-gold/25 bg-card/50 p-5 sm:p-7">
              <h2 className="text-lg sm:text-xl font-bold mb-4">Questions about the {product.name}</h2>
              <div className="space-y-4">
                {productFaq.map((item) => (
                  <div key={item.question}>
                    <h3 className="text-sm sm:text-base font-semibold">{item.question}</h3>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-sm text-muted-foreground">
                Want more detail? Read our{" "}
                <Link to="/guides" className="text-primary font-semibold hover:text-gold">Alibarbar guides</Link> or the{" "}
                <Link to="/faq" className="text-primary font-semibold hover:text-gold">full FAQ</Link>.
              </p>
            </section>
          ) : null}

          <ProductReviews slug={product.slug} onAggregate={handleReviewAggregate} />

          {related.length > 0 && (
            <section className="mt-12 sm:mt-16 md:mt-20 lg:mt-28">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6 sm:mb-8 md:mb-10">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-primary mb-2 font-semibold">You may also like</p>
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Related products</h2>
                </div>
                <Link
                  to="/#flavors"
                  className="text-sm font-semibold text-primary hover:text-gold transition-colors inline-flex items-center gap-1 self-start sm:self-auto"
                >
                  View all flavors <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-6">
                {related.map((p) => (
                  <Link
                    key={p.slug}
                    to={`/product/${p.slug}`}
                    state={preserveHomeScroll}
                    className="luxe-card rounded-xl sm:rounded-2xl overflow-hidden group flex flex-col border border-gold/20 min-w-0"
                  >
                    <div className="relative aspect-square bg-gradient-to-br from-secondary to-background overflow-hidden">
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{ background: "var(--gradient-gold-soft)" }}
                      />
                      <img
                        src={p.img}
                        alt={p.name}
                        loading="lazy"
                        className="relative w-full h-full object-contain p-3 sm:p-5 md:p-6 group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-2.5 sm:p-4 flex flex-col gap-0.5 sm:gap-1 border-t border-gold/15">
                      <h3 className="text-xs sm:text-sm font-bold leading-snug group-hover:text-primary transition-colors line-clamp-2">
                        {p.name}
                      </h3>
                      <ProductPrice price={p.price} originalPrice={p.originalPrice} priceClassName="text-sm sm:text-base" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductPage;

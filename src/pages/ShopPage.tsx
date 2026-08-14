import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductPrice } from "@/components/ProductPrice";
import { Seo, breadcrumbNode } from "@/components/Seo";
import { products } from "@/data/products";
import { SITE_URL } from "@/data/site";
import { useReveal } from "@/hooks/use-reveal";

const shopProducts = products.filter((p) => !p.isPlaceholder && p.inStock);

const ShopPage = () => {
  useReveal();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/shop#webpage`,
        name: "Alibarbar Australia Online Store",
        description:
          "Shop Alibarbar vapes online in Australia — authentic Ingot 9000 flavours and custom packs with clear pricing, stock status and local shipping.",
        url: `${SITE_URL}/shop`,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        inLanguage: "en-AU",
      },
      {
        "@type": "ItemList",
        name: "Alibarbar vape shop Australia — products for sale",
        numberOfItems: shopProducts.length,
        itemListElement: shopProducts.map((product, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: product.name,
          url: `${SITE_URL}/product/${product.slug}`,
        })),
      },
      breadcrumbNode([
        { name: "Home", path: "/" },
        { name: "Shop", path: "/shop" },
      ]),
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Alibarbar Australia Online Store | Vape Shop"
        description="Alibarbar online Australia — shop authentic Ingot 9000 flavours and custom packs from a dedicated vape shop. AU shipping, bank-transfer checkout, adults 18+."
        path="/shop"
        jsonLd={jsonLd}
      />
      <Navbar />
      <main className="pt-[calc(6rem+env(safe-area-inset-top))] pb-16 sm:pb-24">
        <div className="container max-w-6xl">
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Shop</span>
          </nav>

          <header className="mb-10 sm:mb-14 max-w-2xl">
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3 font-semibold">Alibarbar vape shop</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
              Alibarbar Australia <span className="text-gold">online store</span>
            </h1>
            <p className="text-muted-foreground mt-4 text-sm sm:text-base leading-relaxed">
              Shop Alibarbar vapes online in Australia. This vape shop catalogues authentic Ingot 9000 flavours and
              custom packs — check stock, compare prices, then check out with secure bank transfer. Adults 18+ only.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Looking for taste notes first?{" "}
              <Link to="/flavours" className="text-primary font-semibold hover:text-gold">
                Browse the flavour guide
              </Link>
              . Not sure this is the right Ingot SKU?{" "}
              <Link to="/guides/alibarbar-ingot-9000-vs-ingot-20000" className="text-primary font-semibold hover:text-gold">
                Ingot 9000 vs 20000
              </Link>
              {" "}or{" "}
              <Link to="/guides/where-to-buy-alibarbar-australia" className="text-primary font-semibold hover:text-gold">
                where to buy Alibarbar in Australia
              </Link>
              .
            </p>
          </header>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 md:gap-6 lg:gap-8">
            {shopProducts.map((product) => (
              <Link
                key={product.slug}
                to={`/product/${product.slug}`}
                className="reveal group rounded-xl sm:rounded-2xl border border-gold/20 bg-card/60 overflow-hidden flex flex-col min-w-0 hover:border-gold/50 transition-colors"
              >
                <div className="relative aspect-square bg-gradient-to-br from-secondary to-background">
                  <img
                    src={product.img}
                    alt={`Buy Alibarbar Ingot 9000 ${product.name} Australia`}
                    loading="lazy"
                    className="w-full h-full object-contain p-3 sm:p-5 group-hover:scale-105 transition-transform duration-500"
                  />
                  {!product.inStock ? (
                    <span className="absolute top-2 left-2 sm:top-3 sm:left-3 rounded-full bg-background/90 border border-gold/30 px-2 py-0.5 sm:px-3 sm:py-1 text-[8px] sm:text-[10px] uppercase tracking-wide text-muted-foreground">
                      Out of stock
                    </span>
                  ) : null}
                </div>
                <div className="p-2.5 sm:p-4 md:p-5 flex flex-col gap-1.5 sm:gap-2 border-t border-gold/15 flex-1">
                  <span className="text-[8px] sm:text-[10px] uppercase tracking-wide text-primary truncate">
                    {product.tag}
                  </span>
                  <h2 className="text-sm sm:text-base md:text-lg font-bold leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h2>
                  <ProductPrice
                    price={product.price}
                    originalPrice={product.originalPrice}
                    className="text-sm"
                    priceClassName="text-sm sm:text-base"
                  />
                  <span className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-gold mt-auto pt-1">
                    {product.inStock ? "View product" : "View details"}
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ShopPage;

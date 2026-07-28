import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductPrice } from "@/components/ProductPrice";
import { Seo, breadcrumbNode } from "@/components/Seo";
import { products } from "@/data/products";
import { SITE_URL } from "@/data/site";
import { useReveal } from "@/hooks/use-reveal";

const shopProducts = products.filter((p) => !p.isPlaceholder);

const ShopPage = () => {
  useReveal();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/shop#webpage`,
        name: "Shop Alibarbar Ingot 9000 Australia",
        description:
          "Browse authentic Alibarbar Ingot 9000 flavours and custom packs for sale in Australia with clear pricing, stock status and local shipping.",
        url: `${SITE_URL}/shop`,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        inLanguage: "en-AU",
      },
      {
        "@type": "ItemList",
        name: "Alibarbar Ingot 9000 products for sale",
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
        title="Shop Alibarbar Ingot 9000 Australia | Buy Flavours & Packs"
        description="Buy authentic Alibarbar Ingot 9000 disposable vapes in Australia. Browse in-stock flavours and 5/10/20 custom packs with AU shipping and secure bank-transfer checkout for adults 18+."
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
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3 font-semibold">Shop</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
              Buy Alibarbar Ingot 9000 <span className="text-gold">in Australia</span>
            </h1>
            <p className="text-muted-foreground mt-4 text-sm sm:text-base leading-relaxed">
              Authentic Ingot 9000 flavours and custom packs from an independent Australian retailer. Check stock,
              compare prices, then check out with secure bank transfer. Adults 18+ only.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Looking for taste notes first?{" "}
              <Link to="/flavours" className="text-primary font-semibold hover:text-gold">
                Browse the flavour guide
              </Link>
              .
            </p>
          </header>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {shopProducts.map((product) => (
              <Link
                key={product.slug}
                to={`/product/${product.slug}`}
                className="reveal group rounded-2xl border border-gold/20 bg-card/60 overflow-hidden flex flex-col hover:border-gold/50 transition-colors"
              >
                <div className="relative aspect-square bg-gradient-to-br from-secondary to-background">
                  <img
                    src={product.img}
                    alt={`Buy Alibarbar Ingot 9000 ${product.name} Australia`}
                    loading="lazy"
                    className="w-full h-full object-contain p-5 group-hover:scale-105 transition-transform duration-500"
                  />
                  {!product.inStock ? (
                    <span className="absolute top-3 left-3 rounded-full bg-background/90 border border-gold/30 px-3 py-1 text-[10px] uppercase tracking-wide text-muted-foreground">
                      Out of stock
                    </span>
                  ) : null}
                </div>
                <div className="p-4 sm:p-5 flex flex-col gap-2 border-t border-gold/15 flex-1">
                  <span className="text-[10px] uppercase tracking-wide text-primary">{product.tag}</span>
                  <h2 className="text-base sm:text-lg font-bold leading-snug group-hover:text-primary transition-colors">
                    {product.name}
                  </h2>
                  <ProductPrice price={product.price} originalPrice={product.originalPrice} className="text-sm" />
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-gold mt-auto pt-1">
                    {product.inStock ? "View product" : "View details"}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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

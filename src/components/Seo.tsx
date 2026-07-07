import { useEffect } from "react";
import { products } from "@/data/products";
import { faqItems } from "@/data/faq";

const SITE_URL = "https://www.ailibarbar.com";
const SITE_NAME = "Alibarbar Australia";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

/** Grants Google large image previews and full-length snippets in SERPs. */
const INDEX_ROBOTS = "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1";

type SeoProps = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "product";
  noindex?: boolean;
  jsonLd?: Record<string, unknown>;
};

function absoluteUrl(path = "/"): string {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

function setMeta(attribute: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
}

function setLink(rel: string, href: string, extra?: Record<string, string>) {
  const selector = extra?.hreflang ? `link[rel="${rel}"][hreflang="${extra.hreflang}"]` : `link[rel="${rel}"]`;
  let element = document.head.querySelector<HTMLLinkElement>(selector);
  if (!element) {
    element = document.createElement("link");
    element.rel = rel;
    document.head.appendChild(element);
  }
  element.href = href;
  Object.entries(extra ?? {}).forEach(([key, value]) => element?.setAttribute(key, value));
}

export function Seo({
  title,
  description,
  path = "/",
  image = DEFAULT_IMAGE,
  type = "website",
  noindex = false,
  jsonLd,
}: SeoProps) {
  useEffect(() => {
    const url = absoluteUrl(path);
    const imageUrl = absoluteUrl(image);

    document.title = title;
    setMeta("name", "description", description);
    setMeta("name", "robots", noindex ? "noindex,nofollow" : INDEX_ROBOTS);

    setMeta("property", "og:site_name", SITE_NAME);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", type);
    setMeta("property", "og:url", url);
    setMeta("property", "og:image", imageUrl);
    setMeta("property", "og:image:alt", title);
    setMeta("property", "og:locale", "en_AU");

    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", imageUrl);

    setLink("canonical", url);
    setLink("alternate", url, { hreflang: "en-AU" });
    setLink("alternate", url, { hreflang: "x-default" });

    const scriptId = "site-json-ld";
    const existing = document.getElementById(scriptId);
    if (jsonLd) {
      const script = existing ?? document.createElement("script");
      script.id = scriptId;
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(jsonLd);
      if (!existing) document.head.appendChild(script);
    } else {
      existing?.remove();
    }
  }, [description, image, jsonLd, noindex, path, title, type]);

  return null;
}

export const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "OnlineStore",
      "@id": `${SITE_URL}/#store`,
      name: "Alibarbar Australia",
      url: SITE_URL,
      logo: `${SITE_URL}/favicon.svg`,
      image: DEFAULT_IMAGE,
      currenciesAccepted: "AUD",
      paymentAccepted: "Bank Transfer",
      areaServed: {
        "@type": "Country",
        name: "Australia",
      },
      knowsAbout: [
        "disposable vapes",
        "Alibarbar Ingot 9000",
        "high puff disposable vapes Australia",
        "vape flavours",
      ],
      brand: {
        "@type": "Brand",
        name: "ALIBARBAR",
      },
      contactPoint: {
        "@type": "ContactPoint",
        email: "orders@ailibarbar.com",
        contactType: "customer support",
        areaServed: "AU",
        availableLanguage: ["en"],
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Alibarbar Ingot 9000 Collection",
        itemListElement: products
          .filter((p) => !p.isPlaceholder)
          .map((p) => ({
            "@type": "Offer",
            url: `${SITE_URL}/product/${p.slug}`,
            price: p.price,
            priceCurrency: "AUD",
            availability: p.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            itemOffered: {
              "@type": "Product",
              name: `Alibarbar Ingot 9000 ${p.name}`,
              image: p.img.startsWith("http") ? p.img : `${SITE_URL}${p.img}`,
            },
          })),
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ],
} as const;

export function productJsonLd(product: {
  name: string;
  description: string;
  image: string;
  price: string;
  inStock: boolean;
  path: string;
  rating?: { average: number; count: number };
}) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: absoluteUrl(product.image),
    brand: {
      "@type": "Brand",
      name: "ALIBARBAR",
    },
    offers: {
      "@type": "Offer",
      url: absoluteUrl(product.path),
      price: product.price,
      priceCurrency: "AUD",
      availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
  };

  if (product.rating && product.rating.count > 0) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: product.rating.average,
      reviewCount: product.rating.count,
      bestRating: 5,
      worstRating: 1,
    };
  }

  return schema;
}

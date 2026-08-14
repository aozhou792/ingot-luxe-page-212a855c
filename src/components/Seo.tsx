import { useEffect } from "react";
import { getAuthorBySlug, getDefaultAuthor } from "@/data/authors";
import { ENTITY, productSlugFromPath } from "@/data/entity";
import { faqItems } from "@/data/faq";
import { products } from "@/data/products";
import { storePostalAddressJsonLd, SUPPORT_EMAIL } from "@/data/canonical-facts";
import { SITE_LOGO_HEIGHT, SITE_LOGO_PATH, SITE_LOGO_WIDTH, SITE_SAME_AS, SITE_URL } from "@/data/site";

const SITE_NAME = "Alibarbar Australia";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;
const LOGO_URL = `${SITE_URL}${SITE_LOGO_PATH}`;

/** Grants Google large image previews and full-length snippets in SERPs. */
const INDEX_ROBOTS = "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1";

type SeoProps = {
  title: string;
  description: string;
  path?: string;
  /** When set, overrides `path` for canonical + hreflang (e.g. flavour guide → product URL). */
  canonicalPath?: string;
  image?: string;
  type?: "website" | "product" | "article";
  noindex?: boolean;
  /** Skip canonical/hreflang — use on soft-404 SPA routes so Google does not treat junk URLs as self-canonical. */
  noCanonical?: boolean;
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
  canonicalPath,
  image = DEFAULT_IMAGE,
  type = "website",
  noindex = false,
  noCanonical = false,
  jsonLd,
}: SeoProps) {
  useEffect(() => {
    const pageUrl = absoluteUrl(path);
    const canonicalUrl = absoluteUrl(canonicalPath ?? path);
    const imageUrl = absoluteUrl(image);

    document.title = title;
    setMeta("name", "description", description);
    setMeta("name", "robots", noindex ? "noindex,nofollow" : INDEX_ROBOTS);

    setMeta("property", "og:site_name", SITE_NAME);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", type);
    setMeta("property", "og:url", pageUrl);
    setMeta("property", "og:image", imageUrl);
    setMeta("property", "og:image:alt", title);
    setMeta("property", "og:locale", "en_AU");

    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", imageUrl);

    if (noCanonical) {
      document.head.querySelectorAll('link[rel="canonical"], link[rel="alternate"][hreflang]').forEach((el) => el.remove());
    } else {
      setLink("canonical", canonicalUrl);
      setLink("alternate", canonicalUrl, { hreflang: "en-AU" });
      setLink("alternate", canonicalUrl, { hreflang: "x-default" });
    }

    const scriptId = "site-json-ld";
    const existing = document.getElementById(scriptId);
    if (jsonLd) {
      const script = (existing as HTMLScriptElement | null) ?? document.createElement("script");
      script.id = scriptId;
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(jsonLd);
      if (!existing) document.head.appendChild(script);
    } else {
      existing?.remove();
    }

    document.documentElement.dataset.seoReady = "true";
    document.dispatchEvent(new Event("seo-ready"));
  }, [canonicalPath, description, image, jsonLd, noCanonical, noindex, path, title, type]);

  return null;
}

const brandNode = {
  "@type": "Brand",
  "@id": ENTITY.brandId,
  name: "ALIBARBAR",
  url: `${SITE_URL}/brands/alibarbar`,
  description:
    "ALIBARBAR is the product brand behind the Ingot 9000 disposable vape. Alibarbar Australia is the site entity on this domain, not a second brand name.",
  hasProduct: products
    .filter((p) => !p.isPlaceholder)
    .map((p) => ({ "@id": ENTITY.productId(p.slug) })),
};

const organizationNode = {
  "@type": "Organization",
  "@id": ENTITY.organizationId,
  name: SITE_NAME,
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: LOGO_URL,
    width: SITE_LOGO_WIDTH,
    height: SITE_LOGO_HEIGHT,
  },
  image: DEFAULT_IMAGE,
  sameAs: SITE_SAME_AS,
  brand: { "@id": ENTITY.brandId },
  subOrganization: { "@id": ENTITY.storeId },
  description:
    "Alibarbar Australia is the site entity for ailibarbar.com. It publishes catalogue information, guides and reviews for the Alibarbar Ingot 9000. Lawful supply in Australia must be checked against current TGA and state or territory rules.",
  areaServed: { "@type": "Country", name: "Australia" },
  address: storePostalAddressJsonLd(),
  contactPoint: {
    "@type": "ContactPoint",
    email: SUPPORT_EMAIL,
    contactType: "customer support",
    areaServed: "AU",
    availableLanguage: ["en"],
  },
};

const websiteNode = {
  "@type": "WebSite",
  "@id": ENTITY.websiteId,
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "en-AU",
  publisher: { "@id": ENTITY.organizationId },
  about: { "@id": ENTITY.brandId },
};

function productImageUrl(img: string): string {
  return img.startsWith("http") ? img : `${SITE_URL}${img.startsWith("/") ? img : `/${img}`}`;
}

/** Tiered AU shipping for Offer schema (1–9 / 10–19 / 20+ free). */
export function offerShippingDetails() {
  const destination = {
    "@type": "DefinedRegion",
    addressCountry: "AU",
  };
  const deliveryTime = {
    "@type": "ShippingDeliveryTime",
    handlingTime: {
      "@type": "QuantitativeValue",
      minValue: 1,
      maxValue: 2,
      unitCode: "DAY",
    },
    transitTime: {
      "@type": "QuantitativeValue",
      minValue: 3,
      maxValue: 7,
      unitCode: "DAY",
    },
  };
  return [
    {
      "@type": "OfferShippingDetails",
      shippingDestination: destination,
      deliveryTime,
      shippingRate: {
        "@type": "MonetaryAmount",
        value: "15",
        currency: "AUD",
      },
      name: "Standard shipping (1–9 devices)",
    },
    {
      "@type": "OfferShippingDetails",
      shippingDestination: destination,
      deliveryTime,
      shippingRate: {
        "@type": "MonetaryAmount",
        value: "10",
        currency: "AUD",
      },
      name: "Reduced shipping (10–19 devices)",
    },
    {
      "@type": "OfferShippingDetails",
      shippingDestination: destination,
      deliveryTime,
      shippingRate: {
        "@type": "MonetaryAmount",
        value: "0",
        currency: "AUD",
      },
      name: "Free shipping (20 or more devices)",
    },
  ];
}

function productOffer(path: string, price: string, inStock: boolean) {
  const priceValidUntil = new Date();
  priceValidUntil.setUTCFullYear(priceValidUntil.getUTCFullYear() + 1);
  return {
    "@type": "Offer",
    url: absoluteUrl(path),
    price,
    priceCurrency: "AUD",
    priceValidUntil: priceValidUntil.toISOString().slice(0, 10),
    availability: inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    seller: { "@id": ENTITY.organizationId },
    shippingDetails: offerShippingDetails(),
    hasMerchantReturnPolicy: {
      "@type": "MerchantReturnPolicy",
      applicableCountry: "AU",
      returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
      merchantReturnDays: 14,
      returnMethod: "https://schema.org/ReturnByMail",
      returnFees: "https://schema.org/ReturnFeesCustomerResponsibility",
      url: absoluteUrl("/returns"),
    },
  };
}

function productReviewNodes(reviews: { author: string; rating: number; body: string; createdAt: string }[]) {
  return reviews.map((review) => ({
    "@type": "Review",
    reviewRating: {
      "@type": "Rating",
      ratingValue: review.rating,
      bestRating: 5,
      worstRating: 1,
    },
    author: { "@type": "Person", name: review.author },
    reviewBody: review.body,
    datePublished: review.createdAt,
  }));
}

function homepageProductNodes() {
  return products
    .filter((p) => !p.isPlaceholder)
    .map((p) => ({
      "@type": "Product",
      "@id": ENTITY.productId(p.slug),
      name: `Alibarbar Ingot 9000 ${p.name}`,
      description: p.excerpt,
      image: productImageUrl(p.img),
      brand: { "@id": ENTITY.brandId },
      offers: productOffer(`/product/${p.slug}`, p.price, p.inStock),
    }));
}

/** High-intent FAQs only on the homepage — full set lives on /faq to avoid rich-result competition. */
const HOMEPAGE_FAQ_QUESTIONS = new Set([
  "How much is shipping in Australia?",
  "How do I pay for my order?",
  "Do I need to be over 18 to order?",
  "What is the Alibarbar Ingot 9000?",
  "How many puffs does the Alibarbar Ingot 9000 have?",
  "Are your products authentic?",
  "What nicotine strength is in the Alibarbar Ingot 9000?",
  "Which Alibarbar flavour is best?",
  "Where can you legally buy vaping products in Australia?",
]);

export const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    organizationNode,
    brandNode,
    websiteNode,
    {
      "@type": "OnlineStore",
      "@id": ENTITY.storeId,
      name: "Alibarbar Australia",
      url: SITE_URL,
      logo: LOGO_URL,
      image: DEFAULT_IMAGE,
      currenciesAccepted: "AUD",
      paymentAccepted: "Bank Transfer",
      parentOrganization: { "@id": ENTITY.organizationId },
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
      brand: { "@id": ENTITY.brandId },
      address: storePostalAddressJsonLd(),
      contactPoint: {
        "@type": "ContactPoint",
        email: SUPPORT_EMAIL,
        contactType: "customer support",
        areaServed: "AU",
        availableLanguage: ["en"],
      },
    },
    ...homepageProductNodes(),
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: faqItems
        .filter((item) => HOMEPAGE_FAQ_QUESTIONS.has(item.question))
        .map((item) => ({
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

export type BreadcrumbEntry = { name: string; path: string };

export function breadcrumbNode(items: BreadcrumbEntry[], pagePath?: string) {
  return {
    "@type": "BreadcrumbList",
    ...(pagePath ? { "@id": ENTITY.breadcrumbId(pagePath) } : {}),
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function productJsonLd(product: {
  name: string;
  description: string;
  image: string;
  price: string;
  inStock: boolean;
  path: string;
  rating?: { average: number; count: number };
  reviews?: { author: string; rating: number; body: string; createdAt: string }[];
  breadcrumbs?: BreadcrumbEntry[];
  faq?: { question: string; answer: string }[];
}) {
  const slug = productSlugFromPath(product.path);
  const productNode: Record<string, unknown> = {
    "@type": "Product",
    ...(slug ? { "@id": ENTITY.productId(slug) } : {}),
    name: product.name,
    description: product.description,
    image: absoluteUrl(product.image),
    brand: { "@id": ENTITY.brandId },
    offers: productOffer(product.path, product.price, product.inStock),
  };

  if (product.rating && product.rating.count > 0) {
    productNode.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: product.rating.average,
      reviewCount: product.rating.count,
      bestRating: 5,
      worstRating: 1,
    };
  }

  if (product.reviews && product.reviews.length > 0) {
    productNode.review = productReviewNodes(product.reviews);
  }

  const graph: Record<string, unknown>[] = [organizationNode, brandNode, websiteNode, productNode];
  if (product.breadcrumbs && product.breadcrumbs.length > 0) {
    graph.push(breadcrumbNode(product.breadcrumbs, product.path));
  }
  if (product.faq && product.faq.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": ENTITY.faqId(product.path),
      mainEntity: product.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

export function personNode(slug: string) {
  const author = getAuthorBySlug(slug) ?? getDefaultAuthor();
  return {
    "@type": "Person",
    "@id": ENTITY.personId(author.slug),
    name: author.name,
    jobTitle: author.title,
    url: `${SITE_URL}/author/${author.slug}`,
    worksFor: { "@id": ENTITY.organizationId },
    knowsAbout: author.expertise,
  };
}

function authorReference(authorSlug?: string) {
  const author = getAuthorBySlug(authorSlug) ?? getDefaultAuthor();
  return { "@id": ENTITY.personId(author.slug) };
}

export function howToJsonLd(howTo: {
  name: string;
  description: string;
  path: string;
  steps: { name: string; text: string }[];
  totalTime?: string;
  breadcrumbs?: BreadcrumbEntry[];
}) {
  const graph: Record<string, unknown>[] = [
    {
      "@type": "HowTo",
      name: howTo.name,
      description: howTo.description,
      inLanguage: "en-AU",
      totalTime: howTo.totalTime ?? "PT5M",
      step: howTo.steps.map((step, index) => ({
        "@type": "HowToStep",
        position: index + 1,
        name: step.name,
        text: step.text,
        url: `${absoluteUrl(howTo.path)}#step-${index + 1}`,
      })),
    },
  ];
  if (howTo.breadcrumbs && howTo.breadcrumbs.length > 0) {
    graph.push(breadcrumbNode(howTo.breadcrumbs, howTo.path));
  }
  return { "@context": "https://schema.org", "@graph": graph };
}

export function articleJsonLd(article: {
  title: string;
  description: string;
  path: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  authorSlug?: string;
  breadcrumbs?: BreadcrumbEntry[];
  faq?: { question: string; answer: string }[];
  howToSteps?: { name: string; text: string }[];
  howToTotalTime?: string;
  /** Ranked list for “best of” pages (ItemList schema). */
  itemList?: { position: number; name: string; url: string; description?: string }[];
}) {
  const graph: Record<string, unknown>[] = [
    organizationNode,
    brandNode,
    websiteNode,
    personNode(article.authorSlug ?? getDefaultAuthor().slug),
    {
      "@type": "Article",
      "@id": ENTITY.articleId(article.path),
      headline: article.title,
      description: article.description,
      image: absoluteUrl(article.image ?? DEFAULT_IMAGE),
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": ENTITY.webpageId(article.path),
        url: absoluteUrl(article.path),
      },
      isPartOf: { "@id": ENTITY.websiteId },
      inLanguage: "en-AU",
      datePublished: article.datePublished ?? "2026-01-01",
      dateModified: article.dateModified ?? article.datePublished ?? "2026-01-01",
      author: authorReference(article.authorSlug),
      publisher: { "@id": ENTITY.organizationId },
      ...(article.breadcrumbs && article.breadcrumbs.length > 0
        ? { breadcrumb: { "@id": ENTITY.breadcrumbId(article.path) } }
        : {}),
    },
  ];

  if (article.howToSteps && article.howToSteps.length > 0) {
    graph.push({
      "@type": "HowTo",
      name: article.title,
      description: article.description,
      inLanguage: "en-AU",
      totalTime: article.howToTotalTime ?? "PT5M",
      step: article.howToSteps.map((step, index) => ({
        "@type": "HowToStep",
        position: index + 1,
        name: step.name,
        text: step.text,
        url: `${absoluteUrl(article.path)}#step-${index + 1}`,
      })),
    });
  }

  if (article.itemList && article.itemList.length > 0) {
    graph.push({
      "@type": "ItemList",
      name: article.title,
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      numberOfItems: article.itemList.length,
      itemListElement: article.itemList.map((item) => ({
        "@type": "ListItem",
        position: item.position,
        name: item.name,
        url: absoluteUrl(item.url),
        description: item.description,
      })),
    });
  }

  if (article.breadcrumbs && article.breadcrumbs.length > 0) {
    graph.push(breadcrumbNode(article.breadcrumbs, article.path));
  }

  if (article.faq && article.faq.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": ENTITY.faqId(article.path),
      mainEntity: article.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

export function reviewJsonLd(review: {
  title: string;
  description: string;
  path: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  authorSlug?: string;
  productName: string;
  productPath: string;
  /** Product description for Merchant Listings / Product rich results. */
  productDescription: string;
  /** Required for Product rich-result validity on itemReviewed. */
  price: string;
  inStock?: boolean;
  ratingValue: number;
  breadcrumbs?: BreadcrumbEntry[];
  faq?: { question: string; answer: string }[];
}) {
  const itemReviewed: Record<string, unknown> = {
    "@type": "Product",
    "@id": ENTITY.productId(productSlugFromPath(review.productPath) ?? "quadruple-berry"),
    name: review.productName,
    description: review.productDescription,
    url: absoluteUrl(review.productPath),
    brand: { "@id": ENTITY.brandId },
    // Google Product snippets require offers, review, or aggregateRating.
    offers: productOffer(review.productPath, review.price, review.inStock ?? true),
  };
  if (review.image) {
    itemReviewed.image = absoluteUrl(review.image);
  }

  const graph: Record<string, unknown>[] = [
    organizationNode,
    brandNode,
    websiteNode,
    personNode(review.authorSlug ?? getDefaultAuthor().slug),
    {
      "@type": ["Review", "CriticReview"],
      "@id": ENTITY.reviewId(review.path),
      name: "Editorial review",
      headline: review.title,
      description: `${review.description} Editorial dimension score — not a customer aggregate rating.`,
      image: absoluteUrl(review.image ?? DEFAULT_IMAGE),
      datePublished: review.datePublished ?? "2026-01-01",
      dateModified: review.dateModified ?? review.datePublished ?? "2026-01-01",
      author: authorReference(review.authorSlug),
      publisher: { "@id": ENTITY.organizationId },
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.ratingValue,
        bestRating: 5,
        worstRating: 1,
        description: "Editorial tasting-dimension average, not a customer AggregateRating.",
      },
      itemReviewed,
    },
  ];

  if (review.breadcrumbs && review.breadcrumbs.length > 0) {
    graph.push(breadcrumbNode(review.breadcrumbs, review.path));
  }

  if (review.faq && review.faq.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": ENTITY.faqId(review.path),
      mainEntity: review.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

export function authorPageJsonLd(authorSlug: string) {
  const author = getAuthorBySlug(authorSlug) ?? getDefaultAuthor();
  return {
    "@context": "https://schema.org",
        "@graph": [
      organizationNode,
      brandNode,
      personNode(author.slug),
      {
        "@type": "ProfilePage",
        mainEntity: { "@id": ENTITY.personId(author.slug) },
        name: `${author.name} | ${SITE_NAME}`,
        url: `${SITE_URL}/author/${author.slug}`,
        inLanguage: "en-AU",
      },
    ],
  };
}

export function faqPageJsonLd(items: { question: string; answer: string }[], breadcrumbs?: BreadcrumbEntry[], pagePath = "/faq") {
  const graph: Record<string, unknown>[] = [
    {
      "@type": "FAQPage",
      "@id": ENTITY.faqId(pagePath),
      mainEntity: items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ];
  if (breadcrumbs && breadcrumbs.length > 0) graph.push(breadcrumbNode(breadcrumbs, pagePath));
  return { "@context": "https://schema.org", "@graph": graph };
}

export function brandEntityJsonLd(brand: {
  name: string;
  title: string;
  description: string;
  path: string;
  isOwn?: boolean;
  breadcrumbs?: BreadcrumbEntry[];
  faq?: { question: string; answer: string }[];
}) {
  const graph: Record<string, unknown>[] = [
    organizationNode,
    brandNode,
    websiteNode,
    {
      "@type": "WebPage",
      "@id": ENTITY.webpageId(brand.path),
      url: absoluteUrl(brand.path),
      name: brand.title,
      description: brand.description,
      inLanguage: "en-AU",
      isPartOf: { "@id": ENTITY.websiteId },
      about: brand.isOwn ? { "@id": ENTITY.brandId } : { "@type": "Brand", name: brand.name },
      mainEntity: brand.isOwn ? { "@id": ENTITY.brandId } : undefined,
      publisher: { "@id": ENTITY.organizationId },
    },
  ];
  if (brand.breadcrumbs && brand.breadcrumbs.length > 0) {
    graph.push(breadcrumbNode(brand.breadcrumbs, brand.path));
  }
  if (brand.faq && brand.faq.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": ENTITY.faqId(brand.path),
      mainEntity: brand.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    });
  }
  return { "@context": "https://schema.org", "@graph": graph };
}

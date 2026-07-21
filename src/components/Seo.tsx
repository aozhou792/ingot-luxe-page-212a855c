import { useEffect } from "react";
import { getAuthorBySlug, getDefaultAuthor } from "@/data/authors";
import { products } from "@/data/products";
import {
  getVerifiedShowcaseAggregate,
  getVerifiedShowcaseReviews,
  toSchemaReviews,
} from "@/data/product-showcase-reviews";
import { faqItems } from "@/data/faq";
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

    document.documentElement.dataset.seoReady = "true";
    document.dispatchEvent(new Event("seo-ready"));
  }, [description, image, jsonLd, noindex, path, title, type]);

  return null;
}

const organizationNode = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
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
  description:
    "Alibarbar Australia is an online store for authentic Alibarbar Ingot 9000 disposable vapes with fast local delivery.",
  areaServed: { "@type": "Country", name: "Australia" },
  contactPoint: {
    "@type": "ContactPoint",
    email: "orders@ailibarbar.com",
    contactType: "customer support",
    areaServed: "AU",
    availableLanguage: ["en"],
  },
};

const websiteNode = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "en-AU",
  publisher: { "@id": `${SITE_URL}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

function productImageUrl(img: string): string {
  return img.startsWith("http") ? img : `${SITE_URL}${img.startsWith("/") ? img : `/${img}`}`;
}

/** Tiered AU shipping for Offer schema (under 5 / 5–19 / 20+ free). */
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
        value: "20",
        currency: "AUD",
      },
      name: "Standard shipping (under 5 devices)",
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
      name: "Reduced shipping (5–19 devices)",
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
  return {
    "@type": "Offer",
    url: absoluteUrl(path),
    price,
    priceCurrency: "AUD",
    availability: inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    seller: { "@id": `${SITE_URL}/#organization` },
    shippingDetails: offerShippingDetails(),
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
    .map((p) => {
      const verifiedReviews = getVerifiedShowcaseReviews(p.slug);
      const verifiedRating = getVerifiedShowcaseAggregate(p.slug);
      const node: Record<string, unknown> = {
        "@type": "Product",
        "@id": `${SITE_URL}/product/${p.slug}#product`,
        name: `Alibarbar Ingot 9000 ${p.name}`,
        description: p.excerpt,
        image: productImageUrl(p.img),
        brand: { "@type": "Brand", name: "ALIBARBAR" },
        offers: productOffer(`/product/${p.slug}`, p.price, p.inStock),
      };
      if (verifiedRating.count > 0) {
        node.aggregateRating = {
          "@type": "AggregateRating",
          ratingValue: verifiedRating.average,
          reviewCount: verifiedRating.count,
          bestRating: 5,
          worstRating: 1,
        };
        node.review = productReviewNodes(toSchemaReviews(verifiedReviews));
      }
      return node;
    });
}

export const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    organizationNode,
    websiteNode,
    {
      "@type": "OnlineStore",
      "@id": `${SITE_URL}/#store`,
      name: "Alibarbar Australia",
      url: SITE_URL,
      logo: LOGO_URL,
      image: DEFAULT_IMAGE,
      currenciesAccepted: "AUD",
      paymentAccepted: "Bank Transfer",
      parentOrganization: { "@id": `${SITE_URL}/#organization` },
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
    },
    ...homepageProductNodes(),
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

export type BreadcrumbEntry = { name: string; path: string };

export function breadcrumbNode(items: BreadcrumbEntry[]) {
  return {
    "@type": "BreadcrumbList",
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
  const productNode: Record<string, unknown> = {
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: absoluteUrl(product.image),
    brand: {
      "@type": "Brand",
      name: "ALIBARBAR",
    },
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

  const graph: Record<string, unknown>[] = [productNode];
  if (product.breadcrumbs && product.breadcrumbs.length > 0) {
    graph.push(breadcrumbNode(product.breadcrumbs));
  }
  if (product.faq && product.faq.length > 0) {
    graph.push({
      "@type": "FAQPage",
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
    "@id": `${SITE_URL}/author/${author.slug}#person`,
    name: author.name,
    jobTitle: author.title,
    url: `${SITE_URL}/author/${author.slug}`,
    worksFor: { "@id": `${SITE_URL}/#organization` },
    knowsAbout: author.expertise,
  };
}

function authorReference(authorSlug?: string) {
  const author = getAuthorBySlug(authorSlug) ?? getDefaultAuthor();
  return { "@id": `${SITE_URL}/author/${author.slug}#person` };
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
    graph.push(breadcrumbNode(howTo.breadcrumbs));
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
}) {
  const graph: Record<string, unknown>[] = [
    personNode(article.authorSlug ?? getDefaultAuthor().slug),
    {
      "@type": "Article",
      headline: article.title,
      description: article.description,
      image: absoluteUrl(article.image ?? DEFAULT_IMAGE),
      mainEntityOfPage: absoluteUrl(article.path),
      inLanguage: "en-AU",
      datePublished: article.datePublished ?? "2026-01-01",
      dateModified: article.dateModified ?? article.datePublished ?? "2026-01-01",
      author: authorReference(article.authorSlug),
      publisher: { "@id": `${SITE_URL}/#organization` },
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

  if (article.breadcrumbs && article.breadcrumbs.length > 0) {
    graph.push(breadcrumbNode(article.breadcrumbs));
  }

  if (article.faq && article.faq.length > 0) {
    graph.push({
      "@type": "FAQPage",
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
  ratingValue: number;
  breadcrumbs?: BreadcrumbEntry[];
  faq?: { question: string; answer: string }[];
}) {
  const graph: Record<string, unknown>[] = [
    personNode(review.authorSlug ?? getDefaultAuthor().slug),
    {
      "@type": "Review",
      headline: review.title,
      description: review.description,
      image: absoluteUrl(review.image ?? DEFAULT_IMAGE),
      datePublished: review.datePublished ?? "2026-01-01",
      dateModified: review.dateModified ?? review.datePublished ?? "2026-01-01",
      author: authorReference(review.authorSlug),
      publisher: { "@id": `${SITE_URL}/#organization` },
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.ratingValue,
        bestRating: 5,
        worstRating: 1,
      },
      itemReviewed: {
        "@type": "Product",
        name: review.productName,
        url: absoluteUrl(review.productPath),
        brand: { "@type": "Brand", name: "ALIBARBAR" },
      },
    },
  ];

  if (review.breadcrumbs && review.breadcrumbs.length > 0) {
    graph.push(breadcrumbNode(review.breadcrumbs));
  }

  if (review.faq && review.faq.length > 0) {
    graph.push({
      "@type": "FAQPage",
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
      personNode(author.slug),
      {
        "@type": "ProfilePage",
        mainEntity: { "@id": `${SITE_URL}/author/${author.slug}#person` },
        name: `${author.name} | ${SITE_NAME}`,
        url: `${SITE_URL}/author/${author.slug}`,
        inLanguage: "en-AU",
      },
    ],
  };
}

export function faqPageJsonLd(items: { question: string; answer: string }[], breadcrumbs?: BreadcrumbEntry[]) {
  const graph: Record<string, unknown>[] = [
    {
      "@type": "FAQPage",
      mainEntity: items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ];
  if (breadcrumbs && breadcrumbs.length > 0) graph.push(breadcrumbNode(breadcrumbs));
  return { "@context": "https://schema.org", "@graph": graph };
}

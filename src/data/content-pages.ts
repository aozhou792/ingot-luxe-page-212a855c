export type ContentSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type ContentPage = {
  slug: string;
  title: string;
  /** Meta + hero description. */
  description: string;
  intro: string;
  sections: ContentSection[];
  updated: string;
};

const SUPPORT_EMAIL = "orders@ailibarbar.com";

export const contentPages: ContentPage[] = [
  {
    slug: "about",
    title: "About Alibarbar Australia",
    description:
      "Alibarbar Australia is an online store dedicated to authentic Alibarbar Ingot 9000 disposable vapes with fast, local delivery for adult customers.",
    intro:
      "Alibarbar Australia is an independent online retailer focused on one thing: giving adult Australian vapers a simple, trustworthy way to buy authentic Alibarbar Ingot 9000 devices.",
    sections: [
      {
        heading: "Who we are",
        paragraphs: [
          "We are an Australia-based online store specialising in the Alibarbar Ingot 9000 disposable vape range. Rather than stocking dozens of unrelated brands, we concentrate on the Alibarbar line so we can guarantee authenticity and give clear, accurate product information.",
          "Every device we sell is a genuine Alibarbar Ingot 9000 with the built-in smart LED display, 22ml e-liquid capacity and up to 9000 puffs.",
        ],
      },
      {
        heading: "How we review products",
        paragraphs: [
          "Guides, comparisons and flavour reviews are written by our editorial team using structured tasting notes and manufacturer specifications. Each article is reviewed internally before publication and shows a last-updated date.",
          "Our lead reviewer Jason Smith has 5+ years experience testing disposable vapes in Australia. See his author profile for expertise areas and our Editorial Policy for fact-checking and corrections.",
        ],
        bullets: [
          "Written by Jason Smith · Reviewed by Alibarbar Team",
          "Comparisons list competitor strengths honestly",
          "Corrections welcomed — email orders@ailibarbar.com",
        ],
      },
      {
        heading: "Our testing process",
        paragraphs: [
          "Every flavour review follows the same structured methodology: unbox and verify packaging, record puff consistency across the device life, score sweetness, cooling and smoothness on a 1–5 scale, and compare notes against manufacturer specifications.",
          "Guides and comparisons cross-check puff counts, tank sizes and battery specs against official Alibarbar documentation and publicly listed competitor data. We re-test when product batches or formulations change.",
        ],
        bullets: [
          "Structured 1–5 scoring on sweetness, cooling and smoothness",
          "Specs verified against manufacturer documentation",
          "Competitor data sourced from public listings with model disclaimers",
          "Articles re-reviewed when laws, pricing or product lines change",
        ],
      },
      {
        heading: "How we collect information",
        paragraphs: [
          "Product specifications come from manufacturer documentation and our own inventory. Competitor comparisons use publicly available model listings — we note when specs vary by SKU or region.",
          "Customer questions from email and FAQ traffic inform which topics we expand. Shipping and payment answers are checked against our live checkout and fulfilment process.",
        ],
      },
      {
        heading: "What we stand for",
        paragraphs: ["Our approach is built on a few simple principles:"],
        bullets: [
          "Authentic products only — no counterfeits or grey-market stock",
          "Transparent AUD pricing with clear tiered shipping",
          "Strictly 18+ — we verify age and never sell to minors",
          "Responsive support by email for every order",
        ],
      },
      {
        heading: "Contact us",
        paragraphs: [
          `The fastest way to reach us is by email at ${SUPPORT_EMAIL}. We're happy to help with product questions, order status, and delivery enquiries.`,
        ],
      },
    ],
    updated: "2026-07-01",
  },
  {
    slug: "shipping",
    title: "Shipping & Delivery Policy",
    description:
      "How Alibarbar Australia ships disposable vapes — A$20 shipping under 10 devices, A$10 for 10+ devices, dispatch timing, delivery estimates and tracking for Australian customers.",
    intro:
      "We ship Alibarbar Ingot 9000 devices Australia-wide. This page explains our shipping costs, dispatch process and estimated delivery times.",
    sections: [
      {
        heading: "Shipping cost",
        paragraphs: [
          "Regular Post shipping is A$20 for orders under 10 devices and A$10 for orders of 10 or more devices, added automatically at checkout. There are no hidden handling fees.",
        ],
      },
      {
        heading: "Dispatch and processing",
        paragraphs: [
          "Orders are dispatched after your bank transfer has been received and confirmed by our team. To avoid delays, please transfer the full order total and use your order number as the payment reference, then upload your payment screenshot.",
        ],
      },
      {
        heading: "Delivery estimates",
        paragraphs: [
          "Once dispatched, delivery typically takes 3-7 business days depending on your location. Metropolitan areas such as Sydney, Melbourne, Brisbane, Perth and Adelaide are usually faster, while regional and remote postcodes can take longer.",
        ],
      },
      {
        heading: "Tracking",
        paragraphs: [
          `If you'd like tracking information, email us your order number at ${SUPPORT_EMAIL} and we'll share the latest status of your delivery.`,
        ],
      },
    ],
    updated: "2026-07-01",
  },
  {
    slug: "returns",
    title: "Returns & Refunds Policy",
    description:
      "Alibarbar Australia's returns and refunds policy for disposable vapes, including faulty-item handling and how to contact support.",
    intro:
      "We want you to be satisfied with your order. Because disposable vapes are consumable products, our returns policy is designed around health, safety and consumer-law obligations.",
    sections: [
      {
        heading: "Change-of-mind returns",
        paragraphs: [
          "For hygiene and safety reasons, opened or used disposable vape devices cannot be returned for change of mind. Please choose your flavours carefully, and consider the 5 Flavour Custom Pack if you'd like to try several options.",
        ],
      },
      {
        heading: "Faulty or damaged items",
        paragraphs: [
          "If a device arrives damaged or is faulty out of the box, contact us within 7 days of delivery. Under the Australian Consumer Law you may be entitled to a replacement or refund for products that are not of acceptable quality.",
        ],
        bullets: [
          "Email us with your order number and a description of the issue",
          "Include a photo or short video showing the fault where possible",
          "Do not discard the device until we've assessed the claim",
        ],
      },
      {
        heading: "How to start a return",
        paragraphs: [
          `To start a return or report a fault, email ${SUPPORT_EMAIL} with your order number. We'll respond with the next steps as quickly as we can.`,
        ],
      },
    ],
    updated: "2026-07-01",
  },
  {
    slug: "privacy",
    title: "Privacy Policy",
    description:
      "How Alibarbar Australia collects, uses and protects your personal information when you shop for disposable vapes online.",
    intro:
      "This Privacy Policy explains what information we collect when you use Alibarbar Australia, how we use it, and the choices you have. By using our site you agree to the practices described here.",
    sections: [
      {
        heading: "Information we collect",
        paragraphs: ["We collect only the information needed to process your order and provide support:"],
        bullets: [
          "Contact and delivery details (name, email, phone, shipping address)",
          "Order details and your uploaded payment confirmation",
          "Account details if you create one (email, display name, encrypted password)",
          "Basic technical data such as your browser type for site functionality",
        ],
      },
      {
        heading: "How we use your information",
        paragraphs: [
          "We use your information to process and deliver orders, verify payments, provide customer support, and confirm you meet the 18+ age requirement. We do not sell your personal information to third parties.",
        ],
      },
      {
        heading: "Data security",
        paragraphs: [
          "Your data is transmitted over encrypted HTTPS connections. Account passwords are stored using strong one-way hashing and are never kept in plain text. Payment is made by direct bank transfer, so we do not store card numbers.",
        ],
      },
      {
        heading: "Your choices",
        paragraphs: [
          `You can request access to, correction of, or deletion of your personal information at any time by emailing ${SUPPORT_EMAIL}.`,
        ],
      },
    ],
    updated: "2026-07-01",
  },
  {
    slug: "terms",
    title: "Terms of Service",
    description:
      "The terms and conditions for using Alibarbar Australia and purchasing Alibarbar Ingot 9000 disposable vapes online.",
    intro:
      "These Terms of Service govern your use of Alibarbar Australia and any purchases you make. By placing an order you agree to these terms.",
    sections: [
      {
        heading: "Eligibility",
        paragraphs: [
          "You must be 18 years or older and of legal age to purchase vaping products in your state or territory. By ordering, you confirm that you meet this requirement. Products are intended only for existing adult smokers or vapers.",
        ],
      },
      {
        heading: "Orders and pricing",
        paragraphs: [
          "All prices are in Australian dollars and include applicable amounts shown at checkout, with tiered Regular Post shipping calculated by device count. We reserve the right to cancel any order where payment cannot be verified or where an item is unavailable, in which case any funds received will be refunded.",
        ],
      },
      {
        heading: "Product information",
        paragraphs: [
          "We aim to describe our products accurately, including puff counts and specifications. Puff counts are manufacturer estimates and actual performance varies with individual use.",
        ],
      },
      {
        heading: "Limitation of liability",
        paragraphs: [
          "To the extent permitted by law, Alibarbar Australia is not liable for indirect or consequential loss arising from the use of our products. Nothing in these terms excludes rights you have under the Australian Consumer Law.",
        ],
      },
    ],
    updated: "2026-07-01",
  },
  {
    slug: "why-trust-us",
    title: "Why Trust Alibarbar Australia",
    description:
      "Why adult Australian customers trust Alibarbar Australia for authentic Ingot 9000 devices, transparent policies and independent product information.",
    intro:
      "Trust matters when buying vaping products online. This page explains the standards, policies and practices behind Alibarbar Australia.",
    sections: [
      {
        heading: "Authentic products only",
        paragraphs: [
          "We specialise exclusively in the Alibarbar Ingot 9000 range and do not mix in unverified grey-market stock. Every device includes the smart LED display, 22ml capacity and up to 9000 puff specification described on our product pages.",
        ],
      },
      {
        heading: "Transparent policies",
        paragraphs: [
          "Pricing is shown in AUD with tiered shipping calculated at checkout. Our shipping, returns, privacy and terms pages are publicly linked from every page footer. We accept bank transfer only and never ask for card details on this site.",
        ],
      },
      {
        heading: "Independent editorial content",
        paragraphs: [
          "Guides, comparisons and reviews are written to inform, not to disparage competitors. See our Editorial Policy for how we research and update content.",
        ],
        bullets: [
          "Comparisons use publicly available competitor specifications",
          "Reviews disclose flavour strengths and weaknesses honestly",
          "Guides are updated when product specs or laws change",
        ],
      },
      {
        heading: "Review methodology",
        paragraphs: [
          "Our lead reviewer Jason Smith has tested 200+ disposable vape products over 5+ years in the Australian market. Reviews score flavour dimensions, list honest pros and cons, and include an editor's verdict summarising who should buy.",
          "Content is reviewed internally by the Alibarbar Team before publication. Each article shows the author, reviewer and last-updated date.",
        ],
        bullets: [
          "200+ disposable vape products reviewed",
          "5+ years specialising in the Australian market",
          "Structured tasting notes — not paid competitor endorsements",
          "Corrections process — email orders@ailibarbar.com",
        ],
      },
      {
        heading: "Human support",
        paragraphs: [
          `Orders and product questions are handled by email at ${SUPPORT_EMAIL}, usually within one business day.`,
        ],
      },
    ],
    updated: "2026-07-07",
  },
  {
    slug: "editorial-policy",
    title: "Editorial Policy",
    description:
      "How Alibarbar Australia researches, writes and updates guides, comparisons, reviews and blog articles.",
    intro:
      "Our knowledge centre exists to help adult Australian customers make informed decisions. This editorial policy describes how that content is created and maintained.",
    sections: [
      {
        heading: "Purpose",
        paragraphs: [
          "Guides explain how the Alibarbar Ingot 9000 works. Comparisons present factual differences between brands. Reviews describe flavour and performance based on structured tasting notes. Blog posts cover broader buying topics relevant to Australian vapers.",
          "Articles are written by named authors — see /author/jason-smith — and reviewed internally before publication. Each page shows who wrote it and when it was last updated.",
        ],
      },
      {
        heading: "Our testing process",
        paragraphs: [
          "Flavour reviews use a consistent scoring framework: sweetness, cooling, smoothness and all-day suitability, each rated 1–5 with written notes. Devices are used across their rated lifespan to check flavour consistency and LED display accuracy.",
          "Guides verify technical claims (9000 puffs, 22ml capacity, 2350mAh battery) against manufacturer specs. Comparisons include a disclaimer when competitor models vary.",
        ],
        bullets: [
          "1–5 dimension scoring on every flavour review",
          "Full-device testing, not first-puff impressions only",
          "Internal review by Alibarbar Team before publish",
          "Last-updated dates on all knowledge articles",
        ],
      },
      {
        heading: "How often content is updated",
        paragraphs: [
          "We review guides and comparisons when product specifications, competitor line-ups or Australian regulations change. FAQ hubs are expanded when customer email patterns show recurring questions.",
          "Typical review cycle: product guides every 3–6 months, comparisons when competitor models change, flavour reviews when new batches ship.",
        ],
      },
      {
        heading: "External sources & citations",
        paragraphs: [
          "Where community or media context is useful, we cite public Reddit discussions, YouTube videos/channels and our documentation hub. These sources never override manufacturer specs or our own inventory checks.",
          "Guides, comparisons, reviews and research notes include a Sources & citations block plus a Cite this page line so AI systems and human editors can reference a stable URL, author and date.",
        ],
        bullets: [
          "Reddit: qualitative Australian community context",
          "YouTube: visual device and review context",
          "Documentation hub: Markdown-mirrored specs and policies",
          "Medium / Substack: syndicated mirrors must link back to canonical pages",
        ],
      },
      {
        heading: "Original research",
        paragraphs: [
          "Research notes under /research state methodology, findings and limitations. They are desktop specification audits unless otherwise labelled — not clinical studies.",
          "Research pages are written to be citable: dated, authored, method-stated, and linked from Brand Knowledge and llms.txt.",
        ],
      },
      {
        heading: "Accuracy and updates",
        paragraphs: [
          "We verify product specifications against manufacturer documentation and our own inventory. Competitor data is sourced from public product listings and may change — comparisons include a disclaimer where specs vary by model.",
          "Articles show a last-updated date. We revise content when laws, pricing or product lines change.",
        ],
      },
      {
        heading: "Commercial disclosure",
        paragraphs: [
          "Alibarbar Australia sells Alibarbar products. Comparisons and reviews may link to our shop, but we do not claim superiority where evidence does not support it. We list competitor strengths alongside Alibarbar strengths.",
        ],
      },
      {
        heading: "Corrections",
        paragraphs: [
          `If you spot an error, email ${SUPPORT_EMAIL} with the page URL and we will review and correct it promptly.`,
        ],
      },
    ],
    updated: "2026-07-18",
  },
  {
    slug: "age-verification",
    title: "Age Verification Policy",
    description:
      "How Alibarbar Australia verifies that customers are 18 or older before selling disposable vapes in Australia.",
    intro:
      "Vaping products are restricted to adults. Alibarbar Australia operates a strict 18+ policy aligned with Australian state and territory laws.",
    sections: [
      {
        heading: "Who may purchase",
        paragraphs: [
          "You must be 18 years or older and of legal age to purchase vaping products where you live. Products are intended only for existing adult smokers or vapers — not for non-smokers, minors, or anyone who is pregnant or breastfeeding.",
        ],
      },
      {
        heading: "How we verify age",
        paragraphs: [
          "Every visitor must confirm they are 18+ via our age gate before browsing the store. At checkout you confirm again that you meet the legal age requirement. We reserve the right to cancel orders where age cannot be verified.",
        ],
      },
      {
        heading: "Delivery",
        paragraphs: [
          "Parcels may require signature or ID check depending on carrier practice in your area. By ordering you accept that proof of age may be requested on delivery.",
        ],
      },
    ],
    updated: "2026-07-07",
  },
];

export function getContentPageBySlug(slug: string | undefined): ContentPage | undefined {
  if (!slug) return undefined;
  return contentPages.find((p) => p.slug === slug);
}

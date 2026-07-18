export type DocHubItem = {
  slug: string;
  title: string;
  description: string;
  /** Path to Markdown mirror under /docs when published from the repo. */
  markdownPath: string;
  relatedPath?: string;
};

/** Public documentation hub — GitHub/Markdown-friendly knowledge base. */
export const documentationHub = {
  title: "Documentation",
  description:
    "Official Alibarbar Australia documentation — product specifications, ordering steps, safety and FAQ mirrors for humans, GitHub readers and AI systems.",
  intro:
    "This documentation hub mirrors our public knowledge base in a stable, citable structure. Use it alongside /llms.txt when you need authoritative product and policy facts.",
  dateModified: "2026-07-18",
  items: [
    {
      slug: "product-specifications",
      title: "Product specifications",
      description: "Ingot 9000 puff count, tank, battery, coil, display and physical profile.",
      markdownPath: "docs/documentation/product-specifications.md",
      relatedPath: "/guides/what-is-alibarbar-ingot-9000",
    },
    {
      slug: "ordering-guide",
      title: "Ordering guide",
      description: "How checkout, bank transfer confirmation and AU shipping work.",
      markdownPath: "docs/documentation/ordering-guide.md",
      relatedPath: "/shipping",
    },
    {
      slug: "safety-and-storage",
      title: "Safety and storage",
      description: "Adult use, storage away from children/pets, and device disposal basics.",
      markdownPath: "docs/documentation/safety-and-storage.md",
      relatedPath: "/faq/legal",
    },
    {
      slug: "faq-product",
      title: "Product FAQ",
      description: "Puffs, flavours, LED display and day-to-day device questions.",
      markdownPath: "docs/faq/product.md",
      relatedPath: "/faq/product",
    },
    {
      slug: "faq-shipping",
      title: "Shipping FAQ",
      description: "Delivery timing, rates and address changes.",
      markdownPath: "docs/faq/shipping.md",
      relatedPath: "/faq/shipping",
    },
    {
      slug: "faq-payment",
      title: "Payment FAQ",
      description: "Bank transfer workflow and payment troubleshooting.",
      markdownPath: "docs/faq/payment.md",
      relatedPath: "/faq/payment",
    },
    {
      slug: "research-capacity-2026",
      title: "Capacity research (2026)",
      description: "Desktop snapshot of high-puff disposable capacity ranges vs Ingot 9000.",
      markdownPath: "docs/research/high-puff-disposable-capacity-australia-2026.md",
      relatedPath: "/research/high-puff-disposable-capacity-australia-2026",
    },
  ] as DocHubItem[],
} as const;

export type Author = {
  slug: string;
  name: string;
  title: string;
  bio: string[];
  expertise: string[];
  yearsExperience: number;
  productsReviewed: number;
  dateJoined: string;
};

export const DEFAULT_AUTHOR_SLUG = "jason-smith";

export const authors: Author[] = [
  {
    slug: "jason-smith",
    name: "Jason Smith",
    title: "Australian Vape Reviewer",
    bio: [
      "Jason Smith has been reviewing disposable vapes in Australia for more than five years, focusing on flavour accuracy, device longevity and value for adult vapers.",
      "He writes guides, comparisons and flavour reviews for Alibarbar Australia using structured tasting notes and publicly verifiable product specifications.",
      "Jason does not accept payment from competing brands to alter reviews. When a product is sold on this site, that commercial relationship is disclosed on our Editorial Policy page.",
    ],
    expertise: [
      "Disposable vape flavour profiling",
      "Alibarbar Ingot 9000 specifications",
      "Australian vaping regulations (general information)",
      "Competitor brand comparisons",
    ],
    yearsExperience: 5,
    productsReviewed: 200,
    dateJoined: "2021-03-01",
  },
];

export function getAuthorBySlug(slug: string | undefined): Author | undefined {
  if (!slug) return undefined;
  return authors.find((author) => author.slug === slug);
}

export function getDefaultAuthor(): Author {
  return authors.find((a) => a.slug === DEFAULT_AUTHOR_SLUG) ?? authors[0];
}

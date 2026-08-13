import { SITE_URL } from "@/data/site";

export const ENTITY = {
  organizationId: `${SITE_URL}/#organization`,
  brandId: `${SITE_URL}/#brand`,
  storeId: `${SITE_URL}/#store`,
  websiteId: `${SITE_URL}/#website`,
  personId: (slug: string) => `${SITE_URL}/author/${slug}#person`,
  productId: (slug: string) => `${SITE_URL}/product/${slug}#product`,
  articleId: (path: string) => `${SITE_URL}${normalizePath(path)}#article`,
  webpageId: (path: string) => `${SITE_URL}${normalizePath(path)}#webpage`,
  faqId: (path: string) => `${SITE_URL}${normalizePath(path)}#faq`,
  breadcrumbId: (path: string) => `${SITE_URL}${normalizePath(path)}#breadcrumb`,
  reviewId: (path: string) => `${SITE_URL}${normalizePath(path)}#review`,
} as const;

function normalizePath(path: string): string {
  if (!path || path === "/") return "";
  return path.startsWith("/") ? path : `/${path}`;
}

export function productSlugFromPath(path: string): string | undefined {
  const match = path.match(/\/product\/([^/#?]+)/);
  return match?.[1];
}

export type PublicReview = {
  id: string;
  productSlug: string;
  author: string;
  rating: number;
  title: string;
  body: string;
  photos?: string[];
  createdAt: string;
};

export type ReviewStatus = "pending" | "approved" | "rejected";

export type AdminReview = PublicReview & {
  userId: string;
  status: ReviewStatus;
  seeded?: boolean;
};

export type ReviewAggregate = {
  overall: { count: number; average: number };
  perProduct: Record<string, { count: number; average: number }>;
};

async function parseError(response: Response): Promise<string> {
  try {
    const data = (await response.json()) as { error?: string };
    return data.error ?? `Request failed (${response.status})`;
  } catch {
    return `Request failed (${response.status})`;
  }
}

export async function fetchReviews(
  slug?: string,
): Promise<{ reviews: PublicReview[]; aggregate: ReviewAggregate }> {
  const url = slug ? `/api/reviews?slug=${encodeURIComponent(slug)}` : "/api/reviews";
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) throw new Error(await parseError(response));
  return (await response.json()) as { reviews: PublicReview[]; aggregate: ReviewAggregate };
}

export async function submitReview(
  token: string,
  input: { productSlug: string; rating: number; title: string; body: string; photos?: string[] },
): Promise<void> {
  const response = await fetch("/api/reviews", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(input),
  });
  if (!response.ok) throw new Error(await parseError(response));
}

export async function fetchAdminReviews(
  adminKey: string,
): Promise<{ reviews: AdminReview[]; aggregate: ReviewAggregate }> {
  const response = await fetch("/api/reviews", {
    headers: { Authorization: `Bearer ${adminKey}` },
    cache: "no-store",
  });
  if (!response.ok) throw new Error(await parseError(response));
  return (await response.json()) as { reviews: AdminReview[]; aggregate: ReviewAggregate };
}

export async function moderateReview(
  adminKey: string,
  id: string,
  status: ReviewStatus,
): Promise<void> {
  const response = await fetch("/api/reviews", {
    method: "PATCH",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${adminKey}` },
    body: JSON.stringify({ id, status }),
  });
  if (!response.ok) throw new Error(await parseError(response));
}

export async function deleteReviewOnBackend(adminKey: string, id: string): Promise<void> {
  const response = await fetch(`/api/reviews?id=${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${adminKey}` },
  });
  if (!response.ok) throw new Error(await parseError(response));
}

export async function seedReviewsOnBackend(adminKey: string): Promise<number> {
  const response = await fetch("/api/seed-reviews", {
    method: "POST",
    headers: { Authorization: `Bearer ${adminKey}` },
  });
  if (!response.ok) throw new Error(await parseError(response));
  const data = (await response.json()) as { added: number };
  return data.added;
}

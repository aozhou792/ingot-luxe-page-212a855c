import { list, put } from "@vercel/blob";
import { randomUUID } from "node:crypto";

const REVIEWS_PATH = "reviews/index.json";

export type ReviewStatus = "pending" | "approved" | "rejected";

export type StoredReview = {
  id: string;
  productSlug: string;
  userId: string;
  author: string;
  rating: number;
  title: string;
  body: string;
  status: ReviewStatus;
  createdAt: string;
  /** Seed reviews are pre-approved sample content, flagged for transparency. */
  seeded?: boolean;
};

export type PublicReview = {
  id: string;
  productSlug: string;
  author: string;
  rating: number;
  title: string;
  body: string;
  createdAt: string;
};

function blobToken(): string {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) throw new Error("BLOB_READ_WRITE_TOKEN is not configured");
  return token;
}

export async function readReviews(): Promise<StoredReview[]> {
  const token = blobToken();
  const { blobs } = await list({ prefix: REVIEWS_PATH, token });
  const blob = blobs.find((b) => b.pathname === REVIEWS_PATH);
  if (!blob) return [];
  const response = await fetch(blob.url, {
    headers: { authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!response.ok) return [];
  return (await response.json()) as StoredReview[];
}

async function writeReviews(reviews: StoredReview[]): Promise<void> {
  const token = blobToken();
  await put(REVIEWS_PATH, JSON.stringify(reviews), {
    access: "private",
    contentType: "application/json",
    token,
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

export function toPublicReview(review: StoredReview): PublicReview {
  return {
    id: review.id,
    productSlug: review.productSlug,
    author: review.author,
    rating: review.rating,
    title: review.title,
    body: review.body,
    createdAt: review.createdAt,
  };
}

export async function addReview(input: {
  productSlug: string;
  userId: string;
  author: string;
  rating: number;
  title: string;
  body: string;
}): Promise<StoredReview> {
  const reviews = await readReviews();
  const review: StoredReview = {
    id: randomUUID(),
    productSlug: input.productSlug,
    userId: input.userId,
    author: input.author,
    rating: input.rating,
    title: input.title.trim(),
    body: input.body.trim(),
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  await writeReviews([review, ...reviews]);
  return review;
}

export async function setReviewStatus(id: string, status: ReviewStatus): Promise<StoredReview | null> {
  const reviews = await readReviews();
  const index = reviews.findIndex((r) => r.id === id);
  if (index < 0) return null;
  reviews[index] = { ...reviews[index], status };
  await writeReviews(reviews);
  return reviews[index];
}

export async function deleteReview(id: string): Promise<boolean> {
  const reviews = await readReviews();
  const next = reviews.filter((r) => r.id !== id);
  if (next.length === reviews.length) return false;
  await writeReviews(next);
  return true;
}

/** Adds seed reviews once; skips if any seeded review already exists. */
export async function seedReviews(seed: Omit<StoredReview, "id" | "status" | "createdAt" | "seeded">[]): Promise<number> {
  const reviews = await readReviews();
  if (reviews.some((r) => r.seeded)) return 0;

  const now = Date.now();
  const seeded: StoredReview[] = seed.map((s, index) => ({
    ...s,
    id: randomUUID(),
    status: "approved",
    seeded: true,
    createdAt: new Date(now - index * 36e5).toISOString(),
  }));

  await writeReviews([...seeded, ...reviews]);
  return seeded.length;
}

import { list, put } from "@vercel/blob";
import { randomUUID } from "node:crypto";
import { parseDataUrl } from "./order-store.js";

const REVIEWS_PATH = "reviews/index.json";
const REVIEW_PHOTO_PREFIX = "reviews/photos/";
const MAX_PHOTO_BYTES = 4 * 1024 * 1024;
const MAX_PHOTOS = 3;

function blobToken(): string {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) throw new Error("BLOB_READ_WRITE_TOKEN is not configured");
  return token;
}

function photoExt(contentType: string): string {
  if (contentType.includes("png")) return "png";
  if (contentType.includes("webp")) return "webp";
  if (contentType.includes("jpeg") || contentType.includes("jpg")) return "jpg";
  return "jpg";
}

async function uploadReviewPhotos(reviewId: string, dataUrls: string[]): Promise<string[]> {
  if (dataUrls.length > MAX_PHOTOS) {
    throw new Error(`You can upload up to ${MAX_PHOTOS} photos.`);
  }

  const token = blobToken();
  const urls: string[] = [];

  for (let index = 0; index < dataUrls.length; index += 1) {
    const { buffer, contentType } = parseDataUrl(dataUrls[index]);
    if (buffer.length > MAX_PHOTO_BYTES) {
      throw new Error("Each photo must be under 4 MB.");
    }
    const blob = await put(`${REVIEW_PHOTO_PREFIX}${reviewId}-${index}.${photoExt(contentType)}`, buffer, {
      access: "private",
      contentType,
      token,
      addRandomSuffix: false,
      allowOverwrite: true,
    });
    urls.push(blob.pathname);
  }

  return urls;
}

export type ReviewStatus = "pending" | "approved" | "rejected";

export type StoredReview = {
  id: string;
  productSlug: string;
  userId: string;
  author: string;
  rating: number;
  title: string;
  body: string;
  photos?: string[];
  status: ReviewStatus;
  createdAt: string;
  seeded?: boolean;
};

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
    photos: review.photos?.map((path) =>
      path.startsWith("http") ? path : `/api/review-photo?path=${encodeURIComponent(path)}`,
    ),
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
  photoDataUrls?: string[];
}): Promise<StoredReview> {
  const reviews = await readReviews();
  const id = randomUUID();
  const photos = input.photoDataUrls?.length ? await uploadReviewPhotos(id, input.photoDataUrls) : undefined;

  const review: StoredReview = {
    id,
    productSlug: input.productSlug,
    userId: input.userId,
    author: input.author,
    rating: input.rating,
    title: input.title.trim(),
    body: input.body.trim(),
    photos,
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

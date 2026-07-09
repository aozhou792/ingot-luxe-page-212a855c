import { isAuthorized, unauthorizedResponse } from "./_lib/auth.js";
import { authenticatedUser } from "./_lib/auth-tokens.js";
import { serveReviewPhoto } from "./_lib/review-photo.js";
import {
  addReview,
  deleteReview,
  readReviews,
  setReviewStatus,
  toPublicReview,
  type ReviewStatus,
} from "./_lib/review-store.js";

function aggregate(reviews: { productSlug: string; rating: number }[]) {
  const bySlug: Record<string, { count: number; sum: number }> = {};
  let count = 0;
  let sum = 0;
  for (const r of reviews) {
    count += 1;
    sum += r.rating;
    const entry = bySlug[r.productSlug] ?? { count: 0, sum: 0 };
    entry.count += 1;
    entry.sum += r.rating;
    bySlug[r.productSlug] = entry;
  }
  const perProduct: Record<string, { count: number; average: number }> = {};
  for (const [slug, entry] of Object.entries(bySlug)) {
    perProduct[slug] = { count: entry.count, average: Math.round((entry.sum / entry.count) * 10) / 10 };
  }
  return {
    overall: { count, average: count ? Math.round((sum / count) * 10) / 10 : 0 },
    perProduct,
  };
}

export async function GET(request: Request): Promise<Response> {
  try {
    const url = new URL(request.url);
    const photoPath = url.searchParams.get("photoPath");
    if (photoPath) {
      return serveReviewPhoto(photoPath);
    }

    const all = await readReviews();
    const slug = url.searchParams.get("slug");

    const byDisplayOrder = (a: { createdAt: string; photos?: string[] }, b: { createdAt: string; photos?: string[] }) => {
      const photoDelta = Number(Array.isArray(b.photos) && b.photos.length > 0) - Number(Array.isArray(a.photos) && a.photos.length > 0);
      if (photoDelta !== 0) return photoDelta;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    };

    if (isAuthorized(request)) {
      const scoped = (slug ? all.filter((r) => r.productSlug === slug) : all).sort(byDisplayOrder);
      return Response.json({ reviews: scoped, aggregate: aggregate(all.filter((r) => r.status === "approved")) });
    }

    const approved = all.filter((r) => r.status === "approved").sort(byDisplayOrder);
    const scoped = slug ? approved.filter((r) => r.productSlug === slug) : approved;
    return Response.json({
      reviews: scoped.map(toPublicReview),
      aggregate: aggregate(approved),
    });
  } catch (error) {
    console.error("reviews GET failed:", error);
    return Response.json({ error: "Failed to load reviews" }, { status: 500 });
  }
}

export async function POST(request: Request): Promise<Response> {
  const auth = authenticatedUser(request);
  if (!auth) return Response.json({ error: "Please sign in to leave a review." }, { status: 401 });

  try {
    const body = (await request.json()) as {
      productSlug?: string;
      rating?: number;
      title?: string;
      body?: string;
      photos?: string[];
    };

    const productSlug = (body.productSlug ?? "").trim();
    const rating = Number(body.rating);
    const title = (body.title ?? "").trim();
    const reviewBody = (body.body ?? "").trim();

    if (!productSlug) return Response.json({ error: "Missing product." }, { status: 400 });
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return Response.json({ error: "Rating must be between 1 and 5." }, { status: 400 });
    }
    if (reviewBody.length < 4) return Response.json({ error: "Please write a short review." }, { status: 400 });

    const review = await addReview({
      productSlug,
      userId: auth.sub,
      author: auth.name || auth.email.split("@")[0],
      rating,
      title,
      body: reviewBody,
      photoDataUrls: Array.isArray(body.photos) ? body.photos.slice(0, 3) : undefined,
    });

    return Response.json({ review: toPublicReview({ ...review }), pending: true });
  } catch (error) {
    console.error("reviews POST failed:", error);
    const message = error instanceof Error ? error.message : "Failed to submit review";
    const status = message.includes("photo") || message.includes("Photo") || message.includes("image") ? 400 : 500;
    return Response.json({ error: message }, { status });
  }
}

export async function PATCH(request: Request): Promise<Response> {
  if (!isAuthorized(request)) return unauthorizedResponse();

  try {
    const body = (await request.json()) as { id?: string; status?: ReviewStatus };
    if (!body.id || !body.status) {
      return Response.json({ error: "id and status are required" }, { status: 400 });
    }
    if (!["pending", "approved", "rejected"].includes(body.status)) {
      return Response.json({ error: "Invalid status" }, { status: 400 });
    }
    const updated = await setReviewStatus(body.id, body.status);
    if (!updated) return Response.json({ error: "Review not found" }, { status: 404 });
    return Response.json({ review: updated });
  } catch (error) {
    console.error("reviews PATCH failed:", error);
    return Response.json({ error: "Failed to update review" }, { status: 500 });
  }
}

export async function DELETE(request: Request): Promise<Response> {
  if (!isAuthorized(request)) return unauthorizedResponse();

  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    if (!id) return Response.json({ error: "id is required" }, { status: 400 });
    const ok = await deleteReview(id);
    if (!ok) return Response.json({ error: "Review not found" }, { status: 404 });
    return Response.json({ ok: true });
  } catch (error) {
    console.error("reviews DELETE failed:", error);
    return Response.json({ error: "Failed to delete review" }, { status: 500 });
  }
}

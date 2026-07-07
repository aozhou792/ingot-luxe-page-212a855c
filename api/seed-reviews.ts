import { isAuthorized, unauthorizedResponse } from "./_lib/auth.js";
import { seedReviews } from "./_lib/review-store.js";
import { seedReviewData } from "./_lib/review-seed.js";

export async function POST(request: Request): Promise<Response> {
  if (!isAuthorized(request)) return unauthorizedResponse();

  try {
    const added = await seedReviews(seedReviewData);
    return Response.json({ ok: true, added });
  } catch (error) {
    console.error("seed-reviews failed:", error);
    const message = error instanceof Error ? error.message : "Failed to seed reviews";
    return Response.json({ error: message }, { status: 500 });
  }
}

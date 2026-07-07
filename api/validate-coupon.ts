import { validateCoupon } from "./_lib/coupon-store.js";

export async function POST(request: Request): Promise<Response> {
  try {
    const body = (await request.json()) as { code?: string; email?: string; deviceCount?: number };
    const code = body.code ?? "";
    const email = body.email ?? "";
    const deviceCount = body.deviceCount ?? 0;

    if (!email.trim()) {
      return Response.json({ valid: false, error: "Enter your email on the checkout form first." }, { status: 400 });
    }

    const result = await validateCoupon(code, email, deviceCount);
    if (result.valid === false) {
      return Response.json({ valid: false, error: result.error });
    }

    return Response.json({
      valid: true,
      code: result.code,
      discountAmount: result.discountAmount,
    });
  } catch (error) {
    console.error("validate-coupon failed:", error);
    const message = error instanceof Error ? error.message : "Could not validate coupon";
    return Response.json({ valid: false, error: message }, { status: 500 });
  }
}

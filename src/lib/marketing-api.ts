export async function validateCouponCode(input: {
  code: string;
  email: string;
  deviceCount: number;
}): Promise<{ valid: true; code: string; discountAmount: number } | { valid: false; error: string }> {
  const response = await fetch("/api/validate-coupon", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  const data = (await response.json()) as {
    valid?: boolean;
    code?: string;
    discountAmount?: number;
    error?: string;
  };
  if (!response.ok || !data.valid) {
    return { valid: false, error: data.error ?? "Could not apply discount code." };
  }
  return {
    valid: true,
    code: data.code ?? input.code.trim().toUpperCase(),
    discountAmount: data.discountAmount ?? 0,
  };
}

export async function saveCheckoutDraft(order: unknown, deviceCount: number): Promise<void> {
  try {
    await fetch("/api/save-checkout-draft", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ order, deviceCount }),
    });
  } catch {
    /* non-blocking — checkout can continue */
  }
}

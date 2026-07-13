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

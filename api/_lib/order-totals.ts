import type { OrderDetails } from "./types.js";
import { COUPON_DISCOUNT_AUD, COUPON_MIN_DEVICES, validateCoupon } from "./coupon-store.js";

export function computeOrderTotal(subtotal: number, deviceCount: number, discountAmount = 0): number {
  if (deviceCount <= 0) return Math.max(0, subtotal - discountAmount);
  const shipping = deviceCount < 5 ? 20 : 10;
  return Math.max(0, subtotal + shipping - discountAmount);
}

export async function assertOrderTotals(order: OrderDetails): Promise<void> {
  const expectedShipping = order.deviceCount < 5 ? 20 : 10;
  if (Math.abs(order.shipping - expectedShipping) > 0.01) {
    throw new Error("Invalid shipping amount");
  }

  let discount = 0;
  if (order.discountCode) {
    const result = await validateCoupon(order.discountCode, order.billing.email, order.deviceCount);
    if (result.valid === false) throw new Error(result.error);
    discount = result.discountAmount;
    if (order.discountAmount !== undefined && Math.abs(order.discountAmount - discount) > 0.01) {
      throw new Error("Discount amount mismatch");
    }
  } else if (order.discountAmount && order.discountAmount > 0) {
    throw new Error("Discount amount without code");
  }

  const expectedTotal = computeOrderTotal(order.subtotal, order.deviceCount, discount);
  if (Math.abs(order.total - expectedTotal) > 0.01) {
    throw new Error("Order total does not match server calculation");
  }

  if (discount > COUPON_DISCOUNT_AUD + 0.01) {
    throw new Error("Discount too large");
  }
  if (order.deviceCount < COUPON_MIN_DEVICES && discount > 0) {
    throw new Error("Discount requires minimum device count");
  }
}

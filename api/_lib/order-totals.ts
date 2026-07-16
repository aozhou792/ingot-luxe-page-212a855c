import type { OrderDetails } from "./types.js";
import { COUPON_DISCOUNT_AUD, COUPON_MIN_DEVICES, validateCoupon } from "./coupon-store.js";

const SMALL_ORDER_SHIPPING_AUD = 20;
const BULK_ORDER_SHIPPING_AUD = 10;
/** Must match src/lib/checkout.ts — 10+ devices get reduced shipping. */
const BULK_SHIPPING_THRESHOLD = 10;

function shippingAud(deviceCount: number): number {
  if (deviceCount <= 0) return 0;
  return deviceCount < BULK_SHIPPING_THRESHOLD ? SMALL_ORDER_SHIPPING_AUD : BULK_ORDER_SHIPPING_AUD;
}

export function computeOrderTotal(subtotal: number, deviceCount: number, discountAmount = 0): number {
  if (deviceCount <= 0) return Math.max(0, subtotal - discountAmount);
  return Math.max(0, subtotal + shippingAud(deviceCount) - discountAmount);
}

export async function assertOrderTotals(order: OrderDetails): Promise<void> {
  const expectedShipping = shippingAud(order.deviceCount);
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

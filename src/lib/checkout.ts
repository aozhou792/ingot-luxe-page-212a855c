import { formatAud } from "@/lib/format";

/** Flat-rate shipping used across cart and checkout. */
export const SHIPPING_LABEL = "Regular Post";

/** Shipping is based on the actual number of vape devices in the cart. */
export const SMALL_ORDER_SHIPPING_AUD = 20;
export const BULK_ORDER_SHIPPING_AUD = 10;
export const FREE_SHIPPING_AUD = 0;
/** 5+ devices get reduced shipping (covers 5-pack and 10-pack). */
export const BULK_SHIPPING_THRESHOLD = 5;
/** 20+ devices ship free (covers 20-pack). */
export const FREE_SHIPPING_THRESHOLD = 20;

export function shippingRateHint(): string {
  return `${formatAud(SMALL_ORDER_SHIPPING_AUD)} for 1-4 devices; ${formatAud(BULK_ORDER_SHIPPING_AUD)} for ${BULK_SHIPPING_THRESHOLD}–${FREE_SHIPPING_THRESHOLD - 1} devices; free shipping for ${FREE_SHIPPING_THRESHOLD}+ devices.`;
}

export function shippingAud(deviceCount: number): number {
  if (deviceCount <= 0) return 0;
  if (deviceCount >= FREE_SHIPPING_THRESHOLD) return FREE_SHIPPING_AUD;
  return deviceCount < BULK_SHIPPING_THRESHOLD ? SMALL_ORDER_SHIPPING_AUD : BULK_ORDER_SHIPPING_AUD;
}

/** Display label for cart / checkout shipping row. */
export function shippingDisplay(deviceCount: number): string {
  const amount = shippingAud(deviceCount);
  return amount <= 0 && deviceCount > 0 ? "Free" : formatAud(amount);
}

/** Order total including device-count shipping and optional discount. */
export function orderTotal(subtotal: number, deviceCount: number, discountAud = 0): number {
  if (deviceCount <= 0) return Math.max(0, subtotal - discountAud);
  return Math.max(0, subtotal + shippingAud(deviceCount) - discountAud);
}

export const COUPON_MIN_DEVICES = 3;
export const COUPON_DISCOUNT_AUD = 10;

/** Wise (bank transfer) account the storefront collects payment into. */
export const BANK_TRANSFER = {
  accountName: "XIAOHONG HUANG",
  bsb: "774-001",
  accountNumber: "246121333",
  swift: "TRWIAUS1XXX",
  bankName: "Wise Australia Pty Ltd",
  bankAddress: "Suite 1, Level 11, 66 Goulburn Street, Sydney, NSW, 2000, Australia",
} as const;

export const PAYMENT_METHOD_LABEL = "Bank Transfer";

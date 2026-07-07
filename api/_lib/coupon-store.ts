import { list, put } from "@vercel/blob";
import { randomBytes } from "node:crypto";

const COUPONS_PATH = "marketing/coupons.json";

export const COUPON_DISCOUNT_AUD = 10;
export const COUPON_MIN_DEVICES = 3;
export const COUPON_VALID_DAYS = 3;

export type StoredCoupon = {
  code: string;
  amountAud: number;
  email: string;
  orderNumber: string;
  minDevices: number;
  createdAt: string;
  expiresAt: string;
  usedAt?: string;
  usedOnOrderNumber?: string;
};

function blobToken(): string {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) throw new Error("BLOB_READ_WRITE_TOKEN is not configured");
  return token;
}

function normalizeCode(code: string): string {
  return code.trim().toUpperCase();
}

function generateCode(): string {
  const suffix = randomBytes(3).toString("hex").toUpperCase();
  return `AB10-${suffix}`;
}

async function readCoupons(): Promise<StoredCoupon[]> {
  const token = blobToken();
  const { blobs } = await list({ prefix: COUPONS_PATH, token });
  const blob = blobs.find((b) => b.pathname === COUPONS_PATH);
  if (!blob) return [];
  const response = await fetch(blob.url, {
    headers: { authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!response.ok) return [];
  return (await response.json()) as StoredCoupon[];
}

async function writeCoupons(coupons: StoredCoupon[]): Promise<void> {
  const token = blobToken();
  await put(COUPONS_PATH, JSON.stringify(coupons), {
    access: "private",
    contentType: "application/json",
    token,
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

export async function createAbandonmentCoupon(email: string, orderNumber: string): Promise<StoredCoupon> {
  const coupons = await readCoupons();
  const now = new Date();
  const expiresAt = new Date(now);
  expiresAt.setDate(expiresAt.getDate() + COUPON_VALID_DAYS);

  const coupon: StoredCoupon = {
    code: generateCode(),
    amountAud: COUPON_DISCOUNT_AUD,
    email: email.trim().toLowerCase(),
    orderNumber,
    minDevices: COUPON_MIN_DEVICES,
    createdAt: now.toISOString(),
    expiresAt: expiresAt.toISOString(),
  };

  await writeCoupons([...coupons, coupon]);
  return coupon;
}

export type CouponValidationResult =
  | { valid: true; discountAmount: number; code: string }
  | { valid: false; error: string };

export async function validateCoupon(
  code: string,
  email: string,
  deviceCount: number,
): Promise<CouponValidationResult> {
  const normalized = normalizeCode(code);
  if (!normalized) return { valid: false, error: "Enter a discount code." };

  const coupons = await readCoupons();
  const coupon = coupons.find((c) => c.code === normalized);
  if (!coupon) return { valid: false, error: "This discount code is not valid." };
  if (coupon.usedAt) return { valid: false, error: "This discount code has already been used." };
  if (new Date(coupon.expiresAt) < new Date()) {
    return { valid: false, error: "This discount code has expired." };
  }
  if (coupon.email !== email.trim().toLowerCase()) {
    return { valid: false, error: "This code is not valid for this email address." };
  }
  if (deviceCount < coupon.minDevices) {
    return {
      valid: false,
      error: `This code requires at least ${coupon.minDevices} devices in your order.`,
    };
  }

  return { valid: true, discountAmount: coupon.amountAud, code: coupon.code };
}

export async function redeemCoupon(code: string, orderNumber: string): Promise<void> {
  const normalized = normalizeCode(code);
  const coupons = await readCoupons();
  const index = coupons.findIndex((c) => c.code === normalized);
  if (index < 0) return;

  coupons[index] = {
    ...coupons[index],
    usedAt: new Date().toISOString(),
    usedOnOrderNumber: orderNumber,
  };
  await writeCoupons(coupons);
}

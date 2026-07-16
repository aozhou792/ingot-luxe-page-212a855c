import type { OrderDetails } from "@/types/navigation";
import {
  attributionEventParams,
  getOrCaptureAttribution,
  type SessionAttribution,
} from "@/lib/ai-referrer";

export const GA_MEASUREMENT_ID = (import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined)?.trim() || "G-D07SJ2E2D4";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
    __alibarbarGaReady?: boolean;
  }
}

let cachedAttribution: SessionAttribution | null = null;

function gtag(...args: unknown[]): void {
  if (typeof window === "undefined" || !GA_MEASUREMENT_ID) return;
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag === "function") {
    window.gtag(...args);
    return;
  }
  window.dataLayer.push(args);
}

function withAttribution(params?: Record<string, unknown>): Record<string, unknown> {
  const attr = cachedAttribution ?? getOrCaptureAttribution();
  cachedAttribution = attr;
  return {
    ...attributionEventParams(attr),
    ...params,
  };
}

function applyCampaignToGtag(attr: SessionAttribution) {
  if (attr.channel !== "ai" && attr.channel !== "campaign") return;
  gtag("set", {
    campaign_source: attr.source,
    campaign_medium: attr.medium,
    ...(attr.campaign ? { campaign_name: attr.campaign } : {}),
  });
}

/** Capture attribution + AI campaign fields. Tag itself loads from index.html. */
export function initAnalytics() {
  if (typeof window === "undefined" || !GA_MEASUREMENT_ID) return;
  if (window.__alibarbarGaReady) return;
  window.__alibarbarGaReady = true;

  cachedAttribution = getOrCaptureAttribution();
  window.dataLayer = window.dataLayer || [];

  // Keep a durable stub for any third-party code that expects window.gtag.
  if (typeof window.gtag !== "function") {
    window.gtag = function gtagStub(...args: unknown[]) {
      window.dataLayer.push(args);
    };
  }

  applyCampaignToGtag(cachedAttribution);

  if (cachedAttribution.channel === "ai" && cachedAttribution.ai_platform) {
    gtag(
      "event",
      "ai_referral",
      withAttribution({
        ai_platform: cachedAttribution.ai_platform,
      }),
    );
  }
}

/** SPA page views (React Router does not reload the document). */
export function trackPageView(path: string, title?: string) {
  gtag(
    "event",
    "page_view",
    withAttribution({
      page_path: path,
      page_title: title ?? document.title,
      page_location: typeof window !== "undefined" ? window.location.href : undefined,
    }),
  );
}

export function trackEvent(name: string, params?: Record<string, unknown>) {
  gtag("event", name, withAttribution(params));
}

function orderItems(order: OrderDetails) {
  return order.lines.map((line) => ({
    item_id: line.slug,
    item_name: line.name,
    price: line.price,
    quantity: line.qty,
  }));
}

/**
 * Fired when checkout form succeeds (before navigating to order-complete).
 * Waits for GA to acknowledge the hit so a same-tick page_view does not drop it.
 */
export function trackPlaceOrder(order: OrderDetails): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();

  const key = `ga4-place-order-${order.orderNumber}`;
  try {
    if (sessionStorage.getItem(key)) return Promise.resolve();
  } catch {
    /* private mode */
  }

  return new Promise((resolve) => {
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      resolve();
    };

    gtag(
      "event",
      "place_order",
      withAttribution({
        transaction_id: order.orderNumber,
        value: order.total,
        currency: "AUD",
        items: orderItems(order),
        transport_type: "beacon",
        event_callback: () => {
          try {
            sessionStorage.setItem(key, "1");
          } catch {
            /* private mode */
          }
          finish();
        },
      }),
    );

    // Unblock checkout navigation if GA is blocked/slow; order-complete retries if needed.
    setTimeout(finish, 1000);
  });
}

/**
 * Primary conversion: bank-transfer receipt uploaded successfully.
 * Deduped per order in sessionStorage so refresh/resubmit does not inflate counts.
 */
export function trackPurchase(order: OrderDetails) {
  if (typeof window === "undefined") return;
  const key = `ga4-purchase-${order.orderNumber}`;
  try {
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");
  } catch {
    /* private mode — still send once this page load */
  }

  gtag(
    "event",
    "purchase",
    withAttribution({
      transaction_id: order.orderNumber,
      value: order.total,
      currency: "AUD",
      items: orderItems(order),
      transport_type: "beacon",
    }),
  );
}

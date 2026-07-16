import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { GA_MEASUREMENT_ID, initAnalytics, trackPageView } from "@/lib/analytics";

/**
 * Applies AI/UTM attribution and records SPA page_view events.
 * Base gtag snippet lives in index.html so GA can detect the tag.
 */
export function Analytics() {
  const location = useLocation();

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;
    initAnalytics();
    const path = `${location.pathname}${location.search}`;
    trackPageView(path);
  }, [location.pathname, location.search]);

  return null;
}

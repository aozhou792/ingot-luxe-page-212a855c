import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const STORAGE_KEY = "ailibarbar-age-verified-v1";

function isAutomationOrBot(): boolean {
  if (typeof navigator === "undefined") return true;
  if (navigator.webdriver) return true;
  const ua = navigator.userAgent || "";
  return /googlebot|bingbot|yandex|baiduspider|duckduckbot|slurp|facebookexternalhit|twitterbot|linkedinbot|embedly|quora|pinterest|redditbot|applebot|semrush|ahrefs|mj12bot|dotbot|petalbot|bytespider|gptbot|claudebot|ccbot/i.test(
    ua,
  );
}

function readVerified(): boolean {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function writeVerified() {
  try {
    window.localStorage.setItem(STORAGE_KEY, "1");
  } catch {
    /* private mode */
  }
}

/**
 * First-visit 18+ confirmation. Skipped for crawlers/automation so prerender + SEO
 * HTML stay indexable. Deferred past first paint so it does not steal homepage LCP.
 */
export function AgeGate() {
  const [open, setOpen] = useState(false);
  const settledRef = useRef(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isAutomationOrBot() || readVerified()) {
      settledRef.current = true;
      return;
    }

    const reveal = () => {
      if (settledRef.current || readVerified()) return;
      setOpen(true);
    };

    // Single delayed reveal — do not stack idleCallback + timeout (that reopened after confirm).
    timerRef.current = window.setTimeout(reveal, 1400);

    return () => {
      if (timerRef.current != null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  const confirm = () => {
    settledRef.current = true;
    if (timerRef.current != null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    writeVerified();
    setOpen(false);
  };

  const exit = () => {
    window.location.href = "https://www.google.com/";
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/75 p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
    >
      <div className="w-full max-w-md rounded-2xl border border-gold/40 bg-background p-6 sm:p-8 shadow-none">
        <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3">Alibarbar Australia</p>
        <h2 id="age-gate-title" className="text-2xl font-extrabold text-foreground mb-3">
          Adults 18+ only
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
          This store sells nicotine vaping products for adults. Confirm you are 18 years or older and of legal age to
          purchase where you live. See our{" "}
          <Link to="/age-verification" className="text-primary font-semibold underline underline-offset-2" onClick={confirm}>
            age verification policy
          </Link>
          .
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={confirm}
            className="inline-flex items-center justify-center min-h-[48px] px-5 rounded-full bg-gold text-primary-foreground font-bold text-sm uppercase tracking-wider"
          >
            I am 18 or older
          </button>
          <button
            type="button"
            onClick={exit}
            className="inline-flex items-center justify-center min-h-[48px] px-5 rounded-full border border-border text-foreground font-semibold text-sm"
          >
            Exit
          </button>
        </div>
      </div>
    </div>
  );
}

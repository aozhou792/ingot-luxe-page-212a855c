import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "alibarbar-age-verified";

export const AgeGate = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(STORAGE_KEY) !== "yes") setOpen(true);
    } catch {
      setOpen(true);
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  if (!open) return null;

  const confirmAge = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "yes");
    } catch {
      /* storage unavailable — gate reappears next visit */
    }
    setOpen(false);
  };

  const rejectAge = () => {
    window.location.href = "https://www.google.com";
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-md px-4"
    >
      <div className="w-full max-w-md rounded-2xl border border-gold/40 bg-card p-6 sm:p-8 text-center shadow-[0_24px_80px_-20px_rgba(0,0,0,0.85)]">
        <p className="text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-3">Age Verification</p>
        <h2 id="age-gate-title" className="text-2xl sm:text-3xl font-extrabold mb-3">
          Are you 18 or older?
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
          This website sells vaping products intended for adults only. By entering, you confirm that you are at least
          18 years old and of legal age to purchase vaping products in your state.
        </p>
        <div className="grid grid-cols-2 gap-3">
          <Button id="yes-age" size="lg" onClick={confirmAge}>
            Yes, I am 18+
          </Button>
          <Button id="no-age" size="lg" variant="outline" className="bg-background" onClick={rejectAge}>
            No, exit
          </Button>
        </div>
      </div>
    </div>
  );
};

import { useEffect, useRef, useState } from "react";
import heroDevice from "@/assets/hero-device.png";
import { TELEGRAM_COMMUNITY_URL } from "@/data/site";

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"
      />
    </svg>
  );
}

export const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loadVideo, setLoadVideo] = useState(false);

  // LCP: keep a static poster as the hero paint. Only load the ~1.7MB MP4 after
  // idle / interaction / long delay so mobile CWV is not blocked by video.
  useEffect(() => {
    let cancelled = false;
    const startVideo = () => {
      if (!cancelled) setLoadVideo(true);
    };

    const connection =
      typeof navigator !== "undefined"
        ? (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection
        : undefined;
    const slowNetwork =
      Boolean(connection?.saveData) ||
      connection?.effectiveType === "slow-2g" ||
      connection?.effectiveType === "2g";

    if (slowNetwork) return;

    const onInteract = () => startVideo();
    window.addEventListener("pointerdown", onInteract, { once: true, passive: true });
    window.addEventListener("keydown", onInteract, { once: true });

    let idleId: number | undefined;
    let timer = window.setTimeout(startVideo, 4500);
    const ric = window.requestIdleCallback;
    if (typeof ric === "function") {
      idleId = ric(() => startVideo(), { timeout: 5000 });
    }

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      window.removeEventListener("pointerdown", onInteract);
      window.removeEventListener("keydown", onInteract);
      if (idleId != null && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      }
    };
  }, []);

  useEffect(() => {
    if (!loadVideo) return;
    const el = videoRef.current;
    if (!el) return;
    el.load();
    const play = el.play();
    if (play && typeof play.catch === "function") {
      play.catch(() => {
        /* autoplay may be blocked — poster still shows */
      });
    }
  }, [loadVideo]);

  return (
    <section
      id="home"
      className="relative min-h-[min(100dvh,720px)] sm:min-h-dvh sm:min-h-screen flex items-center pt-[calc(6rem+env(safe-area-inset-top))] sm:pt-[calc(7rem+env(safe-area-inset-top))] pb-8 sm:pb-12 md:pb-14 overflow-hidden"
    >
      {/* Glow background — scaled down on narrow screens to avoid horizontal overflow */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[min(100vw,280px)] h-[min(100vw,280px)] sm:w-[400px] sm:h-[400px] md:w-[600px] md:h-[600px] bg-primary/20 rounded-full blur-[100px] sm:blur-[140px] md:blur-[160px]" />
        <div className="absolute bottom-0 right-0 w-[min(90vw,240px)] h-[min(90vw,240px)] sm:w-[380px] sm:h-[380px] md:w-[500px] md:h-[500px] bg-primary-glow/15 rounded-full blur-[90px] sm:blur-[120px] md:blur-[140px]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)",
            backgroundSize: "clamp(40px, 12vw, 60px) clamp(40px, 12vw, 60px)",
          }}
        />
      </div>

      <div className="container grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div className="reveal space-y-6 sm:space-y-8 order-2 lg:order-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border border-gold bg-primary/5 max-w-full">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow shrink-0" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.25em] text-primary whitespace-normal text-left leading-snug">
              Ingot Edition · 9000 Puffs
            </span>
          </div>

          <h1 className="text-[1.75rem] min-[400px]:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.08] sm:leading-[1.05] px-1 sm:px-0">
            Buy Alibarbar <br />
            <span className="text-gold">Ingot 9000</span> <br />
            in Australia
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed px-1 sm:px-0">
            Australia&apos;s dedicated Alibarbar Ingot 9000 store — authentic devices, full local compliance, and
            masterfully crafted flavours with fast Australia-wide delivery and secure checkout.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 items-stretch sm:items-center justify-center lg:justify-start">
            <a
              href="#flavors"
              className="group relative inline-flex items-center justify-center min-h-[48px] px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gold text-primary-foreground font-bold uppercase tracking-widest text-xs sm:text-sm shadow-gold animate-pulse-glow active:scale-[0.98] sm:hover:scale-105 transition-transform"
            >
              Shop Now
              <span className="ml-2 sm:group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <a
              href={TELEGRAM_COMMUNITY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#229ED9] text-white font-semibold uppercase tracking-widest text-xs sm:text-sm hover:bg-[#1d8bc4] active:scale-[0.98] transition"
            >
              <TelegramIcon className="w-5 h-5 shrink-0" />
              Join Community
            </a>
            <a
              href="#features"
              className="inline-flex items-center justify-center min-h-[48px] px-6 sm:px-8 py-3.5 sm:py-4 rounded-full border border-gold text-primary font-semibold uppercase tracking-widest text-xs sm:text-sm hover:bg-primary/10 active:bg-primary/15 transition text-center"
            >
              Discover
            </a>
          </div>

          <div className="flex justify-between sm:justify-start gap-4 sm:gap-8 md:gap-10 pt-6 border-t border-gold/30 max-w-md mx-auto lg:max-w-none lg:mx-0">
            <div className="text-center sm:text-left min-w-0 flex-1 sm:flex-none">
              <div className="text-2xl sm:text-3xl font-extrabold text-gold">9K+</div>
              <div className="text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground">Puffs</div>
            </div>
            <div className="text-center sm:text-left min-w-0 flex-1 sm:flex-none">
              <div className="text-2xl sm:text-3xl font-extrabold text-gold">10</div>
              <div className="text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground">Flavors</div>
            </div>
            <div className="text-center sm:text-left min-w-0 flex-1 sm:flex-none">
              <div className="text-2xl sm:text-3xl font-extrabold text-gold">5★</div>
              <div className="text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground">Rated</div>
            </div>
          </div>
        </div>

        <div className="relative reveal order-1 lg:order-2 px-4 sm:px-0">
          <div className="pointer-events-none absolute -inset-4 sm:-inset-8 bg-gradient-to-tr from-primary/25 via-transparent to-primary-glow/15 blur-3xl rounded-[3rem] scale-90 sm:scale-100" />
          <div className="relative mx-auto max-w-[min(100%,28rem)] animate-float">
            <div className="relative rounded-2xl sm:rounded-[1.75rem] overflow-hidden border border-gold/25 bg-black/30 shadow-[0_28px_90px_rgba(0,0,0,0.55),0_0_0_1px_rgba(212,175,55,0.15)_inset]">
              <div
                className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] shadow-[inset_0_0_80px_rgba(212,175,55,0.08)]"
                aria-hidden
              />
              {!loadVideo ? (
                <img
                  src={heroDevice}
                  alt="Alibarbar Ingot 9000 disposable vape — gold device showcase"
                  width={800}
                  height={1000}
                  decoding="async"
                  fetchPriority="high"
                  className="relative z-0 block w-full aspect-[3/4] sm:aspect-[4/5] object-cover object-center"
                />
              ) : (
                <video
                  ref={videoRef}
                  className="relative z-0 block w-full aspect-[3/4] sm:aspect-[4/5] object-cover object-center"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="none"
                  poster={heroDevice}
                  aria-label="Alibarbar Ingot 9000 Puffs gold luxury vape device — product showcase video"
                >
                  <source src="/hero-alibarbar.mp4" type="video/mp4" />
                </video>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

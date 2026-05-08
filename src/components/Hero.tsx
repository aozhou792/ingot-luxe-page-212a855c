import heroDevice from "@/assets/hero-device.png";

export const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-dvh min-h-screen flex items-center pt-[calc(6rem+env(safe-area-inset-top))] sm:pt-[calc(7rem+env(safe-area-inset-top))] pb-12 sm:pb-16 md:pb-20 overflow-hidden"
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
            The Ultimate <br />
            <span className="text-gold">Luxury Vaping</span> <br />
            Experience.
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed px-1 sm:px-0">
            Alibarbar Ingot 9000 Puffs. Featuring a smart digital display, premium gold bar design,
            and intense, masterfully crafted flavors.
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
              <video
                className="relative z-0 block w-full aspect-[3/4] sm:aspect-[4/5] object-cover object-center"
                autoPlay
                muted
                loop
                playsInline
                poster={heroDevice}
                aria-label="Alibarbar Ingot 9000 Puffs gold luxury vape device — product showcase video"
              >
                <source src="/hero-alibarbar.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

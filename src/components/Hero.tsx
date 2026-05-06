import heroDevice from "@/assets/hero-device.png";

export const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden">
      {/* Glow background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[160px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary-glow/15 rounded-full blur-[140px]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="container grid lg:grid-cols-2 gap-12 items-center">
        <div className="reveal space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold bg-primary/5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
            <span className="text-xs uppercase tracking-[0.25em] text-primary">Ingot Edition · 9000 Puffs</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05]">
            The Ultimate <br />
            <span className="text-gold">Luxury Vaping</span> <br />
            Experience.
          </h1>

          <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
            Alibarbar Ingot 9000 Puffs. Featuring a smart digital display, premium gold bar design,
            and intense, masterfully crafted flavors.
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <a
              href="#flavors"
              className="group relative inline-flex items-center justify-center px-8 py-4 rounded-full bg-gold text-primary-foreground font-bold uppercase tracking-widest text-sm shadow-gold animate-pulse-glow hover:scale-105 transition-transform"
            >
              Shop Now
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <a
              href="#features"
              className="px-8 py-4 rounded-full border border-gold text-primary font-semibold uppercase tracking-widest text-sm hover:bg-primary/10 transition"
            >
              Discover
            </a>
          </div>

          <div className="flex gap-10 pt-6 border-t border-gold/30">
            <div>
              <div className="text-3xl font-extrabold text-gold">9K+</div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Puffs</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-gold">12</div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Flavors</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-gold">5★</div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Rated</div>
            </div>
          </div>
        </div>

        <div className="relative reveal">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-transparent to-primary-glow/20 blur-3xl rounded-full" />
          <img
            src={heroDevice}
            alt="Alibarbar Ingot 9000 Puffs gold luxury vape device"
            className="relative w-full max-w-md mx-auto animate-float drop-shadow-[0_30px_60px_rgba(212,175,55,0.4)]"
          />
        </div>
      </div>
    </section>
  );
};

import { Link } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";
import { guides } from "@/data/guides";

/** Surfaces the knowledge centre on the homepage for internal linking + GEO. */
export const HomeGuides = () => {
  const featured = guides.slice(0, 3);

  return (
    <section id="guides" className="pt-10 sm:pt-12 md:pt-14 pb-16 sm:pb-20 md:pb-28 relative scroll-mt-20">
      <div className="container">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-12 reveal">
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary mb-3 sm:mb-4">
              Knowledge centre
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
              Alibarbar <span className="text-gold">guides</span>
            </h2>
            <p className="text-muted-foreground mt-3 text-sm sm:text-base">
              Learn how the Ingot 9000 works, how long it lasts, and how to pick your flavour.
            </p>
          </div>
          <Link
            to="/guides"
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-gold transition-colors self-start"
          >
            View all guides <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
          {featured.map((guide) => (
            <Link
              key={guide.slug}
              to={`/guides/${guide.slug}`}
              className="reveal group rounded-2xl border border-gold/20 bg-card/60 p-6 flex flex-col gap-3 hover:border-gold/50 transition-colors"
            >
              <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-primary">
                <BookOpen className="w-4 h-4" />
                {guide.readTime}
              </div>
              <h3 className="text-base sm:text-lg font-bold leading-snug group-hover:text-primary transition-colors">
                {guide.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">{guide.description}</p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-gold">
                Read guide <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

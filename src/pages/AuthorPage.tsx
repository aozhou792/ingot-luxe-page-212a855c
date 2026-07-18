import { Link, Navigate, useParams } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CitationSources } from "@/components/seo/CitationSources";
import { Seo, authorPageJsonLd } from "@/components/Seo";
import { getAuthorBySlug } from "@/data/authors";
import { defaultGuideCitations } from "@/data/citations";
import { guides } from "@/data/guides";
import { reviewPosts } from "@/data/reviews";
import { useReveal } from "@/hooks/use-reveal";

const AuthorPage = () => {
  useReveal();
  const { slug } = useParams<{ slug: string }>();
  const author = getAuthorBySlug(slug);

  if (!author) return <Navigate to="/about" replace />;

  const path = `/author/${author.slug}`;
  const recentGuides = guides.slice(0, 4);
  const recentReviews = reviewPosts.slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={`${author.name} — ${author.title} | Alibarbar Australia`}
        description={`${author.name} is an ${author.title.toLowerCase()} with ${author.yearsExperience}+ years experience and ${author.productsReviewed}+ disposable vape products reviewed for Alibarbar Australia.`}
        path={path}
        jsonLd={authorPageJsonLd(author.slug)}
      />
      <Navbar />
      <main className="pt-[calc(6rem+env(safe-area-inset-top))] pb-16 sm:pb-24">
        <article className="container max-w-3xl">
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link to="/about" className="hover:text-primary">
              About
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{author.name}</span>
          </nav>

          <header className="mb-8">
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3 font-semibold">Author · E-E-A-T</p>
            <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">{author.name}</h1>
            <p className="text-gold font-semibold mt-2">{author.title}</p>
            <p className="text-sm text-muted-foreground mt-3">
              {author.yearsExperience}+ years experience · {author.productsReviewed}+ products reviewed · specialises
              in the Australian vape market
            </p>
            <div className="gold-divider mt-6 max-w-[6rem]" />
          </header>

          <aside className="mb-8 rounded-2xl border border-gold/30 bg-gradient-to-br from-card/80 to-secondary/40 p-5 sm:p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-gold font-semibold mb-3">Expert credentials</p>
            <ul className="grid sm:grid-cols-2 gap-3 text-sm sm:text-base text-muted-foreground">
              <li>Reviewed {author.productsReviewed}+ disposable vape products</li>
              <li>{author.yearsExperience}+ years in the Australian market</li>
              <li>Specialises in flavour profiling &amp; device longevity</li>
              <li>Structured tasting notes on every review</li>
            </ul>
          </aside>

          <div className="space-y-6 text-muted-foreground leading-[1.75] text-sm sm:text-base">
            {author.bio.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <section className="mt-10">
            <h2 className="text-xl font-bold mb-3">Areas of expertise</h2>
            <ul className="space-y-2">
              {author.expertise.map((item) => (
                <li key={item} className="flex gap-2 text-sm sm:text-base text-muted-foreground">
                  <ChevronRight className="w-4 h-4 mt-1 text-primary shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-bold mb-3">How Jason works (E-E-A-T)</h2>
            <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
              <li>• Experience: multi-year hands-on testing of disposables sold to Australian adults</li>
              <li>• Expertise: flavour dimensions, capacity claims, competitor range literacy</li>
              <li>• Authoritativeness: named byline on guides, comparisons, reviews and research notes</li>
              <li>• Trust: commercial relationship disclosed; corrections via orders@ailibarbar.com</li>
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-bold mb-4">Selected published work</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-semibold text-gold mb-2">Guides</h3>
                <ul className="space-y-2">
                  {recentGuides.map((g) => (
                    <li key={g.slug}>
                      <Link to={`/guides/${g.slug}`} className="text-sm text-primary hover:text-gold">
                        {g.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gold mb-2">Reviews</h3>
                <ul className="space-y-2">
                  {recentReviews.map((r) => (
                    <li key={r.slug}>
                      <Link to={`/reviews/${r.slug}`} className="text-sm text-primary hover:text-gold">
                        {r.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="mt-10 rounded-2xl border border-gold/20 bg-card/50 p-5 sm:p-6">
            <h2 className="text-lg font-bold mb-3">Editorial standards</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              All guides, comparisons and reviews follow our{" "}
              <Link to="/editorial-policy" className="text-primary font-semibold hover:text-gold">
                Editorial Policy
              </Link>
              , including fact checking, competitor disclaimers and a corrections process. See{" "}
              <Link to="/why-trust-us" className="text-primary font-semibold hover:text-gold">
                Why Trust Us
              </Link>{" "}
              for how we maintain accuracy.
            </p>
          </section>

          <div className="mt-10">
            <CitationSources items={defaultGuideCitations} title="Public references" />
          </div>

          <div className="mt-10 flex flex-wrap gap-3 text-sm">
            <Link to="/guides" className="text-primary font-semibold hover:text-gold">
              Read guides
            </Link>
            <span className="text-muted-foreground">·</span>
            <Link to="/reviews" className="text-primary font-semibold hover:text-gold">
              Read reviews
            </Link>
            <span className="text-muted-foreground">·</span>
            <Link to="/research" className="text-primary font-semibold hover:text-gold">
              Research
            </Link>
            <span className="text-muted-foreground">·</span>
            <Link to="/compare" className="text-primary font-semibold hover:text-gold">
              Compare brands
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default AuthorPage;

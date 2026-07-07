import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductPrice } from "@/components/ProductPrice";
import { Seo, articleJsonLd, type BreadcrumbEntry } from "@/components/Seo";
import { getBlogPostBySlug } from "@/data/blog";
import { getProductBySlug } from "@/data/products";
import { guides } from "@/data/guides";
import { useReveal } from "@/hooks/use-reveal";

const BlogPostPage = () => {
  useReveal();
  const { slug } = useParams<{ slug: string }>();
  const post = getBlogPostBySlug(slug);

  if (!post) return <Navigate to="/blog" replace />;

  const path = `/blog/${post.slug}`;
  const breadcrumbs: BreadcrumbEntry[] = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path },
  ];

  const relatedProducts = (post.relatedProducts ?? [])
    .map((s) => getProductBySlug(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const relatedGuides = (post.relatedGuides ?? [])
    .map((s) => guides.find((g) => g.slug === s))
    .filter((g): g is NonNullable<typeof g> => Boolean(g));

  const jsonLd = articleJsonLd({
    title: post.title,
    description: post.description,
    path,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    breadcrumbs,
  });

  return (
    <div className="min-h-screen bg-background">
      <Seo title={`${post.title} | Alibarbar Australia`} description={post.description} path={path} jsonLd={jsonLd} />
      <Navbar />
      <main className="pt-[calc(6rem+env(safe-area-inset-top))] pb-16 sm:pb-24">
        <article className="container max-w-3xl">
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/blog" className="hover:text-primary">Blog</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{post.category}</span>
          </nav>

          <header className="mb-8">
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3 font-semibold">
              {post.category} · {post.readTime}
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">{post.title}</h1>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed">{post.intro}</p>
            <div className="gold-divider mt-6 max-w-[6rem]" />
          </header>

          <div className="space-y-8">
            {post.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-xl sm:text-2xl font-bold mb-3">{section.heading}</h2>
                <div className="space-y-3 text-muted-foreground leading-[1.75] text-sm sm:text-base">
                  {section.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                {section.bullets ? (
                  <ul className="mt-4 space-y-2">
                    {section.bullets.map((b) => (
                      <li key={b} className="flex gap-2 text-sm sm:text-base text-muted-foreground">
                        <ChevronRight className="w-4 h-4 mt-1 text-primary shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>

          {relatedProducts.length > 0 ? (
            <section className="mt-14">
              <h2 className="text-xl sm:text-2xl font-bold mb-5">Shop the range</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-5">
                {relatedProducts.map((p) => (
                  <Link
                    key={p.slug}
                    to={`/product/${p.slug}`}
                    className="luxe-card rounded-xl overflow-hidden group flex flex-col border border-gold/20"
                  >
                    <div className="relative aspect-square bg-gradient-to-br from-secondary to-background overflow-hidden">
                      <img
                        src={p.img}
                        alt={`Alibarbar Ingot 9000 ${p.name} disposable vape Australia`}
                        loading="lazy"
                        className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-3 border-t border-gold/15">
                      <h3 className="text-xs sm:text-sm font-bold leading-snug group-hover:text-primary transition-colors line-clamp-2">
                        {p.name}
                      </h3>
                      <ProductPrice price={p.price} originalPrice={p.originalPrice} priceClassName="text-sm" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          {relatedGuides.length > 0 ? (
            <section className="mt-14">
              <h2 className="text-xl sm:text-2xl font-bold mb-5">Related guides</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {relatedGuides.map((g) => (
                  <Link
                    key={g.slug}
                    to={`/guides/${g.slug}`}
                    className="group rounded-2xl border border-gold/20 bg-card/60 p-5 flex flex-col gap-2 hover:border-gold/50 transition-colors"
                  >
                    <h3 className="text-base font-bold leading-snug group-hover:text-primary transition-colors">{g.title}</h3>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-gold">
                      Read <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPostPage;

import { Link } from "react-router-dom";
import { ArrowRight, Newspaper } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Seo, breadcrumbNode } from "@/components/Seo";
import { blogPosts } from "@/data/blog";
import { useReveal } from "@/hooks/use-reveal";

const BlogIndexPage = () => {
  useReveal();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        name: "Alibarbar Australia Blog",
        description: "News, buying guides and flavour reviews for Alibarbar Ingot 9000 disposable vapes in Australia.",
        url: "https://www.ailibarbar.com/blog",
      },
      breadcrumbNode([
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog" },
      ]),
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Vape Blog: Guides, Reviews & Tips | Alibarbar Australia"
        description="The Alibarbar Australia blog — disposable vape buying guides, flavour reviews and practical tips for adult vapers in Australia."
        path="/blog"
        jsonLd={jsonLd}
      />
      <Navbar />
      <main className="pt-[calc(6rem+env(safe-area-inset-top))] pb-16 sm:pb-24">
        <div className="container max-w-4xl">
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Blog</span>
          </nav>

          <header className="mb-10 sm:mb-14 max-w-2xl">
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3 font-semibold">Blog</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
              Alibarbar <span className="text-gold">blog</span>
            </h1>
            <p className="text-muted-foreground mt-4 text-sm sm:text-base leading-relaxed">
              Buying guides, flavour reviews and practical tips for getting the most from your Alibarbar Ingot 9000.
            </p>
          </header>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="reveal group rounded-2xl border border-gold/20 bg-card/60 p-6 flex flex-col gap-3 hover:border-gold/50 transition-colors"
              >
                <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-primary">
                  <Newspaper className="w-4 h-4" />
                  {post.category} · {post.readTime}
                </div>
                <h2 className="text-lg font-bold leading-snug group-hover:text-primary transition-colors">{post.title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{post.description}</p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-gold">
                  Read article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogIndexPage;

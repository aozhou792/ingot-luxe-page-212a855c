import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { products } from "@/data/products";
import { guides } from "@/data/guides";
import { faqItems } from "@/data/faq";
import { comparisons } from "@/data/comparisons";
import { blogPosts } from "@/data/blog";
import { reviewPosts } from "@/data/reviews";

type SearchHit = { title: string; description: string; to: string; type: string };

function searchSite(query: string): SearchHit[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const hits: SearchHit[] = [];

  for (const p of products.filter((x) => !x.isPlaceholder)) {
    const hay = `${p.name} ${p.excerpt} ${p.tag}`.toLowerCase();
    if (hay.includes(q)) {
      hits.push({
        title: p.name,
        description: p.excerpt,
        to: `/product/${p.slug}`,
        type: "Product",
      });
    }
  }

  for (const g of guides) {
    const hay = `${g.title} ${g.description}`.toLowerCase();
    if (hay.includes(q)) {
      hits.push({ title: g.title, description: g.description, to: `/guides/${g.slug}`, type: "Guide" });
    }
  }

  for (const item of faqItems) {
    const hay = `${item.question} ${item.answer}`.toLowerCase();
    if (hay.includes(q)) {
      hits.push({ title: item.question, description: item.answer, to: "/faq", type: "FAQ" });
    }
  }

  for (const c of comparisons) {
    const hay = `${c.title} ${c.description} ${c.competitor}`.toLowerCase();
    if (hay.includes(q)) {
      hits.push({ title: c.title, description: c.description, to: `/compare/${c.slug}`, type: "Compare" });
    }
  }

  for (const b of blogPosts) {
    const hay = `${b.title} ${b.description}`.toLowerCase();
    if (hay.includes(q)) {
      hits.push({ title: b.title, description: b.description, to: `/blog/${b.slug}`, type: "Blog" });
    }
  }

  for (const r of reviewPosts) {
    const hay = `${r.title} ${r.description}`.toLowerCase();
    if (hay.includes(q)) {
      hits.push({ title: r.title, description: r.description, to: `/reviews/${r.slug}`, type: "Review" });
    }
  }

  return hits.slice(0, 24);
}

const SearchPage = () => {
  const [params, setParams] = useSearchParams();
  const query = params.get("q") ?? "";
  const results = useMemo(() => searchSite(query), [query]);

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Search | Alibarbar Australia"
        description="Search Alibarbar Australia for products, guides, comparisons, reviews and FAQs."
        path="/search"
        noindex
      />
      <Navbar />
      <main className="container pt-[calc(6rem+env(safe-area-inset-top))] pb-16 sm:pb-24 max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-6">Search</h1>
        <form
          className="relative mb-8"
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            const next = String(fd.get("q") ?? "").trim();
            setParams(next ? { q: next } : {});
          }}
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            name="q"
            type="search"
            defaultValue={query}
            placeholder="Search flavours, guides, FAQs…"
            className="w-full min-h-[48px] pl-12 pr-4 rounded-xl border border-gold/30 bg-card/50 text-base"
            autoComplete="off"
          />
        </form>

        {!query.trim() ? (
          <p className="text-muted-foreground text-sm sm:text-base">
            Try &quot;Peach Ice&quot;, &quot;how long does it last&quot;, or &quot;IGET comparison&quot;.
          </p>
        ) : results.length === 0 ? (
          <p className="text-muted-foreground">No results for &quot;{query}&quot;. Browse our{" "}
            <Link to="/flavours" className="text-primary font-semibold hover:text-gold">flavours</Link> or{" "}
            <Link to="/faq" className="text-primary font-semibold hover:text-gold">FAQ</Link>.
          </p>
        ) : (
          <ul className="space-y-4">
            {results.map((hit) => (
              <li key={`${hit.type}-${hit.to}-${hit.title}`}>
                <Link
                  to={hit.to}
                  className="block rounded-2xl border border-gold/20 bg-card/50 p-5 hover:border-gold/45 transition-colors"
                >
                  <span className="text-[10px] uppercase tracking-widest text-primary font-semibold">{hit.type}</span>
                  <h2 className="text-base sm:text-lg font-bold mt-1">{hit.title}</h2>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{hit.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default SearchPage;

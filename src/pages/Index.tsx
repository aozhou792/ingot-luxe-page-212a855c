import { lazy, Suspense, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { Flavors } from "@/components/Flavors";
import { Footer } from "@/components/Footer";
import { Seo, siteJsonLd } from "@/components/Seo";
import { useReveal } from "@/hooks/use-reveal";
import type { HomeRestoreState } from "@/types/navigation";

const HomeBelowFold = lazy(() => import("@/components/home/HomeBelowFold"));

const Index = () => {
  useReveal();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const st = location.state as HomeRestoreState | null;
    if (!st?.restoreHomeScroll || typeof st.homeScrollY !== "number" || Number.isNaN(st.homeScrollY)) return;

    const y = st.homeScrollY;
    requestAnimationFrame(() => {
      window.scrollTo({ top: y, behavior: "auto" });
    });

    navigate(
      { pathname: location.pathname, search: location.search, hash: location.hash },
      { replace: true, state: {} },
    );
  }, [location.key, location.pathname, location.search, location.hash, location.state, navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Buy Alibarbar Ingot 9000 Australia | Official Disposable Vape Store"
        description="Shop authentic Alibarbar Ingot 9000 disposable vapes in Australia. Guides, comparisons, 28+ FAQs, fast local delivery, premium flavours and custom 3/5/10-pack bundles for adults 18+."
        path="/"
        jsonLd={siteJsonLd}
      />
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <Flavors />
        <Suspense fallback={<div className="min-h-[20rem]" aria-hidden />}>
          <HomeBelowFold />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Index;

import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Flavors } from "@/components/Flavors";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Seo, siteJsonLd } from "@/components/Seo";
import { useReveal } from "@/hooks/use-reveal";
import type { HomeRestoreState } from "@/types/navigation";

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
        title="Alibarbar Ingot 9000 Australia | Online Vape Shop"
        description="Shop Alibarbar Ingot 9000 disposable vapes in Australia. Choose signature flavours or build a 5-piece custom pack with AUD pricing and local delivery."
        path="/"
        jsonLd={siteJsonLd}
      />
      <Navbar />
      <main>
        <Hero />
        <Flavors />
        <Features />
        <Faq />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

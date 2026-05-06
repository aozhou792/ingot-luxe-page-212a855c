import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Flavors } from "@/components/Flavors";
import { Footer } from "@/components/Footer";
import { Warning } from "@/components/Warning";
import { useReveal } from "@/hooks/use-reveal";

const Index = () => {
  useReveal();
  return (
    <div className="min-h-screen bg-background">
      <Warning />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Flavors />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

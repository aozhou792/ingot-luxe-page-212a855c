import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2, QrCode, ShieldCheck } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Seo, breadcrumbNode } from "@/components/Seo";
import { useReveal } from "@/hooks/use-reveal";
import { HONEYCOMB_SEAL_URL, VERIFY_PAGE_URL } from "@/data/authenticity-codes";

function HoneycombSeal({ className = "" }: { className?: string }) {
  const cells = useMemo(() => {
    const out: { x: number; y: number; r: number }[] = [];
    const size = 9;
    const gap = 11;
    for (let row = -size; row <= size; row++) {
      for (let col = -size; col <= size; col++) {
        const x = col * gap + (row % 2 === 0 ? 0 : gap / 2);
        const y = row * gap * 0.86;
        const dist = Math.hypot(x, y);
        if (dist > 88 || dist < 18) continue;
        out.push({ x, y, r: dist < 36 ? 2.4 : dist < 58 ? 1.8 : 1.2 });
      }
    }
    return out;
  }, []);

  return (
    <svg
      viewBox="-100 -100 200 200"
      className={className}
      role="img"
      aria-label="Alibarbar honeycomb anti-counterfeit seal"
    >
      <defs>
        <radialGradient id="honeyGlow" cx="50%" cy="45%" r="65%">
          <stop offset="0%" stopColor="hsl(48 95% 60% / 0.35)" />
          <stop offset="55%" stopColor="hsl(45 75% 52% / 0.12)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <circle r="96" fill="url(#honeyGlow)" />
      <circle r="92" fill="none" stroke="hsl(45 75% 52% / 0.55)" strokeWidth="1.5" />
      <circle r="84" fill="hsl(0 0% 4% / 0.85)" stroke="hsl(45 75% 52% / 0.35)" strokeWidth="1" />
      {cells.map((c, i) => (
        <circle key={i} cx={c.x} cy={c.y} r={c.r} fill="hsl(45 85% 58% / 0.85)" />
      ))}
      <polygon
        points="0,-22 19,-11 19,11 0,22 -19,11 -19,-11"
        fill="none"
        stroke="hsl(48 95% 65%)"
        strokeWidth="2.2"
      />
      <polygon
        points="0,-12 10,-6 10,6 0,12 -10,6 -10,-6"
        fill="hsl(45 75% 52% / 0.25)"
        stroke="hsl(48 95% 65%)"
        strokeWidth="1.2"
      />
      <text
        y="72"
        textAnchor="middle"
        fill="hsl(45 75% 52%)"
        fontSize="9"
        fontFamily="Montserrat, sans-serif"
        letterSpacing="2"
        fontWeight="700"
      >
        ALIBARBAR
      </text>
    </svg>
  );
}

function PackagingQrMock() {
  const modules = useMemo(() => {
    const n = 21;
    const cells: boolean[] = [];
    for (let y = 0; y < n; y++) {
      for (let x = 0; x < n; x++) {
        const finder = (x < 7 && y < 7) || (x > n - 8 && y < 7) || (x < 7 && y > n - 8);
        const quiet = x === 0 || y === 0 || x === n - 1 || y === n - 1;
        const pattern = (x * 7 + y * 13) % 5 === 0 || ((x + y) % 3 === 0 && x > 8);
        cells.push(finder || (!quiet && pattern));
      }
    }
    return { n, cells };
  }, []);

  return (
    <svg viewBox="0 0 21 21" className="w-full h-full" shapeRendering="crispEdges" aria-hidden>
      <rect width="21" height="21" fill="#fff" />
      {modules.cells.map((on, i) =>
        on ? (
          <rect key={i} x={i % modules.n} y={Math.floor(i / modules.n)} width="1" height="1" fill="#0a0a0a" />
        ) : null,
      )}
    </svg>
  );
}

const VerifyPage = () => {
  useReveal();
  const [searchParams] = useSearchParams();
  const fromHoneycomb =
    searchParams.get("seal") === "1" ||
    searchParams.get("type") === "honeycomb" ||
    searchParams.get("from") === "honeycomb";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: "Verify Alibarbar Authenticity",
        url: VERIFY_PAGE_URL,
        description:
          "Scan the honeycomb anti-counterfeit seal or the packaging QR to confirm a genuine Alibarbar Ingot product.",
      },
      breadcrumbNode([
        { name: "Home", path: "/" },
        { name: "Verify Authenticity", path: "/verify" },
      ]),
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Verify Authenticity | Alibarbar Australia"
        description="Scan the honeycomb anti-counterfeit mark or the packaging QR on your Alibarbar Ingot box to confirm it is a genuine brand product."
        path="/verify"
        jsonLd={jsonLd}
      />
      <Navbar />
      <main className="pt-[calc(6rem+env(safe-area-inset-top))] pb-16 sm:pb-24">
        <div className="container max-w-4xl">
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Verify</span>
          </nav>

          <header className="mb-8 sm:mb-10 reveal">
            <p className="text-xs uppercase tracking-[0.25em] text-gold font-semibold mb-3">Authentication</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
              Verify your <span className="text-gold">Alibarbar</span>
            </h1>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed max-w-2xl">
              Two marks on the back of the box — different jobs. The honeycomb is the anti-counterfeit seal. The QR code
              opens this verification page on our site.
            </p>
            <div className="gold-divider mt-6 max-w-[6rem]" />
          </header>

          {fromHoneycomb && (
            <div
              className="reveal mb-8 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-5 sm:p-6 flex gap-3"
              role="status"
            >
              <CheckCircle2 className="w-7 h-7 shrink-0 text-emerald-400" />
              <div>
                <p className="font-bold text-lg">Genuine Alibarbar</p>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  Honeycomb anti-counterfeit seal confirmed — this is an official Alibarbar brand product.
                </p>
                <p className="text-xs text-muted-foreground mt-2 font-mono">Alibarbar Ingot 9000 · brand seal</p>
              </div>
            </div>
          )}

          <section
            aria-label="How packaging marks work"
            className="reveal rounded-2xl border border-gold/35 bg-gradient-to-b from-card/80 to-card/40 p-5 sm:p-8 mb-8"
          >
            <div className="flex items-center gap-2 mb-6">
              <ShieldCheck className="w-5 h-5 text-gold" />
              <h2 className="text-sm uppercase tracking-[0.2em] text-gold font-bold">How to use</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              <div
                className={`rounded-xl border p-5 sm:p-6 flex flex-col items-center text-center ${
                  fromHoneycomb ? "border-gold bg-gold/5" : "border-gold/25 bg-background/40"
                }`}
              >
                <p className="text-[11px] uppercase tracking-widest text-muted-foreground mb-3">
                  Left · Honeycomb = 防伪码
                </p>
                <HoneycombSeal className="w-40 h-40 sm:w-48 sm:h-48 mb-4 animate-[pulse_4s_ease-in-out_infinite]" />
                <h3 className="text-base font-bold mb-2">Anti-counterfeit seal</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  This honeycomb mark <strong className="text-foreground font-semibold">is</strong> the authenticity
                  check. Scan it with your phone camera — if it opens our site and shows{" "}
                  <span className="text-emerald-400 font-medium">Genuine Alibarbar</span>, the product is official brand
                  stock.
                </p>
                <p className="text-xs text-muted-foreground/80 mt-4 leading-relaxed">
                  Print this URL inside / under the honeycomb artwork:
                  <br />
                  <span className="text-gold font-mono break-all">{HONEYCOMB_SEAL_URL}</span>
                </p>
              </div>

              <div className="rounded-xl border border-gold/25 bg-background/40 p-5 sm:p-6 flex flex-col items-center text-center">
                <p className="text-[11px] uppercase tracking-widest text-muted-foreground mb-3">
                  Right · QR = enter this page
                </p>
                <div className="w-36 h-36 sm:w-40 sm:h-40 p-2 bg-white rounded-md mb-4 shadow-[0_0_0_1px_hsl(45_75%_52%/0.35)]">
                  <PackagingQrMock />
                </div>
                <h3 className="text-base font-bold mb-2 flex items-center gap-2 justify-center">
                  <QrCode className="w-4 h-4 text-gold" />
                  Website verification panel
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The right QR is not a separate secret code. It simply opens this{" "}
                  <strong className="text-foreground font-semibold">/verify</strong> page so customers can see how to
                  check authenticity and use the honeycomb seal.
                </p>
                <p className="text-xs text-muted-foreground/80 mt-4 leading-relaxed">
                  Print this URL as the right-side QR:
                  <br />
                  <span className="text-gold font-mono break-all">{VERIFY_PAGE_URL}</span>
                </p>
              </div>
            </div>
          </section>

          <section className="reveal rounded-2xl border border-gold/25 bg-card/50 p-5 sm:p-8 mb-8 space-y-4 text-sm text-muted-foreground leading-relaxed">
            <h2 className="text-lg font-bold text-foreground">Quick summary</h2>
            <ul className="space-y-3">
              <li>
                <strong className="text-foreground">蜂窝（左边）</strong> = 防伪码。手机扫一下，跳到本站并显示正品，就是自家品牌。
              </li>
              <li>
                <strong className="text-foreground">二维码（右边）</strong> = 入口。扫开网站验证板块（本页），看说明、对照包装。
              </li>
              <li>
                不需要一物一码，也不用再输一串「通用品牌码」——全箱蜂窝扫同一个正品链接即可。
              </li>
            </ul>
          </section>

          <p className="reveal text-sm text-muted-foreground">
            Still unsure? See our{" "}
            <Link to="/faq/authenticity" className="text-primary font-semibold hover:text-gold">
              Authenticity FAQ
            </Link>{" "}
            or{" "}
            <Link to="/contact" className="text-primary font-semibold hover:text-gold">
              contact support
            </Link>
            .
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VerifyPage;

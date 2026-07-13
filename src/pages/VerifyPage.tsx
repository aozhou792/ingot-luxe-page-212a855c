import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Html5Qrcode } from "html5-qrcode";
import {
  Camera,
  CheckCircle2,
  ImagePlus,
  Loader2,
  QrCode,
  ShieldAlert,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Seo, breadcrumbNode } from "@/components/Seo";
import { useReveal } from "@/hooks/use-reveal";
import { Button } from "@/components/ui/button";
import {
  HONEYCOMB_SEALS,
  isGenuineHoneycombSeal,
  VERIFY_PAGE_URL,
} from "@/data/authenticity-codes";

type VerifyOutcome =
  | { status: "idle" }
  | { status: "genuine"; sealId: string }
  | { status: "fake"; sealId: string }
  | { status: "error"; message: string };

function applySealResult(raw: string): VerifyOutcome {
  const result = isGenuineHoneycombSeal(raw);
  if (!result.id) {
    return { status: "error", message: "No code found. Try again or upload a clearer photo of the honeycomb seal." };
  }
  if (result.genuine) {
    return { status: "genuine", sealId: result.id };
  }
  return { status: "fake", sealId: result.id };
}

const VerifyPage = () => {
  useReveal();
  const [searchParams] = useSearchParams();
  const scannerHostId = useId().replace(/:/g, "");
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [scanning, setScanning] = useState(false);
  const [busy, setBusy] = useState(false);
  const [outcome, setOutcome] = useState<VerifyOutcome>({ status: "idle" });

  const stopScanner = useCallback(async () => {
    const scanner = scannerRef.current;
    scannerRef.current = null;
    setScanning(false);
    if (!scanner) return;
    try {
      if (scanner.isScanning) await scanner.stop();
    } catch {
      // already stopped
    }
    try {
      scanner.clear();
    } catch {
      // ignore
    }
  }, []);

  const finishWithPayload = useCallback(
    async (raw: string) => {
      await stopScanner();
      setOutcome(applySealResult(raw));
    },
    [stopScanner],
  );

  // Deep-link from a honeycomb QR opened in the phone camera app
  useEffect(() => {
    const seal = searchParams.get("seal") ?? searchParams.get("code");
    if (!seal) return;
    setOutcome(applySealResult(seal));
  }, [searchParams]);

  useEffect(() => {
    return () => {
      void stopScanner();
    };
  }, [stopScanner]);

  async function startCameraScan() {
    setOutcome({ status: "idle" });
    setBusy(true);
    try {
      await stopScanner();
      const scanner = new Html5Qrcode(scannerHostId);
      scannerRef.current = scanner;
      setScanning(true);
      await scanner.start(
        { facingMode: "environment" },
        { fps: 8, qrbox: { width: 240, height: 240 } },
        (decoded) => {
          void finishWithPayload(decoded);
        },
        () => {
          // frame miss — ignore
        },
      );
    } catch (error) {
      setScanning(false);
      const message =
        error instanceof Error && /Permission|NotAllowed/i.test(error.message)
          ? "Camera permission denied. Allow camera access, or upload a photo of the honeycomb seal instead."
          : "Could not open the camera. Upload a photo of the honeycomb seal instead.";
      setOutcome({ status: "error", message });
    } finally {
      setBusy(false);
    }
  }

  async function onPhotoSelected(file: File | undefined) {
    if (!file) return;
    setOutcome({ status: "idle" });
    setBusy(true);
    await stopScanner();
    try {
      const scanner = new Html5Qrcode(scannerHostId);
      scannerRef.current = scanner;
      const decoded = await scanner.scanFile(file, true);
      await finishWithPayload(decoded);
    } catch {
      setOutcome({
        status: "error",
        message: "Could not read a QR code from that photo. Take a clear, well-lit photo of the honeycomb seal.",
      });
    } finally {
      setBusy(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  function resetCheck() {
    void stopScanner();
    setOutcome({ status: "idle" });
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: "Verify Alibarbar Authenticity",
        url: VERIFY_PAGE_URL,
        description:
          "Scan the packaging QR, then scan or upload the honeycomb anti-counterfeit seal to confirm a genuine Alibarbar product.",
      },
      breadcrumbNode([
        { name: "Home", path: "/" },
        { name: "Verify Authenticity", path: "/verify" },
      ]),
    ],
  };

  if (outcome.status === "genuine") {
    return (
      <div className="min-h-screen bg-background">
        <Seo
          title="Genuine Alibarbar | Authenticity Verified"
          description="Honeycomb seal verified — this is an official Alibarbar brand product."
          path="/verify"
          noindex
        />
        <Navbar />
        <main className="pt-[calc(6rem+env(safe-area-inset-top))] pb-16 flex items-center justify-center min-h-[70vh]">
          <div className="container max-w-lg">
            <div className="rounded-3xl border border-emerald-500/40 bg-gradient-to-b from-emerald-500/15 to-card/60 p-8 sm:p-10 text-center shadow-[0_0_60px_-20px_hsl(160_80%_40%/0.35)]">
              <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-5" />
              <p className="text-xs uppercase tracking-[0.25em] text-emerald-400 font-semibold mb-3">Verified</p>
              <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">
                Genuine <span className="text-gold">Alibarbar</span>
              </h1>
              <p className="text-muted-foreground mt-4 leading-relaxed">
                The honeycomb anti-counterfeit seal matches an official Alibarbar mark. This product is authentic brand
                stock.
              </p>
              <p className="text-xs text-muted-foreground/80 mt-4 font-mono">Alibarbar Ingot 9000 · {outcome.sealId}</p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild className="bg-gold text-primary-foreground hover:bg-primary">
                  <Link to="/#flavors">Shop flavours</Link>
                </Button>
                <Button type="button" variant="outline" className="border-gold/40" onClick={resetCheck}>
                  Check another
                </Button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (outcome.status === "fake") {
    return (
      <div className="min-h-screen bg-background">
        <Seo
          title="Not Genuine | Alibarbar Authenticity"
          description="This honeycomb seal did not match an official Alibarbar anti-counterfeit mark."
          path="/verify"
          noindex
        />
        <Navbar />
        <main className="pt-[calc(6rem+env(safe-area-inset-top))] pb-16 flex items-center justify-center min-h-[70vh]">
          <div className="container max-w-lg">
            <div className="rounded-3xl border border-destructive/40 bg-gradient-to-b from-destructive/15 to-card/60 p-8 sm:p-10 text-center">
              <XCircle className="w-16 h-16 text-destructive mx-auto mb-5" />
              <p className="text-xs uppercase tracking-[0.25em] text-destructive font-semibold mb-3">Warning</p>
              <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">Not a genuine seal</h1>
              <p className="text-muted-foreground mt-4 leading-relaxed">
                This honeycomb mark does not match an official Alibarbar anti-counterfeit seal. The product may be
                counterfeit or the packaging may be damaged / reprinted.
              </p>
              {outcome.sealId ? (
                <p className="text-xs text-muted-foreground/80 mt-4 font-mono">Scanned · {outcome.sealId}</p>
              ) : null}
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <Button type="button" className="bg-gold text-primary-foreground hover:bg-primary" onClick={resetCheck}>
                  Try again
                </Button>
                <Button asChild variant="outline" className="border-gold/40">
                  <Link to="/contact">Contact support</Link>
                </Button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Verify Authenticity | Alibarbar Australia"
        description="Scan the packaging QR, then scan or upload the honeycomb anti-counterfeit seal to confirm a genuine Alibarbar Ingot product."
        path="/verify"
        jsonLd={jsonLd}
      />
      <Navbar />
      <main className="pt-[calc(6rem+env(safe-area-inset-top))] pb-16 sm:pb-24">
        <div className="container max-w-3xl">
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Verify</span>
          </nav>

          <header className="mb-8 reveal">
            <p className="text-xs uppercase tracking-[0.25em] text-gold font-semibold mb-3">Authentication</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
              Verify your <span className="text-gold">Alibarbar</span>
            </h1>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed max-w-2xl">
              You are on the official verification page. Next, scan the{" "}
              <strong className="text-foreground font-semibold">honeycomb seal</strong> on the left of the box (or upload
              a photo of it) to confirm authenticity.
            </p>
            <div className="gold-divider mt-6 max-w-[6rem]" />
          </header>

          <ol className="reveal mb-8 grid sm:grid-cols-2 gap-4 text-sm">
            <li className="rounded-xl border border-gold/25 bg-card/50 p-4 flex gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold text-gold text-xs font-bold">
                1
              </span>
              <div>
                <p className="font-bold flex items-center gap-2">
                  <QrCode className="w-4 h-4 text-gold" />
                  Right QR
                </p>
                <p className="text-muted-foreground mt-1 leading-relaxed">
                  Scan the square QR on the box to open this page.
                </p>
              </div>
            </li>
            <li className="rounded-xl border border-gold/40 bg-gold/5 p-4 flex gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold text-primary-foreground text-xs font-bold">
                2
              </span>
              <div>
                <p className="font-bold flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-gold" />
                  Left honeycomb
                </p>
                <p className="text-muted-foreground mt-1 leading-relaxed">
                  Scan or upload the honeycomb seal here to get a genuine / not-genuine result.
                </p>
              </div>
            </li>
          </ol>

          <section className="reveal rounded-2xl border border-gold/35 bg-gradient-to-b from-card/80 to-card/40 p-5 sm:p-8 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Camera className="w-5 h-5 text-gold" />
              <h2 className="text-lg font-bold">Scan honeycomb seal</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
              Point your camera at the circular honeycomb mark on the packaging, or upload a clear photo of it.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-5">
              <Button
                type="button"
                disabled={busy}
                onClick={() => void startCameraScan()}
                className="h-12 bg-gold text-primary-foreground hover:bg-primary font-semibold"
              >
                {busy && !scanning ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <Camera className="w-4 h-4 mr-2" />
                )}
                {scanning ? "Camera on — aim at seal" : "Scan with camera"}
              </Button>
              <Button
                type="button"
                disabled={busy}
                variant="outline"
                className="h-12 border-gold/40"
                onClick={() => fileInputRef.current?.click()}
              >
                <ImagePlus className="w-4 h-4 mr-2" />
                Upload photo
              </Button>
              {scanning ? (
                <Button type="button" variant="ghost" className="h-12" onClick={() => void stopScanner()}>
                  Stop camera
                </Button>
              ) : null}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="sr-only"
              onChange={(e) => void onPhotoSelected(e.target.files?.[0])}
            />

            <div
              id={scannerHostId}
              className={`overflow-hidden rounded-xl border border-gold/20 bg-black/40 ${
                scanning ? "min-h-[260px]" : "min-h-0"
              }`}
            />

            {outcome.status === "error" ? (
              <div className="mt-5 rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 flex gap-3" role="alert">
                <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0" />
                <p className="text-sm text-muted-foreground leading-relaxed">{outcome.message}</p>
              </div>
            ) : null}
          </section>

          <section className="reveal rounded-2xl border border-gold/25 bg-card/50 p-5 sm:p-8 mb-8">
            <h2 className="text-lg font-bold mb-2">What the seal looks like</h2>
            <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
              Left side of the box: circular orange ring with dotted honeycomb pattern (not a square QR). Aim your camera
              at this mark, or upload a photo of it.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 items-center">
              <img
                src="/authenticity/honeycomb-ABSEAL01.png"
                alt="Example honeycomb anti-counterfeit seal"
                className="w-44 h-44 sm:w-52 sm:h-52 rounded-full object-contain bg-white shadow-[0_0_0_1px_hsl(45_75%_52%/0.25)]"
                width={208}
                height={208}
              />
              <div className="text-sm text-muted-foreground space-y-2">
                <p>
                  <strong className="text-foreground">Right QR</strong> → opens this page
                </p>
                <p>
                  <strong className="text-foreground">Left honeycomb</strong> → scan here for genuine / not-genuine
                </p>
                <p className="text-xs font-mono text-gold/90">
                  Print files: /authenticity/entry-verify.png + honeycomb-{HONEYCOMB_SEALS[0].id}.png …{" "}
                  {HONEYCOMB_SEALS[4].id}.png
                </p>
              </div>
            </div>
          </section>

          <p className="reveal text-sm text-muted-foreground leading-relaxed">
            Official packaging QR target:{" "}
            <span className="font-mono text-gold break-all">{VERIFY_PAGE_URL}</span>
            . Need help?{" "}
            <Link to="/faq/authenticity" className="text-primary font-semibold hover:text-gold">
              Authenticity FAQ
            </Link>{" "}
            or{" "}
            <Link to="/contact" className="text-primary font-semibold hover:text-gold">
              contact us
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

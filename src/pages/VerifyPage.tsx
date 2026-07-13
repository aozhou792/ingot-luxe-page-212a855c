import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
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
import { HONEYCOMB_SEALS, isGenuineHoneycombSeal, VERIFY_PAGE_URL } from "@/data/authenticity-codes";
import { matchHoneycombPhoto } from "@/lib/match-honeycomb-seal";

type VerifyOutcome =
  | { status: "idle" }
  | { status: "genuine"; sealId: string }
  | { status: "fake"; sealId: string }
  | { status: "error"; message: string };

const VerifyPage = () => {
  useReveal();
  const [searchParams] = useSearchParams();
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [cameraOn, setCameraOn] = useState(false);
  const [busy, setBusy] = useState(false);
  const [outcome, setOutcome] = useState<VerifyOutcome>({ status: "idle" });

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    setCameraOn(false);
  }, []);

  useEffect(() => {
    const seal = searchParams.get("seal") ?? searchParams.get("code");
    if (!seal) return;
    const result = isGenuineHoneycombSeal(seal);
    setOutcome(
      result.genuine
        ? { status: "genuine", sealId: result.id }
        : { status: "fake", sealId: result.id },
    );
  }, [searchParams]);

  useEffect(() => () => stopCamera(), [stopCamera]);

  async function applyVisualMatch(source: Blob | HTMLCanvasElement) {
    const match = await matchHoneycombPhoto(source);
    if (match.matched) {
      setOutcome({ status: "genuine", sealId: match.id });
    } else {
      setOutcome({ status: "fake", sealId: match.id || "UNKNOWN" });
    }
  }

  async function startCamera() {
    setOutcome({ status: "idle" });
    setBusy(true);
    try {
      stopCamera();
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setCameraOn(true);
    } catch {
      setOutcome({
        status: "error",
        message: "Camera permission denied or unavailable. Upload a clear photo of the honeycomb seal instead.",
      });
    } finally {
      setBusy(false);
    }
  }

  async function captureAndMatch() {
    const video = videoRef.current;
    if (!video || !cameraOn) return;
    setBusy(true);
    try {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas unsupported");
      ctx.drawImage(video, 0, 0);
      stopCamera();
      await applyVisualMatch(canvas);
    } catch {
      setOutcome({
        status: "error",
        message: "Could not capture the seal. Try again or upload a photo.",
      });
    } finally {
      setBusy(false);
    }
  }

  async function onPhotoSelected(file: File | undefined) {
    if (!file) return;
    setOutcome({ status: "idle" });
    setBusy(true);
    stopCamera();
    try {
      await applyVisualMatch(file);
    } catch {
      setOutcome({
        status: "error",
        message: "Could not read that photo. Take a clear, well-lit photo of the circular honeycomb seal.",
      });
    } finally {
      setBusy(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  function resetCheck() {
    stopCamera();
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
          "Scan the packaging QR, then photograph the honeycomb anti-counterfeit seal to confirm a genuine Alibarbar product.",
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
        description="Scan the packaging QR, then photograph the honeycomb anti-counterfeit seal to confirm a genuine Alibarbar Ingot product."
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
              You are on the official verification page. Next, photograph the{" "}
              <strong className="text-foreground font-semibold">circular honeycomb seal</strong> on the left of the box
              (or upload a photo) to confirm authenticity.
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
                  Photo or upload the circular honeycomb seal for a genuine / not-genuine result.
                </p>
              </div>
            </li>
          </ol>

          <section className="reveal rounded-2xl border border-gold/35 bg-gradient-to-b from-card/80 to-card/40 p-5 sm:p-8 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Camera className="w-5 h-5 text-gold" />
              <h2 className="text-lg font-bold">Check honeycomb seal</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
              Aim at the circular orange-ring seal (centre mesh hex + surrounding hex marks), then capture or upload.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-5">
              {!cameraOn ? (
                <Button
                  type="button"
                  disabled={busy}
                  onClick={() => void startCamera()}
                  className="h-12 bg-gold text-primary-foreground hover:bg-primary font-semibold"
                >
                  {busy ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Camera className="w-4 h-4 mr-2" />}
                  Open camera
                </Button>
              ) : (
                <Button
                  type="button"
                  disabled={busy}
                  onClick={() => void captureAndMatch()}
                  className="h-12 bg-gold text-primary-foreground hover:bg-primary font-semibold"
                >
                  {busy ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Camera className="w-4 h-4 mr-2" />}
                  Capture &amp; verify
                </Button>
              )}
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
              {cameraOn ? (
                <Button type="button" variant="ghost" className="h-12" onClick={stopCamera}>
                  Close camera
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
              className={`overflow-hidden rounded-xl border border-gold/20 bg-black/50 ${
                cameraOn ? "min-h-[260px]" : "hidden"
              }`}
            >
              <video ref={videoRef} playsInline muted className="w-full max-h-[420px] object-cover" />
            </div>

            {outcome.status === "error" ? (
              <div className="mt-5 rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 flex gap-3" role="alert">
                <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0" />
                <p className="text-sm text-muted-foreground leading-relaxed">{outcome.message}</p>
              </div>
            ) : null}
          </section>

          <div className="reveal mb-8">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Print reference · 5 seals</p>
            <div className="grid grid-cols-5 gap-2 sm:gap-3">
              {HONEYCOMB_SEALS.map((s) => (
                <a
                  key={s.id}
                  href={`/authenticity/honeycomb-${s.id}.png`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-gold/25 bg-white p-1 hover:border-gold transition-colors"
                  title={s.id}
                >
                  <img
                    src={`/authenticity/honeycomb-${s.id}.png`}
                    alt={`Honeycomb seal ${s.id}`}
                    className="w-full aspect-square object-contain rounded-full"
                    loading="lazy"
                  />
                </a>
              ))}
            </div>
          </div>

          <p className="reveal text-sm text-muted-foreground leading-relaxed">
            Official packaging QR target:{" "}
            <span className="font-mono text-gold break-all">{VERIFY_PAGE_URL}</span>. Need help?{" "}
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

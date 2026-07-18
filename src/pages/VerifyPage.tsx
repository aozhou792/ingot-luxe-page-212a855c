import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
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
import { fileToVerifyDataUrl, VERIFY_PAGE_URL, verifySealPhoto } from "@/data/authenticity-codes";

type VerifyOutcome =
  | { status: "idle" }
  | { status: "genuine"; sealId: string; score?: number }
  | { status: "fake"; sealId: string; score?: number }
  | { status: "error"; message: string };

const VerifyPage = () => {
  useReveal();
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

  const applyApiResult = useCallback((result: Awaited<ReturnType<typeof verifySealPhoto>>) => {
    if (!result.ok) {
      setOutcome({ status: "error", message: result.error });
      return;
    }
    if (result.authentic) {
      setOutcome({ status: "genuine", sealId: result.code, score: result.score });
    } else {
      setOutcome({ status: "fake", sealId: result.code || "UNKNOWN", score: result.score });
    }
  }, []);

  useEffect(() => () => stopCamera(), [stopCamera]);

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
        message: "Camera permission denied. Upload a clear photo of the honeycomb seal instead.",
      });
    } finally {
      setBusy(false);
    }
  }

  async function captureAndVerify() {
    const video = videoRef.current;
    if (!video || !cameraOn) return;
    setBusy(true);
    setOutcome({ status: "idle" });
    try {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas unsupported");
      ctx.drawImage(video, 0, 0);
      stopCamera();
      const dataUrl = canvas.toDataURL("image/jpeg", 0.72);
      const result = await verifySealPhoto(dataUrl);
      applyApiResult(result);
    } catch {
      setOutcome({
        status: "error",
        message: "Could not verify that photo. Try again with the full circular seal in frame.",
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
      const dataUrl = await fileToVerifyDataUrl(file);
      const result = await verifySealPhoto(dataUrl);
      applyApiResult(result);
    } catch {
      setOutcome({
        status: "error",
        message: "Could not read that photo. Use a clear, well-lit picture of the circular honeycomb seal.",
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
          "Photograph the honeycomb anti-counterfeit seal to confirm a genuine Alibarbar product via official template matching.",
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
        <Seo title="Genuine Alibarbar | Authenticity Verified" description="Seal photo verified." path="/verify" noindex />
        <Navbar />
        <main className="pt-[calc(6rem+env(safe-area-inset-top))] pb-16 flex items-center justify-center min-h-[70vh]">
          <div className="container max-w-lg">
            <div className="rounded-3xl border border-emerald-500/40 bg-gradient-to-b from-emerald-500/15 to-card/60 p-8 sm:p-10 text-center">
              <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-5" />
              <p className="text-xs uppercase tracking-[0.25em] text-emerald-400 font-semibold mb-3">Verified</p>
              <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">
                Genuine <span className="text-gold">Alibarbar</span>
              </h1>
              <p className="text-muted-foreground mt-4 leading-relaxed">
                Your photo matched an official honeycomb seal template in our authenticity library.
              </p>
              <p className="text-xs text-muted-foreground/80 mt-4 font-mono">
                Template · {outcome.sealId}
                {outcome.score != null ? ` · score ${outcome.score.toFixed(3)}` : ""}
              </p>
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
        <Seo title="Not Genuine | Alibarbar Authenticity" description="Seal photo did not match." path="/verify" noindex />
        <Navbar />
        <main className="pt-[calc(6rem+env(safe-area-inset-top))] pb-16 flex items-center justify-center min-h-[70vh]">
          <div className="container max-w-lg">
            <div className="rounded-3xl border border-destructive/40 bg-gradient-to-b from-destructive/15 to-card/60 p-8 sm:p-10 text-center">
              <XCircle className="w-16 h-16 text-destructive mx-auto mb-5" />
              <p className="text-xs uppercase tracking-[0.25em] text-destructive font-semibold mb-3">Warning</p>
              <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">Not a genuine seal</h1>
              <p className="text-muted-foreground mt-4 leading-relaxed">
                This photo did not match our official seal templates closely enough. Retake with the full circular mark
                filling the frame, or the product may not be genuine.
              </p>
              {outcome.score != null ? (
                <p className="text-xs text-muted-foreground/80 mt-4 font-mono">Best score · {outcome.score.toFixed(3)}</p>
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
        description="Photograph the honeycomb seal — our server matches it against official templates."
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
              Photograph the circular orange-ring honeycomb seal on the box. Our server compares your photo against six
              official 点阵 templates (shared seals, not one code per device — no QR inside the left seal).
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
                <p className="text-muted-foreground mt-1">Opens this verification page.</p>
              </div>
            </li>
            <li className="rounded-xl border border-gold/40 bg-gold/5 p-4 flex gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold text-primary-foreground text-xs font-bold">
                2
              </span>
              <div>
                <p className="font-bold flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-gold" />
                  Photo the honeycomb
                </p>
                <p className="text-muted-foreground mt-1">Photo the left 点阵 seal — server matches official templates.</p>
              </div>
            </li>
          </ol>

          <section className="reveal rounded-2xl border border-gold/35 bg-gradient-to-b from-card/80 to-card/40 p-5 sm:p-8 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Camera className="w-5 h-5 text-gold" />
              <h2 className="text-lg font-bold">Photograph honeycomb seal</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
              Fill the frame with the full circular seal, avoid heavy glare, and hold steady. Straight-on shots of a
              clear print typically match at about 85–95%; angled, blurry, or glare-heavy phone photos are closer to
              60–80%.
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
                  onClick={() => void captureAndVerify()}
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
              className={`overflow-hidden rounded-xl border border-gold/20 bg-black/40 ${
                cameraOn ? "min-h-[280px]" : "min-h-0"
              }`}
            >
              <video ref={videoRef} playsInline muted className={`w-full ${cameraOn ? "block" : "hidden"}`} />
            </div>

            {outcome.status === "error" ? (
              <div className="mt-5 rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 flex gap-3" role="alert">
                <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0" />
                <p className="text-sm text-muted-foreground leading-relaxed">{outcome.message}</p>
              </div>
            ) : null}
          </section>

          <p className="reveal text-sm text-muted-foreground leading-relaxed mb-6">
            Entry page: <span className="font-mono text-gold break-all">{VERIFY_PAGE_URL}</span>
          </p>

          <section className="reveal rounded-2xl border border-border/60 bg-card/30 p-5 sm:p-6">
            <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-muted-foreground mb-4">
              Official seal templates (print)
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Six shared 点阵 seals — print any at random on packaging. No QR inside these marks.
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
              {["01", "02", "03", "04", "05", "06"].map((n) => (
                <a
                  key={n}
                  href={`/authenticity/honeycomb-ABSEAL${n}.png`}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-full overflow-hidden border border-gold/25 bg-white aspect-square hover:border-gold/60 transition-colors"
                >
                  <img
                    src={`/authenticity/honeycomb-ABSEAL${n}.png`}
                    alt={`Official honeycomb seal ABSEAL${n}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </a>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VerifyPage;

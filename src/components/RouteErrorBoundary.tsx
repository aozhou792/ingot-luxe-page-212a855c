import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = {
  children: ReactNode;
};

type State = {
  error: Error | null;
};

/** Catches chunk-load / render failures so users are not left on a blank screen. */
export class RouteErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Route render failed:", error, info.componentStack);
  }

  private reload = () => {
    window.location.reload();
  };

  private goHome = () => {
    window.location.href = "/";
  };

  render() {
    if (!this.state.error) return this.props.children;

    const isChunkError = /Failed to fetch dynamically imported module|Loading chunk|Importing a module script failed/i.test(
      this.state.error.message,
    );

    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
        <div className="max-w-md text-center space-y-5">
          <p className="text-xs uppercase tracking-[0.25em] text-primary font-semibold">Alibarbar Australia</p>
          <h1 className="text-2xl sm:text-3xl font-bold">
            {isChunkError ? "Page failed to load" : "Something went wrong"}
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {isChunkError
              ? "A newer version of the site may have deployed. Please reload to get the latest files."
              : "Please reload the page. If it keeps happening, return home and try again."}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button
              type="button"
              onClick={this.reload}
              className="inline-flex items-center justify-center min-h-[48px] px-8 rounded-full bg-gold text-primary-foreground font-bold uppercase tracking-widest text-xs shadow-gold hover:opacity-95 transition"
            >
              Reload
            </button>
            <button
              type="button"
              onClick={this.goHome}
              className="inline-flex items-center justify-center min-h-[48px] px-8 rounded-full border border-gold/40 text-foreground font-bold uppercase tracking-widest text-xs hover:border-gold hover:text-primary transition"
            >
              Home
            </button>
          </div>
        </div>
      </div>
    );
  }
}

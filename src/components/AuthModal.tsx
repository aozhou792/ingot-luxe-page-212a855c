import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { requestPasswordReset } from "@/lib/auth-api";

type AuthModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
};

export const AuthModal = ({ open, onOpenChange, onSuccess }: AuthModalProps) => {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<"login" | "register" | "forgot">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const reset = () => {
    setEmail("");
    setPassword("");
    setDisplayName("");
  };

  useEffect(() => {
    if (!open) {
      setMode("login");
      setEmail("");
      setPassword("");
      setDisplayName("");
      setSubmitting(false);
    }
  }, [open]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      if (mode === "login") {
        await login(email, password);
        toast.success("Signed in");
      } else if (mode === "register") {
        await register(email, password, displayName);
        toast.success("Account created and signed in");
      } else {
        await requestPasswordReset(email);
        toast.success("If this email exists, a reset link has been sent.");
        setMode("login");
      }
      reset();
      if (mode !== "forgot") {
        onOpenChange(false);
        onSuccess?.();
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Authentication failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {mode === "login" ? "Sign in" : mode === "register" ? "Create an account" : "Forgot password"}
          </DialogTitle>
          <DialogDescription>
            {mode === "login"
              ? "Sign in to leave a review on Alibarbar Australia."
              : mode === "register"
                ? "Create an account to review your favourite flavours."
                : "Enter your email and we will send you a reset link."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" ? (
            <div className="space-y-1.5">
              <Label htmlFor="auth-name">Display name</Label>
              <Input
                id="auth-name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="How your name shows on reviews"
                autoComplete="name"
              />
            </div>
          ) : null}

          <div className="space-y-1.5">
            <Label htmlFor="auth-email">Email</Label>
            <Input
              id="auth-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          {mode !== "forgot" ? (
            <div className="space-y-1.5">
              <Label htmlFor="auth-password">Password</Label>
              <Input
                id="auth-password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={mode === "login" ? "current-password" : "new-password"}
                placeholder="At least 6 characters"
              />
            </div>
          ) : null}

          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting
              ? "Please wait…"
              : mode === "login"
                ? "Sign in"
                : mode === "register"
                  ? "Create account"
                  : "Send reset link"}
          </Button>
        </form>

        <div className="flex flex-col gap-2">
          {mode === "login" ? (
            <>
              <button
                type="button"
                className="text-sm text-muted-foreground hover:text-primary transition-colors text-left"
                onClick={() => setMode("register")}
              >
                No account? Create one
              </button>
              <button
                type="button"
                className="text-sm text-muted-foreground hover:text-primary transition-colors text-left"
                onClick={() => setMode("forgot")}
              >
                Forgot password?
              </button>
            </>
          ) : (
            <button
              type="button"
              className="text-sm text-muted-foreground hover:text-primary transition-colors text-left"
              onClick={() => setMode("login")}
            >
              Back to sign in
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

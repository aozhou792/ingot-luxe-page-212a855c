import { createToken } from "./_lib/auth-tokens.js";
import { requestPasswordReset, resetPasswordWithToken } from "./_lib/password-reset-store.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request): Promise<Response> {
  try {
    const body = (await request.json()) as {
      action?: "request-reset" | "reset-password";
      email?: string;
      token?: string;
      password?: string;
    };

    if (body.action === "request-reset") {
      const email = (body.email ?? "").trim();
      if (!EMAIL_RE.test(email)) {
        return Response.json({ error: "Enter a valid email address." }, { status: 400 });
      }

      await requestPasswordReset(email);
      return Response.json({
        ok: true,
        message: "If your email exists in our system, a reset link has been sent.",
      });
    }

    if (body.action === "reset-password") {
      const token = body.token ?? "";
      const password = body.password ?? "";
      const result = await resetPasswordWithToken(token, password);
      if ("error" in result) {
        return Response.json({ error: result.error }, { status: 400 });
      }

      const authToken = createToken({
        id: result.user.id,
        email: result.user.email,
        displayName: result.user.displayName,
      });

      return Response.json({ token: authToken, user: result.user });
    }

    return Response.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("auth-password POST failed:", error);
    const message = error instanceof Error ? error.message : "Password reset failed";
    return Response.json({ error: message }, { status: 500 });
  }
}

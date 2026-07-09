import { authenticatedUser, createToken } from "./_lib/auth-tokens.js";
import { sendWelcomeEmail } from "./_lib/marketing-email.js";
import { authenticateUser, getUserById, registerUser } from "./_lib/user-store.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function GET(request: Request): Promise<Response> {
  const payload = authenticatedUser(request);
  if (!payload) return Response.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const user = await getUserById(payload.sub);
    if (!user) return Response.json({ error: "Account not found" }, { status: 404 });
    return Response.json({ user });
  } catch (error) {
    console.error("auth GET failed:", error);
    return Response.json({ error: "Failed to load account" }, { status: 500 });
  }
}

export async function POST(request: Request): Promise<Response> {
  try {
    const body = (await request.json()) as {
      action?: "register" | "login";
      email?: string;
      password?: string;
      displayName?: string;
    };

    const action = body.action;
    const email = (body.email ?? "").trim();
    const password = body.password ?? "";

    if (action !== "register" && action !== "login") {
      return Response.json({ error: "Invalid action" }, { status: 400 });
    }
    if (!EMAIL_RE.test(email)) {
      return Response.json({ error: "Enter a valid email address." }, { status: 400 });
    }
    if (password.length < 6) {
      return Response.json({ error: "Password must be at least 6 characters." }, { status: 400 });
    }

    const result =
      action === "register"
        ? await registerUser(email, password, body.displayName ?? "")
        : await authenticateUser(email, password);

    if ("error" in result) {
      return Response.json({ error: result.error }, { status: action === "register" ? 409 : 401 });
    }

    const token = createToken({
      id: result.user.id,
      email: result.user.email,
      displayName: result.user.displayName,
    });

    if (action === "register") {
      try {
        await sendWelcomeEmail(result.user);
      } catch (error) {
        console.error("welcome email failed:", error);
      }
    }

    return Response.json({ token, user: result.user });
  } catch (error) {
    console.error("auth POST failed:", error);
    const message = error instanceof Error ? error.message : "Authentication failed";
    return Response.json({ error: message }, { status: 500 });
  }
}

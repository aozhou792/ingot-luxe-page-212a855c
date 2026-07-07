export type AuthUser = {
  id: string;
  email: string;
  displayName: string;
};

async function parseError(response: Response): Promise<string> {
  try {
    const data = (await response.json()) as { error?: string };
    return data.error ?? `Request failed (${response.status})`;
  } catch {
    return `Request failed (${response.status})`;
  }
}

export async function authRequest(
  action: "register" | "login",
  input: { email: string; password: string; displayName?: string },
): Promise<{ token: string; user: AuthUser }> {
  const response = await fetch("/api/auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action, ...input }),
  });
  if (!response.ok) throw new Error(await parseError(response));
  return (await response.json()) as { token: string; user: AuthUser };
}

export async function requestPasswordReset(email: string): Promise<void> {
  const response = await fetch("/api/auth-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "request-reset", email }),
  });
  if (!response.ok) throw new Error(await parseError(response));
}

export async function completePasswordReset(
  token: string,
  password: string,
): Promise<{ token: string; user: AuthUser }> {
  const response = await fetch("/api/auth-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "reset-password", token, password }),
  });
  if (!response.ok) throw new Error(await parseError(response));
  return (await response.json()) as { token: string; user: AuthUser };
}

export async function fetchCurrentUser(token: string): Promise<AuthUser | null> {
  const response = await fetch("/api/auth", {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!response.ok) return null;
  const data = (await response.json()) as { user: AuthUser };
  return data.user;
}

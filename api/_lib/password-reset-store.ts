import { list, put } from "@vercel/blob";
import { createHash, randomBytes, randomUUID, timingSafeEqual } from "node:crypto";
import { sendPasswordResetEmail } from "./password-reset-email.js";
import { getUserByEmail, setUserPasswordById, type PublicUser } from "./user-store.js";

const RESET_TOKENS_PATH = "auth/password-resets.json";
const RESET_TOKEN_TTL_MS = 60 * 60 * 1000;

type StoredResetToken = {
  id: string;
  userId: string;
  email: string;
  tokenHash: string;
  createdAt: string;
  expiresAt: string;
};

function blobToken(): string {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) throw new Error("BLOB_READ_WRITE_TOKEN is not configured");
  return token;
}

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

function tokenHashEquals(a: string, b: string): boolean {
  const left = Buffer.from(a, "hex");
  const right = Buffer.from(b, "hex");
  return left.length === right.length && timingSafeEqual(left, right);
}

function cleanExpired(tokens: StoredResetToken[], nowMs: number): StoredResetToken[] {
  return tokens.filter((token) => {
    const expiresAtMs = Date.parse(token.expiresAt);
    return Number.isFinite(expiresAtMs) && expiresAtMs > nowMs;
  });
}

async function readResetTokens(): Promise<StoredResetToken[]> {
  const token = blobToken();
  const { blobs } = await list({ prefix: RESET_TOKENS_PATH, token });
  const blob = blobs.find((b) => b.pathname === RESET_TOKENS_PATH);
  if (!blob) return [];

  const response = await fetch(blob.url, {
    headers: { authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!response.ok) return [];
  return (await response.json()) as StoredResetToken[];
}

async function writeResetTokens(tokens: StoredResetToken[]): Promise<void> {
  const token = blobToken();
  await put(RESET_TOKENS_PATH, JSON.stringify(tokens), {
    access: "private",
    contentType: "application/json",
    token,
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

/**
 * Always resolves without revealing whether the account exists.
 * If the account exists, sends a reset email and stores an expiring token.
 */
export async function requestPasswordReset(email: string): Promise<void> {
  const normalizedEmail = email.trim().toLowerCase();
  if (!normalizedEmail) return;

  const user = await getUserByEmail(normalizedEmail);
  if (!user) return;

  const nowMs = Date.now();
  const existing = cleanExpired(await readResetTokens(), nowMs).filter((item) => item.userId !== user.id);

  const rawToken = randomBytes(32).toString("base64url");
  const nextRecord: StoredResetToken = {
    id: randomUUID(),
    userId: user.id,
    email: user.email,
    tokenHash: hashToken(rawToken),
    createdAt: new Date(nowMs).toISOString(),
    expiresAt: new Date(nowMs + RESET_TOKEN_TTL_MS).toISOString(),
  };

  await writeResetTokens([nextRecord, ...existing]);

  try {
    await sendPasswordResetEmail(user.email, rawToken);
  } catch (error) {
    // Best-effort rollback so failed sends do not leave unreachable active tokens.
    await writeResetTokens(existing).catch(() => {});
    throw error;
  }
}

export async function resetPasswordWithToken(
  token: string,
  nextPassword: string,
): Promise<{ user: PublicUser } | { error: string }> {
  const rawToken = token.trim();
  if (!rawToken) return { error: "Reset link is invalid." };
  if (nextPassword.length < 6) return { error: "Password must be at least 6 characters." };

  const nowMs = Date.now();
  const active = cleanExpired(await readResetTokens(), nowMs);
  const hashed = hashToken(rawToken);
  const tokenIndex = active.findIndex((item) => tokenHashEquals(item.tokenHash, hashed));
  if (tokenIndex < 0) return { error: "Reset link is invalid or expired." };

  const entry = active[tokenIndex];
  const user = await setUserPasswordById(entry.userId, nextPassword);
  if (!user) return { error: "Account not found." };

  const nextTokens = active.filter((_, index) => index !== tokenIndex);
  await writeResetTokens(nextTokens);
  return { user };
}

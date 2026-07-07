import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

const TOKEN_TTL_SECONDS = 60 * 60 * 24 * 30;

function authSecret(): string {
  const secret = process.env.AUTH_JWT_SECRET;
  if (!secret) throw new Error("AUTH_JWT_SECRET is not configured");
  return secret;
}

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const derived = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${derived}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, derived] = stored.split(":");
  if (!salt || !derived) return false;
  const expected = Buffer.from(derived, "hex");
  const actual = scryptSync(password, salt, 64);
  if (expected.length !== actual.length) return false;
  return timingSafeEqual(expected, actual);
}

function base64url(input: Buffer | string): string {
  return Buffer.from(input).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function sign(data: string): string {
  return base64url(createHmac("sha256", authSecret()).update(data).digest());
}

export type TokenPayload = {
  sub: string;
  email: string;
  name: string;
  iat: number;
  exp: number;
};

export function createToken(user: { id: string; email: string; displayName: string }): string {
  const header = base64url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const now = Math.floor(Date.now() / 1000);
  const payload = base64url(
    JSON.stringify({
      sub: user.id,
      email: user.email,
      name: user.displayName,
      iat: now,
      exp: now + TOKEN_TTL_SECONDS,
    }),
  );
  const signature = sign(`${header}.${payload}`);
  return `${header}.${payload}.${signature}`;
}

export function verifyToken(token: string): TokenPayload | null {
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [header, payload, signature] = parts;

  const expectedSig = sign(`${header}.${payload}`);
  const a = Buffer.from(signature);
  const b = Buffer.from(expectedSig);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  try {
    const decoded = JSON.parse(Buffer.from(payload, "base64").toString("utf8")) as TokenPayload;
    if (typeof decoded.exp !== "number" || decoded.exp < Math.floor(Date.now() / 1000)) return null;
    return decoded;
  } catch {
    return null;
  }
}

export function bearerToken(request: Request): string | null {
  const header = request.headers.get("authorization");
  if (!header?.startsWith("Bearer ")) return null;
  return header.slice(7).trim() || null;
}

export function authenticatedUser(request: Request): TokenPayload | null {
  const token = bearerToken(request);
  if (!token) return null;
  return verifyToken(token);
}

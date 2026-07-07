import { list, put } from "@vercel/blob";
import { randomUUID } from "node:crypto";
import { hashPassword, verifyPassword } from "./auth-tokens.js";

const USERS_PATH = "users/index.json";

export type StoredUser = {
  id: string;
  email: string;
  displayName: string;
  passwordHash: string;
  createdAt: string;
};

export type PublicUser = {
  id: string;
  email: string;
  displayName: string;
};

function blobToken(): string {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) throw new Error("BLOB_READ_WRITE_TOKEN is not configured");
  return token;
}

async function readUsers(): Promise<StoredUser[]> {
  const token = blobToken();
  const { blobs } = await list({ prefix: USERS_PATH, token });
  const blob = blobs.find((b) => b.pathname === USERS_PATH);
  if (!blob) return [];
  const response = await fetch(blob.url, {
    headers: { authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!response.ok) return [];
  return (await response.json()) as StoredUser[];
}

async function writeUsers(users: StoredUser[]): Promise<void> {
  const token = blobToken();
  await put(USERS_PATH, JSON.stringify(users), {
    access: "private",
    contentType: "application/json",
    token,
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

function toPublic(user: StoredUser): PublicUser {
  return { id: user.id, email: user.email, displayName: user.displayName };
}

export async function registerUser(
  email: string,
  password: string,
  displayName: string,
): Promise<{ user: PublicUser } | { error: string }> {
  const normalizedEmail = email.trim().toLowerCase();
  const users = await readUsers();
  if (users.some((u) => u.email === normalizedEmail)) {
    return { error: "An account with this email already exists." };
  }

  const user: StoredUser = {
    id: randomUUID(),
    email: normalizedEmail,
    displayName: displayName.trim() || normalizedEmail.split("@")[0],
    passwordHash: hashPassword(password),
    createdAt: new Date().toISOString(),
  };

  await writeUsers([...users, user]);
  return { user: toPublic(user) };
}

export async function authenticateUser(
  email: string,
  password: string,
): Promise<{ user: PublicUser } | { error: string }> {
  const normalizedEmail = email.trim().toLowerCase();
  const users = await readUsers();
  const user = users.find((u) => u.email === normalizedEmail);
  if (!user || !verifyPassword(password, user.passwordHash)) {
    return { error: "Invalid email or password." };
  }
  return { user: toPublic(user) };
}

export async function getUserById(id: string): Promise<PublicUser | null> {
  const users = await readUsers();
  const user = users.find((u) => u.id === id);
  return user ? toPublic(user) : null;
}

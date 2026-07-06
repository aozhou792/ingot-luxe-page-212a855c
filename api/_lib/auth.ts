export function getAdminKey(): string | undefined {
  return process.env.ADMIN_API_KEY;
}

export function isAuthorized(request: Request): boolean {
  const expected = getAdminKey();
  if (!expected) return false;
  const header = request.headers.get("authorization");
  if (!header?.startsWith("Bearer ")) return false;
  return header.slice(7) === expected;
}

export function unauthorizedResponse(): Response {
  return Response.json({ error: "Unauthorized" }, { status: 401 });
}

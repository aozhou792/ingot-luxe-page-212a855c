export async function POST(): Promise<Response> {
  return Response.json(
    { ok: false, authentic: false, error: "Authenticity verification is temporarily unavailable." },
    { status: 503 },
  );
}

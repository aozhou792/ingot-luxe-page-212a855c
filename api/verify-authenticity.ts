import { HONEYCOMB_SEALS, normalizeSealPayload } from "./_lib/seal-tokens.js";

const TOKEN_SET = new Set(HONEYCOMB_SEALS.map((s) => s.id));

export async function POST(request: Request): Promise<Response> {
  try {
    const body = (await request.json()) as { code?: string; token?: string; seal?: string };
    const raw = body.code ?? body.token ?? body.seal ?? "";
    const id = normalizeSealPayload(raw);

    if (!id) {
      return Response.json(
        { ok: false, authentic: false, error: "Scan or enter the authenticity token from the honeycomb seal." },
        { status: 400 },
      );
    }

    if (!TOKEN_SET.has(id)) {
      return Response.json({
        ok: true,
        authentic: false,
        code: id,
        message: "This token is not in the official Alibarbar authenticity code library.",
      });
    }

    return Response.json({
      ok: true,
      authentic: true,
      code: id,
      productHint: "Alibarbar Ingot 9000",
      message: "Token verified — this is a genuine Alibarbar authenticity seal.",
    });
  } catch (error) {
    console.error("verify-authenticity failed:", error);
    const message = error instanceof Error ? error.message : "Could not verify token";
    return Response.json({ ok: false, authentic: false, error: message }, { status: 500 });
  }
}

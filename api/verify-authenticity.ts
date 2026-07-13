import { normalizeSealPayload, HONEYCOMB_SEALS } from "./_lib/seal-tokens.js";
import { matchSealPhotoBuffer, parseDataUrlImage, THRESHOLD } from "./_lib/seal-photo-match.js";

const TOKEN_SET = new Set(HONEYCOMB_SEALS.map((s) => s.id));

type Body = {
  code?: string;
  token?: string;
  seal?: string;
  /** data:image/jpeg;base64,... or raw base64 */
  imageBase64?: string;
  image?: string;
};

function decodeImageInput(raw: string): Buffer | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith("data:image/")) return parseDataUrlImage(trimmed);
  try {
    return Buffer.from(trimmed, "base64");
  } catch {
    return null;
  }
}

export async function POST(request: Request): Promise<Response> {
  try {
    const body = (await request.json()) as Body;

    // --- Photo comparison path (primary) ---
    const imageRaw = body.imageBase64 ?? body.image;
    if (imageRaw) {
      const buf = decodeImageInput(imageRaw);
      if (!buf || buf.length < 100) {
        return Response.json(
          { ok: false, authentic: false, error: "Could not read the photo. Try a clearer JPEG/PNG of the honeycomb seal." },
          { status: 400 },
        );
      }
      // Cap ~4MB decoded
      if (buf.length > 4_500_000) {
        return Response.json(
          { ok: false, authentic: false, error: "Photo is too large. Capture again or upload a smaller image." },
          { status: 400 },
        );
      }

      const match = await matchSealPhotoBuffer(buf);
      if (match.matched) {
        return Response.json({
          ok: true,
          authentic: true,
          method: "photo",
          code: match.id,
          score: Number(match.score.toFixed(4)),
          threshold: THRESHOLD,
          productHint: "Alibarbar Ingot 9000",
          message: "Photo matched an official honeycomb seal template — genuine Alibarbar.",
        });
      }
      return Response.json({
        ok: true,
        authentic: false,
        method: "photo",
        code: match.id,
        score: Number(match.score.toFixed(4)),
        threshold: THRESHOLD,
        message:
          "Photo did not match our official seal templates closely enough. Retake with the full circular seal filling the frame, good lighting, and less glare.",
      });
    }

    // --- Token / QR payload path (optional) ---
    const raw = body.code ?? body.token ?? body.seal ?? "";
    const id = normalizeSealPayload(raw);
    if (!id) {
      return Response.json(
        {
          ok: false,
          authentic: false,
          error: "Upload a photo of the honeycomb seal, or provide a seal token.",
        },
        { status: 400 },
      );
    }

    if (!TOKEN_SET.has(id)) {
      return Response.json({
        ok: true,
        authentic: false,
        method: "token",
        code: id,
        message: "This token is not in the official Alibarbar authenticity code library.",
      });
    }

    return Response.json({
      ok: true,
      authentic: true,
      method: "token",
      code: id,
      productHint: "Alibarbar Ingot 9000",
      message: "Token verified — this is a genuine Alibarbar authenticity seal.",
    });
  } catch (error) {
    console.error("verify-authenticity failed:", error);
    const message = error instanceof Error ? error.message : "Could not verify";
    return Response.json({ ok: false, authentic: false, error: message }, { status: 500 });
  }
}

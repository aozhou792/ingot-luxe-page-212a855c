/**
 * Legacy endpoint — authenticity is now URL-based (honeycomb → /verify?seal=1).
 * Kept so old clients calling POST /api/verify-authenticity do not 404.
 */
export async function POST(): Promise<Response> {
  return Response.json({
    ok: true,
    authentic: true,
    kind: "honeycomb",
    message:
      "Scan the honeycomb anti-counterfeit seal on the box. It opens /verify?seal=1 and confirms a genuine Alibarbar product. The right-side QR only opens the /verify guide page.",
    productHint: "Alibarbar Ingot 9000",
    verifyUrl: "https://www.alibarbar.mom/verify",
    honeycombUrl: "https://www.alibarbar.mom/verify?seal=1",
  });
}

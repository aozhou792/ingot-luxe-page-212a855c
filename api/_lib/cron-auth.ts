/** Vercel Cron sends Authorization: Bearer ${CRON_SECRET}. */
export function authorizeCron(request: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    console.warn("CRON_SECRET missing — cron endpoints disabled");
    return false;
  }
  return request.headers.get("authorization") === `Bearer ${secret}`;
}

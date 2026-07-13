/**
 * Generate 5 printable honeycomb-seal QR PNGs for packaging.
 *
 *   node scripts/generate-honeycomb-qrs.mjs
 *
 * Output: public/authenticity/honeycomb-ABSEAL0N.png
 * Right-side packaging QR (entry only): public/authenticity/entry-verify.png
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import QRCode from "qrcode";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "../public/authenticity");
const SITE = "https://www.alibarbar.mom";
const VERIFY = `${SITE}/verify`;

const SEALS = ["ABSEAL01", "ABSEAL02", "ABSEAL03", "ABSEAL04", "ABSEAL05"];

await mkdir(outDir, { recursive: true });

await QRCode.toFile(path.join(outDir, "entry-verify.png"), VERIFY, {
  type: "png",
  width: 1024,
  margin: 2,
  errorCorrectionLevel: "H",
  color: { dark: "#0a0a0a", light: "#ffffff" },
});

const manifest = {
  entryQr: {
    file: "entry-verify.png",
    url: VERIFY,
    use: "Right-side packaging QR — opens verify page only",
  },
  honeycombSeals: [],
};

for (const id of SEALS) {
  const url = `${VERIFY}?seal=${id}`;
  const file = `honeycomb-${id}.png`;
  await QRCode.toFile(path.join(outDir, file), url, {
    type: "png",
    width: 1024,
    margin: 2,
    errorCorrectionLevel: "H",
    color: { dark: "#0a0a0a", light: "#ffffff" },
  });
  manifest.honeycombSeals.push({
    id,
    file,
    url,
    use: "Left honeycomb anti-counterfeit seal — print any of these 5 on boxes",
  });
  console.log(`✓ ${file} → ${url}`);
}

await writeFile(path.join(outDir, "README.txt"), `Alibarbar packaging authenticity QR codes
==========================================

RIGHT QR (box entry — same on every box):
  entry-verify.png
  → ${VERIFY}

LEFT HONEYCOMB (anti-counterfeit — pick any of these 5 to print):
${SEALS.map((id) => `  honeycomb-${id}.png → ${VERIFY}?seal=${id}`).join("\n")}

Customer flow:
  1. Scan right QR → opens /verify
  2. On that page, scan or upload the left honeycomb QR
  3. Matching seal → Genuine page; otherwise → Not genuine page
`);

await writeFile(path.join(outDir, "manifest.json"), JSON.stringify(manifest, null, 2));
console.log(`\nWrote PNGs + README to ${outDir}`);

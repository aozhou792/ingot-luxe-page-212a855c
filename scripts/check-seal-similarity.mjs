import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const j = JSON.parse(readFileSync(path.join(root, "api/_lib/seal-fingerprints.json"), "utf8"));

function corr(a, b) {
  let s = 0;
  for (let i = 0; i < a.length; i++) s += a[i] * b[i];
  return s;
}

for (const s of j.seals) {
  let bestOther = -1;
  let other = "";
  for (const t of j.seals) {
    if (s.id === t.id) continue;
    const c = corr(s.fp, t.fp);
    if (c > bestOther) {
      bestOther = c;
      other = t.id;
    }
  }
  console.log(`${s.id} bestOther=${other} score=${bestOther.toFixed(3)} thr=${j.threshold}`);
}

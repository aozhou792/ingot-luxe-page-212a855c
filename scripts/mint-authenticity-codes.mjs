/**
 * Print helpers — same seals as src/data/authenticity-codes.ts
 *   node scripts/mint-authenticity-codes.mjs
 */
const SITE = "https://www.alibarbar.mom";
const VERIFY = `${SITE}/verify`;
const SEALS = ["ABSEAL01", "ABSEAL02", "ABSEAL03", "ABSEAL04", "ABSEAL05"];

console.log(`
包装怎么印 / 顾客怎么用
========================

【右边二维码】→ 进入网站验证页（全箱同一个）
  ${VERIFY}
  图片文件: public/authenticity/entry-verify.png

【左边蜂窝防伪码】→ 在验证页里扫 / 上传（下面 5 个任选打印）
`);
for (const id of SEALS) {
  console.log(`  ${id}`);
  console.log(`    URL  ${VERIFY}?seal=${id}`);
  console.log(`    PNG  public/authenticity/honeycomb-${id}.png`);
  console.log("");
}
console.log(`生成印刷图: node scripts/generate-honeycomb-qrs.mjs
`);

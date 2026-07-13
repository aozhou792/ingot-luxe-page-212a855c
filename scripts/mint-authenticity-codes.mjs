/**
 * Packaging QR payloads — two marks, two jobs.
 *
 * Left honeycomb (防伪码) → confirm genuine brand
 * Right QR               → open the site verify page
 *
 *   node scripts/mint-authenticity-codes.mjs
 */
const SITE = "https://www.alibarbar.mom";

console.log(`
包装背面怎么印 / 怎么用
========================

【左边 · 蜂窝】= 防伪码（扫出来是自家正品）
  把下面链接做成二维码，嵌在蜂窝图案里（全箱共用同一个）：
  ${SITE}/verify?seal=1

  顾客手机一扫 → 打开网站并显示 “Genuine Alibarbar”

【右边 · 二维码】= 进网站验证板块（不是另一套暗号）
  ${SITE}/verify

  顾客扫一下 → 打开本站 /verify 说明页

不需要一物一码，也不需要再印 ALIBARBAR / INGOT9000 这类「通用品牌码」。
`);

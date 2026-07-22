# ailibarbar.com 全面 SEO / GEO / AI Search 审计

**审计日期：** 2026-07-22  
**标准：** Google Search Essentials · Core Web Vitals · E-E-A-T · Product SEO · Programmatic SEO · Entity SEO · AI Search（ChatGPT / Gemini / Perplexity）  
**范围：** 技术 + 内容架构 + 关键词覆盖 + 主题集群 + 内部链接 + 页面深度 + 重复内容 + 转化路径 + 可扩展性  
**数据来源：** 仓库源码 `D:\luage` + 线上 `www.ailibarbar.com` + Lighthouse 12.8.2（mobile）  
**技术栈：** Vite 5 + React 18 SPA + Puppeteer 预渲染（非 Next.js / Astro）

---

## 总评分（100 分制）

| 维度 | 分 | 说明 |
|---|---:|---|
| Google Search Essentials / 技术 SEO | 74 | Canonical、robots、sitemap、hreflang、预渲染 meta 基本到位；仍依赖 prerender |
| Core Web Vitals | 58 | 首页 LCP ~6.4s 明显不达标；产品/文章较好 |
| E-E-A-T / 信任 | 68 | 有作者页、编辑政策、why-trust；年龄门声明与代码不符 |
| Product SEO | 72 | 规格/评价/FAQ 有，但模板化严重，缺 review/compare 内链 |
| Programmatic SEO | 70 | 数据驱动路由清晰；扩量时易薄内容 |
| Entity SEO | 71 | Organization + sameAs + OnlineStore 有；LocalBusiness / 外部权威弱 |
| AI Search / GEO | 80 | llms.txt、QuickAnswer、CitationSources 领先；llms 文案过期 |
| 内容架构 / Topic Cluster | 73 | 支柱齐全；意图重叠多；缺 nicotine / price / fake-spot 等缺口页 |
| 内部链接 | 69 | Footer + ContentHubLinks 强；PDP → review/compare 弱 |
| 转化路径 | 62 | 银行转账摩擦高；Compare CTA 偏软 |
| **综合（加权）** | **~71** | 基础设施强于多数竞品 SPA；冲 AU 第一仍缺 GSC/外链与 CWV |

**Lighthouse（mobile，2026-07-22）**

| 页面 | Perf | A11y | BP | SEO | LCP |
|---|---:|---:|---:|---:|---|
| `/` | 67 | 91 | 100 | 100 | 6.4s |
| `/product/peach-ice` | 77 | 96 | 100 | 100 | 4.8s |
| `/guides/alibarbar-buying-guide-australia` | 81 | 98 | 100 | 100 | 4.0s |

**内容质量（估）**

| 页面类型 | /100 |
|---|---:|
| Guide | 86 |
| Compare | 82 |
| Home | 78 |
| Product | 72 |
| Flavour | 68 |
| Competitor Brand | 64 |

---

## 主题集群现状（Topic Cluster Map）

```
Pillar: Alibarbar Ingot 9000 (Australia)
├── Brand entities: /brand-knowledge, /brands/alibarbar, /topics/alibarbar-ingot-9000
├── Commerce: /product/* (13), /#flavors, packs 5/10/20
├── Flavour content: /flavours/* (10)  ← 与 PDP 高度重叠
├── Guides (9) ← 最强编辑层
├── Reviews (10) ← 与 flavour/PDP 四重 URL 风险
├── Compare (5) + Brands (5，无 relx)
├── Topics (6) ← 部分是薄壳重复
├── Blog (3) ← 产能不足
├── FAQ (33 items + 5 topics)
├── Research (1) + Documentation + Syndication
└── Trust: about, why-trust-us, editorial-policy, age-verification, shipping…
```

### 严重意图重叠（示例）

| URL 组 | 问题 |
|---|---|
| `/product/peach-ice` ↔ `/flavours/peach-ice` ↔ `/topics/peach-ice` ↔ `/reviews/alibarbar-peach-ice-review` | 同一头词 4 URL |
| `/compare/alibarbar-vs-iget` ↔ `/topics/alibarbar-vs-iget` ↔ `/brands/iget` | vs-IGET 三重复 |
| `/guides/best-alibarbar-flavours-australia` ↔ `/blog/top-alibarbar-flavours-ranked` ↔ `/flavours` | 口味排行三重复 |
| `/guides/what-is-alibarbar-ingot-9000` ↔ `/topics/alibarbar-ingot-9000` ↔ `/brand-knowledge` | 品牌概述重叠 |

### 关键词缺口（AU 商业意图）

| 意图 | 现状 |
|---|---|
| buy / shop | 首页 + PDP 强 |
| price Australia | 仅 PDP 标价，无专题 |
| near me / local | 缺失（全国店可接受，可不做） |
| wholesale | `/wholesale` 有 |
| nicotine strength | 仅 FAQ 一句 |
| laws | Guide + `/faq/legal` OK |
| authentic / fake | FAQ 有；**内链指向不存在的 guide** |
| shipping | `/shipping` OK |

---

## 内部链接与点击深度

| 关键页面 | 从首页点击深度 |
|---|---:|
| 产品（`/#flavors`） | 1 |
| Custom packs（Footer） | 1 |
| Wholesale | 1 |
| Guide / Compare / Review 子页 | 2（经 nav hub） |
| Blog 文章 | 2（Footer → /blog；不在主 nav） |
| Topic 子页 | 2 |

**PDP 缺口：** 无链到对应 `/reviews/*`、`/compare/*`、`/shipping`、`/why-trust-us`；无 `ContentHubLinks` / `CitationSources`。

**Nav 弱链（仅 Footer）：** `/blog`、`/brands`、`/topics`、`/brand-knowledge`、`/research`、`/documentation`、`/syndication`、`/author/jason-smith`。

---

## 转化路径摘要

```
Home /#flavors → Product (Add to cart / Buy now)
  → Cart (noindex) → Checkout (银行转账 only, noindex)
  → Order complete (+ 上传转账截图)
```

- Content → Buy：Guide / Flavour / Review 有 Shop CTA；**Compare 只链到 `/flavours`，不推 PDP**。
- WhatsApp Float / Telegram：转化渠道，SEO 价值近零。
- 摩擦：仅银行转账 + 年龄门文案与实现不一致。

---

# P0 — 立即影响排名 / 抓取 / 信任（建议 1–2 周内做完）

---

### P0-01 修复首页 Core Web Vitals（LCP）

| 字段 | 内容 |
|---|---|
| **问题** | 首页移动端 LCP ≈ 6.4s，远超 Google「良好」阈值 2.5s；CWV 差会直接拖累排名与广告质量分。 |
| **原因** | Hero 视频/大海报、Google Fonts 第三方 RTT、首屏 JS 偏重（见 `Hero.tsx`、`index.html` 字体加载）。 |
| **修改方案** | ① Hero 改为静态 WebP/AVIF 优先，视频 `preload=none` 且仅在 `requestIdleCallback`/交互后加载；② 自托管 Inter/Montserrat（或减到 1 个 display 字体）；③ 压缩 `hero-device.png`；④ 推迟非关键第三方（gtag 可保持但勿阻塞 LCP）；⑤ 复跑 Lighthouse 目标 Perf ≥ 85、LCP ≤ 2.8s。 |
| **代码位置** | `src/components/Hero.tsx`；`index.html`（fonts）；`src/pages/Index.tsx`；相关 `src/assets/*` |
| **预估工作量** | 1–2 人日 |
| **对排名影响** | **High** |
| **预期收益** | 改善 CWV → 首页与站点级排名稳定性；降低跳出；提升付费流量质量分 |

---

### P0-02 同步并提交正确 sitemap（消除 soft-404）

| 字段 | 内容 |
|---|---|
| **问题** | 线上已是 `custom-20-pack`，但 git 中 `public/sitemap.xml` 仍含 `/product/custom-3-pack`；若从仓库部署且未跑生成脚本，会把爬虫送进死链。 |
| **原因** | 产品 slug 已改（`site-routes.ts`），静态 sitemap 未强制提交最新产物。 |
| **修改方案** | ① 本地跑 `npx tsx scripts/generate-sitemap.mts`；② 提交新 `public/sitemap.xml`；③ CI/build 已含生成步骤则加断言「禁止 custom-3-pack」；④ GSC 重新提交 sitemap。 |
| **代码位置** | `public/sitemap.xml`；`scripts/generate-sitemap.mts`；`src/data/site-routes.ts`（`PRODUCT_SLUGS`） |
| **预估工作量** | 0.5 人日 |
| **对排名影响** | **High** |
| **预期收益** | 避免错误 URL 浪费抓取预算；保证 packs 被收录 |

---

### P0-03 修复年龄门声明 vs 实现（E-E-A-T / Search Essentials 可信度）

| 字段 | 内容 |
|---|---|
| **问题** | `/age-verification`、FAQ 写「每位访客必须经年龄门确认」；代码中无 AgeGate，Checkout 亦无 18+ 勾选。 |
| **原因** | 政策文案超前于产品实现。 |
| **修改方案（二选一，推荐 A）** | **A：** 实现轻量 AgeGate（首次进入 cookie/session）+ Checkout 强制「我确认 18+」checkbox。**B：** 立刻改文案为「下单即确认 18+」，删除「浏览前必须」表述。 |
| **代码位置** | `src/data/content-pages.ts`（~376）；`src/data/faq-topics.ts`（legal）；`src/pages/CheckoutPage.tsx`；新建 `src/components/AgeGate.tsx`；`src/App.tsx` |
| **预估工作量** | A: 1–1.5 人日 · B: 0.25 人日 |
| **对排名影响** | **High**（信任/合规信号；YMYL 相邻品类敏感） |
| **预期收益** | 消除「虚假声明」风险；提升品牌可信与长期 E-E-A-T |

---

### P0-04 预渲染护栏（防止 SERP 全站变成首页 meta）

| 字段 | 内容 |
|---|---|
| **问题** | Meta/JSON-LD 在 `Seo.tsx` 的 `useEffect` 写入；若 `SKIP_PRERENDER=1` 或 prerender 失败上线，爬虫只看到 `index.html` 首页标签。 |
| **原因** | SPA 架构先天依赖构建期 Puppeteer。 |
| **修改方案** | ① 生产构建禁止 `SKIP_PRERENDER`；② `prerender.mts` 失败即 `exit 1`；③ CI 抽检 3 个路由 HTML 必须含各自 `<title>` / canonical；④ 监控部署产物中 `data-seo-ready`。 |
| **代码位置** | `src/components/Seo.tsx`（~65–105）；`scripts/prerender.mts`；`package.json` scripts；Vercel build |
| **预估工作量** | 0.5–1 人日 |
| **对排名影响** | **High** |
| **预期收益** | 锁定正确 title/description/schema；避免灾难性全站错误摘要 |

---

### P0-05 修复坏链：不存在的「防伪指南」

| 字段 | 内容 |
|---|---|
| **问题** | FAQ 指向 `/guides/how-to-spot-fake-alibarbar-ingot`，但 `guides.ts` 无此文 → 404 / 软 404。 |
| **原因** | 内容规划未落地却已内链。 |
| **修改方案** | 短期：链接改为 `/faq/authenticity`。中期（P1）：写一篇完整防伪 Guide 并加进 sitemap。 |
| **代码位置** | `src/data/faq-topics.ts`（~311, 341）；后续 `src/data/guides.ts` |
| **预估工作量** | 短期 0.25 人日；完整 Guide 0.5–1 人日 |
| **对排名影响** | **High** |
| **预期收益** | 消除站内死链；「authentic Alibarbar」意图可承接 |

---

### P0-06 产品页补齐到 Review / Compare / Trust 的内链

| 字段 | 内容 |
|---|---|
| **问题** | PDP 有 flavour + 少量 guides，但不链编辑评测、对比页、运费/信任页 → 集群权重无法回流到商业页。 |
| **原因** | `ProductPage.tsx` 模块未设计 cross-cluster 区块。 |
| **修改方案** | 在 PDP 增加「Editorial review / Compare / Shipping & authenticity」区块：链到 `/reviews/alibarbar-{slug}-review`、相关 `/compare/*`、`/shipping`、`/faq/authenticity`、`/why-trust-us`。 |
| **代码位置** | `src/pages/ProductPage.tsx`（现有 guides 区块 ~518–529 旁）；可选抽 `src/components/seo/ProductClusterLinks.tsx` |
| **预估工作量** | 0.5–1 人日 |
| **对排名影响** | **High** |
| **预期收益** | 加强 Topic Cluster；提升 PDP 与内容页互相赋权；降低孤儿内容风险 |

---

### P0-07 明确 Product vs Flavour 规范化策略（反蚕食）

| 字段 | 内容 |
|---|---|
| **问题** | 每个口味至少 2–4 个 URL 抢同一查询（product/flavour/topic/review）。 |
| **原因** | Programmatic 页面按模板批量生成，未做意图分工与 canonical 策略。 |
| **修改方案** | **推荐：** 商业意图（buy / price / shop）→ `/product/{slug}` 为 canonical；`/flavours/{slug}` 专注 taste notes 并用文内强链到 PDP（可保留 index，但 meta 差异化）；`/topics/{flavour}` 若与 flavour 重复则 **301→flavour 或 noindex**；Review 保留但标题/H1 明确「Review」。在 `Seo` 中为 flavour 设清晰差异化 title（「Taste profile」vs「Buy」）。 |
| **代码位置** | `src/pages/ProductPage.tsx`；`src/pages/FlavourPage.tsx`；`src/pages/TopicPage.tsx`；`src/data/topics.ts`；`vercel.json`（若需 301） |
| **预估工作量** | 1–2 人日（决策 + 实现） |
| **对排名影响** | **High** |
| **预期收益** | 减少自相残杀；集中权重到可转化 URL |

---

# P1 — 3 个月内可见收益

---

### P1-01 压缩首页 FAQPage Schema，避免与 `/faq` 争抢

| 字段 | 内容 |
|---|---|
| **问题** | 首页注入完整 FAQPage（~33 题）与 `/faq` 重复，易导致富结果不稳定。 |
| **原因** | `siteJsonLd` 直接嵌入全部 `faqItems`。 |
| **修改方案** | 首页 schema 仅保留 Top 6–8 高意图问题；完整集保留在 `/faq`。 |
| **代码位置** | `src/components/Seo.tsx`（`siteJsonLd` ~308–318）；`index.html` 内联 FAQ；`src/data/faq.ts` |
| **预估工作量** | 0.5 人日 |
| **对排名影响** | **Medium** |
| **预期收益** | FAQ 富结果更稳定；降低「重复结构化数据」风险 |

---

### P1-02 编辑页 `og:type=article` + 完整 Organization 节点

| 字段 | 内容 |
|---|---|
| **问题** | Guides/blog/compare/research 的 OG type 仍是 `website`；Article graph 的 publisher `@id` 可能缺 Organization。 |
| **原因** | `SeoProps.type` 仅 `"website" \| "product"`。 |
| **修改方案** | 扩展 `type: "website" \| "product" \| "article"`；`articleJsonLd` / `reviewJsonLd` 始终带上 `organizationNode`。 |
| **代码位置** | `src/components/Seo.tsx`；各 `GuidePage` / `BlogPostPage` / `ComparePage` / `ResearchPage` 调用处 |
| **预估工作量** | 0.5 人日 |
| **对排名影响** | **Medium** |
| **预期收益** | 改善社交/AI 抓取摘要；强化实体一致性 |

---

### P1-03 更新 llms.txt / 自动生成 llms-full.txt

| 字段 | 内容 |
|---|---|
| **问题** | `llms.txt` 仍写 packs 3/5/10；`llms-full` 不完整（如缺部分 compare）。 |
| **原因** | 手工维护，未接 `getSiteRoutes()`。 |
| **修改方案** | ① 修正 packs 为 5/10/20；② 用脚本从 `getSiteRoutes()` 生成 `llms-full.txt`；③ build 时一并生成。 |
| **代码位置** | `public/llms.txt`；`public/llms-full.txt`；新建 `scripts/generate-llms.mts`；`package.json` |
| **预估工作量** | 0.5–1 人日 |
| **对排名影响** | **Medium**（对 AI Search / GEO 偏 High） |
| **预期收益** | ChatGPT/Perplexity/Gemini 引用准确事实与完整 URL 清单 |

---

### P1-04 SearchAction 与 noindex `/search` 对齐

| 字段 | 内容 |
|---|---|
| **问题** | WebSite SearchAction 指向 `/search?q=`，但该页 noindex + X-Robots-Tag。 |
| **原因** | Schema 与索引策略冲突。 |
| **修改方案** | 移除 SearchAction，或做可索引的轻量搜索落地页（带热门查询内链）。 |
| **代码位置** | `src/components/Seo.tsx`（`websiteNode`）；`src/pages/SearchPage.tsx`；`vercel.json` |
| **预估工作量** | 0.25–0.75 人日 |
| **对排名影响** | **Low–Medium** |
| **预期收益** | 消除无效 Sitelinks Search Box 信号 |

---

### P1-05 产品别名改为 HTTP 301

| 字段 | 内容 |
|---|---|
| **问题** | `cool-mint`、`chupa-strawberry` 用 React `<Navigate>`，爬虫可能先拿 200 SPA。 |
| **原因** | 客户端路由重定向。 |
| **修改方案** | 在 `vercel.json` 增加 301 到目标 PDP（与 `/verify` 一致）。 |
| **代码位置** | `vercel.json`；`src/App.tsx`（可保留 Navigate 作兜底） |
| **预估工作量** | 0.25 人日 |
| **对排名影响** | **Medium** |
| **预期收益** | 正确传递旧 URL 权重 |

---

### P1-06 降低 PDP 模板同质化（Programmatic 质量）

| 字段 | 内容 |
|---|---|
| **问题** | 所有单品共享同一 `deviceSpecifications`、`howToUseSteps`、近乎相同 `getProductFaq` → 规模化时被判薄内容。 |
| **原因** | Programmatic SEO 模板复用过度。 |
| **修改方案** | 每口味至少：独特 H2（风味体验）、2–3 条口味专属 FAQ、独特 meta description；保留共享规格表但增加「This flavour」段落。 |
| **代码位置** | `src/data/products.ts`；`getProductFaq`；`src/lib/content-geo.ts`；`src/pages/ProductPage.tsx` |
| **预估工作量** | 2–3 人日（10 口味） |
| **对排名影响** | **High** |
| **预期收益** | 长尾口味词可独立排名；降低 doorway 风险 |

---

### P1-07 补齐内容缺口页（Authenticity / Nicotine / Price）

| 字段 | 内容 |
|---|---|
| **问题** | AU 用户高意图查询缺少支柱内容。 |
| **原因** | 首轮 GEO 建设偏「规格/对比」，漏信任与商业意图。 |
| **修改方案** | 新增 Guides：① How to spot fake Alibarbar；② Alibarbar nicotine strength Australia；③ Alibarbar Ingot 9000 price guide Australia。写入 `guides.ts` + 内链到 FAQ/PDP。 |
| **代码位置** | `src/data/guides.ts`；`src/data/site-routes.ts`（自动）；相关 FAQ 回链 |
| **预估工作量** | 2–3 人日（含写作） |
| **对排名影响** | **High** |
| **预期收益** | 覆盖信任/价格长尾；支撑 AI 引用与谷歌信息型→商业型漏斗 |

---

### P1-08 Compare / Blog CTA 强化转化

| 字段 | 内容 |
|---|---|
| **问题** | Compare 只推 `/flavours`；Blog 购买 CTA 弱。 |
| **原因** | 编辑页偏信息架构，未接转化组件。 |
| **修改方案** | Compare 底部增加「Shop Alibarbar Ingot 9000」产品卡（链 PDP/packs）；Blog 增加 relatedProducts 网格（复用 Guide 组件）。 |
| **代码位置** | `src/pages/ComparePage.tsx`（~182–189）；`src/pages/BlogPostPage.tsx`；`src/data/comparisons.ts` / `blog.ts` 增加 `relatedProducts` |
| **预估工作量** | 1 人日 |
| **对排名影响** | **Low**（对转化 High） |
| **预期收益** | 提高内容页→订单转化；间接提升参与度信号 |

---

### P1-09 内容发布节奏（从「一次建站」到「持续集群」）

| 字段 | 内容 |
|---|---|
| **问题** | Blog 仅 3 篇；整体像一次性 GEO 堆砌，缺少新鲜度与外链钩子。 |
| **原因** | 无编辑日历。 |
| **修改方案** | 每周至少：1 Guide 或 Compare 或 FAQ 扩展 + 1 Medium 镜像（canonical 回本站）。季度更新 Research。 |
| **代码位置** | `src/data/blog.ts` / `guides.ts` / `comparisons.ts`；`src/data/syndication.ts`；`docs/medium/` |
| **预估工作量** | 持续：每周 0.5–1 人日 |
| **对排名影响** | **Medium→High**（3 个月累计） |
| **预期收益** | 扩大关键词面；外链与品牌提及；AI 检索更新率 |

---

### P1-10 评价真实性标注（Product SEO + E-E-A-T）

| 字段 | 内容 |
|---|---|
| **问题** | AggregateRating 可能混合 showcase 模板评价与真实 UGC；作者名遮罩（S\*\*i）削弱信任。 |
| **原因** | 为快速填充星级采用 showcase 数据。 |
| **修改方案** | 页面明确「Verified photo reviews / Customer reviews」分区；schema 优先真实订单评价；showcase 仅作 UI 或逐步淘汰；政策页说明审核规则。 |
| **代码位置** | `src/data/product-showcase-reviews.ts`；`src/pages/ProductPage.tsx`；`src/components/reviews/*`；`content-pages.ts` editorial |
| **预估工作量** | 1–2 人日 |
| **对排名影响** | **Medium** |
| **预期收益** | 降低评价富结果被拒风险；提升转化信任 |

---

### P1-11 Nav / Footer 信息架构微调

| 字段 | 内容 |
|---|---|
| **问题** | Blog、Topics、Brand Knowledge、Author 仅靠 Footer，爬虫与用户发现弱。 |
| **原因** | Navbar 过短。 |
| **修改方案** | Nav 增加「Learn」下拉：Guides / Blog / Topics / Brand Knowledge；Footer 增加 Author；保留 Wholesale。 |
| **代码位置** | `src/components/Navbar.tsx`；`src/components/Footer.tsx` |
| **预估工作量** | 0.5–1 人日 |
| **对排名影响** | **Medium** |
| **预期收益** | 降低点击深度；提高集群页抓取频率 |

---

### P1-12 Product schema 补 MerchantReturnPolicy / priceValidUntil

| 字段 | 内容 |
|---|---|
| **问题** | Offer 缺退货政策与价格有效期，Shopping / Merchant 体验不完整。 |
| **原因** | `productJsonLd` 最小实现。 |
| **修改方案** | 增加 `hasMerchantReturnPolicy`（链 `/returns`）与合理 `priceValidUntil`；与 Google Merchant 要求对齐（若开通）。 |
| **代码位置** | `src/components/Seo.tsx`（Offer 构建 ~214–223）；`src/data/content-pages.ts` returns |
| **预估工作量** | 0.5 人日 |
| **对排名影响** | **Medium** |
| **预期收益** | 富结果完整性；为 Shopping 做准备 |

---

### P1-13 补 `/brands/relx` 或调整 compare 孤儿

| 字段 | 内容 |
|---|---|
| **问题** | 存在 `/compare/alibarbar-vs-relx` 但无 `/brands/relx`。 |
| **原因** | brands 数据未同步。 |
| **修改方案** | 新增 relx brand 页，或 compare 内链只指向已有 brand。 |
| **代码位置** | `src/data/brands.ts`；`src/data/comparisons.ts` |
| **预估工作量** | 0.5 人日 |
| **对排名影响** | **Low–Medium** |
| **预期收益** | 集群完整；减少断链体验 |

---

# P2 — 长期品牌 / Entity / 可扩展性（3–12 个月）

---

### P2-01 建立可扩展 Programmatic 内容质检流水线

| 字段 | 内容 |
|---|---|
| **问题** | 机械上可一键加 50 个 flavour/compare，但无质量门槛会触发薄内容惩罚。 |
| **原因** | 缺内容 QA checklist。 |
| **修改方案** | 新增页面门禁：独特字数、独特 FAQ≥2、内链≥3、OG 图、作者、无重复 title；CI 脚本校验 data module。 |
| **代码位置** | `scripts/` 新建 `validate-content.mts`；`src/data/*` |
| **预估工作量** | 2 人日 |
| **对排名影响** | **Medium**（防未来事故 → High） |
| **预期收益** | 安全扩量；支撑 Programmatic SEO 规模化 |

---

### P2-02 强化 Entity：作者外部档案 + Organization sameAs

| 字段 | 内容 |
|---|---|
| **问题** | 单一作者、无 LinkedIn/独立站；Telegram 未进 `sameAs`；Pinterest 仅 schema。 |
| **原因** | Entity 图谱未完成。 |
| **修改方案** | 作者页加可验证外部档案；Organization `sameAs` 补齐真实活跃档案；考虑 Wikidata/Crunchbase（若适用）。 |
| **代码位置** | `src/data/authors.ts`；`src/data/site.ts`；`AuthorPage.tsx` |
| **预估工作量** | 1–2 人日 + 运营建档 |
| **对排名影响** | **Medium** |
| **预期收益** | AI Search 与 Google 实体消歧更准；E-E-A-T 上探 |

---

### P2-03 外链与品牌提及计划（非纯站内）

| 字段 | 内容 |
|---|---|
| **问题** | 站内外链资产弱（Medium×2，社媒档案）；冲品类词不够。 |
| **原因** | 缺外链运营。 |
| **修改方案** | 每月：2 篇 Medium/Substack（canonical 回本站）+ 1 次 AU 论坛/Reddit 价值帖（非垃圾）+ 合作 podpickguide 深度互链；追踪 Ahrefs RD。 |
| **代码位置** | `src/data/syndication.ts`；运营流程（非纯代码） |
| **预估工作量** | 每月 2–4 人日（运营） |
| **对排名影响** | **High**（长期） |
| **预期收益** | DR/提及上升；品牌词与竞品词双赢 |

---

### P2-04 支付与转化路径现代化

| 字段 | 内容 |
|---|---|
| **问题** | 仅银行转账 → 高摩擦，损害转化与「活跃商店」行为信号。 |
| **原因** | 业务选择。 |
| **修改方案** | 评估 Stripe/PayID 等；保留转账作备选；Checkout 简化字段。 |
| **代码位置** | `src/pages/CheckoutPage.tsx`；`api/` 支付相关 |
| **预估工作量** | 5–10 人日 |
| **对排名影响** | **Low 直接 / High 间接** |
| **预期收益** | 转化率 ↑ → 可再投资内容与外链 |

---

### P2-05 LocalBusiness / 区域着陆（可选）

| 字段 | 内容 |
|---|---|
| **问题** | 无「near me」/城市页；全国电商可省略。 |
| **原因** | 无实体店。 |
| **修改方案** | 若不做本地：在 Organization 明确 `areaServed: Australia` 即可。若做：仅高质量州级页（NSW/VIC…）+ 真实物流差异，禁止薄门页。 |
| **代码位置** | `Seo.tsx` Organization；可选 `src/data/locations.ts` |
| **预估工作量** | 0（维持）或 3–5 人日（州级） |
| **对排名影响** | **Low–Medium** |
| **预期收益** | 仅在有真实本地差异时值得做 |

---

### P2-06 SSR/混合渲染长期架构（可选）

| 字段 | 内容 |
|---|---|
| **问题** | 长期依赖 Puppeteer prerender，脆弱且难 A/B。 |
| **原因** | 历史选 SPA。 |
| **修改方案** | 评估迁至 Astro/Next 对营销页 SSR，购物车保持客户端；或 Vite SSR。 |
| **代码位置** | 架构级（新框架） |
| **预估工作量** | 15–30 人日 |
| **对排名影响** | **Medium** |
| **预期收益** | 消除 prerender 单点故障；更稳的 Search Essentials 合规 |

---

### P2-07 多媒体与 VideoObject

| 字段 | 内容 |
|---|---|
| **问题** | 无产品评测视频 schema；YouTube 频道未深度嵌入。 |
| **原因** | 内容形态偏文字。 |
| **修改方案** | 每季度 2–4 支短视频；嵌入 PDP/Review + `VideoObject`。 |
| **代码位置** | 产品/评测页组件；`Seo.tsx` |
| **预估工作量** | 运营 + 1 人日/视频页 |
| **对排名影响** | **Medium** |
| **预期收益** | 视频富结果 + AI 多模态引用 |

---

## 建议执行顺序（ ent）

**Week 1–2（P0）**  
P0-02 Sitemap → P0-05 坏链 → P0-03 年龄门 → P0-04 预渲染护栏 → P0-06 PDP 内链 → P0-07 规范化决策 → P0-01 LCP

**Month 1–3（P1）**  
P1-06 口味差异化 → P1-07 缺口 Guide → P1-01/02/03 Schema+llms → P1-08/09/10/11 转化与节奏 → P1-05/12/13 收尾

**Month 3–12（P2）**  
外链与 Entity → 支付 → 质检流水线 →（可选）SSR / 视频 / 州级页

---

## 仍需你补充的数据（否则无法校准关键词优先级）

| 数据 | 用途 |
|---|---|
| Google Search Console | 真实查询、CTR、收录缺口、CWV 现场数据 |
| GA4 | 落地页与转化，决定推哪些 URL |
| Ahrefs / Semrush | DR、外链、对手差距 |
| 订单/评价真实性说明 | 支撑 E-E-A-T 叙事 |

---

## 附录：关键文件索引

| 主题 | 路径 |
|---|---|
| SEO 核心 | `src/components/Seo.tsx` |
| 路由/sitemap 源 | `src/data/site-routes.ts` |
| 产品 | `src/data/products.ts` · `src/pages/ProductPage.tsx` |
| 指南 | `src/data/guides.ts` · `src/pages/GuidePage.tsx` |
| 口味 | `src/data/flavours.ts` · `src/pages/FlavourPage.tsx` |
| 对比 | `src/data/comparisons.ts` · `src/pages/ComparePage.tsx` |
| Topics | `src/data/topics.ts` |
| GEO 组件 | `src/components/seo/*` · `src/lib/content-geo.ts` |
| 预渲染 | `scripts/prerender.mts` · `scripts/generate-sitemap.mts` |
| 部署 | `vercel.json` · `public/robots.txt` · `public/llms.txt` |
| 信任文案 | `src/data/content-pages.ts` |

---

*本报告基于源码与公开线上数据。未接入 GSC/GA4/Ahrefs 前，关键词「冲第一」优先级仍属工程推断；补数据后可再排一版「按流量机会」的 P0 清单。*

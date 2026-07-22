# Authority Building Sprint — 90 Days（综合决策版）

**日期：** 2026-07-22  
**依据：** 本仓库 Tech Audit + GSC Query/趋势解读（GPT）  
**目标：** 让 Google「愿意推」ailibarbar.com，而不只是「认识」它

---

## 综合判断（采纳什么 / 放弃什么）

| 来源 | 结论 | 我们的决定 |
|---|---|---|
| Tech Audit | 技术 ~71–85 分，仍有 LCP/死链/年龄门等问题 | **只修高杠杆技术**，不再堆 Schema/meta |
| GPT + GSC | Topic Cluster 已生效；Impressions 个位数；Authority ≈ 0 | **主战场改为内容规模 + 品牌提及 + 外链** |
| GPT | 不要优化 CTR（没放量） | **采纳** — 本季度不做 title CTR 实验 |
| GPT | 每周 5 Guide + 5 Review + 5 Compare | **下调为可执行产能**（见下）— 质量 > 虚高数量 |
| GPT | 少写 Buy/Shop/Sale，多写 How/Best/Review/Compare/Australia | **采纳** — 新内容标题与角度强制对齐 |
| 双方 | 首页 LCP 6.4s → ≤2.5s | **必须做**（唯一继续投入的大块技术） |

### 一句话策略

> **技术收尾 15% 精力 · 内容扩容 45% · 分发与品牌提及 40%。**  
> 接下来 90 天不叫「SEO 迭代」，叫 **Authority Building Sprint**。

---

## Google 当前阶段（来自 GSC 信号）

```
Crawl → Index → Test（小曝光）→ 尚未 Trust / Push
```

已出现的长尾说明实体与集群被识别：

- alibarbar ingot 9000
- alibarbar vape australia
- alibarbar ingot flavours / best alibarbar flavour
- how to recharge alibarbar
- blackberry ice alibarbar

**含义：** 继续喂 *How / Best / Review / Compare / Australia* 内容；不要指望再改 JSON-LD 就能进首页。

---

## 评分对齐（给内部用）

| 维度 | Tech Audit | GPT 视角 | 综合采用 |
|---|---:|---:|---|
| 技术 SEO | ~74–85% | 90 | **够用；收益递减** |
| 内容体系 | ~35–73（架构有、规模不够） | 78 内容质量 / 35 规模 | **质量尚可，页数与深度不够** |
| 品牌 / Authority | ~10–20 | 10–20 | **最大短板** |
| 外链 | ~5 | &lt;10 RD 估 | **最大短板** |

---

## 保留的技术任务（Keep Tech — 仅这些）

| ID | 任务 | 为何保留 | 状态 |
|---|---|---|---|
| K1 | 首页 LCP ≤ 2.5–2.8s | CWV 仍影响一切页面体验与信任 | 进行中 |
| K2 | Sitemap 与 `custom-20-pack` 同步并提交 | 防死链浪费抓取 | ✅ 已重生成本地 sitemap |
| K3 | 修复 `/guides/how-to-spot-fake-alibarbar-ingot` 死链 | 站内信任 + How 意图 | 进行中（写文） |
| K4 | 年龄门文案与真实流程对齐 + Checkout 18+ | E-E-A-T / 合规诚实 | 进行中 |
| K5 | llms.txt packs 文案 5/10/20 | AI 引用准确性 | 待改 |

**明确推迟 / 不做（本季度）：**

- 大规模 Schema 精修、og:type 微调、SearchAction、MerchantReturnPolicy
- CTR 标题实验、A/B meta
- SSR 迁移、LocalBusiness 城市门页
- 「为 SEO 而 SEO」的重复 Topic 薄页批量生产

---

## 可执行产能（修正 GPT 的周产量）

GPT 的「每周 15 篇长文 + 30 mentions + 10 guest posts」对单人/小团队不可持续，劣质扩量会伤站。

### 采用：双轨周配额

**轨道 A — 站内（Cursor 可写进仓库）**

| 每周最低 | 类型 | 标题角度强制 |
|---|---|---|
| **2** | Guide 或 Compare | How / Best / vs / Australia |
| **1** | Flavour Review 加深 或 新 Review 角度 | Review / taste / who it suits |
| **1** | 已有高曝光页更新 | 按 GSC Pages 榜首回炉（等你发 Pages 截图） |

**轨道 B — 站外 Authority（人运营 + Cursor 出稿）**

| 每周最低 | 渠道 |
|---|---|
| **2** | Medium（canonical 回本站） |
| **3–5** | 品牌提及：Reddit 价值回复 / FB / IG / Pinterest 图文（含域名） |
| **1** | 长外链尝试：Guest / 目录 / 合作（podpickguide 等）— 质量优先，不买垃圾链 |
| **可选** | LinkedIn 公司动态、GitHub 公开 docs 镜像（documentation 已有） |

**90 天目标（现实版）**

| 指标 | 现在（估） | 90 天目标 |
|---|---|---|
| 索引内容页 | ~91 | **160–200** 高质量页（宁缺毋滥） |
| Medium 镜像 | 2 | **20+** |
| 有效提及（含域名） | 极少 | **每周可追踪 5+** |
| Referring Domains | 估 &lt;10 | **40–80**（质量 &gt; 冲 200） |
| 首页 LCP | 6.4s | **≤ 2.8s** |
| GSC 周 Impressions | 个位～几十 | **数量级上升**（观察趋势，不承诺具体） |

> 注：GPT 的「200+ RD」仍是正确长期目标；90 天先打到 **40–80 真链** 比堆目录站更重要。

---

## 内容选题公式（对齐 GSC）

**要写：**

```
How to …
Best Alibarbar …
Alibarbar vs …
… Review (Australia)
… Australia (信息型，不是纯 Shop)
Can you / Does … / How long …
```

**少写 / 不要新开：**

```
Buy … cheap
Sale / Discount doorway
Shop Alibarbar online（与首页重复）
```

**本周优先选题（已排进开发）**

1. `how-to-spot-fake-alibarbar-ingot` — 修死链 + Authentic 意图  
2. 加强 `can-you-recharge-alibarbar-ingot-9000` 对「how to recharge」的回答可见性（GSC 已有该查询）  
3. 下一篇（待 Pages 截图后定模板）：复制「Google 最爱页」的结构批量生产  

---

## 90 天节奏

| 阶段 | 周 | 重点 |
|---|---|---|
| **Foundation** | 1–2 | Keep Tech 收尾；死链 Guide；LCP；定每周发布清单 |
| **Scale** | 3–8 | 双轨配额执行；Medium 稳定；GSC 看哪类 URL 曝光涨 |
| **Authority** | 9–12 | 加 guest/合作；回炉 Top Pages；评估是否加支付降摩擦 |

每周五固定动作：

1. 看 GSC **网页（Pages）** Top 10 — 下篇模板  
2. 看 Query — 找「有曝光 0 点击」的 How/Best 词，写对应文  
3. 发 2 篇 Medium + 记录 mentions 表  

---

## GSC Pages 已收到（✓）

见下方「GSC Pages 实锤」。以后每周五只看 **Top Pages 变化**，不再空等截图。

---

## Cursor 本阶段执行清单

- [x] 综合决策文档（本文件）  
- [x] 重生成本地 `public/sitemap.xml`（custom-20-pack）  
- [x] LCP：Hero 海报优先、推迟视频  
- [x] 年龄政策文案 + Checkout 18+  
- [x] 新 Guide：how-to-spot-fake  
- [x] llms.txt packs 修正  
- [x] **GSC Pages 模板锁定**（见下节）  
- [x] 旧 URL 301（ultimate-guide / performance / contact-us / custom-3-pack / 2024 blog）  

---

## GSC Pages 实锤（2026-07 近 3 个月）

### Google 正在推的 URL（按展示）

| 排名 | URL | 点击 | 展示 | 判定 |
|---|---|---:|---:|---|
| 1 | `/` 首页 | 0 | 134 | 品牌/店面意图，CTR 暂不优化 |
| 2 | `/guides/can-you-recharge-alibarbar-ingot-9000` | **1** | **54** | **★ 模板页** |
| 3 | `/blog/top-alibarbar-flavours-ranked` | 0 | 39 | Best/Ranking 模板 #2 |
| 4 | `/product/blackberry-ice` | 0 | 23 | 口味商业页有效 |
| 5–6 | 旧 guide URL（已不在站内） | 0 | 22 / 11 | 浪费曝光 → 已加 301 |
| 7 | `/flavours/blackberry-ice` | 0 | 7 | 与 PDP 重叠，弱于 product |
| … | `/age-verification`、`/contact-us`、旧 blog | 低 | 低 | 政策/死链，非内容模板 |

### ★ 模板页结构（以后新文必须抄）

以 **Recharge Guide** 为准（站内唯一「有点击」的内容页）：

1. **标题 = 用户原话问题**（How to recharge… / Can you…）  
2. **开头 2 句直接答**（Quick Answer，可否定句）  
3. **Key takeaways 5 条**  
4. **分节讲清 why / what to do instead**  
5. **FAQ 3 问以上**（同一问题改写）  
6. **结尾链到产品/相关 How**，不要硬塞 Sale  

第二模板：**Flavour ranked / Best**（blog `top-alibarbar-flavours-ranked`）

1. Best + ranked + Australia  
2. 按类型分组（fruity / iced / tropical）  
3. 每组给明确「先试哪个」  
4. 自定义 pack 作转化出口  

### 明确不要学的

- 再开与 Recharge 同意图的薄页  
- 用旧 slug 发新文却不 301（GSC 已证明旧 URL 还在吃展示）  
- 以为首页 134 展示就要改成 CTR 文案大战 —— **排名还不够，先扩同结构内容**

### 下一波选题（按模板复制）

| 优先级 | 选题 | 抄谁 |
|---|---|---|
| P1 | How long does Alibarbar last / when to replace（加深已有或新角度） | Recharge |
| P1 | How to know Alibarbar is finished / LED meaning | Recharge |
| P1 | Best iced Alibarbar flavours Australia | Flavours ranked |
| P1 | Blackberry Ice vs Peach Ice（口味对决） | Ranked + product |
| P2 | How to spot fake（已上线）→ Medium 草稿已备 | Recharge |
| ✓ | Best iced flavours（已上线） | Flavours ranked |
| ✓ | Blackberry Ice vs Peach Ice（已上线） | Ranked + product |

---

## 明确不对齐 GPT 的一点（诚实说明）

「每周 10 Guest Posts + 30 Brand Mentions」在成人电子烟品类：

- 平台政策严、拒稿率高  
- 垃圾 guest post 可能负向  

因此我们把 **Guest 改为「每周至少 1 次高质量外链尝试」**，把 mentions 定为 **3–5 次真实有域名的出现**，用 90 天复利，而不是周报注水。

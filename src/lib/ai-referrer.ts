/** Known generative / AI answer engines used for GEO attribution. */

export type AiPlatformId =
  | "chatgpt"
  | "perplexity"
  | "claude"
  | "gemini"
  | "copilot"
  | "you"
  | "poe"
  | "meta_ai"
  | "grok"
  | "deepseek"
  | "mistral"
  | "phind"
  | "kimi"
  | "tongyi"
  | "other_ai";

type AiRule = {
  id: AiPlatformId;
  /** Hostname suffixes (no leading dot), matched with endsWith. */
  hosts: string[];
  /**
   * If set, hostname must match AND path must include one of these.
   * Use for hosts that are only sometimes AI (e.g. bing.com/chat).
   */
  requirePathIncludes?: string[];
};

const AI_RULES: AiRule[] = [
  { id: "chatgpt", hosts: ["chatgpt.com", "chat.openai.com", "openai.com"] },
  { id: "perplexity", hosts: ["perplexity.ai"] },
  { id: "claude", hosts: ["claude.ai", "anthropic.com"] },
  { id: "gemini", hosts: ["gemini.google.com", "bard.google.com"] },
  { id: "copilot", hosts: ["copilot.microsoft.com"] },
  {
    id: "copilot",
    hosts: ["bing.com", "www.bing.com"],
    requirePathIncludes: ["/chat", "/copilot"],
  },
  { id: "you", hosts: ["you.com"] },
  { id: "poe", hosts: ["poe.com"] },
  { id: "meta_ai", hosts: ["meta.ai", "www.meta.ai"] },
  { id: "grok", hosts: ["grok.x.ai", "x.ai"] },
  { id: "deepseek", hosts: ["deepseek.com", "chat.deepseek.com"] },
  { id: "mistral", hosts: ["mistral.ai", "chat.mistral.ai"] },
  { id: "phind", hosts: ["phind.com"] },
  { id: "kimi", hosts: ["kimi.moonshot.cn", "moonshot.cn"] },
  { id: "tongyi", hosts: ["tongyi.aliyun.com", "tongyi.com"] },
];

/** utm_source values that should count as AI even without an AI referrer. */
const AI_UTM_SOURCES = new Set([
  "chatgpt",
  "openai",
  "perplexity",
  "claude",
  "anthropic",
  "gemini",
  "bard",
  "copilot",
  "bingchat",
  "you",
  "poe",
  "meta_ai",
  "meta-ai",
  "grok",
  "deepseek",
  "mistral",
  "phind",
  "kimi",
  "tongyi",
  "ai",
  "llm",
]);

function hostMatches(hostname: string, suffix: string): boolean {
  const h = hostname.toLowerCase();
  const s = suffix.toLowerCase();
  return h === s || h.endsWith(`.${s}`);
}

export function matchAiPlatformFromReferrer(referrerUrl: string): AiPlatformId | null {
  if (!referrerUrl) return null;
  let parsed: URL;
  try {
    parsed = new URL(referrerUrl);
  } catch {
    return null;
  }

  const hostname = parsed.hostname.toLowerCase();
  const path = `${parsed.pathname}${parsed.search}`.toLowerCase();

  for (const rule of AI_RULES) {
    const hostOk = rule.hosts.some((h) => hostMatches(hostname, h));
    if (!hostOk) continue;
    if (rule.requirePathIncludes?.length) {
      if (!rule.requirePathIncludes.some((p) => path.includes(p.toLowerCase()))) continue;
    }
    return rule.id;
  }
  return null;
}

export function matchAiPlatformFromUtmSource(utmSource: string | null): AiPlatformId | null {
  if (!utmSource) return null;
  const raw = utmSource.trim().toLowerCase();
  if (!raw) return null;
  if (AI_UTM_SOURCES.has(raw)) {
    if (raw === "openai" || raw === "chatgpt") return "chatgpt";
    if (raw === "anthropic") return "claude";
    if (raw === "bard") return "gemini";
    if (raw === "bingchat") return "copilot";
    if (raw === "meta-ai") return "meta_ai";
    if (raw === "ai" || raw === "llm") return "other_ai";
    return raw as AiPlatformId;
  }
  return null;
}

export type TrafficChannel = "ai" | "campaign" | "organic" | "referral" | "direct";

export type SessionAttribution = {
  channel: TrafficChannel;
  /** GA4 session source (e.g. chatgpt, google, direct). */
  source: string;
  /** GA4 session medium (e.g. ai, organic, referral, none, cpc). */
  medium: string;
  campaign?: string;
  ai_platform: AiPlatformId | null;
  referrer: string;
  landing_path: string;
};

const STORAGE_KEY = "alibarbar-attribution-v1";

function readUtm(params: URLSearchParams) {
  return {
    source: params.get("utm_source"),
    medium: params.get("utm_medium"),
    campaign: params.get("utm_campaign"),
  };
}

/**
 * First-touch attribution for the browser session.
 * Priority: UTM → AI referrer → other referrer → direct.
 */
export function resolveAttribution(input?: {
  href?: string;
  referrer?: string;
}): SessionAttribution {
  const href = input?.href ?? (typeof window !== "undefined" ? window.location.href : "");
  const referrer = input?.referrer ?? (typeof document !== "undefined" ? document.referrer : "");
  let landingPath = "/";
  let utm = { source: null as string | null, medium: null as string | null, campaign: null as string | null };

  try {
    const url = new URL(href || "https://example.invalid/");
    landingPath = `${url.pathname}${url.search}`;
    utm = readUtm(url.searchParams);
  } catch {
    /* ignore */
  }

  const utmAi = matchAiPlatformFromUtmSource(utm.source);
  if (utm.source) {
    return {
      channel: utmAi ? "ai" : "campaign",
      source: utm.source.toLowerCase(),
      medium: (utm.medium ?? (utmAi ? "ai" : "campaign")).toLowerCase(),
      campaign: utm.campaign?.toLowerCase() || undefined,
      ai_platform: utmAi,
      referrer,
      landing_path: landingPath,
    };
  }

  const aiFromRef = matchAiPlatformFromReferrer(referrer);
  if (aiFromRef) {
    return {
      channel: "ai",
      source: aiFromRef,
      medium: "ai",
      campaign: `geo_${aiFromRef}`,
      ai_platform: aiFromRef,
      referrer,
      landing_path: landingPath,
    };
  }

  if (referrer) {
    try {
      const refHost = new URL(referrer).hostname.replace(/^www\./, "").toLowerCase();
      const isSearch =
        /(^|\.)google\./.test(refHost) ||
        /(^|\.)bing\./.test(refHost) ||
        /(^|\.)yahoo\./.test(refHost) ||
        /(^|\.)duckduckgo\./.test(refHost) ||
        /(^|\.)baidu\./.test(refHost);
      return {
        channel: isSearch ? "organic" : "referral",
        source: refHost || "referral",
        medium: isSearch ? "organic" : "referral",
        ai_platform: null,
        referrer,
        landing_path: landingPath,
      };
    } catch {
      /* fall through */
    }
  }

  return {
    channel: "direct",
    source: "(direct)",
    medium: "(none)",
    ai_platform: null,
    referrer: "",
    landing_path: landingPath,
  };
}

/** Persist first-touch for the tab/session; subsequent navigations reuse it. */
export function getOrCaptureAttribution(): SessionAttribution {
  if (typeof window === "undefined") {
    return resolveAttribution({ href: "", referrer: "" });
  }
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as SessionAttribution;
      if (parsed?.source && parsed?.medium && parsed?.channel) return parsed;
    }
  } catch {
    /* ignore */
  }

  const attribution = resolveAttribution();
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    /* private mode */
  }
  return attribution;
}

/** Params attached to every GA4 event for Explore / custom dimensions. */
export function attributionEventParams(attr: SessionAttribution): Record<string, string> {
  const params: Record<string, string> = {
    traffic_channel: attr.channel,
    session_source_custom: attr.source,
    session_medium_custom: attr.medium,
  };
  if (attr.ai_platform) params.ai_platform = attr.ai_platform;
  if (attr.campaign) params.campaign_custom = attr.campaign;
  return params;
}

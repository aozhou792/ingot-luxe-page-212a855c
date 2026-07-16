import { describe, expect, it } from "vitest";
import {
  matchAiPlatformFromReferrer,
  matchAiPlatformFromUtmSource,
  resolveAttribution,
} from "@/lib/ai-referrer";

describe("matchAiPlatformFromReferrer", () => {
  it("detects ChatGPT", () => {
    expect(matchAiPlatformFromReferrer("https://chatgpt.com/c/abc")).toBe("chatgpt");
    expect(matchAiPlatformFromReferrer("https://chat.openai.com/")).toBe("chatgpt");
  });

  it("detects Perplexity and Claude", () => {
    expect(matchAiPlatformFromReferrer("https://www.perplexity.ai/search?q=vape")).toBe("perplexity");
    expect(matchAiPlatformFromReferrer("https://claude.ai/chat/123")).toBe("claude");
  });

  it("only treats Bing as AI when path looks like chat/copilot", () => {
    expect(matchAiPlatformFromReferrer("https://www.bing.com/search?q=test")).toBeNull();
    expect(matchAiPlatformFromReferrer("https://www.bing.com/chat?q=test")).toBe("copilot");
    expect(matchAiPlatformFromReferrer("https://copilot.microsoft.com/")).toBe("copilot");
  });

  it("returns null for normal search", () => {
    expect(matchAiPlatformFromReferrer("https://www.google.com/search?q=alibarbar")).toBeNull();
  });
});

describe("resolveAttribution", () => {
  it("prefers UTM over referrer", () => {
    const attr = resolveAttribution({
      href: "https://www.ailibarbar.com/?utm_source=chatgpt&utm_medium=ai&utm_campaign=geo",
      referrer: "https://www.google.com/",
    });
    expect(attr.channel).toBe("ai");
    expect(attr.source).toBe("chatgpt");
    expect(attr.medium).toBe("ai");
    expect(attr.ai_platform).toBe("chatgpt");
  });

  it("attributes AI referrer when no UTM", () => {
    const attr = resolveAttribution({
      href: "https://www.ailibarbar.com/product/cool-mint",
      referrer: "https://www.perplexity.ai/search?q=ingot",
    });
    expect(attr.channel).toBe("ai");
    expect(attr.source).toBe("perplexity");
    expect(attr.medium).toBe("ai");
    expect(attr.campaign).toBe("geo_perplexity");
  });

  it("marks google as organic", () => {
    const attr = resolveAttribution({
      href: "https://www.ailibarbar.com/",
      referrer: "https://www.google.com.au/search?q=alibarbar",
    });
    expect(attr.channel).toBe("organic");
    expect(attr.medium).toBe("organic");
  });
});

describe("matchAiPlatformFromUtmSource", () => {
  it("maps common aliases", () => {
    expect(matchAiPlatformFromUtmSource("openai")).toBe("chatgpt");
    expect(matchAiPlatformFromUtmSource("anthropic")).toBe("claude");
  });
});

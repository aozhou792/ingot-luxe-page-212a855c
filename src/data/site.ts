/** Central site metadata for SEO schema and footer links. */
export const SITE_URL = "https://www.alibarbar.mom";
/** Square brand mark used for schema / OG logo (favicon asset). */
export const SITE_LOGO_PATH = "/logo.png";
export const SITE_LOGO_WIDTH = 512;
export const SITE_LOGO_HEIGHT = 512;

export const SITE_SOCIAL = {
  facebook: "https://www.facebook.com/ailibarbar",
  instagram: "https://www.instagram.com/ailibarbar",
  youtube: "https://www.youtube.com/@ailibarbar",
  x: "https://x.com/ailibarbar",
  pinterest: "https://www.pinterest.com/ailibarbar",
} as const;

export const SITE_SAME_AS = Object.values(SITE_SOCIAL);

/** Official Telegram community — opens in the Telegram app when installed. */
export const TELEGRAM_COMMUNITY_URL = "https://t.me/ailibarbar";

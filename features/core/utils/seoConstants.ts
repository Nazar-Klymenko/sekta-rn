// constants/seoConstants.ts
export const APP_NAME = "Sekta Selekta";
export const WEBSITE_URL = "https://sektaselekta.com";

export const DEFAULT_SEO = {
  title: APP_NAME,
  description:
    "PEACE LOVE UNITY SELEKTA. Live events, DJs, and upcoming events.",
  image: "/assets/images/logo.png",
  type: "website",
  siteName: APP_NAME,
  locale: "en",
  imageWidth: "1200",
  imageHeight: "630",
  twitter: "@sektaselekta",
};

// Helper function to get full URL for assets
export const getFullAssetUrl = (path: string) => {
  if (path.startsWith("http")) return path;
  return `${WEBSITE_URL}${path}`;
};

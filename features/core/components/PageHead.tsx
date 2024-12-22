// components/PageHead.tsx
import Head from "expo-router/head";

import React from "react";

import { usePathname } from "expo-router";

import { formatPageTitle } from "../utils/formatPageTitle";
import {
  APP_NAME,
  DEFAULT_SEO,
  WEBSITE_URL,
  getFullAssetUrl,
} from "../utils/seoConstants";

type PageHeadProps = {
  customTitle?: string;
  description?: string;
  image?: string;
  type?: string;
  url?: string;
};

export function PageHead({
  customTitle,
  description = DEFAULT_SEO.description,
  image = DEFAULT_SEO.image,
  type = DEFAULT_SEO.type,
  url,
}: PageHeadProps) {
  const pathname = usePathname();

  const getDefaultTitleFromPath = () => {
    if (!pathname || pathname === "/") return "";
    return pathname
      .split("/")
      .pop()
      ?.replace(/[-_]/g, " ")
      ?.replace(/^\[.*\]$/, "")
      ?.split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const title = formatPageTitle(customTitle || getDefaultTitleFromPath());
  const currentUrl = url || `${WEBSITE_URL}${pathname}`;
  const imageUrl = getFullAssetUrl(image);

  return (
    <Head>
      {/* Essential Meta Tags */}
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content={DEFAULT_SEO.imageWidth} />
      <meta property="og:image:height" content={DEFAULT_SEO.imageHeight} />
      <meta property="og:site_name" content={DEFAULT_SEO.siteName} />
      <meta property="og:locale" content={DEFAULT_SEO.locale} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={DEFAULT_SEO.twitter} />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Additional Meta Tags */}
      <link rel="canonical" href={currentUrl} />
    </Head>
  );
}

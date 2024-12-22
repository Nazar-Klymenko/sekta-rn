import Head from "expo-router/head";

import React from "react";

import { usePathname } from "expo-router";

import { formatPageTitle } from "../utils/formatPageTitle";

export function PageHead({ customTitle }: { customTitle?: string }) {
  const pathname = usePathname();

  // Convert path to title (e.g., "/contact" -> "Contact")
  const getDefaultTitleFromPath = () => {
    if (!pathname || pathname === "/") return "";
    return pathname
      .split("/")
      .pop()
      ?.replace(/[-_]/g, " ") // Replace hyphens and underscores with spaces
      ?.replace(/^\[.*\]$/, "") // Remove route parameters [id]
      ?.split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const title = formatPageTitle(customTitle || getDefaultTitleFromPath());

  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
}

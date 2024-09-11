//TODO: needs a refactor!!!
import { useNavigation } from "@react-navigation/native";

import { useCallback } from "react";

import {
  Href,
  useSegments as useExpoRouterSegments,
  usePathname,
  useRouter,
} from "expo-router";

export function useSegments(): string {
  const segments = useExpoRouterSegments();

  if (segments[0] === "(tabs)" && segments.length > 1) {
    return `/${segments[1]}`;
  }

  return "";
}
export function createTabUrl(baseUrl: string, segment: string): Href<string> {
  return `${segment}${baseUrl}` as Href<string>;
}
export function useCustomNavigation(closeDrawer: () => void) {
  const router = useRouter();
  const currentSegment = useSegments();
  const fullPath = useFullPath();

  const navigate = useCallback(
    (url: string) => {
      const targetPath = createTabUrl(url, currentSegment);
      const normalizedFullPath = fullPath.startsWith("/")
        ? fullPath.slice(1)
        : fullPath;

      // Handle the case where targetPath is an object
      const normalizedTargetPath =
        typeof targetPath === "string"
          ? targetPath.startsWith("/")
            ? targetPath.slice(1)
            : targetPath
          : targetPath.pathname.startsWith("/")
            ? targetPath.pathname.slice(1)
            : targetPath.pathname;

      if (normalizedFullPath === normalizedTargetPath) {
        // We're already on this tab, just close the drawer
        closeDrawer();
      } else {
        // Navigate to the new tab
        router.push(targetPath);
        closeDrawer();
      }
    },
    [router, currentSegment, closeDrawer, fullPath],
  );

  return { navigate };
}

export function useFullPath() {
  const segments = useExpoRouterSegments();

  // Check if we're in a tab route
  if (segments[0] === "(tabs)" && segments.length > 1) {
    // Construct the path starting from the tab name (segment[1])
    return "/" + segments.slice(1).join("/");
  }

  // If we're not in a tab route, join all segments
  return "/" + segments.join("/");
}

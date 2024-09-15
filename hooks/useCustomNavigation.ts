import { useCallback } from "react";

import {
  Href,
  useSegments as useExpoRouterSegments,
  useRouter,
} from "expo-router";

export const useCustomNavigation = (closeDrawer: () => void) => {
  const router = useRouter();
  const currentSegment = useSegments();
  const fullPath = useFullPath();

  const navigate = useCallback(
    (url: string) => {
      const targetPath = createTabUrl(url, currentSegment);
      const normalizedFullPath = normalizePath(fullPath);
      const normalizedTargetPath = normalizePath(targetPath);

      if (normalizedFullPath === normalizedTargetPath) {
        closeDrawer();
      } else {
        router.push(targetPath);
        closeDrawer();
      }
    },
    [router, currentSegment, closeDrawer, fullPath],
  );

  return { navigate };
};

const isTabRoute = (segments: string[]) =>
  segments[0] === "(tabs)" && segments.length > 1;

export const useSegments = (): string => {
  const segments = useExpoRouterSegments();
  return isTabRoute(segments) ? `/${segments[1]}` : "";
};

export const createTabUrl = (baseUrl: string, segment: string): Href<string> =>
  `${segment}${baseUrl}` as Href<string>;

export const useFullPath = (): string => {
  const segments = useExpoRouterSegments();
  return "/" + (isTabRoute(segments) ? segments.slice(1) : segments).join("/");
};

const normalizePath = (path: string | { pathname: string }): string =>
  (typeof path === "string" ? path : path.pathname).replace(/^\//, "");

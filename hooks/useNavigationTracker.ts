// hooks/useNavigationTracker.ts
import { useEffect, useState, useRef } from "react";
import { usePathname } from "expo-router";

export const useNavigationTracker = () => {
  const [prevRoute, setPrevRoute] = useState<string>("/");
  const currentRoute = usePathname();
  const routeHistory = useRef<string[]>([]);

  useEffect(() => {
    if (
      currentRoute !== routeHistory.current[routeHistory.current.length - 1]
    ) {
      if (routeHistory.current.length > 0) {
        setPrevRoute(routeHistory.current[routeHistory.current.length - 1]);
      }
      routeHistory.current.push(currentRoute);
    }
  }, [currentRoute]);

  return { prevRoute };
};

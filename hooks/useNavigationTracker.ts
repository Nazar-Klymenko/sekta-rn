// hooks/useNavigationTracker.ts
import { useEffect, useState, useRef } from "react";
import { useNavigation, usePathname } from "expo-router";

export const useNavigationTracker = () => {
  const [prevRoute, setPrevRoute] = useState<string>("/");
  const currentRoute = usePathname();
  const navigation = useNavigation();
  const routeHistory = useRef<string[]>([]);

  useEffect(() => {
    if (
      currentRoute !== routeHistory.current[routeHistory.current.length - 1]
    ) {
      routeHistory.current.push(currentRoute);
      if (routeHistory.current.length > 1) {
        setPrevRoute(routeHistory.current[routeHistory.current.length - 2]);
      }
    }

    const unsubscribe = navigation.addListener("state", () => {
      const currentState = navigation.getState();
      if (currentState.index > 0) {
        const previousRouteName =
          currentState.routes[currentState.index - 1].name;
        setPrevRoute(previousRouteName);
      }
    });

    return unsubscribe;
  }, [currentRoute, navigation]);

  return { prevRoute };
};

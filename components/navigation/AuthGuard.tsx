// components/AuthGuard.tsx
import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter, usePathname } from "expo-router";
import { useRouteStore } from "@/store/routeStore";

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const previousRoute = useRouteStore((state) => state.previousRoute);

  React.useEffect(() => {
    if (!isLoggedIn) {
      router.push({
        pathname: "/(auth)/login",
        params: {
          next: pathname,
          prev: previousRoute,
        },
      });
    }
  }, [isLoggedIn, pathname, previousRoute]);

  if (!isLoggedIn) {
    return null; // or a loading indicator
  }

  return <>{children}</>;
};

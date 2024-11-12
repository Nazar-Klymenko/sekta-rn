import React, { ReactNode, useEffect, useState } from "react";

import { useAuth } from "@/features/auth/hooks/useAuth";

import { usePathname, useRouter } from "expo-router";

import { FullPageLoading } from "../layout/FullPageLoading";

export const AuthGuard = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace({
        pathname: "/auth/login",
        params: {
          next: pathname,
        },
      });
    }
    setIsChecking(false);
  }, [isAuthenticated, pathname, router]);

  if (isChecking) return <FullPageLoading />;

  return <>{children}</>;
};

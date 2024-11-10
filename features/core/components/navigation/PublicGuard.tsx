import React, { ReactNode, useEffect, useState } from "react";

import { useAuth } from "@/features/auth/hooks/useAuth";

import { useLocalSearchParams, usePathname, useRouter } from "expo-router";

import { FullPageLoading } from "../layout/FullPageLoading";

export const PublicGuard = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);
  const { returnTo = "/" } = useLocalSearchParams<{ returnTo: string }>();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace({
        pathname: returnTo,
      });
    }
    setIsChecking(false);
  }, [isAuthenticated, pathname, router]);

  if (isChecking) return <FullPageLoading />;

  return <>{children}</>;
};

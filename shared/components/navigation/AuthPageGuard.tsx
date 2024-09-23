// components/AuthGuard.tsx
import React, { useEffect, useState } from "react";

import { useAuth } from "@/features/auth/hooks/useAuth";

import { Spinner, Stack } from "tamagui";

import { useLocalSearchParams, usePathname, useRouter } from "expo-router";

import { FullPageLoading } from "../layout/FullPageLoading";

interface AuthPageGuardProps {
  children: React.ReactNode;
}

export const AuthPageGuard: React.FC<AuthPageGuardProps> = ({ children }) => {
  const { isLoggedIn, isInitialized } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);
  const { returnTo = "/" } = useLocalSearchParams<{ returnTo: string }>();

  useEffect(() => {
    if (isInitialized && isLoggedIn) {
      router.replace({
        pathname: returnTo,
      });
    } else if (isInitialized && !isLoggedIn) {
      setIsChecking(false);
    }
  }, [isInitialized, isLoggedIn, pathname, router]);

  if (isChecking) return <FullPageLoading />;

  return <>{children}</>;
};

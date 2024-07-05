// components/AuthGuard.tsx
import React, { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter, usePathname, useLocalSearchParams } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import { Stack } from "tamagui";

interface AuthPageGuardProps {
  children: React.ReactNode;
}

export const AuthPageGuard: React.FC<AuthPageGuardProps> = ({ children }) => {
  const { isLoggedIn, isInitialized } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);
  const { next = "/" } = useLocalSearchParams<{ next: string }>();

  useEffect(() => {
    if (isInitialized && isLoggedIn) {
      router.replace({
        pathname: `${next}`,
      });
    } else if (isInitialized && !isLoggedIn) {
      setIsChecking(false);
    }
  }, [isInitialized, isLoggedIn, pathname, router]);

  if (isChecking) {
    return (
      <Stack
        backgroundColor="$background"
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </Stack>
    );
  }

  return <>{children}</>;
};

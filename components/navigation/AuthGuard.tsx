// components/AuthGuard.tsx
import React, { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter, usePathname, useLocalSearchParams } from "expo-router";
import { View, ActivityIndicator } from "react-native";

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { isLoggedIn, isInitialized } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (isInitialized && !isLoggedIn) {
      router.replace({
        pathname: "/(auth)/login",
        params: {
          next: pathname,
        },
      });
    } else if (isInitialized && isLoggedIn) {
      setIsChecking(false);
    }
  }, [isInitialized, isLoggedIn, pathname, router]);

  if (isChecking) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <>{children}</>;
};

// components/AuthGuard.tsx
import React, { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter, usePathname } from "expo-router";
import { useNavigationTracker } from "@/hooks/useNavigationTracker";
import { View, ActivityIndicator } from "react-native";

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { isLoggedIn, isInitialized } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { prevRoute } = useNavigationTracker();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (isInitialized && !isLoggedIn) {
      router.push({
        pathname: "/(auth)/login",
        params: {
          next: pathname,
          prev: prevRoute,
        },
      });
    } else if (isInitialized && isLoggedIn) {
      setIsChecking(false);
    }
  }, [isInitialized, isLoggedIn, pathname, prevRoute, router]);

  if (isChecking) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <>{children}</>;
};

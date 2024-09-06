import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TamaguiProvider } from "tamagui";
import { ToastProvider } from "@tamagui/toast";
import { AuthProvider } from "@/context/AuthContext";
import { useThemeContext } from "@/context/ThemeContext";
import tamaguiConfig from "@/tamagui.config";

const queryClient = new QueryClient();

export function AppProviders({ children }: { children: any }) {
  const { themeColor } = useThemeContext();

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <TamaguiProvider config={tamaguiConfig} defaultTheme={themeColor}>
          <ToastProvider>
            <AuthProvider>{children}</AuthProvider>
          </ToastProvider>
        </TamaguiProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

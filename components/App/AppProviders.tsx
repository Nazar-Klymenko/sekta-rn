import { ToastProvider } from "@tamagui/toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import React from "react";

import { AuthProvider } from "@/context/AuthContext";
import { useThemeContext } from "@/context/ThemeContext";
import tamaguiConfig from "@/tamagui.config";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { TamaguiProvider } from "tamagui";

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

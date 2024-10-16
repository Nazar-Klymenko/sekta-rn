import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import React from "react";

import { AuthProvider } from "@/context/AuthContext";
import tamaguiConfig from "@/tamagui.config";

import { ToastProvider } from "@tamagui/toast";

import { TamaguiProvider } from "tamagui";

import { SafeAreaProvider } from "react-native-safe-area-context";

const queryClient = new QueryClient();

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <TamaguiProvider config={tamaguiConfig} defaultTheme={"dark"}>
          <ToastProvider>
            <AuthProvider>{children}</AuthProvider>
          </ToastProvider>
        </TamaguiProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

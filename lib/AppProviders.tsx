import React from "react";

import { AuthProvider } from "@/context/AuthContext";
import tamaguiConfig from "@/tamagui.config";

import { ToastProvider } from "@tamagui/toast";

import { TamaguiProvider } from "tamagui";

import { SafeAreaProvider } from "react-native-safe-area-context";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <SafeAreaProvider>
      <TamaguiProvider config={tamaguiConfig} defaultTheme={"dark"}>
        <ToastProvider>
          <AuthProvider>{children}</AuthProvider>
        </ToastProvider>
      </TamaguiProvider>
    </SafeAreaProvider>
  );
}

import {
  Toast,
  ToastProvider,
  ToastViewport,
  useToastState,
} from "@tamagui/toast";

import React, { useEffect, useState } from "react";

import { Platform } from "react-native";

import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider, useThemeContext } from "@/context/ThemeContext";
import tamaguiConfig from "@/tamagui.config";

import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "react-query";
import { TamaguiProvider, Text, Theme, View, useTheme } from "tamagui";

import { CurrentToast } from "@/components/Toast";
import { FullPageLoading } from "@/components/layout/FullPageLoading";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
const queryClient = new QueryClient();

function AppContent() {
  const { themeColor } = useThemeContext();
  const { left, top, right } = useSafeAreaInsets();
  const theme = useTheme();

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <TamaguiProvider config={tamaguiConfig} defaultTheme={themeColor}>
          <ToastProvider>
            <AuthProvider>
              <Stack>
                <Stack.Screen
                  name="auth"
                  options={{
                    headerShown: false,
                    animation: "fade_from_bottom",
                  }}
                />
                <Stack.Screen
                  name="(tabs)"
                  options={{
                    headerShown: false,
                    animation: "fade_from_bottom",
                  }}
                />
                <Stack.Screen name="+not-found" />
                <Stack.Screen
                  name="privacy-policy"
                  options={{
                    title: "Privacy policy",
                    animation: "fade_from_bottom",
                    headerShown: true || Platform.OS !== "web",
                    headerStyle: {
                      backgroundColor: theme.background.get(),
                    },
                    headerTintColor: theme.color.get(),
                  }}
                />
                <Stack.Screen
                  name="tos"
                  options={{
                    title: "Terms of service",
                    animation: "fade_from_bottom",
                    headerShown: true || Platform.OS !== "web",
                    headerStyle: {
                      backgroundColor: theme.background.get(),
                    },
                    headerTintColor: theme.color.get(),
                  }}
                />
              </Stack>
            </AuthProvider>
            <CurrentToast />
            <ToastViewport
              top={top}
              left={left}
              right={right}
              flexDirection="column-reverse"
            />
          </ToastProvider>
        </TamaguiProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);

  const [fontsLoaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Promise.all([
          /* any other promises you need to await */
        ]);
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (appIsReady && fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady, fontsLoaded]);

  if (!appIsReady || !fontsLoaded) {
    return (
      <TamaguiProvider config={tamaguiConfig} defaultTheme="dark">
        <FullPageLoading />
      </TamaguiProvider>
    );
  }

  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

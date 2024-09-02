import {
  Toast,
  ToastProvider,
  ToastViewport,
  useToastState,
} from "@tamagui/toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import React, { useEffect, useState } from "react";

import { Platform, StatusBar } from "react-native";
import { usePushNotifications } from "@/hooks/usePushNotifications";

import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider, useThemeContext } from "@/context/ThemeContext";
import { useAuth } from "@/hooks/useAuth";
import tamaguiConfig from "@/tamagui.config";
import * as Notifications from "expo-notifications";

import { useFonts } from "expo-font";
import { Lato_900Black } from "@expo-google-fonts/lato";
import { Link, Slot, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { TamaguiProvider, Text, Theme, View, YStack, useTheme } from "tamagui";

import { CustomHeader } from "@/components/CustomHeader/CustomHeader";
import { CurrentToast } from "@/components/Toast";
import { FullPageLoading } from "@/components/layout/FullPageLoading";
import { Footer } from "@/components/navigation/Footer";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
const queryClient = new QueryClient();

function AppStack() {
  const { themeColor } = useThemeContext();
  const { left, top, right } = useSafeAreaInsets();
  const theme = useTheme();
  const { user } = useAuth();
  if (Platform.OS !== "web") {
    usePushNotifications();
  }

  if (Platform.OS === "web") {
    return (
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <CustomHeader title="Sekta Selekta" user={user} />
        <Slot />
        <Footer />
      </div>
    );
  }
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
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
          headerBackVisible: true,
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
  );
}

function AppContent() {
  const { themeColor } = useThemeContext();
  const { left, top, right } = useSafeAreaInsets();

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <TamaguiProvider config={tamaguiConfig} defaultTheme={themeColor}>
          <ToastProvider>
            <AuthProvider>
              <AppStack />
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
    Lato_900Black,
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

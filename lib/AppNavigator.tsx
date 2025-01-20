import React from "react";

import { Platform } from "react-native";

import { Slot, Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "tamagui";

import { ToastViewport } from "@tamagui/toast";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { CustomHeader } from "@/features/core/components/CustomHeader/CustomHeader";
import { Footer } from "@/features/core/components/layout/Footer";
import { CurrentToast } from "@/features/core/components/panels/Toast";
import { usePushNotifications } from "@/features/core/hooks/usePushNotifications";

export function AppNavigator() {
  const { user } = useAuth();
  const { left, top, right, bottom } = useSafeAreaInsets();
  const theme = useTheme();
  const bg = theme.background.get();

  if (Platform.OS !== "web") {
    usePushNotifications();
  }

  if (Platform.OS === "web") {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          backgroundColor: bg,
        }}
      >
        <CustomHeader title="Sekta Selekta" user={user} />
        <Slot />
        <Footer />
        <CurrentToast />
        <ToastViewport
          top={top}
          left={left}
          right={right}
          flexDirection="column-reverse"
        />
      </div>
    );
  }

  return (
    <>
      <Stack
        initialRouteName="(tabs)"
        screenOptions={{
          headerShown: false,
          headerTitleStyle: {
            fontFamily: "LeagueSpartan_700Bold",
            fontSize: 25,
          },
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="auth"
          options={{
            presentation: "modal",
            animation: "fade_from_bottom",
          }}
        />
        <Stack.Screen
          name="(support)"
          options={{
            presentation: "modal",
            animation: "fade_from_bottom",
          }}
        />
        <Stack.Screen
          name="admin"
          options={{
            presentation: "modal",
            animation: "fade_from_bottom",
          }}
        />
        <Stack.Screen name="+not-found" options={{ presentation: "modal" }} />
      </Stack>
      <CurrentToast />
      <ToastViewport
        portalToRoot
        flexDirection="column"
        top={undefined}
        left={left}
        right={right}
        bottom={bottom + 10}
      />
    </>
  );
}

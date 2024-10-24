import React from "react";

import { Platform } from "react-native";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { CustomHeader } from "@/features/core/components/CustomHeader/CustomHeader";
import { CurrentToast } from "@/features/core/components/Toast";
import { Footer } from "@/features/core/components/navigation/Footer";
import { usePushNotifications } from "@/features/core/hooks/usePushNotifications";

import { ToastViewport } from "@tamagui/toast";

import { Slot, Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function AppNavigator() {
  const { user } = useAuth();
  const { left, top, right } = useSafeAreaInsets();

  if (Platform.OS !== "web") {
    usePushNotifications();
  }

  if (Platform.OS === "web") {
    return (
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
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
        top={top}
        left={left}
        right={right}
        flexDirection="column-reverse"
      />
    </>
  );
}

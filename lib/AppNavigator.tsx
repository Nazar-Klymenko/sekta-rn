import { Drawer } from "expo-router/drawer";

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
      <Stack initialRouteName="(tabs)">
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
            animation: "fade_from_bottom",
          }}
        />
        <Stack.Screen
          name="auth"
          options={{
            headerShown: false,
            animation: "fade_from_bottom",
            presentation: "modal",
          }}
        />
        <Stack.Screen
          name="(support)"
          options={{
            headerShown: false,
            animation: "fade_from_bottom",
            presentation: "modal",
          }}
        />
        <Stack.Screen
          name="admin"
          options={{
            headerShown: false,
            animation: "slide_from_right",
            presentation: "modal",
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

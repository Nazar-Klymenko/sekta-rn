import { ToastViewport } from "@tamagui/toast";
import { Drawer } from "expo-router/drawer";

import React from "react";

import { Platform } from "react-native";

import { useAuth } from "@/hooks/useAuth";
import { usePushNotifications } from "@/hooks/usePushNotifications";

import { Slot, Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { YStack, useTheme } from "tamagui";

import { CustomHeader } from "@/components/CustomHeader/CustomHeader";
import { CurrentToast } from "@/components/Toast";
import { Footer } from "@/components/navigation/Footer";

import { DrawerLayout } from "../components/drawer/DrawerLayout";

export function AppNavigator() {
  const { user } = useAuth();
  const { left, top, right } = useSafeAreaInsets();
  const theme = useTheme();

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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <DrawerLayout>
        <Stack initialRouteName="(tabs)">
          <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false, animation: "fade_from_bottom" }}
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
          <Stack.Screen name="+not-found" options={{ presentation: "modal" }} />
        </Stack>
        <CurrentToast />
        <ToastViewport
          top={top}
          left={left}
          right={right}
          flexDirection="column-reverse"
        />
      </DrawerLayout>
    </GestureHandlerRootView>
  );
}

import React from "react";
import { Platform } from "react-native";
import { Slot, Stack } from "expo-router";
import { YStack } from "tamagui";
import { useAuth } from "@/hooks/useAuth";
import { CustomHeader } from "@/components/CustomHeader/CustomHeader";
import { Footer } from "@/components/navigation/Footer";
import { CurrentToast } from "@/components/Toast";
import { ToastViewport } from "@tamagui/toast";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { usePushNotifications } from "@/hooks/usePushNotifications";

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
    <YStack f={1}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
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
    </YStack>
  );
}

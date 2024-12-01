import React from "react";

import { Platform } from "react-native";

import { UsernameProvider } from "@/features/auth/context/UsernameContext";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { FullPageLoading } from "@/features/core/components/layout/FullPageLoading";

import { useTheme } from "tamagui";

import { Href, Redirect, Slot, Stack, useLocalSearchParams } from "expo-router";

export default function AuthLayout() {
  const theme = useTheme();
  const { isAuthenticated, isLoading } = useAuth();
  const { next } = useLocalSearchParams<{ next?: string }>();

  if (isLoading) {
    return <FullPageLoading />;
  }

  if (isAuthenticated) {
    const validNext: Href = next ? (decodeURIComponent(next) as Href) : "/";
    return <Redirect href={validNext} />;
  }

  if (Platform.OS === "web") {
    return <Slot />;
  }

  return (
    <UsernameProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.background.get(),
          },
          headerTintColor: theme.color.get(),
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "LeagueSpartan_700Bold",
            fontSize: 25,
          },
        }}
      >
        <Stack.Screen
          name="username-bridge"
          options={{
            headerShown: true || Platform.OS !== "web",
            title: "Create username",
            animation: "fade_from_bottom",
          }}
        />
        <Stack.Screen
          name="login"
          options={{
            headerShown: true || Platform.OS !== "web",
            title: "Log in",
            animation: "fade_from_bottom",
          }}
        />
        <Stack.Screen
          name="signup"
          options={{
            headerShown: true || Platform.OS !== "web",
            title: "Sign Up",
            animation: "fade_from_bottom",
          }}
        />
        <Stack.Screen
          name="forgot-password"
          options={{
            headerShown: true || Platform.OS !== "web",
            title: "Forgot Password",
            animation: "fade_from_bottom",
          }}
        />
        <Stack.Screen
          name="forgot-password-success"
          options={{
            headerShown: true || Platform.OS !== "web",
            title: "Password recovery email sent!",
            animation: "fade_from_bottom",
          }}
        />
      </Stack>
    </UsernameProvider>
  );
}

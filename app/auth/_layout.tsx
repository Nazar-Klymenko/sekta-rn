import React from "react";

import { Platform } from "react-native";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { FullPageLoading } from "@/features/core/components/layout/FullPageLoading";

import { useTheme } from "tamagui";

import { Redirect, Slot, Stack } from "expo-router";

export default function AuthLayout() {
  const theme = useTheme();
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <FullPageLoading />;
  }

  if (isAuthenticated) {
    return <Redirect href={"/"} />;
  }

  if (Platform.OS === "web") {
    return <Slot />;
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.background.get(),
        },
        headerTintColor: theme.color.get(),
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
  );
}

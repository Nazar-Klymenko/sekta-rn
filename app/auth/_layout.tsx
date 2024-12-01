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
            title: "Create username",
          }}
        />
        <Stack.Screen
          name="login"
          options={{
            title: "Log in",
          }}
        />
        <Stack.Screen
          name="signup"
          options={{
            title: "Sign Up",
          }}
        />
        <Stack.Screen
          name="forgot-password"
          options={{
            title: "Forgot Password",
          }}
        />
        <Stack.Screen
          name="forgot-password-success"
          options={{
            title: "Password recovery email sent!",
          }}
        />
      </Stack>
    </UsernameProvider>
  );
}

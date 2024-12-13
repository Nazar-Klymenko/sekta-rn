import React from "react";

import { Platform } from "react-native";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { FullPageLoading } from "@/features/core/components/layout/FullPageLoading";

import { useTheme } from "tamagui";

import { Redirect, Stack } from "expo-router";

export default function HomeLayout() {
  const theme = useTheme();
  const { user, displayUser, isLoading } = useAuth();
  if (Platform.OS === "web") {
    return <Redirect href={"/"} />;
  }
  if (isLoading) {
    return <FullPageLoading />;
  }

  if (!displayUser?.isAdmin) {
    return <Redirect href={"/"} />;
  }

  return (
    <Stack
      screenOptions={{
        headerTitleAlign: "center",
        headerTintColor: theme.color.get(),
        headerStyle: {
          backgroundColor: theme.background.get(),
        },
        headerTitleStyle: {
          fontFamily: "LeagueSpartan_700Bold",
          fontSize: 25,
        },
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Admin",
        }}
      />
      <Stack.Screen
        name="events"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="submissions"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="users"
        options={{
          title: "All users",
        }}
      />
    </Stack>
  );
}

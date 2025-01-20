import React from "react";

import { Platform } from "react-native";

import { Redirect, Stack } from "expo-router";
import { useTheme } from "tamagui";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { ClearIcon } from "@/features/core/components/form/shared/ClearIcon";
import { FullPageLoading } from "@/features/core/components/layout/FullPageLoading";

export default function HomeLayout() {
  const theme = useTheme({ name: "surface1" });
  const { displayUser, isLoading } = useAuth();
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
          presentation: "fullScreenModal",
        }}
      />

      <Stack.Screen
        name="submissions"
        options={{
          headerShown: false,
          presentation: "fullScreenModal",
        }}
      />
      <Stack.Screen
        name="users"
        options={{
          headerShown: false,
          presentation: "fullScreenModal",
        }}
      />
      <Stack.Screen
        name="residents"
        options={{
          headerShown: false,
          presentation: "fullScreenModal",
        }}
      />
    </Stack>
  );
}

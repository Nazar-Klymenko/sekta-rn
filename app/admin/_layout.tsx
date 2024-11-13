import React from "react";

import { Platform } from "react-native";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { FullPageLoading } from "@/features/core/components/layout/FullPageLoading";
import { useUserData } from "@/features/users/hooks/useUserData";

import { useTheme } from "tamagui";

import { Redirect, Slot, Stack } from "expo-router";

export default function HomeLayout() {
  const theme = useTheme();
  const { user } = useAuth();
  const { data: userData, isLoading } = useUserData(user?.uid || "");

  if (isLoading) {
    return <FullPageLoading />;
  }

  if (!userData?.isAdmin) {
    return <Redirect href={"/"} />;
  }

  if (Platform.OS === "web") {
    return <Slot />;
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

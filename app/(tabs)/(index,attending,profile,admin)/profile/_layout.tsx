import React from "react";

import { Platform } from "react-native";

import { DrawerButton } from "@/shared/components/drawer/DrawerButton";

import { useTheme } from "tamagui";

import { Slot, Stack } from "expo-router";

export default function HomeLayout() {
  const theme = useTheme();
  if (Platform.OS === "web") {
    return <Slot />;
  }
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Profile",
          animation: "fade_from_bottom",
          headerShown: true || Platform.OS !== "web",
          headerLeft: () => <DrawerButton />,

          headerStyle: {
            backgroundColor: theme.background.get(),
          },
          headerTintColor: theme.color.get(),
        }}
      />
      <Stack.Screen
        name="change-email"
        options={{
          title: "Profile information",
          animation: "fade_from_bottom",
          headerShown: true || Platform.OS !== "web",
          headerStyle: {
            backgroundColor: theme.background.get(),
          },
          headerTintColor: theme.color.get(),
        }}
      />
      <Stack.Screen
        name="change-username"
        options={{
          title: "Change username",
          animation: "fade_from_bottom",
          headerShown: true || Platform.OS !== "web",
          headerStyle: {
            backgroundColor: theme.background.get(),
          },
          headerTintColor: theme.color.get(),
        }}
      />
      <Stack.Screen
        name="change-password"
        options={{
          title: "Change password",
          animation: "fade_from_bottom",
          headerShown: true || Platform.OS !== "web",
          headerStyle: {
            backgroundColor: theme.background.get(),
          },
          headerTintColor: theme.color.get(),
        }}
      />
      <Stack.Screen
        name="delete-profile"
        options={{
          title: "Delete account",
          animation: "fade_from_bottom",
          headerShown: true || Platform.OS !== "web",
          headerStyle: {
            backgroundColor: theme.background.get(),
          },
          headerTintColor: theme.color.get(),
        }}
      />
      <Stack.Screen
        name="push-notifications"
        options={{
          title: "Push notifications",
          animation: "fade_from_bottom",
          headerShown: true || Platform.OS !== "web",
          headerStyle: {
            backgroundColor: theme.background.get(),
          },
          headerTintColor: theme.color.get(),
        }}
      />
      <Stack.Screen
        name="email-notifications"
        options={{
          title: "Email notifications",
          animation: "fade_from_bottom",
          headerShown: true || Platform.OS !== "web",
          headerStyle: {
            backgroundColor: theme.background.get(),
          },
          headerTintColor: theme.color.get(),
        }}
      />
    </Stack>
  );
}

import React from "react";

import { Platform } from "react-native";

import { Slot, Stack } from "expo-router";
import { useTheme } from "tamagui";

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
          title: "Profiles",
          animation: "fade_from_bottom",
          headerShown: true || Platform.OS !== "web",
          headerStyle: {
            backgroundColor: theme.background.get(),
          },
          headerTintColor: theme.color.get(),
        }}
      />
      <Stack.Screen
        name="profile-information"
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
        name="change-password"
        options={{
          title: "Change Password",
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

      <Stack.Screen
        name="contact"
        options={{
          title: "Contact us",
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

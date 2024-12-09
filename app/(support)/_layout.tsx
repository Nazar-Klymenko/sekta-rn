import React from "react";

import { Platform } from "react-native";

import { useTheme } from "tamagui";

import { Slot, Stack } from "expo-router";

export default function SupportLayout() {
  const theme = useTheme();
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
        name="privacy-policy"
        options={{
          title: "Privacy policy",
        }}
      />
      <Stack.Screen
        name="tos"
        options={{
          title: "Terms of Service",
        }}
      />
      <Stack.Screen
        name="contact"
        options={{
          title: "Contact us",
        }}
      />
    </Stack>
  );
}

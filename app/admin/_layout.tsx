import React from "react";

import { Platform } from "react-native";

import { useTheme } from "tamagui";

import { Slot, Stack } from "expo-router";

export default function HomeLayout() {
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
        name="index"
        options={{
          title: "Admin",
        }}
      />
      <Stack.Screen
        name="events"
        options={{
          title: "All events",
        }}
      />
      <Stack.Screen
        name="residents"
        options={{
          title: "All Residents",
        }}
      />
      <Stack.Screen
        name="submissions"
        options={{
          title: "All Play Submissions",
        }}
      />
      <Stack.Screen
        name="user-list"
        options={{
          title: "All users",
        }}
      />
    </Stack>
  );
}

import React from "react";

import { Platform } from "react-native";

import { Slot, Stack } from "expo-router";

export default function HomeLayout() {
  if (Platform.OS === "web") {
    return <Slot />;
  }
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Play",
        }}
      />
      <Stack.Screen
        name="residents"
        options={{
          animation: "fade_from_bottom",
          title: "Residents",
        }}
      />
    </Stack>
  );
}

import React from "react";

import { Platform } from "react-native";

import { Slot, Stack } from "expo-router";

export default function HomeLayout() {
  if (Platform.OS === "web") {
    return <Slot />;
  }
  return (
    <Stack>
      <Stack.Screen name="[id]" />
    </Stack>
  );
}

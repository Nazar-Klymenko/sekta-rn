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
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{
          animation: "fade_from_bottom",
          title: "",
          headerShown: true,
          headerTransparent: true,
          headerTintColor: theme.color.get(),
        }}
      />
    </Stack>
  );
}

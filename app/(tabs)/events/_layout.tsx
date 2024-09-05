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
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
        options={{
          title: "Events",
          headerShown: true || Platform.OS !== "web",
          headerStyle: {
            backgroundColor: theme.background.get(),
          },
          headerTintColor: theme.color.get(),

          headerSearchBarOptions: {
            shouldShowHintSearchIcon: false,
            headerIconColor: theme.color.get(),
            hintTextColor: theme.placeholderColor.get(),
            textColor: theme.color.get(),
            placeholder: "Search events",
            hideWhenScrolling: true,
          },
        }}
      />
      <Stack.Screen name="(event)" />
    </Stack>
  );
}

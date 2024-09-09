import React from "react";

import { Platform } from "react-native";

import { Slot, Stack } from "expo-router";
import { useTheme } from "tamagui";

import { DrawerButton } from "@/components/DrawerButton";

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
          animation: "fade_from_bottom",
          headerLeft: () => <DrawerButton />,
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
      <Stack.Screen
        name="(event)"
        options={{
          animation: "fade_from_bottom",
        }}
      />
    </Stack>
  );
}

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
        }}
      />
      <Stack.Screen
        name="upcoming"
        options={{
          title: "Upcoming events",

          headerShown: true,
          animation: "fade_from_bottom",
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
      <Stack.Screen
        name="previous"
        options={{
          title: "Previous events",
          headerShown: true,
          animation: "fade_from_bottom",
          headerStyle: {
            backgroundColor: theme.background.get(),
          },
          headerTintColor: theme.color.get(),
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

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
          title: "Events",
          animation: "fade_from_bottom",
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
      {/* <Stack.Screen
        name="upcoming"
        options={{
          title: "Upcoming events",
          animation: "fade_from_bottom",
          headerShown: true || Platform.OS !== "web",
          headerStyle: {
            backgroundColor: theme.background.get(),
          },
          headerTintColor: theme.color.get(),
        }}
      /> */}
      <Stack.Screen
        name="event"
        options={{
          headerShown: false,
          animation: "fade_from_bottom",
        }}
      />
    </Stack>
  );
}

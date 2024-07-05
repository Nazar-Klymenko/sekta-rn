import { Stack } from "expo-router";
import React from "react";
import { useTheme } from "tamagui";

export default function HomeLayout() {
  const theme = useTheme();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Home",
          animation: "fade_from_bottom",
          headerShown: true,
          headerStyle: {
            backgroundColor: theme.background.get(),
          },
          headerTintColor: theme.color.get(),
        }}
      />
      <Stack.Screen
        name="event"
        options={{
          animation: "fade_from_bottom",
          title: "Event",
          headerShown: true,
          headerStyle: {
            backgroundColor: theme.background.get(),
          },
          headerTintColor: theme.color.get(),
        }}
      />
    </Stack>
  );
}

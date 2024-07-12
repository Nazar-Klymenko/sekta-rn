import React from "react";

import { Stack } from "expo-router";
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
          headerShown: false,
        }}
      />
    </Stack>
  );
}

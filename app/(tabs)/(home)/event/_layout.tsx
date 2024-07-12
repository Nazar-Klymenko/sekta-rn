import React from "react";

import { Stack } from "expo-router";
import { useTheme } from "tamagui";

export default function HomeLayout() {
  const theme = useTheme();

  return (
    <Stack>
      <Stack.Screen
        name="[id]"
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

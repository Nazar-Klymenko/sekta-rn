import { Stack } from "expo-router";
import React from "react";

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="event"
        options={{
          title: "Event",
          headerShown: true,
        }}
      />
    </Stack>
  );
}

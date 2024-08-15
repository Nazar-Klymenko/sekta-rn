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
          title: "Admin",
          animation: "fade_from_bottom",
          headerShown: true || Platform.OS !== "web",
          headerStyle: {
            backgroundColor: theme.background.get(),
          },
          headerTintColor: theme.color.get(),
        }}
      />
      <Stack.Screen
        name="userlist"
        options={{
          title: "All users",
          animation: "fade_from_bottom",
          headerShown: true || Platform.OS !== "web",
          headerStyle: {
            backgroundColor: theme.background.get(),
          },
          headerTintColor: theme.color.get(),
        }}
      />
      <Stack.Screen
        name="events"
        options={{
          title: "All events",
          animation: "fade_from_bottom",
          headerShown: true || Platform.OS !== "web",
          headerStyle: {
            backgroundColor: theme.background.get(),
          },
          headerTintColor: theme.color.get(),
        }}
      />
      <Stack.Screen
        name="submissions"
        options={{
          title: "All Play Submissions",
          animation: "fade_from_bottom",
          headerShown: true || Platform.OS !== "web",
          headerStyle: {
            backgroundColor: theme.background.get(),
          },
          headerTintColor: theme.color.get(),
        }}
      />
      {/* <Stack.Screen
        name="[id]"
        options={{
          animation: "fade_from_bottom",
          title: "Event",
          headerShown: true || Platform.OS !== "web",
          headerStyle: {
            backgroundColor: theme.background.get(),
          },
          headerTintColor: theme.color.get(),
        }}
      /> */}
    </Stack>
  );
}

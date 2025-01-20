import React from "react";

import { Platform } from "react-native";

import { Slot, Stack } from "expo-router";
import { useTheme } from "tamagui";

export default function EventsLayout() {
  const theme = useTheme();

  const { tokens } = theme;
  if (Platform.OS === "web") {
    return <Slot />;
  }

  return (
    <Stack
      screenOptions={{
        headerTitleAlign: "center",
        headerTintColor: theme.color.get(),
        headerShadowVisible: false,

        headerStyle: {
          backgroundColor: theme.background.get(),
        },
        headerTitleStyle: {
          fontFamily: "LeagueSpartan_700Bold",
          fontSize: 25,
        },
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Events",
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: "Event",
          headerShown: true,
          headerBackVisible: true,
        }}
      />
      <Stack.Screen
        name="upcoming"
        options={{
          title: "Upcoming events",
        }}
      />
      <Stack.Screen
        name="residents/index"
        options={{
          headerLargeTitle: true,
          title: "Residents",
        }}
      />
      <Stack.Screen
        name="residents/[id]"
        options={{
          headerLargeTitle: true,
          title: "Resident",
        }}
      />
      <Stack.Screen
        name="previous"
        options={{
          title: "Previous events",
        }}
      />
    </Stack>
  );
}

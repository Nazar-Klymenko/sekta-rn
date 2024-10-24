import React from "react";

import { Platform } from "react-native";
import { TouchableOpacity } from "react-native";

import { SizableText, Theme, useTheme } from "tamagui";

import { Slot, Stack } from "expo-router";

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
        headerShadowVisible: true,

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
        options={({ navigation }) => ({
          headerTitle: "Events",
        })}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: "Event",
          headerShown: false,
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="going"
        options={{
          title: "Going",
        }}
      />
      <Stack.Screen
        name="upcoming"
        options={{
          title: "Upcoming events",
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

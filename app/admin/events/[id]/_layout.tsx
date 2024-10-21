import React from "react";

import { Platform, TouchableOpacity } from "react-native";

import { SizableText, useTheme } from "tamagui";

import { Slot, Stack } from "expo-router";

export default function HomeLayout() {
  const theme = useTheme();
  if (Platform.OS === "web") {
    return <Slot />;
  }
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: "center",
        headerTintColor: "orange",
        headerStyle: {
          backgroundColor: "black",
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
          title: "Event",
        }}
      />
      <Stack.Screen
        name="update"
        options={{
          title: "Update Event",
        }}
      />
    </Stack>
  );
}

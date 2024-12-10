import React from "react";

import { Platform } from "react-native";

import { Redirect, Slot, Stack } from "expo-router";

export default function HomeLayout() {
  if (Platform.OS === "web") {
    return <Redirect href={"./"} />;
  }
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Play",
        }}
      />
    </Stack>
  );
}

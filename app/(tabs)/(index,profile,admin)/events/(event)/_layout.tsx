import { Ionicons } from "@expo/vector-icons";
import { ArrowLeft } from "@tamagui/lucide-icons";

import React from "react";

import { Platform, TouchableOpacity } from "react-native";

import { Slot, Stack, useRouter } from "expo-router";
// Or any icon library you prefer
import { Stack as TamaguiStack, View, useTheme } from "tamagui";

export default function HomeLayout() {
  const theme = useTheme();
  const router = useRouter(); // Use Expo Router for navigation

  if (Platform.OS === "web") {
    return <Slot />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{
          animation: "fade_from_bottom",
          title: "",
          headerShown: true,
          headerTransparent: true,
          headerTintColor: theme.color.get(), // Use theme color for header tint
        }}
      />
    </Stack>
  );
}

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
          headerLeft: ({ canGoBack }) => (
            <TamaguiStack
              style={{
                backgroundColor: theme.backgroundHover.get(),
                borderWidth: 1,
                borderColor: theme.gray2Dark.get(),
                borderRadius: 20,
                padding: 6,
                marginHorizontal: 10,
                overflow: "hidden",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  if (canGoBack) router.back();
                }}
              >
                <ArrowLeft />
              </TouchableOpacity>
            </TamaguiStack>
          ),
        }}
      />
    </Stack>
  );
}

import React from "react";

import { Platform, TouchableOpacity } from "react-native";

import { Slot, Stack, useRouter } from "expo-router";
import { SizableText, useTheme } from "tamagui";

import { ClearIcon } from "@/features/core/components/form/shared/ClearIcon";

export default function HomeLayout() {
  const theme = useTheme({ name: "surface1" });
  const router = useRouter();
  if (Platform.OS === "web") {
    return <Slot />;
  }
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: "center",
        headerTintColor: theme.color.get(),
        headerStyle: {
          backgroundColor: theme.background.get(),
        },
        headerTitleStyle: {
          fontFamily: "LeagueSpartan_700Bold",
          fontSize: 25,
        },
        animation: "slide_from_right",
        headerRight: () => (
          <ClearIcon
            onPress={() => {
              router.navigate("/admin");
            }}
          />
        ),
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "All Play Submissions",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: "Submission Details",
          headerShown: true,
        }}
      />
    </Stack>
  );
}

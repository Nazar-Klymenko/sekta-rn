import React from "react";

import { Platform } from "react-native";

import { Slot, Stack, useRouter } from "expo-router";
import { useTheme } from "tamagui";

import { ClearIcon } from "@/features/core/components/form/shared/ClearIcon";

export default function AdminResidentsLayout() {
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
        options={{ headerShown: true, title: "All Residents" }}
      />
      <Stack.Screen
        name="[id]/index"
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="[id]/update"
        options={{
          headerShown: true,
          title: "Edit Resident",
        }}
      />
      <Stack.Screen
        name="create"
        options={{
          title: "Create Resident",
          headerShown: true,
        }}
      />
    </Stack>
  );
}

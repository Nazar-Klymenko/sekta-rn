import React from "react";

import { Platform, TouchableOpacity } from "react-native";

import { SizableText, useTheme } from "tamagui";

import { Slot, Stack } from "expo-router";

export default function AdminEventsLayout() {
  const theme = useTheme();
  if (Platform.OS === "web") {
    return <Slot />;
  }
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: theme.background.get(),
        },
        headerTintColor: theme.color.get(),
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
          title: "All Events",
          headerShown: true,
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.push("create")}>
              <SizableText
                theme={"accent"}
                color="$background"
                style={{ marginRight: 10 }}
              >
                Create
              </SizableText>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="create"
        options={{
          title: "Create Event",
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: false,
          title: "Event Details",
        }}
      />
    </Stack>
  );
}

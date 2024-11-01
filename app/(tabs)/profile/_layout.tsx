import React from "react";

import { Platform } from "react-native";
import { Text, TouchableOpacity } from "react-native";

import { useTheme } from "tamagui";

import { Slot, Stack } from "expo-router";

export default function HomeLayout() {
  const theme = useTheme();
  if (Platform.OS === "web") {
    return <Slot />;
  }
  return (
    <Stack
      screenOptions={{
        animation: "fade_from_bottom",
        headerStyle: {
          backgroundColor: theme.background.get(),
        },
        headerTintColor: theme.color.get(),
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontFamily: "LeagueSpartan_700Bold",
          fontSize: 25,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={({ navigation }) => ({
          title: "Profile",
          animation: "fade_from_bottom",
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.push("admin")}>
              <Text style={{ color: theme.accentColor.get(), marginRight: 10 }}>
                Admin
              </Text>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="change-email"
        options={{
          title: "Change email",
        }}
      />
      <Stack.Screen
        name="change-username"
        options={{
          title: "Change username",
        }}
      />
      <Stack.Screen
        name="change-password"
        options={{
          title: "Change password",
        }}
      />
      <Stack.Screen
        name="delete-profile"
        options={{
          title: "Delete account",
        }}
      />
      <Stack.Screen
        name="push-notifications"
        options={{
          title: "Push notifications",
        }}
      />
      <Stack.Screen
        name="email-notifications"
        options={{
          title: "Email notifications",
        }}
      />
    </Stack>
  );
}

import React from "react";

import { Platform } from "react-native";
import { Text, TouchableOpacity } from "react-native";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { useUserData } from "@/features/users/hooks/useUserData";

import { SizableText, useTheme } from "tamagui";

import { Redirect, Slot, Stack, usePathname } from "expo-router";

export default function HomeLayout() {
  const theme = useTheme();
  const { user, isAuthenticated } = useAuth();
  const { data: userData } = useUserData(user?.uid || "");
  const pathname = usePathname();

  if (!isAuthenticated && pathname !== "/profile") {
    return <Redirect href="/auth/login?next=/profile" />;
  }

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
          headerRight: () =>
            userData?.isAdmin && (
              <TouchableOpacity onPress={() => navigation.push("admin")}>
                <SizableText>Admin</SizableText>
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

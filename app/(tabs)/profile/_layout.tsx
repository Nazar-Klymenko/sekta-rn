import React from "react";

import { Platform } from "react-native";
import { TouchableOpacity } from "react-native";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { useUserData } from "@/features/users/hooks/useUserData";

import { SizableText, useTheme } from "tamagui";

import { Redirect, Slot, Stack } from "expo-router";

export default function HomeLayout() {
  const theme = useTheme();
  const { user, isAuthenticated } = useAuth();
  const { data: userData } = useUserData(user?.uid || "");

  if (Platform.OS === "web") {
    return <Redirect href={"./"} />;
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
        name="change-password"
        redirect={!isAuthenticated}
        options={{
          title: "Change password",
        }}
      />
      <Stack.Screen
        name="delete-profile"
        redirect={!isAuthenticated}
        options={{
          title: "Delete account",
        }}
      />
      <Stack.Screen
        name="push-notifications"
        redirect={!isAuthenticated}
        options={{
          title: "Push notifications",
        }}
      />
      <Stack.Screen
        name="email-notifications"
        redirect={!isAuthenticated}
        options={{
          title: "Email notifications",
        }}
      />
    </Stack>
  );
}

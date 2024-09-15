import {
  Bookmark,
  BoomBox,
  Heart,
  Home,
  Play,
  User,
  UserRoundCheck,
} from "@tamagui/lucide-icons";

import React from "react";

import { Platform } from "react-native";

import { useAuth } from "@/hooks/useAuth";
import { useUserData } from "@/hooks/useUserData";

import { Stack } from "expo-router";
import { Slot, Tabs, usePathname } from "expo-router";
import { useTheme } from "tamagui";

export default function TabLayout() {
  const theme = useTheme();
  const { isLoggedIn, user } = useAuth();
  const { data: userData } = useUserData(user?.uid || "");
  const pathname = usePathname();

  if (Platform.OS === "web") {
    return <Slot />;
  }

  return (
    <Tabs
      initialRouteName="(index)"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.gray2Dark.get(),
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: theme.color.get(),
        tabBarInactiveTintColor: theme.gray9Light.get(),
        headerStyle: {
          backgroundColor: theme.background.get(),
          elevation: 0,
        },
        headerTintColor: theme.color.get(),
        tabBarIconStyle: { marginTop: 4 },
        tabBarLabelStyle: { paddingBottom: 4 },
      }}
    >
      <Tabs.Screen
        name="(index)"
        options={{
          title: "Events",
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />

      <Tabs.Screen
        name="(profile)"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="(admin)"
        options={{
          title: "Admin",
          headerShown: false,
          tabBarItemStyle: {
            display: isLoggedIn && userData?.isAdmin ? "flex" : "none",
          },
          tabBarIcon: ({ color, size }) => (
            <UserRoundCheck color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}

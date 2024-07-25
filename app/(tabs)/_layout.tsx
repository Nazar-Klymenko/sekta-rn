import { Heart, Home, List, Play, User } from "@tamagui/lucide-icons";

import React from "react";

import { Platform } from "react-native";

import { useAuth } from "@/hooks/useAuth";

import { Tabs } from "expo-router";
import { useTheme } from "tamagui";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";

export default function TabLayout() {
  const theme = useTheme();
  const { isLoggedIn } = useAuth();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.background.get(),
        },
        tabBarActiveTintColor: theme.color.get(),
        tabBarInactiveTintColor: theme.gray9Light.get(),
        headerStyle: {
          backgroundColor: theme.background.get(),
        },
        headerTintColor: theme.color.get(),
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Events",
          // tabBarShowLabel: false,

          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="favourite"
        options={{
          headerShown: false,
          // headerShown: true || Platform.OS !== "web",
          title: "Favourite",
          // tabBarShowLabel: false,
          tabBarItemStyle: {
            display: isLoggedIn ? "flex" : "none",
          },
          tabBarIcon: ({ color, size }) => <Heart color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="play"
        options={{
          headerShown: true || Platform.OS !== "web",
          title: "Play",
          // tabBarShowLabel: false,

          tabBarIcon: ({ color, size }) => <Play color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
          // tabBarShowLabel: false,
        }}
      />
    </Tabs>
  );
}

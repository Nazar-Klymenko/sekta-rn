import { Heart, Home, List, Play, User } from "@tamagui/lucide-icons";

import React from "react";

import { Platform } from "react-native";

import { Tabs } from "expo-router";
import { useTheme } from "tamagui";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";

export default function TabLayout() {
  const theme = useTheme();

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
          tabBarShowLabel: false,

          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="favourite"
        options={{
          headerShown: Platform.OS !== "web",
          title: "Favourite",
          tabBarShowLabel: false,

          tabBarIcon: ({ color, size }) => <Heart color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="play"
        options={{
          headerShown: Platform.OS !== "web",
          title: "Play",
          tabBarShowLabel: false,

          tabBarIcon: ({ color, size }) => <Play color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
          tabBarShowLabel: false,
        }}
      />
    </Tabs>
  );
}

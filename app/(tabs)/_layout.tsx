import React from "react";

import { Platform } from "react-native";

import { Home, Ticket, User } from "@tamagui/lucide-icons";

import { useTheme } from "tamagui";

import { Slot, Tabs } from "expo-router";

export default function TabLayout() {
  const theme = useTheme();
  if (Platform.OS === "web") {
    return <Slot />;
  }

  return (
    <Tabs
      initialRouteName="events"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "$accentColor",
        tabBarStyle: {
          borderColor: theme.borderColor.get(),
          backgroundColor: theme.background.get(),
        },
      }}
    >
      <Tabs.Screen
        name="events"
        options={{
          title: "Events",
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="play"
        options={{
          title: "Play",
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Ticket color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}

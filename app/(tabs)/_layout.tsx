import { Home, Play, User } from "@tamagui/lucide-icons";

import React from "react";

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
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="play"
        options={{
          headerShown: true,
          title: "Play",
          tabBarIcon: ({ color, size }) => <Play color={color} size={size} />,
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("play");
          },
        })}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("profile");
          },
        })}
      />
    </Tabs>
  );
}

import React from "react";

import { Platform } from "react-native";

import { Home, Ticket, User } from "@tamagui/lucide-icons";

import { Slot, Tabs } from "expo-router";

export default function TabLayout() {
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
          backgroundColor: "black",
        },
      }}
    >
      <Tabs.Screen
        name="events"
        listeners={({ navigation }) => ({
          tabPress: () => {
            navigation.navigate("events");
          },
        })}
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

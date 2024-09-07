import {
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

import { Slot, Tabs, usePathname } from "expo-router";
import { useTheme } from "tamagui";

export default function TabLayout() {
  const theme = useTheme();
  const { isLoggedIn, user } = useAuth();
  const { data: userData } = useUserData(user?.uid || "");
  const pathname = usePathname();
  const isEventDetailsPage = pathname.startsWith("/events/");

  if (Platform.OS === "web") {
    return <Slot />;
  }

  const screenOptions = {
    headerShown: false,
    animation: "fade_from_bottom",

    tabBarStyle: {
      display: isEventDetailsPage ? "none" : "flex",
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
  };

  return (
    <Tabs screenOptions={screenOptions}>
      <Tabs.Screen
        name="events"
        options={{
          title: "Events",
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="favourite"
        options={{
          title: "Favourite",
          tabBarItemStyle: { display: isLoggedIn ? "flex" : "none" },
          tabBarIcon: ({ color, size }) => <Heart color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="play"
        options={{
          title: "Play",
          tabBarIcon: ({ color, size }) => <Play color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="residents"
        options={{
          title: "Residents",
          tabBarIcon: ({ color, size }) => (
            <BoomBox color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="admin"
        options={{
          title: "Admin",
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

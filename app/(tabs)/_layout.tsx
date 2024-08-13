import {
  Heart,
  Home,
  List,
  Play,
  User,
  UserRoundCheck,
} from "@tamagui/lucide-icons";

import React from "react";

import { Platform } from "react-native";

import { useAuth } from "@/hooks/useAuth";
import { useUserData } from "@/hooks/useUserData";

import { Tabs, usePathname } from "expo-router";
import { useTheme } from "tamagui";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";

export default function TabLayout() {
  const theme = useTheme();
  const { isLoggedIn, user } = useAuth();
  const pathname = usePathname();
  const { data: userData } = useUserData(user?.uid || "");
  const isEventDetailsPage = pathname.startsWith("/event/");

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.gray2Dark.get(),
          display: isEventDetailsPage ? "none" : "flex",
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: theme.color.get(),
        tabBarInactiveTintColor: theme.gray9Light.get(),
        headerStyle: {
          backgroundColor: theme.background.get(),
          elevation: 0,
        },

        headerTintColor: theme.color.get(),
        tabBarIconStyle: { marginTop: Platform.OS !== "web" ? 4 : 0 },
        tabBarLabelStyle: { paddingBottom: Platform.OS !== "web" ? 4 : 0 },
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
        name="favourite"
        options={{
          headerShown: false,
          title: "Favourite",
          tabBarItemStyle: {
            display: isLoggedIn ? "flex" : "none",
          },
          tabBarIcon: ({ color, size }) => <Heart color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="play"
        options={{
          headerShown: false,
          title: "Play",
          tabBarIcon: ({ color, size }) => <Play color={color} size={size} />,
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
          headerShown: false,
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

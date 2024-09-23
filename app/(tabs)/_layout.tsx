import React from "react";

import { Platform } from "react-native";

import { useAuth } from "@/hooks/useAuth";
import { useUserData } from "@/hooks/useUserData";

import {
  Bookmark,
  BoomBox,
  CalendarCheck,
  Heart,
  Home,
  Play,
  User,
  UserRoundCheck,
} from "@tamagui/lucide-icons";

import { useTheme } from "tamagui";

import { Stack, useRouter, useSegments } from "expo-router";
import { Slot, Tabs, usePathname } from "expo-router";

export default function TabLayout() {
  const theme = useTheme();
  const { isLoggedIn, user } = useAuth();
  const { data: userData } = useUserData(user?.uid || "");
  const pathname = usePathname();
  const router = useRouter();
  const segment = useSegments();
  const shouldHideTabBar =
    pathname.startsWith("/events/") &&
    !pathname.includes("/events/upcoming") &&
    !pathname.includes("/events/previous");

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
          display: shouldHideTabBar ? "none" : "flex",
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
        listeners={{
          tabPress: () => {
            if (router.canDismiss()) {
              if (segment[1] === "(index)") router.dismissAll();
            }
          },
        }}
        options={{
          title: "Events",
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />

      <Tabs.Screen
        name="(attending)"
        listeners={{
          tabPress: () => {
            if (router.canDismiss()) {
              if (segment[1] === "(attending)") router.dismissAll();
            }
          },
        }}
        options={{
          title: "Attending events",
          tabBarIcon: ({ color, size }) => (
            <CalendarCheck color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="(profile)"
        listeners={{
          tabPress: () => {
            if (router.canDismiss()) {
              if (segment[1] === "(profile)") router.dismissAll();
            }
          },
        }}
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="(admin)"
        listeners={{
          tabPress: () => {
            if (router.canDismiss()) {
              if (segment[1] === "(admin)") router.dismissAll();
            }
          },
        }}
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

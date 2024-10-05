import React from "react";

import { Platform } from "react-native";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { useUserData } from "@/features/users/hooks/useUserData";

import { Home, Ticket, User, UserRoundCheck } from "@tamagui/lucide-icons";

import { Theme, useTheme } from "tamagui";

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
    <Theme name={"surface1"}>
      <Tabs
        initialRouteName="(index)"
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: theme.color2.get(),
            display: shouldHideTabBar ? "none" : "flex",
            height: 54,
            paddingBottom: 5,
            paddingTop: 5,
            borderTopWidth: 1,
            borderColor: theme.borderColor.get(),
          },
          tabBarActiveTintColor: theme.color.get(),
          tabBarInactiveTintColor: theme.gray9Light.get(),
          tabBarIconStyle: { marginBottom: 3 },
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: "500",
          },
          tabBarItemStyle: {
            paddingTop: 5,
          },
        }}
      >
        <Tabs.Screen
          name="(index)"
          listeners={{
            tabPress: () => {
              if (router.canDismiss() && segment[1] === "(index)")
                router.dismissAll();
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
              if (router.canDismiss() && segment[1] === "(attending)")
                router.dismissAll();
            },
          }}
          options={{
            title: "Attending",
            tabBarIcon: ({ color, size }) => (
              <Ticket color={color} size={size} />
            ),
          }}
        />

        <Tabs.Screen
          name="(profile)"
          listeners={{
            tabPress: () => {
              if (router.canDismiss() && segment[1] === "(profile)")
                router.dismissAll();
            },
          }}
          options={{
            title: "Profile",
            tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
          }}
        />

        {isLoggedIn && userData?.isAdmin && (
          <Tabs.Screen
            name="(admin)"
            listeners={{
              tabPress: () => {
                if (router.canDismiss() && segment[1] === "(admin)")
                  router.dismissAll();
              },
            }}
            options={{
              title: "Admin",
              tabBarIcon: ({ color, size }) => (
                <UserRoundCheck color={color} size={size} />
              ),
            }}
          />
        )}
      </Tabs>
    </Theme>
  );
}

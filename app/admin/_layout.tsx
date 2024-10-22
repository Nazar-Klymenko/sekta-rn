import React from "react";

import { Platform, TouchableOpacity } from "react-native";

import { SizableText, useTheme } from "tamagui";

import { Slot, Stack } from "expo-router";

export default function HomeLayout() {
  const theme = useTheme();
  if (Platform.OS === "web") {
    return <Slot />;
  }
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: "center",
        headerTintColor: theme.color.get(),
        headerStyle: {
          backgroundColor: "black",
        },
        headerTitleStyle: {
          fontFamily: "LeagueSpartan_700Bold",
          fontSize: 25,
        },
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Admin",
        }}
      />
      <Stack.Screen
        name="events"
        options={({ navigation }) => ({
          title: "Event List",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("events/create")}
            >
              <SizableText
                style={{ color: theme.accentColor.get(), marginRight: 10 }}
              >
                Create
              </SizableText>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="events/create"
        options={{
          title: "Create Event",
        }}
      />
      {/* <Stack.Screen
        name="events/[id]"
        options={({ route }: { route: any }) => ({
          title: route.params?.eventName || "Event Details",
        })}
      /> */}
      <Stack.Screen
        name="events/[id]"
        options={{
          title: "Event Details",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="submissions"
        options={{
          title: "All Play Submissions",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="users"
        options={{
          title: "All users",
        }}
      />
    </Stack>
  );
}

import React from "react";

import { Platform } from "react-native";
import { TouchableOpacity } from "react-native";

import { SizableText } from "tamagui";

import { Slot, Stack } from "expo-router";

export default function EventsLayout() {
  if (Platform.OS === "web") {
    return <Slot />;
  }

  return (
    <Stack
      screenOptions={{
        headerTitleAlign: "center",
        headerTintColor: "orange",
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
        options={({ navigation }) => ({
          headerTitle: "Events",
          // headerRight: () => (
          //   <TouchableOpacity onPress={() => navigation.navigate("going")}>
          //     <SizableText style={{ color: "orange", marginRight: 10 }}>
          //       Going
          //     </SizableText>
          //   </TouchableOpacity>
          // ),
        })}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: "Event",
        }}
      />
      <Stack.Screen
        name="going"
        options={{
          title: "Going",
        }}
      />
      <Stack.Screen
        name="upcoming"
        options={{
          title: "Upcoming events",
        }}
      />
      <Stack.Screen
        name="previous"
        options={{
          title: "Previous events",
        }}
      />
    </Stack>
  );
}

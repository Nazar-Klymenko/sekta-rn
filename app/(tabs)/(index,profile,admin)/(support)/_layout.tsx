import { NativeStackNavigationOptions } from "@react-navigation/native-stack";

import { Platform } from "react-native";

import { Stack } from "expo-router";
import { useTheme } from "tamagui";

export default function SupportLayout() {
  const theme = useTheme();

  const commonScreenOptions: NativeStackNavigationOptions = {
    headerShown: Platform.OS !== "web",
    headerStyle: {
      backgroundColor: theme.background.get(),
    },
    headerTintColor: theme.color.get(),
  };

  return (
    <Stack
      screenOptions={{
        ...commonScreenOptions,
      }}
    >
      <Stack.Screen
        name="privacy-policy"
        options={{
          title: "Privacy policy",
        }}
      />
      <Stack.Screen
        name="tos"
        options={{
          title: "Terms of Service",
        }}
      />
      <Stack.Screen
        name="contact"
        options={{
          title: "Contact us",
        }}
      />
    </Stack>
  );
}

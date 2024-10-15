import { useTheme } from "tamagui";

import { Stack } from "expo-router";

export default function SupportLayout() {
  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.background.get(),
        },
        headerTintColor: theme.color.get(),
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

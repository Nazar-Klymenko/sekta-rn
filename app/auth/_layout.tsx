import { Platform } from "react-native";

import { Stack } from "expo-router";
import { useTheme } from "tamagui";

export default function AuthLayout() {
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
        name="username-bridge"
        options={{
          headerShown: true || Platform.OS !== "web",
          title: "Create username",
          animation: "fade_from_bottom",
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          headerShown: true || Platform.OS !== "web",
          title: "Log in",
          animation: "fade_from_bottom",
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          headerShown: true || Platform.OS !== "web",
          title: "Sign Up",
          animation: "fade_from_bottom",
        }}
      />
      <Stack.Screen
        name="forgot-password"
        options={{
          headerShown: true || Platform.OS !== "web",
          title: "Forgot Password",
          animation: "fade_from_bottom",
        }}
      />
      <Stack.Screen
        name="forgot-password-success"
        options={{
          headerShown: true || Platform.OS !== "web",
          title: "Password recovery email sent!",
          animation: "fade_from_bottom",
        }}
      />
    </Stack>
  );
}

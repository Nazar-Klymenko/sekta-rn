import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: true }} />
      <Stack.Screen name="signup" options={{ title: "Sign Up" }} />
      <Stack.Screen
        name="forgot-password"
        options={{ title: "Forgot Password" }}
      />
    </Stack>
  );
}

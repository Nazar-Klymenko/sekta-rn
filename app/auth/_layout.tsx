import React from "react";

import { Platform } from "react-native";

import { Redirect, Slot, Stack, useRouter } from "expo-router";
import { Theme, useTheme } from "tamagui";

import { UsernameProvider } from "@/features/auth/context/UsernameContext";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { ButtonCTA } from "@/features/core/components/buttons/ButtonCTA";
import { ClearIcon } from "@/features/core/components/form/shared/ClearIcon";
import { FullPageLoading } from "@/features/core/components/layout/FullPageLoading";

export default function AuthLayout() {
  const theme = useTheme({ name: "surface1" });
  const { isAuthenticated, displayUser, isLoading } = useAuth();
  if (Platform.OS === "web") {
    return <Redirect href={"/"} />;
  }
  if (isLoading) {
    return <FullPageLoading />;
  }

  if (isAuthenticated && displayUser) {
    return <Redirect href={"../"} />;
  }

  return (
    <UsernameProvider>
      <Stack
        screenOptions={({ navigation }) => ({
          headerStyle: {
            backgroundColor: theme.background.get(),
          },
          headerTintColor: theme.color.get(),
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "LeagueSpartan_700Bold",
            fontSize: 25,
          },

          headerRight: () => (
            <ClearIcon
              onPress={() => {
                const parent = navigation.getParent();
                parent?.goBack();
              }}
            />
          ),
        })}
      >
        <Stack.Screen
          name="username-bridge"
          options={{
            title: "Create Username",
          }}
        />
        <Stack.Screen
          name="login"
          options={{
            title: "Log in",
          }}
        />
        <Stack.Screen
          name="signup"
          options={{
            title: "Sign Up",
          }}
        />
        <Stack.Screen
          name="forgot-password"
          options={{
            title: "Forgot Password",
          }}
        />
        <Stack.Screen
          name="forgot-password-success"
          options={{
            title: "Password recovery email sent!",
          }}
        />
      </Stack>
    </UsernameProvider>
  );
}

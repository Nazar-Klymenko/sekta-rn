import React, { useEffect, useState } from "react";

import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider, useThemeContext } from "@/context/ThemeContext";
import tamaguiConfig from "@/tamagui.config";

import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";
import { TamaguiProvider, Text, Theme, View, useTheme } from "tamagui";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function LoadingScreen() {
  const theme = useTheme();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.background.get(),
      }}
    >
      <Text color="$color">Loading...</Text>
    </View>
  );
}

function AppContent() {
  const { themeColor } = useThemeContext();

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme={themeColor}>
      <AuthProvider>
        <Stack>
          <Stack.Screen
            name="(auth)"
            options={{
              headerShown: false,
              animation: "fade_from_bottom",
            }}
          />
          <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false, animation: "fade_from_bottom" }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
      </AuthProvider>
    </TamaguiProvider>
  );
}

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);

  const [fontsLoaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Promise.all([
          /* any other promises you need to await */
        ]);
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (appIsReady && fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady, fontsLoaded]);

  if (!appIsReady || !fontsLoaded) {
    return (
      <TamaguiProvider config={tamaguiConfig} defaultTheme="dark">
        <LoadingScreen />
      </TamaguiProvider>
    );
  }

  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

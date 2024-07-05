import { useEffect } from "react";

import { AuthProvider } from "@/context/AuthContext";
import tamaguiConfig from "@/tamagui.config";

import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";
import {
  TamaguiProvider,
  Stack as TamaguiStack,
  Text,
  Theme,
  View,
  useTheme,
} from "tamagui";

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

export default function RootLayout() {
  const colorScheme = "dark";
  // const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return (
      <TamaguiProvider config={tamaguiConfig} defaultTheme="dark">
        <LoadingScreen />
      </TamaguiProvider>
    );
  }

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme="dark">
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

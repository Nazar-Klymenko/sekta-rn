import React, { useEffect, useState } from "react";

import { Platform } from "react-native";

import { FullPageLoading } from "@/features/core/components/layout/FullPageLoading";
import tamaguiConfig from "@/tamagui.config";

import { TamaguiProvider } from "tamagui";

import * as SplashScreen from "expo-splash-screen";

let fontsLoaded = true; // Default for web

if (Platform.OS !== "web") {
  // Dynamically import fonts for native
  const {
    useFonts,
    LeagueSpartan_100Thin,
    LeagueSpartan_200ExtraLight,
    LeagueSpartan_300Light,
    LeagueSpartan_400Regular,
    LeagueSpartan_500Medium,
    LeagueSpartan_600SemiBold,
    LeagueSpartan_700Bold,
    LeagueSpartan_800ExtraBold,
    LeagueSpartan_900Black,
  } = require("@expo-google-fonts/league-spartan");

  fontsLoaded = useFonts({
    LeagueSpartan_100Thin,
    LeagueSpartan_200ExtraLight,
    LeagueSpartan_300Light,
    LeagueSpartan_400Regular,
    LeagueSpartan_500Medium,
    LeagueSpartan_600SemiBold,
    LeagueSpartan_700Bold,
    LeagueSpartan_800ExtraBold,
    LeagueSpartan_900Black,
  })[0];
}

export function AppInitializer({ children }: { children: any }) {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();

        if (Platform.OS === "web") {
          // Web-specific setup: Fonts are preloaded via the CDN
        } else {
          // Native-specific setup
          if (!fontsLoaded) {
            console.log("Waiting for fonts to load on native...");
          }
        }

        // Any other setup tasks
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, [fontsLoaded]);

  useEffect(() => {
    if (appIsReady && (Platform.OS === "web" || fontsLoaded)) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady, fontsLoaded]);

  if (!appIsReady || (Platform.OS !== "web" && !fontsLoaded)) {
    return (
      <TamaguiProvider config={tamaguiConfig} defaultTheme="dark">
        <FullPageLoading />
      </TamaguiProvider>
    );
  }

  return <>{children}</>;
}

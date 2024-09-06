import React, { useEffect, useState } from "react";

import tamaguiConfig from "@/tamagui.config";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { TamaguiProvider } from "tamagui";

import { FullPageLoading } from "@/components/layout/FullPageLoading";

export function AppInitializer({ children }: { children: any }) {
  const [appIsReady, setAppIsReady] = useState(false);
  const [fontsLoaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
    SektaFont: require("../../assets/fonts/SektaFont-Regular.ttf"),
    Lato_900Black: require("@expo-google-fonts/lato/Lato_900Black.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        // Pre-load fonts, make any API calls you need to do here
        await Promise.all([
          /* any other promises you need to await */
        ]);
      } catch (e) {
        console.warn(e);
      } finally {
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
        <FullPageLoading />
      </TamaguiProvider>
    );
  }

  return <>{children}</>;
}

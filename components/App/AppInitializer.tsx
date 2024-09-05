import React, { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { TamaguiProvider } from "tamagui";
import { FullPageLoading } from "@/components/layout/FullPageLoading";
import tamaguiConfig from "@/tamagui.config";

export function AppInitializer({ children }: { children: any }) {
  const [appIsReady, setAppIsReady] = useState(false);
  const [fontsLoaded] = useFonts({
    // Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
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

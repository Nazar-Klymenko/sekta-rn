import {
  LeagueSpartan_100Thin,
  LeagueSpartan_200ExtraLight,
  LeagueSpartan_300Light,
  LeagueSpartan_400Regular,
  LeagueSpartan_500Medium,
  LeagueSpartan_600SemiBold,
  LeagueSpartan_700Bold,
  LeagueSpartan_800ExtraBold,
  LeagueSpartan_900Black,
  useFonts,
} from "@expo-google-fonts/league-spartan";

import React from "react";

import { Platform } from "react-native";

import { FullPageLoading } from "@/features/core/components/layout/FullPageLoading";
import tamaguiConfig from "@/tamagui.config";

import { TamaguiProvider } from "tamagui";

import * as SplashScreen from "expo-splash-screen";

// Hook to manage splash screen
const useSplashScreen = () => {
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    const prepare = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
      } finally {
        setIsReady(true);
      }
    };

    prepare();
  }, []);

  const hideSplashScreen = React.useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  return { isReady, hideSplashScreen };
};

// Hook to manage font loading
const useFontLoader = () => {
  if (Platform.OS === "web") {
    return { fontsLoaded: true };
  }

  const [fontsLoaded] = useFonts({
    LeagueSpartan_100Thin,
    LeagueSpartan_200ExtraLight,
    LeagueSpartan_300Light,
    LeagueSpartan_400Regular,
    LeagueSpartan_500Medium,
    LeagueSpartan_600SemiBold,
    LeagueSpartan_700Bold,
    LeagueSpartan_800ExtraBold,
    LeagueSpartan_900Black,
  });
  return { fontsLoaded };
};

export function AppLoader({ children }: { children: React.ReactNode }) {
  const { isReady, hideSplashScreen } = useSplashScreen();
  const { fontsLoaded } = useFontLoader();

  React.useEffect(() => {
    if (isReady && fontsLoaded) {
      hideSplashScreen();
    }
  }, [isReady, fontsLoaded, hideSplashScreen]);

  if (!isReady || !fontsLoaded) {
    return (
      <TamaguiProvider config={tamaguiConfig} defaultTheme="dark">
        <FullPageLoading />
      </TamaguiProvider>
    );
  }

  return <>{children}</>;
}

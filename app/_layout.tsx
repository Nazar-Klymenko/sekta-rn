import React from "react";

import { ThemeProvider } from "@/context/ThemeContext";

import { AppInitializer } from "@/components/App/AppInitializer";
import { AppNavigator } from "@/components/App/AppNavigator";
import { AppProviders } from "@/components/App/AppProviders";

export default function RootLayout() {
  return (
    <AppInitializer>
      <ThemeProvider>
        <AppProviders>
          <AppNavigator />
        </AppProviders>
      </ThemeProvider>
    </AppInitializer>
  );
}

import React from "react";

import { ThemeProvider } from "@/context/ThemeContext";
import { AppInitializer } from "@/initialization/AppInitializer";
import { AppNavigator } from "@/initialization/AppNavigator";
import { AppProviders } from "@/initialization/AppProviders";

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

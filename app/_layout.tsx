import React from "react";

import { ThemeProvider } from "@/context/ThemeContext";
import { AppInitializer } from "@/lib/AppInitializer";
import { AppNavigator } from "@/lib/AppNavigator";
import { AppProviders } from "@/lib/AppProviders";

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

import React from "react";
import { ThemeProvider } from "@/context/ThemeContext";
import { AppInitializer } from "@/components/App/AppInitializer";
import { AppProviders } from "@/components/App/AppProviders";
import { AppNavigator } from "@/components/App/AppNavigator";

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

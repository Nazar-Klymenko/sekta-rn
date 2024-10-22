import React from "react";

import { AppInitializer } from "@/lib/AppInitializer";
import { AppNavigator } from "@/lib/AppNavigator";
import { AppProviders } from "@/lib/AppProviders";

export default function RootLayout() {
  return (
    <AppInitializer>
      <AppProviders>
        <AppNavigator />
      </AppProviders>
    </AppInitializer>
  );
}

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import React from "react";

import { AppInitializer } from "@/lib/AppInitializer";
import { AppNavigator } from "@/lib/AppNavigator";
import { AppProviders } from "@/lib/AppProviders";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppInitializer>
        <AppProviders>
          <AppNavigator />
        </AppProviders>
      </AppInitializer>
    </QueryClientProvider>
  );
}

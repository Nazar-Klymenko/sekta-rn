import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import React from "react";

import { AppLoader } from "@/lib/AppLoader";
import { AppNavigator } from "@/lib/AppNavigator";
import { AppProviders } from "@/lib/AppProviders";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppLoader>
        <AppProviders>
          <AppNavigator />
        </AppProviders>
      </AppLoader>
    </QueryClientProvider>
  );
}

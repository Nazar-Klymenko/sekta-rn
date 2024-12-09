import React from "react";

import { FullPageLoading } from "@/features/core/components/layout/FullPageLoading";

import { Redirect, Stack } from "expo-router";

export default function Index() {
  return (
    <FullPageLoading>
      <Stack.Screen options={{ headerShown: false }} />
      <Redirect href="/events" />
    </FullPageLoading>
  );
}

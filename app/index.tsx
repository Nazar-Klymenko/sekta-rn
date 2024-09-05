import { FullPageLoading } from "@/components/layout/FullPageLoading";
import { PageContainer } from "@/components/layout/PageContainer";
import { Redirect, Stack } from "expo-router";

export default function Index() {
  return (
    <FullPageLoading>
      <Stack.Screen options={{ headerShown: false }} />
      <Redirect href="/events" />
    </FullPageLoading>
  );
}

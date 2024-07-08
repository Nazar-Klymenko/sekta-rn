import { useAuth } from "@/hooks/useAuth";

import { Redirect } from "expo-router";
import { Text, View } from "tamagui";

import { PageContainer } from "@/components/PageContainer";
import { AuthGuard } from "@/components/navigation/AuthGuard";

export default function SettingsScreen() {
  const { isLoggedIn } = useAuth();

  return (
    <AuthGuard>
      <PageContainer>
        <Text>Settings Screen</Text>
      </PageContainer>
    </AuthGuard>
  );
}

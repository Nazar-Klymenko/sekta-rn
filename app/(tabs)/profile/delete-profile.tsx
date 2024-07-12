import { useAuth } from "@/hooks/useAuth";

import { Redirect } from "expo-router";
import { Text, View } from "tamagui";

import { PageContainer } from "@/components/PageContainer";
import { AuthGuard } from "@/components/navigation/AuthGuard";

export default function DeleteProfileScreen() {
  const { isLoggedIn } = useAuth();

  return (
    <AuthGuard>
      <PageContainer>
        <Text>DeleteProfileScreen</Text>
      </PageContainer>
    </AuthGuard>
  );
}

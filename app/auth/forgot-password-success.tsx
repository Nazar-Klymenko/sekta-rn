import { Link, useLocalSearchParams } from "expo-router";
import { Text, YStack } from "tamagui";

import { PageContainer } from "@/components/layout/PageContainer";
import { AuthPageGuard } from "@/components/navigation/AuthPageGuard";

export default function ForgotPasswordSuccessScreen() {
  const { returnTo } = useLocalSearchParams<{ returnTo?: string }>();

  return (
    <AuthPageGuard>
      <PageContainer>
        <Text>
          Email sent! Check you inbox and follow the instuctions to reset your
          password
        </Text>
        <YStack alignItems="center" padding="$4" gap="$4">
          <Link href={`/auth/login?returnTo=${returnTo}`}>
            <Text color="$accentColor" textAlign="center">
              Go back to login
            </Text>
          </Link>
        </YStack>
      </PageContainer>
    </AuthPageGuard>
  );
}
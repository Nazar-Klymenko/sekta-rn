import { useState } from "react";

import { useAuth } from "@/hooks/useAuth";

import { Redirect } from "expo-router";
import { Label, Text, View, XStack, YStack } from "tamagui";

import { Switch } from "@/components/buttons/CustomSwitch";
import { PageContainer } from "@/components/layout/PageContainer";
import { AuthGuard } from "@/components/navigation/AuthGuard";

export default function EmailNotificationScreen() {
  const { isLoggedIn } = useAuth();
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <AuthGuard>
      <PageContainer>
        <XStack display="flex" justifyContent="space-between">
          <YStack>
            <Text fontSize="$5" fontWeight="bold">
              Enable email notifications
            </Text>
            <Text fontSize="$3" color="$gray10Light">
              Enable notifications about new events and other news
            </Text>
          </YStack>
          <Switch checked={isEnabled} onPress={toggleSwitch} />
        </XStack>
      </PageContainer>
    </AuthGuard>
  );
}

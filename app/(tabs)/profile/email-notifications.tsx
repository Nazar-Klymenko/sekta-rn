import { useState } from "react";

import { useAuth } from "@/hooks/useAuth";

import { Redirect } from "expo-router";
import { Label, Text, View, XStack, YStack } from "tamagui";

import { PageContainer } from "@/components/PageContainer";
import { Switch } from "@/components/buttons/CustomSwitch";
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
            <Text fontSize="$6" fontWeight="bold">
              Enable email notifications
            </Text>
            <Text fontSize="$4" color="$gray10">
              Enable notifications about new events and other news
            </Text>
          </YStack>
          <Switch checked={isEnabled} onPress={toggleSwitch} />
        </XStack>
      </PageContainer>
    </AuthGuard>
  );
}

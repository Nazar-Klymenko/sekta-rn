import { useState } from "react";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { Switch } from "@/features/core/components/buttons/CustomSwitch";
import { PageContainer } from "@/features/core/components/layout/PageContainer";
import { AuthGuard } from "@/features/core/components/navigation/AuthGuard";

import { Paragraph, XStack, YStack } from "tamagui";

export default function EmailNotificationScreen() {
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <AuthGuard>
      <PageContainer>
        <XStack display="flex" justifyContent="space-between">
          <YStack>
            <Paragraph fontSize="$5" fontWeight="bold">
              Enable email notifications
            </Paragraph>
            <Paragraph fontSize="$3" color="$gray10Light">
              Enable notifications about new events and other news
            </Paragraph>
          </YStack>
          <Switch checked={isEnabled} onPress={toggleSwitch} />
        </XStack>
      </PageContainer>
    </AuthGuard>
  );
}

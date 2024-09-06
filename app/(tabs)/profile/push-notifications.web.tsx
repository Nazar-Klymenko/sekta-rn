import { getFunctions, httpsCallable } from "firebase/functions";

import { useEffect, useState } from "react";

import { useAuth } from "@/hooks/useAuth";

import { Text, XStack, YStack } from "tamagui";

import { Switch } from "@/components/buttons/CustomSwitch";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { PageContainer } from "@/components/layout/PageContainer";
import { AuthGuard } from "@/components/navigation/AuthGuard";

export default function PushNotificationScreen() {
  const { user } = useAuth();
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = async () => {
    // Here you should update the user's preference in Firestore
    setIsEnabled((prev) => !prev);
  };

  const sendNoti = async () => {
    if (!user) return;
  };

  return (
    <AuthGuard>
      <PageContainer>
        <XStack display="flex" justifyContent="space-between">
          <YStack>
            <Text fontSize="$5" fontWeight="bold">
              Enable push notifications
            </Text>
            <Text fontSize="$3" color="$gray10Light">
              Enable notifications for events that you plan to attend
            </Text>
          </YStack>
          <Switch checked={isEnabled} onPress={toggleSwitch} />
        </XStack>
        <PrimaryButton
          onPress={sendNoti}
          text="Send Test Notification"
          disabled={!isEnabled}
        />
      </PageContainer>
    </AuthGuard>
  );
}

import React, { useState } from "react";

import { getFunctions, httpsCallable } from "firebase/functions";

import { Paragraph, XStack, YStack } from "tamagui";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { ButtonCTA } from "@/features/core/components/buttons/ButtonCTA";
import { Switch } from "@/features/core/components/buttons/CustomSwitch";
import { PageContainer } from "@/features/core/components/layout/PageContainer";

const functions = getFunctions();

export default function PushNotificationScreen() {
  const { displayUser } = useAuth();
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = async () => {
    // Here you should update the user's preference in Firestore
    setIsEnabled((prev) => !prev);
  };

  const testNotification = async () => {
    try {
      // Initialize your Firebase functions
      const sendNotification = httpsCallable(
        functions,
        "sendBatchNotifications"
      );

      const result = await sendNotification({
        tokens: displayUser!.pushTokens,
        title: "Test Notification",
        body: "Hello from Firebase!",
      });

      console.log("Notification sent:", result);
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  };
  return (
    <PageContainer>
      <XStack display="flex" justifyContent="space-between">
        <YStack>
          <Paragraph fontSize="$5" fontWeight="bold">
            Enable push notifications
          </Paragraph>
          <Paragraph fontSize="$3" color="gray">
            Enable notifications for events that you plan to attend
          </Paragraph>
        </YStack>
        <Switch checked={isEnabled} onPress={toggleSwitch} />
      </XStack>

      <ButtonCTA
        theme="accent"
        onPress={testNotification}
        disabled={!isEnabled}
      >
        Send Test Notification
      </ButtonCTA>
    </PageContainer>
  );
}

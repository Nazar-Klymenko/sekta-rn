import { useEffect, useState } from "react";
import React from "react";

import { getFunctions, httpsCallable } from "firebase/functions";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { ButtonCTA } from "@/features/core/components/buttons/ButtonCTA";
import { Switch } from "@/features/core/components/buttons/CustomSwitch";
import { PageContainer } from "@/features/core/components/layout/PageContainer";
import { usePushNotifications } from "@/features/core/hooks/usePushNotifications";

import { Paragraph, XStack, YStack } from "tamagui";

const functions = getFunctions();
const sendPushNotification = httpsCallable(functions, "sendPushNotification");

export default function PushNotificationScreen() {
  const { user } = useAuth();
  const [isEnabled, setIsEnabled] = useState(false);
  const { expoPushToken } = usePushNotifications();

  useEffect(() => {
    // Update this state based on user preferences from Firestore
    // For now, we'll just set it to true if we have a token
    setIsEnabled(!!expoPushToken);
  }, [expoPushToken]);

  const toggleSwitch = async () => {
    // Here you should update the user's preference in Firestore
    setIsEnabled((prev) => !prev);
  };

  const sendNoti = async () => {
    if (!user) return;
    try {
      const result = await sendPushNotification({
        userId: user.uid,
        notification: {
          title: "New Event!",
          body: "A new event has been added. Check it out!",
          data: { eventId: "-Nt-iP0bCmIjPi8gO1YV" },
        },
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
          <Paragraph fontSize="$3" color="$gray10Light">
            Enable notifications for events that you plan to attend
          </Paragraph>
        </YStack>
        <Switch checked={isEnabled} onPress={toggleSwitch} />
      </XStack>

      <ButtonCTA theme="accent" onPress={sendNoti} disabled={!isEnabled}>
        Send Test Notification
      </ButtonCTA>
    </PageContainer>
  );
}

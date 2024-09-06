import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { getFunctions, httpsCallable } from "firebase/functions";
import { Text, XStack, YStack } from "tamagui";
import { Switch } from "@/components/buttons/CustomSwitch";
import { PageContainer } from "@/components/layout/PageContainer";
import { AuthGuard } from "@/components/navigation/AuthGuard";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { usePushNotifications } from "@/hooks/usePushNotifications";

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

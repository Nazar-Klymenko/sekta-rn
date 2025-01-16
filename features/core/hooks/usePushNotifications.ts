import { useEffect, useRef } from "react";

import * as Notifications from "expo-notifications";
import { Subscription } from "expo-notifications";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { registerForPushNotifications } from "@/features/core/utils/registerForPushNotifications";
import { useUpdatePushToken } from "@/features/users/hooks/useUpdatePushToken";

export function useNotifications() {
  const { user } = useAuth();
  const notificationListener = useRef<Subscription>();
  const responseListener = useRef<Subscription>();
  const { mutate } = useUpdatePushToken();

  useEffect(() => {
    if (!user?.uid) return;

    const setupNotifications = async () => {
      const token = await registerForPushNotifications();

      if (token) {
        mutate({
          userId: user.uid,
          newToken: token,
        });
      }
    };

    setupNotifications();

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("Received notification:", notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Notification response:", response);
      });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, [user?.uid]);
}

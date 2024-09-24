// hooks/usePushNotifications.ts
import { params } from "firebase-functions/v1";

import { useEffect, useRef, useState } from "react";

import { doc, updateDoc } from "firebase/firestore";

import { Platform } from "react-native";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { db } from "@/lib/firebase/firebase";

import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useRouter } from "expo-router";
import { router } from "expo-router";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export function usePushNotifications() {
  const [expoPushToken, setExpoPushToken] = useState<string | undefined>("");
  const { user } = useAuth();
  const router = useRouter();
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token),
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("Notification received in foreground:", notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        handleNotification(response.notification);
      });

    Notifications.getLastNotificationResponseAsync().then((response) => {
      if (response) {
        handleNotification(response.notification);
      }
    });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current,
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    if (user && expoPushToken) {
      updateUserPushToken(user.uid, expoPushToken);
    }
  }, [user, expoPushToken]);

  const handleNotification = (notification: Notifications.Notification) => {
    const data = notification.request.content.data as {
      type?: string;
      eventId?: string;
    };
    console.log("Notification data:", data);
    if (data.type === "event" && data.eventId) {
      console.log("Navigating to event:", data.eventId);
      router.push({
        pathname: "/(tabs)/events/[id]",
        params: { id: data.eventId },
      });
    }
  };

  return { expoPushToken };
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}

async function updateUserPushToken(userId: string, token: string) {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, { expoPushToken: token });
}

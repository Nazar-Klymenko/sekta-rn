// functions/src/sendPushNotification.ts
import { Expo, ExpoPushMessage } from "expo-server-sdk";
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

const expo = new Expo();

interface NotificationData {
  title: string;
  body: string;
  data?: {
    type?: string;
    eventId?: string;
    [key: string]: unknown;
  };
}

export const sendPushNotification = functions.https.onCall(
  async (data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "User must be authenticated to send notifications."
      );
    }

    const {
      userId,
      notification,
    }: { userId: string; notification: NotificationData } = data;

    try {
      const userDoc = await admin
        .firestore()
        .collection("users")
        .doc(userId)
        .get();
      const userData = userDoc.data() as {
        expoPushToken?: string;
        agreeEmail?: boolean;
      };

      if (!userData || !userData.expoPushToken) {
        console.log("User not found, or has no push token");
        return {
          success: false,
          reason: "User not eligible for notifications",
        };
      }

      const message: ExpoPushMessage = {
        to: userData.expoPushToken,
        sound: "default",
        title: notification.title,
        body: notification.body,
        data: {
          type: notification.data?.type || "event",
          eventId: notification.data?.eventId,
          ...notification.data,
        },
      };

      const chunks = expo.chunkPushNotifications([message]);
      for (const chunk of chunks) {
        try {
          const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
          console.log("Notification sent:", ticketChunk);
        } catch (error) {
          console.error("Error sending chunk:", error);
          throw new functions.https.HttpsError(
            "internal",
            "Error sending notification chunk"
          );
        }
      }

      return { success: true };
    } catch (error) {
      console.error("Error sending notification:", error);
      throw new functions.https.HttpsError(
        "internal",
        "Error sending notification"
      );
    }
  }
);

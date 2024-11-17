import { sendPushNotification } from "./sendPushNotification";
import { createUser } from "./user/createUser";
import { updateUsername } from "./user/updateUsername";
import * as admin from "firebase-admin";

if (!admin.apps.length) {
  if (process.env.FUNCTIONS_EMULATOR) {
    // Running in emulator
    process.env.FIREBASE_AUTH_EMULATOR_HOST = "localhost:9099";
    process.env.FIRESTORE_EMULATOR_HOST = "localhost:8080";

    admin.initializeApp({
      projectId: "sekta-selekta",
    });
  } else {
    // Production environment
    admin.initializeApp();
  }
}

export { updateUsername, createUser, sendPushNotification };

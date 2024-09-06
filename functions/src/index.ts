import * as admin from "firebase-admin";

admin.initializeApp();

import { createUser } from "./user/createUser";
import { updateUsername } from "./user/updateUsername";
import { sendPushNotification } from "./sendPushNotification";
export { updateUsername, createUser, sendPushNotification };
// export { updateUsername, createUser };

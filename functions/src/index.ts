import * as admin from "firebase-admin";

admin.initializeApp();

import { createUser } from "./user/createUser";
import { updateUsername } from "./user/updateUsername";

export { updateUsername, createUser };

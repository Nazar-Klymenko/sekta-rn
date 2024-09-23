import { signOut as firebaseSignOut } from "firebase/auth";

import { auth } from "@/shared/services/firebase";

export const signOut = async (): Promise<void> => {
  await firebaseSignOut(auth);
};

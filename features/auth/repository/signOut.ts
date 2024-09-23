import { signOut as firebaseSignOut } from "firebase/auth";

import { auth } from "@/services/firebase/firebase";

export const signOut = async (): Promise<void> => {
  await firebaseSignOut(auth);
};

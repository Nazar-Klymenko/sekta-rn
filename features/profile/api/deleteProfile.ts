import {
  EmailAuthProvider,
  deleteUser,
  reauthenticateWithCredential,
} from "firebase/auth";
import { doc, getDoc, writeBatch } from "firebase/firestore";

import { auth, db } from "@/lib/firebase/firebase";

export const deleteProfile = async (password: string): Promise<void> => {
  const user = auth.currentUser;
  if (user && user.email) {
    const credential = EmailAuthProvider.credential(user.email, password);
    await reauthenticateWithCredential(user, credential);

    // Get the user's username before deletion
    const userDoc = await getDoc(doc(db, "users", user.uid));
    const username = userDoc.data()?.username;
    const batch = writeBatch(db);
    batch.delete(doc(db, "users", user.uid));
    if (username) {
      batch.delete(doc(db, "usernames", username));
    }
    await batch.commit();

    await deleteUser(user);
  } else {
    throw new Error("No user is currently signed in");
  }
};

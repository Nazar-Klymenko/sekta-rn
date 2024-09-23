import {
  EmailAuthProvider,
  deleteUser,
  reauthenticateWithCredential,
} from "firebase/auth";
import { deleteDoc, doc } from "firebase/firestore";

import { auth, db } from "@/services/firebase";

export const deleteProfile = async (password: string): Promise<void> => {
  const user = auth.currentUser;
  if (user && user.email) {
    const credential = EmailAuthProvider.credential(user.email, password);
    await reauthenticateWithCredential(user, credential);

    await deleteDoc(doc(db, "users", user.uid));

    await deleteUser(user);
  } else {
    throw new Error("No user is currently signed in");
  }
};

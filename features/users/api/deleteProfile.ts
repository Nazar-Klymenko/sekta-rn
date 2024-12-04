import {
  EmailAuthProvider,
  deleteUser,
  reauthenticateWithCredential,
} from "firebase/auth";
import { doc, runTransaction } from "firebase/firestore";

import { auth, db } from "@/lib/firebase/firebase";

export const deleteProfile = async (password: string): Promise<void> => {
  const user = auth.currentUser;
  if (!user || !user.email) {
    throw new Error("No user is currently signed in");
  }

  // First, reauthenticate the user
  const credential = EmailAuthProvider.credential(user.email, password);
  await reauthenticateWithCredential(user, credential);

  // Run the transaction
  await runTransaction(db, async (transaction) => {
    // Get the user's document
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await transaction.get(userDocRef);

    if (!userDoc.exists()) {
      throw new Error("User document not found");
    }

    const username = userDoc.data().username;

    // Delete the user document
    transaction.delete(userDocRef);

    // If username exists, delete the username document
    if (username) {
      const usernameDocRef = doc(db, "usernames", username);
      transaction.delete(usernameDocRef);
    }
  });

  // After successful transaction, delete the user authentication
  await deleteUser(user);
};

import {
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  deleteUser,
  sendEmailVerification,
} from "firebase/auth";
import { doc, runTransaction, serverTimestamp } from "firebase/firestore";

import { FirestoreUser } from "@/features/users/models/User";
import { auth, db } from "@/lib/firebase/firebase";

import { SignUpSchemaType } from "../utils/schemas";

export const signUp = async ({
  email,
  password,
  username,
  agreeTos,
  agreeEmail = false,
}: SignUpSchemaType) => {
  let userCredential: UserCredential | null = null;
  const usernameDocRef = doc(db, "usernames", username);

  userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  try {
    await runTransaction(db, async (transaction) => {
      const userDocRef = doc(db, "users", user.uid);

      const userData: FirestoreUser = {
        uid: user.uid,
        username: username,
        auth: {
          email: user.email || "",
          emailVerified: false,
        },
        settings: {
          agreeTos,
          agreeEmail,
        },
        metadata: {
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        },
        isAdmin: false,
      };
      const usernameData = {
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      transaction.set(userDocRef, userData);
      transaction.set(usernameDocRef, usernameData);
    });
    await sendEmailVerification(user);
  } catch (error) {
    if (userCredential?.user) {
      await deleteUser(userCredential.user);
    }
    throw error;
  }
};

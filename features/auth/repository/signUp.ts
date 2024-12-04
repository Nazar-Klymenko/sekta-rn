import {
  createUserWithEmailAndPassword,
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
  let userCredential;

  if (!agreeTos) {
    throw new Error("You must agree to the Terms of Service");
  }

  try {
    userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await runTransaction(db, async (transaction) => {
      const usernameDocRef = doc(db, "usernames", username.toLowerCase());
      const usernameDoc = await transaction.get(usernameDocRef);

      if (usernameDoc.exists()) {
        throw new Error("Username already taken");
      }

      // Get user document reference
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await transaction.get(userDocRef);

      if (userDoc.exists()) {
        throw new Error("User document already exists");
      }

      const timestamp = serverTimestamp();

      if (!user.email) {
        throw new Error("Email is required but not provided");
      }

      const userData: FirestoreUser = {
        uid: user.uid,
        username: username,
        auth: {
          email: user.email,
          emailVerified: false,
        },
        settings: {
          agreeTos,
          agreeEmail,
        },
        metadata: {
          createdAt: timestamp,
          updatedAt: timestamp,
        },
        isAdmin: false,
      };

      transaction.set(userDocRef, userData);
      transaction.set(usernameDocRef, {});
    });
    await sendEmailVerification(user);
  } catch (error) {
    // If anything fails after auth user creation, clean up
    if (userCredential?.user) {
      await userCredential.user.delete();
    }

    // Rethrow with more specific error messages
    if (error instanceof Error) {
      throw new Error(`Signup failed: ${error.message}`);
    }
    throw error;
  }
};

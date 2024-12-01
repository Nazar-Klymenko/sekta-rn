import {
  User,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { doc, runTransaction, serverTimestamp } from "firebase/firestore";

import { FirestoreUser } from "@/features/users/models/User";
import { auth, db } from "@/lib/firebase/firebase";

export interface SignUpData {
  email: string;
  password: string;
  username: string;
  agreeTos: boolean;
  agreeEmail?: boolean;
}

export const signUp = async ({
  email,
  password,
  username,
  agreeTos,
  agreeEmail = false,
}: SignUpData): Promise<User> => {
  // Validate username format before even trying
  const usernameRegex = /^[a-zA-Z0-9_]{3,30}$/;
  if (!usernameRegex.test(username)) {
    throw new Error(
      "Invalid username format. Use 3-30 characters, letters, numbers or _"
    );
  }

  if (!agreeTos) {
    throw new Error("You must agree to the Terms of Service");
  }

  let userCredential;
  try {
    // First create the authentication user
    userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Run transaction to create user documents
    await runTransaction(db, async (transaction) => {
      // Check if username is already taken
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

      // Create user document
      const userData: FirestoreUser = {
        uid: user.uid,
        username,
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

      // Set both documents
      transaction.set(userDocRef, userData);
      transaction.set(usernameDocRef, {});
    });

    // Send email verification after successful transaction
    await sendEmailVerification(user);

    return user;
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

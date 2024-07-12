// src/api/auth.ts
import {
  User,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

import { auth, db } from "@/services/firebase";
import { removeItem, setItem } from "@/utils/asyncStorage";

interface UserData {
  email: string;
  username: string;
}

export const signUp = async (
  email: string,
  password: string,
  username: string
): Promise<User> => {
  let userCredential;
  try {
    userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await setItem("userToken", await userCredential.user.getIdToken());
  } catch (error) {
    console.error("Failed to create user account:", error);
    throw new Error("Failed to create user account");
  }

  try {
    await setDoc(doc(db, "users", userCredential.user.uid), {
      email,
      username,
    });
  } catch (error) {
    console.error("Failed to save user data to Firestore:", error);
    // If Firestore write fails, delete the created auth user
    await userCredential.user.delete();
    throw new Error("Failed to save user data");
  }

  return userCredential.user;
};

export const signIn = async (
  email: string,
  password: string
): Promise<User> => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  await setItem("userToken", await userCredential.user.getIdToken());
  return userCredential.user;
};

export const getUserData = async (userId: string): Promise<UserData | null> => {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as UserData;
  } else {
    return null;
  }
};

export const sendPasswordReset = async (email: string): Promise<void> => {
  await sendPasswordResetEmail(auth, email);
};

export const signOut = async (): Promise<void> => {
  await firebaseSignOut(auth);
  await removeItem("userToken");
};

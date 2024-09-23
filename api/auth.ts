// src/api/auth.ts
import {
  EmailAuthProvider,
  User,
  deleteUser,
  signOut as firebaseSignOut,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updatePassword,
} from "firebase/auth";
import { sendEmailVerification } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";

import { UserData } from "@/models/UserData";
import { auth, db } from "@/services/firebase";

export const signUp = async (
  email: string,
  password: string,
  username: string,
  agreeTos: boolean,
  agreeEmail?: boolean,
): Promise<User> => {
  const functions = getFunctions();
  const createUserFunction = httpsCallable(functions, "createUser");

  await createUserFunction({
    email,
    password,
    username,
    agreeTos,
    agreeEmail,
  });

  // Sign in the user
  await signInWithEmailAndPassword(auth, email, password);

  // Store the user token
  const token = await auth.currentUser!.getIdToken();
  return auth.currentUser!;
};

export const signIn = async (
  email: string,
  password: string,
): Promise<User> => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password,
  );
  const token = await userCredential.user.getIdToken();
  return userCredential.user;
};

export const sendPasswordReset = async (email: string): Promise<void> => {
  await sendPasswordResetEmail(auth, email);
};

export const signOut = async (): Promise<void> => {
  await firebaseSignOut(auth);
};

const usersCollection = collection(db, "users");

export const fetchUsers = async (): Promise<UserData[]> => {
  const snapshot = await getDocs(usersCollection);
  return snapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() }) as UserData,
  );
};

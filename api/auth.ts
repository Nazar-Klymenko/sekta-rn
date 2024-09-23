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

const usersCollection = collection(db, "users");

export const fetchUsers = async (): Promise<UserData[]> => {
  const snapshot = await getDocs(usersCollection);
  return snapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() }) as UserData,
  );
};

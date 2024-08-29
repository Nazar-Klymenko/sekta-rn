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
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";
import { sendEmailVerification } from "firebase/auth";

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
export const changePassword = async (
  currentPassword: string,
  newPassword: string,
): Promise<void> => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("No user is currently logged in");
  }

  const credential = EmailAuthProvider.credential(user.email!, currentPassword);
  await reauthenticateWithCredential(user, credential);

  await updatePassword(user, newPassword);
};
export const sendPasswordReset = async (email: string): Promise<void> => {
  await sendPasswordResetEmail(auth, email);
};
export const deleteAccount = async (password: string): Promise<void> => {
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

export const sendVerificationEmail = async () => {
  const user = auth.currentUser;
  if (user && !user.emailVerified) {
    await sendEmailVerification(user);
    return "Verification email sent successfully";
  } else {
    throw new Error("No user found or email already verified");
  }
};

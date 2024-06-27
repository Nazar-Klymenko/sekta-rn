import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  User,
} from "firebase/auth";

export const signUp = async (
  email: string,
  password: string
): Promise<User> => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
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
  return userCredential.user;
};

export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
    // Optionally, clear any additional stored data
    // await AsyncStorage.removeItem('userToken');
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};

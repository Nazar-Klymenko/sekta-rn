import {
  User,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { Linking } from "react-native";

import { auth } from "@/services/firebase";
import { removeItem, setItem } from "@/utils/asyncStorage";

import Constants from "expo-constants";

export const signUp = async (
  email: string,
  password: string
): Promise<User> => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  await setItem("userToken", await userCredential.user.getIdToken());
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
export const sendPasswordReset = async (email: string): Promise<void> => {
  // const isProduction = Constants.expoConfig?.extra?.isProd || false;

  // // Replace 'yourapp' with your actual Firebase Dynamic Links domain
  // const dynamicLinkDomain = "yourapp.page.link";

  // // Get the app's deep link prefix
  // const prefix = Linking.makeUrl("/");

  // let resetUrl: string;
  // if (isProduction) {
  //   resetUrl = "https://yourapp.com/reset-password";
  // } else {
  //   // Use the app's deep link prefix for development
  //   resetUrl = `${prefix}reset-password`;
  // }

  // // Construct the full Dynamic Link URL
  // const fullDynamicLink = `https://${dynamicLinkDomain}/?link=${encodeURIComponent(
  //   resetUrl
  // )}`;

  // await sendPasswordResetEmail(auth, email, {
  //   url: fullDynamicLink,
  //   handleCodeInApp: true,
  //   dynamicLinkDomain: dynamicLinkDomain,
  // });
  await sendPasswordResetEmail(auth, email);
};

export const signOut = async (): Promise<void> => {
  await firebaseSignOut(auth);
  await removeItem("userToken");
};

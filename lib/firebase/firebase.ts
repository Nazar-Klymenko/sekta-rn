import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
import {
  Auth,
  connectAuthEmulator,
  getAuth,
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth";
import {
  connectFirestoreEmulator,
  getFirestore,
  initializeFirestore,
} from "firebase/firestore";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";
import { connectStorageEmulator, getStorage } from "firebase/storage";

import { Platform } from "react-native";

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_MEASUREMENT_ID,
};
let app: FirebaseApp;
let auth: Auth;

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence
      ? getReactNativePersistence(ReactNativeAsyncStorage)
      : undefined,
  });
} else {
  app = getApp();
  auth = getAuth(app);
}

const db = initializeFirestore(app, { experimentalForceLongPolling: true });
// const db = getFirestore(app);
const storage = getStorage(app);
const functions = getFunctions(app);

if (__DEV__) {
  console.debug("Connecting to firebase emulators.");
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(db, "localhost", 9299); // Connect to Firestore emulator immediately
  connectStorageEmulator(storage, "localhost", 9199); // Connect to Storage emulator
  connectFunctionsEmulator(functions, "localhost", 5001);
}

export default app;
export { db, auth, storage, functions };

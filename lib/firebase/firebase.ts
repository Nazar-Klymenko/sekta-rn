import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

import { FirebaseApp, getApps, initializeApp } from "firebase/app";
import {
  Auth,
  connectAuthEmulator,
  getAuth,
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth";
import {
  connectFirestoreEmulator,
  initializeFirestore,
} from "firebase/firestore";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";
import { connectStorageEmulator, getStorage } from "firebase/storage";

import { Platform } from "react-native";

import Constants from "expo-constants";

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
} else {
  app = getApps()[0];
}

if (Platform.OS === "web") {
  auth = getAuth(app);
} else {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
}

const db = initializeFirestore(app, {
  experimentalAutoDetectLongPolling: true,
});
const storage = getStorage(app);
const functions = getFunctions(app);

const getHost = () => {
  if (Platform.OS === "web") return "localhost";
  const hostUri = Constants.expoConfig?.hostUri;
  if (hostUri) {
    const hostIP = hostUri.split(":")[0];
    if (hostIP) return hostIP;
  }

  return "localhost"; // fallback
};
const HOST = getHost();

if (process.env.CONNECT_TO_EMULATORS) {
  console.debug("Connecting to firebase emulators.");
  connectAuthEmulator(auth, `http://${HOST}:9099`);
  connectFirestoreEmulator(db, HOST, 8080);
  connectStorageEmulator(storage, HOST, 9199);
  connectFunctionsEmulator(functions, HOST, 5001);
}

export default app;
export { db, auth, storage, functions };

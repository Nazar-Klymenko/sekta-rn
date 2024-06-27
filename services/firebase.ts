// Import the functions you need from the SDKs you need
import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
  getAuth,
  Auth,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCplLIRmdqYKvwgBxunPnNzOrgDQFdD2mA",
  authDomain: "sekta-selekta.firebaseapp.com",
  databaseURL:
    "https://sekta-selekta-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "sekta-selekta",
  storageBucket: "sekta-selekta.appspot.com",
  messagingSenderId: "134777486377",
  appId: "1:134777486377:web:5744dab011dce0ce737038",
  measurementId: "G-N5H08N2Y8Z",
};

let app: FirebaseApp;
let auth: Auth;

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} else {
  app = getApps()[0];
  auth = getAuth(app);
}

export { auth };
export default app;

// src/services/databaseService.ts
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  queryEqual,
  where,
} from "firebase/firestore";

import { UserData } from "@/models/UserData";

import { db } from "../services/firebase";

export const getUserData = async (userId: string): Promise<UserData | null> => {
  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    if (userDoc.exists()) {
      return userDoc.data() as UserData;
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    console.error("Error getting user data:", error);
    throw error;
  }
};
export const queryUserByUsername = async (username: string) => {
  try {
    const q = query(
      collection(db, "users"),
      where("username", "==", username),
      limit(1)
    );

    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      console.log("Username is taken");
      return false;
    } else {
      console.log("No user found with username:", username);
      return true;
    }
  } catch (error) {
    console.error("Error querying user by username:", error);
    return false;
  }
};
export const submitPlayInfo = async (data: PlayData) => {
  try {
    const docRef = await addDoc(collection(db, "play"), data);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id; // Optionally return something if needed
  } catch (error) {
    console.error("Error adding document: ", error);
    throw new Error("Failed to submit play info");
  }
};

import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { UserData } from "@/models/UserData";

import { db } from "../services/firebase";

export const getUserData = async (userId: string): Promise<UserData | null> => {
  const userDoc = await getDoc(doc(db, "users", userId));
  if (userDoc.exists()) {
    return userDoc.data() as UserData;
  } else {
    throw new Error("User not found");
  }
};
export const queryUserByUsername = async (username: string) => {
  try {
    const q = query(
      collection(db, "users"),
      where("username", "==", username),
      limit(1),
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
export const updateUserProfile = async (
  userId: string,
  profileData: Partial<UserData>,
): Promise<void> => {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, profileData);
};

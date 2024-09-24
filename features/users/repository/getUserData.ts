import { doc, getDoc } from "firebase/firestore";

import { db } from "@/initialization/firebase/firebase";

import { User as UserData } from "../models/User";

export const getUserData = async (userId: string): Promise<UserData | null> => {
  const userDoc = await getDoc(doc(db, "users", userId));
  if (userDoc.exists()) {
    return userDoc.data() as UserData;
  } else {
    throw new Error("User not found");
  }
};

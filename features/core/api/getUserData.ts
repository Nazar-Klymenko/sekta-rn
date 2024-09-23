import { doc, getDoc } from "firebase/firestore";

import { UserData } from "@/models/UserData";
import { db } from "@/services/firebase";

export const getUserData = async (userId: string): Promise<UserData | null> => {
  const userDoc = await getDoc(doc(db, "users", userId));
  if (userDoc.exists()) {
    return userDoc.data() as UserData;
  } else {
    throw new Error("User not found");
  }
};

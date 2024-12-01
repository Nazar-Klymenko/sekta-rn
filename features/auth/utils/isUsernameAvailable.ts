import { collection, doc, getDoc } from "firebase/firestore";

import { db } from "@/lib/firebase/firebase";

export const isUsernameAvailable = async (
  username: string
): Promise<boolean> => {
  const usernameDocRef = doc(
    collection(db, "usernames"),
    username.toLowerCase()
  );
  const docSnapshot = await getDoc(usernameDocRef);
  return !docSnapshot.exists();
};

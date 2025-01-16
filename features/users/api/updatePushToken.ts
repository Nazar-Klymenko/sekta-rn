import { db } from "@/lib/firebase/firebase";

import {
  arrayUnion,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

export const updatePushToken = async (
  userId: string,
  newToken: string
): Promise<void> => {
  const userRef = doc(db, "users", userId);
  const userDoc = await getDoc(userRef);

  if (userDoc.exists()) {
    const tokens = userDoc.data().pushTokens || [];
    if (!tokens.includes(newToken)) {
      await updateDoc(userRef, {
        pushTokens: arrayUnion(newToken),
        timestamps: {
          ...userDoc.data().timestamps,
          updatedAt: serverTimestamp(),
        },
      });
    }
  } else {
    throw Error("User does not exist");
  }
};

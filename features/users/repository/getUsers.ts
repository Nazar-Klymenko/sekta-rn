import { collection, getDocs } from "firebase/firestore";

import { db } from "@/lib/firebase/firebase";

import { DisplayUser } from "../models/User";

const usersCollection = collection(db, "users");

export const getUsers = async (): Promise<DisplayUser[]> => {
  const snapshot = await getDocs(usersCollection);
  return snapshot.docs.map(
    (doc) => ({ uid: doc.id, ...doc.data() } as DisplayUser)
  );
};

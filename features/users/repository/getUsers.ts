import { collection, getDocs } from "firebase/firestore";

import { db } from "@/services/firebase/firebase";

import { User as UserData } from "../models/User";

const usersCollection = collection(db, "users");

export const getUsers = async (): Promise<UserData[]> => {
  const snapshot = await getDocs(usersCollection);
  return snapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() }) as UserData,
  );
};

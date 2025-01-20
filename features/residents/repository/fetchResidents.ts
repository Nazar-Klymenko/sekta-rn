import { db } from "@/lib/firebase/firebase";

import {
  collection,
  limit as firestoreLimit,
  getDocs,
  query,
  startAfter,
} from "firebase/firestore";

import { DisplayResident } from "../models/Resident";

export const fetchResidents = async (
  pageParam: number,
  pageSize: number
): Promise<DisplayResident[]> => {
  let q = query(collection(db, "residents"));

  if (pageParam > 0) {
    const snapshot = await getDocs(q);
    const lastVisible = snapshot.docs[pageParam * pageSize - 1];
    if (lastVisible) {
      q = query(q, startAfter(lastVisible));
    }
  }

  q = query(q, firestoreLimit(pageSize));

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => doc.data() as DisplayResident);
};

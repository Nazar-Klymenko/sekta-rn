// /api/residents.ts
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

import { ResidentData } from "@/models/ResidentData";
import { db } from "@/services/firebase";

export const fetchResidents = async (): Promise<ResidentData[]> => {
  const residentsCollection = collection(db, "residents");
  const snapshot = await getDocs(residentsCollection);
  return snapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() }) as ResidentData,
  );
};

export const fetchResidentById = async (
  id: string,
): Promise<ResidentData | null> => {
  const residentDoc = doc(db, "residents", id);
  const snapshot = await getDoc(residentDoc);
  if (snapshot.exists()) {
    return { id: snapshot.id, ...snapshot.data() } as ResidentData;
  }
  return null;
};

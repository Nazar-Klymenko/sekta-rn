import { collection, doc, getDoc, getDocs } from "firebase/firestore";

import { db } from "@/lib/firebase/firebase";

import { Resident } from "../models/Resident";

export const fetchResidents = async (): Promise<Resident[]> => {
  const residentsCollection = collection(db, "residents");
  const snapshot = await getDocs(residentsCollection);
  return snapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() }) as Resident,
  );
};

export const fetchResidentById = async (
  id: string,
): Promise<Resident | null> => {
  const residentDoc = doc(db, "residents", id);
  const snapshot = await getDoc(residentDoc);
  if (snapshot.exists()) {
    return { id: snapshot.id, ...snapshot.data() } as Resident;
  }
  return null;
};

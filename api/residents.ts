// /api/residents.ts
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "@/services/firebase";
import { ResidentData } from "@/models/ResidentData";

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

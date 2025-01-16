import { db } from "@/lib/firebase/firebase";

import { doc, getDoc } from "firebase/firestore";

import { DisplayResident } from "../models/Resident";

export const fetchResident = async (id: string): Promise<DisplayResident> => {
  const residentDoc = await getDoc(doc(db, "residents", id));
  if (residentDoc.exists()) {
    return {
      id: residentDoc.id,
      ...residentDoc.data(),
    } as DisplayResident;
  } else {
    throw new Error("Resident not found");
  }
};

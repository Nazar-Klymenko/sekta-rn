import { db } from "@/lib/firebase/firebase";

import { collection, getDocs, orderBy, query } from "firebase/firestore";

import { DisplayResident } from "@/features/residents/models/Resident";

const residentsCollection = collection(db, "residents");

export const fetchAllResidents = async (
  sortDirection: "asc" | "desc" = "desc"
): Promise<DisplayResident[]> => {
  const baseQuery = query(
    residentsCollection
    // orderBy("timestamps.createdAt", sortDirection) // desc will show future dates first
  );

  const snapshot = await getDocs(baseQuery);
  return snapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as DisplayResident)
  );
};

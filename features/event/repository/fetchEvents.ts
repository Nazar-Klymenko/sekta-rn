import { db } from "@/lib/firebase/firebase";

import { collection, getDocs, orderBy, query } from "firebase/firestore";

import { DisplayEvent } from "@/features/event/models/Event";

const eventsCollection = collection(db, "events");

export const fetchEvents = async (
  sortDirection: "asc" | "desc" = "desc"
): Promise<DisplayEvent[]> => {
  const baseQuery = query(
    eventsCollection,
    orderBy("date", sortDirection) // desc will show future dates first
  );

  const snapshot = await getDocs(baseQuery);
  return snapshot.docs.map(
    (doc) => ({ uid: doc.id, ...doc.data() } as DisplayEvent)
  );
};

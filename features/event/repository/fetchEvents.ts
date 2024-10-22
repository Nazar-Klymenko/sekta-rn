import { collection, getDocs, orderBy, query } from "firebase/firestore";

import { Event } from "@/features/event/models/Event";
import { db } from "@/lib/firebase/firebase";

const eventsCollection = collection(db, "events");

export const fetchEvents = async (
  sortDirection: "asc" | "desc" = "desc"
): Promise<Event[]> => {
  const baseQuery = query(
    eventsCollection,
    orderBy("date", sortDirection) // desc will show future dates first
  );

  const snapshot = await getDocs(baseQuery);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Event));
};

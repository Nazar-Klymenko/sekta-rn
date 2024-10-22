import {
  collection,
  doc,
  endBefore,
  getDoc,
  getDocs,
  limit,
  limitToLast,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";

import { Event } from "@/features/event/models/Event";
import { db } from "@/lib/firebase/firebase";

const eventsCollection = collection(db, "events");

export const fetchPaginatedEvents = async (
  pageParam: string | null,
  pageSize: number,
  direction: "forward" | "backward" = "forward"
): Promise<Event[]> => {
  let baseQuery = query(eventsCollection, orderBy("date", "asc"));

  if (pageParam) {
    const docSnapshot = await getDoc(doc(eventsCollection, pageParam));
    if (direction === "forward") {
      baseQuery = query(
        baseQuery,
        startAfter(docSnapshot),
        limit(pageSize),
        orderBy("date", "asc")
      );
    } else {
      baseQuery = query(
        baseQuery,
        endBefore(docSnapshot),
        limitToLast(pageSize),
        orderBy("date", "asc")
      );
    }
  } else {
    baseQuery = query(baseQuery, limit(pageSize), orderBy("date", "asc"));
  }

  const snapshot = await getDocs(baseQuery);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Event));
};

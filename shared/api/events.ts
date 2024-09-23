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
import { db } from "@/shared/services/firebase";

const eventsCollection = collection(db, "events");

export const fetchPaginatedEvents = async (
  pageParam: string | null,
  pageSize: number,
  direction: "forward" | "backward" = "forward",
): Promise<Event[]> => {
  let baseQuery = query(eventsCollection, orderBy("date", "asc"));

  if (pageParam) {
    const docSnapshot = await getDoc(doc(eventsCollection, pageParam));
    if (direction === "forward") {
      baseQuery = query(baseQuery, startAfter(docSnapshot), limit(pageSize));
    } else {
      baseQuery = query(
        baseQuery,
        endBefore(docSnapshot),
        limitToLast(pageSize),
      );
    }
  } else {
    baseQuery = query(baseQuery, limit(pageSize));
  }

  const snapshot = await getDocs(baseQuery);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Event);
};

export const fetchAllEvents = async (): Promise<Event[]> => {
  const q = query(eventsCollection, orderBy("date", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Event);
};

export const fetchLikedEvents = async (userId: string): Promise<Event[]> => {
  const userRef = doc(db, "users", userId);
  const userDoc = await getDoc(userRef);

  if (!userDoc.exists()) {
    throw new Error("User not found");
  }

  const userData = userDoc.data();
  const likedEventIds = userData.likedEvents || [];

  // Fetch all liked events
  const eventPromises = likedEventIds.map(async (eventId: string) => {
    const eventRef = doc(db, "events", eventId);
    const eventDoc = await getDoc(eventRef);
    if (eventDoc.exists()) {
      return { id: eventDoc.id, ...eventDoc.data() } as Event;
    }
    return null;
  });

  const events = await Promise.all(eventPromises);
  return events.filter((event): event is Event => event !== null);
};

export const fetchLikedEventsId = async (userId: string): Promise<string[]> => {
  const userDoc = await getDoc(doc(db, "users", userId));
  if (!userDoc.exists()) {
    throw new Error("User not found");
  }
  return userDoc.data()?.likedEvents || [];
};

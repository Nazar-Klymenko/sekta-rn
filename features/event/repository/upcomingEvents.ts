// For previews (limited events)
import {
  Query,
  Timestamp,
  addDoc,
  collection,
  doc,
  endBefore,
  limit as firestoreLimit,
  getDoc,
  getDocs,
  limit,
  limitToLast,
  orderBy,
  query,
  queryEqual,
  startAfter,
  updateDoc,
  where,
} from "firebase/firestore";

import { Event } from "@/features/event/models/Event";
import { db } from "@/lib/firebase/firebase";

const eventsCollection = collection(db, "events");

export const upcomingEventsPreview = async (
  count: number = 3,
): Promise<Event[]> => {
  const now = new Date();
  const q = query(
    collection(db, "events"),
    where("date", ">=", now),
    orderBy("date", "asc"),
    firestoreLimit(count),
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Event);
};

export const upcomingEvents = async (
  pageParam: number,
  pageSize: number,
): Promise<Event[]> => {
  const now = new Date();
  let q = query(
    collection(db, "events"),
    where("date", ">=", now),
    orderBy("date", "asc"),
  );

  if (pageParam > 0) {
    const snapshot = await getDocs(q);
    const lastVisible = snapshot.docs[pageParam * pageSize - 1];
    if (lastVisible) {
      q = query(q, startAfter(lastVisible));
    }
  }

  q = query(q, firestoreLimit(pageSize));

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Event);
};

import { db } from "@/lib/firebase/firebase";

import {
  collection,
  limit as firestoreLimit,
  getDocs,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";

import { DisplayEvent } from "@/features/event/models/Event";

export const upcomingEventsPreview = async (
  count: number = 3
): Promise<DisplayEvent[]> => {
  const now = new Date();
  const q = query(
    collection(db, "events"),
    where("date", ">=", now),
    orderBy("date", "asc"),
    firestoreLimit(count)
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map(
    (doc) => ({ uid: doc.id, ...doc.data() } as DisplayEvent)
  );
};

export const upcomingEvents = async (
  pageParam: number,
  pageSize: number
): Promise<DisplayEvent[]> => {
  const now = new Date();
  let q = query(
    collection(db, "events"),
    where("date", ">=", now),
    orderBy("date", "asc")
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
  return snapshot.docs.map(
    (doc) => ({ uid: doc.id, ...doc.data() } as DisplayEvent)
  );
};

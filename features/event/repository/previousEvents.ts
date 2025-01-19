import { db } from "@/lib/firebase/firebase";

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

import { DisplayEvent } from "@/features/event/models/Event";

const eventsCollection = collection(db, "events");

export const previousEventsPreview = async (
  count: number = 4
): Promise<DisplayEvent[]> => {
  const now = new Date();
  const q = query(
    collection(db, "events"),
    where("date", "<", now),
    orderBy("date", "desc"),
    firestoreLimit(count)
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map(
    (doc) => ({ uid: doc.id, ...doc.data() } as DisplayEvent)
  );
};

// For paginated events (no limit)
export const previousEvents = async (
  pageParam: number,
  pageSize: number
): Promise<DisplayEvent[]> => {
  const now = new Date();
  let q = query(
    collection(db, "events"),
    where("date", "<", now),
    orderBy("date", "desc")
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

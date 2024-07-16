// src/api/events.ts
import {
  Timestamp,
  collection,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";

import { Event } from "@/models/Event";
import { db } from "@/services/firebase";

const eventsCollection = collection(db, "events");

export const fetchEvents = async (): Promise<Event[]> => {
  const snapshot = await getDocs(eventsCollection);
  return snapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      } as Event)
  );
};

export const fetchEventById = async (id: string): Promise<Event> => {
  const docRef = doc(eventsCollection, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return {
      id: docSnap.id,
      ...docSnap.data(),
    } as Event;
  } else {
    throw new Error("Event not found");
  }
};

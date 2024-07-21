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

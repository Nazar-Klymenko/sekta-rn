import { collection, doc, getDoc } from "firebase/firestore";

import { db } from "@/lib/firebase/firebase";

import { Event } from "../models/Event";

const eventsCollection = collection(db, "events");

export const fetchEvent = async (id: string): Promise<Event> => {
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

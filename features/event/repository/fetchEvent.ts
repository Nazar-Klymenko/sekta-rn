import { doc, getDoc } from "firebase/firestore";

import { db } from "@/lib/firebase/firebase";

import { Event } from "../models/Event";

export const fetchEvent = async (id: string): Promise<Event> => {
  const eventDoc = await getDoc(doc(db, "events", id));
  if (eventDoc.exists()) {
    return {
      id: eventDoc.id,
      ...eventDoc.data(),
    } as Event;
  } else {
    throw new Error("Event not found");
  }
};

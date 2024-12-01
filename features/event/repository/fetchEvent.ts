import { doc, getDoc } from "firebase/firestore";

import { db } from "@/lib/firebase/firebase";

import { DisplayEvent } from "../models/Event";

export const fetchEvent = async (id: string): Promise<DisplayEvent> => {
  const eventDoc = await getDoc(doc(db, "events", id));
  if (eventDoc.exists()) {
    return {
      id: eventDoc.id,
      ...eventDoc.data(),
    } as DisplayEvent;
  } else {
    throw new Error("Event not found");
  }
};

import { deleteDoc, doc } from "firebase/firestore";

import { Event } from "@/features/event/models/Event";
import { db } from "@/lib/firebase/firebase";

export const deleteEvent = async (eventId: string) => {
  await deleteDoc(doc(db, "events", eventId));
  return eventId;
};

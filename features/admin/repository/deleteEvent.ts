import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

import { Event } from "@/features/event/models/Event";
import { db, storage } from "@/lib/firebase/firebase";

interface DeleteEventParams {
  eventId: string;
  imageId: string;
}
export const deleteEvent = async ({ eventId, imageId }: DeleteEventParams) => {
  try {
    const imageRef = ref(storage, `events/${imageId}`);

    await deleteObject(imageRef);

    await deleteDoc(doc(db, "events", eventId));

    return { success: true };
  } catch (error) {
    console.error("Error deleting event: ", error);
    throw new Error("Failed to delete event.");
  }
};

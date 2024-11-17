import { FirebaseError } from "firebase/app";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

import { db, storage } from "@/lib/firebase/firebase";

interface DeleteEventParams {
  eventId: string;
  imageId: string;
}

export const deleteEvent = async ({ eventId, imageId }: DeleteEventParams) => {
  const imageRef = ref(storage, `events/${eventId}/${imageId}`);

  try {
    await deleteObject(imageRef);
  } catch (error) {
    if ((error as FirebaseError).code === "storage/object-not-found") {
      console.warn(
        `Image with ID ${imageId} does not exist. Proceeding to delete event.`
      );
    } else {
      console.error("Error deleting image: ", error);
    }
  }

  try {
    await deleteDoc(doc(db, "events", eventId));
    return { success: true };
  } catch (error) {
    console.error("Error deleting event: ", error);
    throw new Error("Failed to delete event.");
  }
};

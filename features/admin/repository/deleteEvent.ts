import { FirebaseError } from "firebase/app";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

import { DisplayEvent } from "@/features/event/models/Event";
import { db, storage } from "@/lib/firebase/firebase";

export const deleteEvent = async (event: DisplayEvent) => {
  const imageRef = ref(storage, event.image.path);

  try {
    await deleteObject(imageRef);
  } catch (error) {
    if ((error as FirebaseError).code === "storage/object-not-found") {
      console.warn(
        `Image with for event "${event.title}" does not exist. Proceeding to delete event.`
      );
    } else {
      console.error("Error deleting image: ", error);
    }
  }

  try {
    await deleteDoc(doc(db, "events", event.uid));
    return { success: true };
  } catch (error) {
    console.error("Error deleting event: ", error);
    throw new Error("Failed to delete event.");
  }
};

import { db, storage } from "@/lib/firebase/firebase";

import { FirebaseError } from "firebase/app";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

import { DisplayResident } from "@/features/residents/models/Resident";

export const deleteResident = async (resident: DisplayResident) => {
  const imageRef = ref(storage, resident.image.path);

  try {
    await deleteObject(imageRef);
  } catch (error) {
    if ((error as FirebaseError).code === "storage/object-not-found") {
      console.warn(
        `Image for resident "${resident.name}" does not exist. Proceeding to delete resident.`
      );
    } else {
      console.error("Error deleting image: ", error);
    }
  }

  try {
    await deleteDoc(doc(db, "residents", resident.id));
    return { success: true };
  } catch (error) {
    console.error("Error deleting resident: ", error);
    throw new Error("Failed to delete resident.");
  }
};

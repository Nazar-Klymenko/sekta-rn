import {
  Timestamp,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import { EventFormValues } from "@/features/admin/utils/schemas";
import { uploadEventImage } from "@/features/admin/utils/uploadEventImage";
import { FirestoreEvent } from "@/features/event/models/Event";
import { db } from "@/lib/firebase/firebase";

export const createEvent = async (
  data: EventFormValues,
  image: string | null
) => {
  if (!image) {
    throw new Error("Please select an image");
  }

  try {
    const titleLowercase = data.title.toLowerCase();
    const serverTimestampVar = serverTimestamp();

    const eventUid = doc(collection(db, "events")).id;

    const title = data.title;
    const uploadedImage = await uploadEventImage({
      image,
      eventUid,
      title,
    });

    const eventData: FirestoreEvent = {
      uid: eventUid,
      title: {
        display: data.title,
        lowercase: titleLowercase,
      },
      caption: data.caption,
      price: {
        type: "flat",
        amount: data.price,
      },
      date: Timestamp.fromDate(data.date),
      location: data.location,
      genres: data.genres,
      lineup: data.lineup,
      image: uploadedImage,
      timestamps: {
        createdAt: serverTimestampVar,
        updatedAt: serverTimestampVar,
      },
      deletedAt: null,
      metadata: {},
    };

    const docRef = doc(db, "events", eventUid);
    await setDoc(docRef, eventData);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding document: ", error);
    return { success: false };
  }
};

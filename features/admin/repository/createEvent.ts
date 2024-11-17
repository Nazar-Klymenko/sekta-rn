import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { Event, EventFormData } from "@/features/event/models/Event";
import { db, storage } from "@/lib/firebase/firebase";

export const createEvent = async (
  data: EventFormData,
  image: string | null
) => {
  if (!image) {
    throw new Error("Please select an image");
  }

  try {
    const eventId = doc(collection(db, "events")).id;

    const fileName = `${Date.now()}-${data.title
      .toLowerCase()
      .replace(/\s+/g, "-")}`;
    const imagePath = `events/${eventId}/${fileName}`;
    const imageRef = ref(storage, imagePath);
    const response = await fetch(image);
    const blob = await response.blob();

    const uploadResult = await uploadBytes(imageRef, blob);

    const imageUrl = await getDownloadURL(uploadResult.ref);

    const eventData: Omit<Event, "id"> = {
      title: data.title,
      title_lowercase: data.title?.toLowerCase() ?? "",
      caption: data.caption,
      price: data.price,
      date: Timestamp.fromDate(new Date(data.date as unknown as string)),
      location: data.location,
      genres: data.genres ?? [],
      lineup: data.lineup ?? [],
      image: {
        id: imageRef.name,
        publicUrl: imageUrl,
        path: imageRef.fullPath,
        altText: data.title,
      },
      attendeeCount: 0,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      deletedAt: null,
      metadata: {},
    };

    const docRef = doc(db, "events", eventId);
    await setDoc(docRef, eventData);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding document: ", error);
    return { success: false };
  }
};

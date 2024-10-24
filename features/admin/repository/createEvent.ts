import { addDoc, collection } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { Alert } from "react-native";

import { Event, EventFormData } from "@/features/event/models/Event";
import { db, storage } from "@/lib/firebase/firebase";

export const createEvent = async (
  data: EventFormData,
  image: string | null
) => {
  if (!image) {
    Alert.alert("Error", "Please select an image");
    return { success: false };
  }

  try {
    const imageRef = ref(storage, `events/${Date.now()}`);
    const response = await fetch(image);
    const blob = await response.blob();
    await uploadBytes(imageRef, blob);
    const imageUrl = await getDownloadURL(imageRef);

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

    const docRef = await addDoc(collection(db, "events"), eventData);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding document: ", error);
    return { success: false };
  }
};

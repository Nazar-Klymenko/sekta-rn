import {
  Timestamp,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

import { EventCreateDocument, EventForm } from "@/features/event/models/Event";
import { db, storage } from "@/lib/firebase/firebase";

export const createEvent = async (data: EventForm) => {
  const eventId = doc(collection(db, "events")).id;
  const fileName = `${Date.now()}-${data.title
    .toLowerCase()
    .replace(/\s+/g, "-")}`;
  const imagePath = `events/${eventId}/${fileName}`;
  const imageRef = ref(storage, imagePath);
  const docRef = doc(db, "events", eventId);

  try {
    const response = await fetch(data.image.uri);
    const imageBlob = await response.blob();
    const uploadResult = await uploadBytes(imageRef, imageBlob);
    const imageUrl = await getDownloadURL(uploadResult.ref);

    const eventData: EventCreateDocument = {
      title: data.title,
      title_lowercase: data.title.toLowerCase(),
      caption: data.caption,
      price: data.price,
      date: Timestamp.fromDate(data.date),
      location: data.location,
      genres: data.genres,
      lineup: data.lineup,
      image: {
        id: imageRef.name,
        publicUrl: imageUrl,
        path: imageRef.fullPath,
        altText: data.title,
      },
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await setDoc(docRef, eventData);
  } catch (error) {
    console.log(error);
    try {
      await deleteObject(imageRef);
    } finally {
      await deleteDoc(docRef);
    }
    throw error;
  }
};

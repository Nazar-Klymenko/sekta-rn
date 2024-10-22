import { Timestamp, addDoc, collection } from "firebase/firestore";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import {
  StorageReference,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

import { Event, EventFormData } from "@/features/event/models/Event";
import { db, storage } from "@/lib/firebase/firebase";

import { isEqual, pick } from "lodash";

import { getChangedFields } from "../utils/getChangedFields";

interface UpdateEventParams {
  eventId: string;
  data: EventFormData;
  image: string | null;
  originalData: Event;
}

export const updateEvent = async ({
  eventId,
  data,
  image,
  originalData,
}: UpdateEventParams) => {
  // Handle image first if changed
  let imageUpdate = {};
  if (image && image !== originalData.image.publicUrl) {
    const imageRef = ref(storage, `events/${Date.now()}`);
    const blob = await fetch(image).then((r) => r.blob());
    await uploadBytes(imageRef, blob);
    const imageUrl = await getDownloadURL(imageRef);

    imageUpdate = {
      image: {
        id: imageRef.name,
        publicUrl: imageUrl,
        path: imageRef.fullPath,
        altText: data.title,
      },
    };
  }

  // Compare and prepare data updates
  const comparableFields = pick(data, [
    "title",
    "caption",
    "location",
    "price",
    "genres",
    "lineup",
  ]);
  const originalFields = pick(originalData, Object.keys(comparableFields));

  if (
    isEqual(comparableFields, originalFields) &&
    Object.keys(imageUpdate).length === 0
  ) {
    return eventId;
  }

  const updates = {
    ...(!isEqual(comparableFields, originalFields) && {
      ...comparableFields,
      date: Timestamp.fromDate(data.date),
      title_lowercase: data.title.toLowerCase(),
    }),
    ...imageUpdate,
    updatedAt: serverTimestamp(),
  };

  await updateDoc(doc(db, "events", eventId), updates);
  return eventId;
};

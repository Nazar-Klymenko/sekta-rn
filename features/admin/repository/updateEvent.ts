import { Timestamp, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import {
  StorageReference,
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

import {
  DisplayEvent,
  EventForm,
  EventImage,
  EventUpdateDocument,
} from "@/features/event/models/Event";
import { db, storage } from "@/lib/firebase/firebase";

interface UpdateEventParams {
  eventId: string;
  data: EventForm;
  originalData: DisplayEvent | null;
}

export const updateEvent = async ({
  eventId,
  data,
  originalData,
}: UpdateEventParams) => {
  let imageObject: EventImage;
  let isNewImage = data.image.uri !== originalData?.image.publicUrl;
  if (isNewImage) {
    const fileName = `${Date.now()}-${data.title
      .toLowerCase()
      .replace(/\s+/g, "-")}`;
    const imagePath = `events/${eventId}/${fileName}`;
    const imageRef = ref(storage, imagePath);
    const response = await fetch(data.image.uri);
    const imageBlob = await response.blob();
    const uploadResult = await uploadBytes(imageRef, imageBlob);
    const imageUrl = await getDownloadURL(uploadResult.ref);

    imageObject = {
      id: imageRef.name,
      publicUrl: imageUrl,
      path: imageRef.fullPath,
      altText: data.title,
    };
  } else {
    imageObject = {
      id: originalData?.image.id || "",
      publicUrl: originalData?.image.publicUrl || "",
      path: originalData?.image.path || "",
      altText: data.title,
    };
  }

  const eventData: EventUpdateDocument = {
    title: data.title,
    title_lowercase: data.title.toLowerCase(),
    caption: data.caption,
    price: data.price,
    date: Timestamp.fromDate(data.date),
    location: data.location,
    genres: data.genres,
    lineup: data.lineup,
    image: imageObject,
    updatedAt: serverTimestamp(),
  };

  try {
    await updateDoc(doc(db, "events", eventId), eventData);
    return { success: true, id: eventId };
  } catch (error) {
    // console.error("Error updating event:", error);
    // try {
    //   await deleteObject(ref(storage, imageRef));
    // } catch (deleteError) {
    //   console.warn(
    //     "Failed to delete uploaded image during error handling:",
    //     deleteError
    //   );
    // }
    throw error;
  }
};

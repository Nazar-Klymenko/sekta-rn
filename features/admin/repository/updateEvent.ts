import { Timestamp, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import {
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
  const isNewImage = data.image.uri !== originalData?.image.publicUrl;
  const oldImagePath = originalData?.image.path;

  let imageObject: EventImage = {
    id: originalData?.image.id || "",
    publicUrl: originalData?.image.publicUrl || "",
    path: originalData?.image.path || "",
    altText: data.title,
  };

  try {
    if (isNewImage) {
      imageObject = await uploadImage(data.image.uri, eventId, data.title);
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

    await updateDoc(doc(db, "events", eventId), eventData);

    if (isNewImage && oldImagePath) {
      try {
        await deleteObject(ref(storage, oldImagePath));
      } catch (deleteError) {
        console.warn("Failed to delete old image:", deleteError);
      }
    }
  } catch (error) {
    if (isNewImage && imageObject?.path) {
      try {
        await deleteObject(ref(storage, imageObject.path));
      } catch (cleanupError) {
        console.warn(
          "Failed to delete new image during error handling:",
          cleanupError
        );
      }
    }
    throw error;
  }
};

const uploadImage = async (uri: string, eventId: string, title: string) => {
  try {
    const fileName = `${Date.now()}-${title
      .toLowerCase()
      .replace(/\s+/g, "-")}`;
    const imagePath = `events/${eventId}/${fileName}`;
    const imageRef = ref(storage, imagePath);

    const response = await fetch(uri);
    if (!response.ok) throw new Error("Failed to fetch the image.");

    const imageBlob = await response.blob();
    const uploadResult = await uploadBytes(imageRef, imageBlob);
    const imageUrl = await getDownloadURL(uploadResult.ref);

    return {
      id: imageRef.name,
      publicUrl: imageUrl,
      path: imageRef.fullPath,
      altText: title,
    };
  } catch (error) {
    console.error("Image upload failed:", error);
    throw error;
  }
};

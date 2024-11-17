import { Timestamp, doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { Event, EventFormData } from "@/features/event/models/Event";
import { db, storage } from "@/lib/firebase/firebase";

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
  try {
    let imageUrl = originalData.image.publicUrl;
    let imageRefPath = originalData.image.path;
    let imageId = originalData.image.id;

    // Check if the image has changed
    if (image && image !== originalData.image.publicUrl) {
      const imageRef = ref(storage, `events/${eventId}/${imageId}`);

      const response = await fetch(image);
      const blob = await response.blob();
      await uploadBytes(imageRef, blob);
      imageUrl = await getDownloadURL(imageRef);
      imageRefPath = imageRef.fullPath;
      imageId = imageRef.name;
    }

    const eventData: Partial<Event> = {
      title: data.title,
      title_lowercase: data.title?.toLowerCase() ?? "",
      caption: data.caption,
      price: data.price,
      date: Timestamp.fromDate(new Date(data.date as unknown as string)),
      location: data.location,
      genres: data.genres ?? [],
      lineup: data.lineup ?? [],
      image: {
        id: imageId,
        publicUrl: imageUrl,
        path: imageRefPath,
        altText: data.title,
      },
      updatedAt: Timestamp.now(),
    };

    await updateDoc(doc(db, "events", eventId), eventData);

    return { success: true, id: eventId };
  } catch (error) {
    console.error("Error updating event: ", error);
    return { success: false };
  }
};

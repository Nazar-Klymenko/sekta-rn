import { Timestamp, doc, serverTimestamp, updateDoc } from "firebase/firestore";

import { EventFormValues } from "@/features/admin/utils/schemas";
import { uploadEventImage } from "@/features/admin/utils/uploadEventImage";
import { DisplayEvent, FirestoreEvent } from "@/features/event/models/Event";
import { db } from "@/lib/firebase/firebase";

interface UpdateEventParams {
  eventUid: string;
  data: EventFormValues;
  originalData: DisplayEvent;
}

export const updateEvent = async ({
  eventUid,
  data,
  originalData,
}: UpdateEventParams) => {
  try {
    const titleLowercase = data.title.toLowerCase();
    const serverTimestampVar = serverTimestamp();

    let uploadedImage = originalData.image;
    let image = data.image.uri;
    // Check if the image has changed
    if (image !== null && image !== uploadedImage.publicUrl) {
      const title = data.title;
      uploadedImage = await uploadEventImage({
        eventUid,
        title,
        ...uploadedImage,
        image,
      });
    }

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
        createdAt: originalData.timestamps.createdAt,
        updatedAt: serverTimestampVar,
      },
      deletedAt: null,
      metadata: {},
    };

    const docRef = doc(db, "events", eventUid);
    await updateDoc(docRef, { ...eventData });

    return { success: true, id: eventUid };
  } catch (error) {
    console.error("Error adding document: ", error);
    return { success: false };
  }
};

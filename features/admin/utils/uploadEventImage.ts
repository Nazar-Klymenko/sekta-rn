import { storage } from "@/lib/firebase/firebase";

import { Platform } from "react-native";

import { Timestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { sanitizeTitle } from "@/features/core/utils/sanitizeTitle";
import { EventImage } from "@/features/event/models/Event";

interface UploadEventImageParams {
  image: string | Blob;
  eventUid: string;
  title: string;
  existingImage?: EventImage; // Pass this for updates
}

const getImagePath = (eventUid: string, title: string) => {
  const sanitizedTitle = sanitizeTitle(title);
  return `events/${eventUid}/main-${sanitizedTitle}`; // events/abc123/main-my-cool-event
};

export const uploadEventImage = async ({
  image,
  eventUid,
  title,
  existingImage,
}: UploadEventImageParams): Promise<EventImage> => {
  const imagePath = getImagePath(eventUid, title);
  const imageRef = ref(storage, imagePath);

  // Skip if same image URL
  if (existingImage?.publicUrl === image) {
    return existingImage;
  }

  const blob =
    image instanceof Blob ? image : await fetch(image).then((r) => r.blob());
  console.log({
    size: blob.size,
    type: blob.type,
    uri: image,
    platform: Platform.OS,
    version: Platform.Version,
  });

  await uploadBytes(imageRef, blob);
  const imageUrl = await getDownloadURL(imageRef);

  return {
    publicUrl: imageUrl,
    path: imagePath,
    altText: title,
    timestamps: {
      createdAt: existingImage?.timestamps.createdAt || Timestamp.now(),
      updatedAt: Timestamp.now(),
    },
  };
};

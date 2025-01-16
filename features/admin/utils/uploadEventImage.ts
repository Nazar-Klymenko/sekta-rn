import { storage } from "@/lib/firebase/firebase";

import { Timestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { sanitizeTitle } from "@/features/core/utils/sanitizeTitle";
import { EventImage } from "@/features/event/models/Event";

interface UploadEventImageParams {
  image: string | Blob;
  folder: string;
  documentId: string;
  title: string;
  existingImage?: EventImage; // Pass this for updates
}

const getImagePath = (folder: string, documentId: string, title: string) => {
  const sanitizedTitle = sanitizeTitle(title);
  return `${folder}/${documentId}/main-${sanitizedTitle}`; // events/abc123/main-my-cool-event
};

export const uploadEventImage = async ({
  image,
  folder,
  documentId,
  title,
  existingImage,
}: UploadEventImageParams): Promise<EventImage> => {
  const imagePath = getImagePath(folder, documentId, title);
  const imageRef = ref(storage, imagePath);

  // Skip if same image URL
  if (existingImage?.publicUrl === image) {
    return existingImage;
  }

  const blob =
    image instanceof Blob ? image : await fetch(image).then((r) => r.blob());

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

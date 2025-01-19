import { storage } from "@/lib/firebase/firebase";

import { Platform } from "react-native";

import { serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { sanitizeTitle } from "@/features/core/utils/sanitizeTitle";
import {
  DisplayEventImage,
  FirestoreEventImage,
} from "@/features/event/models/Event";

interface UploadEventImageParams {
  image: string | Blob;
  eventUid: string;
  title: string;
  existingImage?: DisplayEventImage;
}

const getImagePath = (eventUid: string, title: string) => {
  const sanitizedTitle = sanitizeTitle(title);
  return `events/${eventUid}/main-${sanitizedTitle}`;
};

const isValidImageUri = (uri: string): boolean => {
  return (
    uri.startsWith("file://") ||
    uri.startsWith("content://") ||
    uri.startsWith("data:") ||
    uri.startsWith("http")
  );
};

export const uploadEventImage = async ({
  image,
  eventUid,
  title,
  existingImage,
}: UploadEventImageParams): Promise<FirestoreEventImage> => {
  try {
    if (!image) {
      throw new Error("No image provided");
    }

    const imagePath = getImagePath(eventUid, title);
    const imageRef = ref(storage, imagePath);
    const serverTime = serverTimestamp();

    // For updates, compare paths instead of URLs
    if (existingImage?.path === imagePath) {
      return existingImage;
    }

    let uploadBlob: Blob;

    if (typeof image === "string") {
      if (!isValidImageUri(image)) {
        throw new Error("Invalid image URI format");
      }

      // Handle platform-specific URI formats
      const uri = Platform.select({
        ios: image.replace("file://", ""),
        android: image,
        default: image,
      });

      const response = await fetch(uri);
      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.status}`);
      }
      uploadBlob = await response.blob();
    } else {
      uploadBlob = image;
    }

    try {
      await uploadBytes(imageRef, uploadBlob);
      const imageUrl = await getDownloadURL(imageRef);

      return {
        publicUrl: imageUrl,
        path: imagePath,
        altText: title,
        timestamps: {
          createdAt: existingImage?.timestamps.createdAt || serverTime,
          updatedAt: serverTime,
        },
      };
    } finally {
      // Cleanup if blob was created from URI
      if (typeof image === "string") {
        // @ts-ignore: Blob might not have close method in all environments
        if (uploadBlob.close) {
          // @ts-ignore: Blob might not have close method in all environments
          uploadBlob.close();
        }
      }
    }
  } catch (error) {
    console.error("Error in uploadEventImage:", error);
    throw error;
  }
};

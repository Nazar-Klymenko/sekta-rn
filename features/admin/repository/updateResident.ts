import { db } from "@/lib/firebase/firebase";

import { doc, serverTimestamp, updateDoc } from "firebase/firestore";

import { ResidentFormValues } from "@/features/admin/utils/schemas";
import { uploadEventImage } from "@/features/admin/utils/uploadEventImage";
import {
  DisplayResident,
  FirestoreResident,
} from "@/features/residents/models/Resident";

interface UpdateResidentParams {
  residentId: string;
  data: ResidentFormValues;
  originalData: DisplayResident;
}

export const updateResident = async ({
  residentId,
  data,
  originalData,
}: UpdateResidentParams) => {
  try {
    const titleLowercase = data.name.toLowerCase();
    const _serverTimestamp = serverTimestamp();

    let uploadedImage = originalData.image;
    let image = data.image.uri;
    // Check if the image has changed
    if (image !== null && image !== uploadedImage.publicUrl) {
      const title = data.name;
      uploadedImage = await uploadEventImage({
        folder: "events",
        documentId: residentId,
        title,
        ...uploadedImage,
        image,
      });
    }

    const residentData: FirestoreResident = {
      name: {
        display: data.name,
        lowercase: titleLowercase,
      },
      image: uploadedImage,
      timestamps: {
        createdAt: originalData.timestamps.createdAt,
        updatedAt: _serverTimestamp,
      },
      metadata: {},
      bio: "",
      socialMedia: {},
    };

    const docRef = doc(db, "residents", residentId);
    await updateDoc(docRef, { ...residentData });

    return { success: true, id: residentId };
  } catch (error) {
    console.error("Error adding document: ", error);
    return { success: false };
  }
};

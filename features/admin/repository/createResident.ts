import { db } from "@/lib/firebase/firebase";

import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";

import { ResidentFormValues } from "@/features/admin/utils/schemas";
import { uploadEventImage } from "@/features/admin/utils/uploadEventImage";
import { FirestoreResident } from "@/features/residents/models/Resident";

export const createResident = async (data: ResidentFormValues) => {
  try {
    const nameLowercase = data.name.toLowerCase();
    const _serverTimestamp = serverTimestamp();

    const residentUid = doc(collection(db, "residents")).id;

    const title = data.name;
    const uploadedImage = await uploadEventImage({
      image: data.image.uri,
      folder: "residents",
      documentId: residentUid,
      title,
    });

    const residentData: FirestoreResident = {
      name: {
        display: data.name,
        lowercase: nameLowercase,
      },
      bio: data.bio,
      image: uploadedImage,
      timestamps: {
        createdAt: _serverTimestamp,
        updatedAt: _serverTimestamp,
      },
      socialMedia: {},
      metadata: {},
    };

    const docRef = doc(db, "residents", residentUid);
    await setDoc(docRef, residentData);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding document: ", error);
    return { success: false };
  }
};

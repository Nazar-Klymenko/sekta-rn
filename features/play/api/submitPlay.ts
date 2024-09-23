import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { PlayData } from "@/shared/models/PlayData";
import { db } from "@/shared/services/firebase";

export const submitPlay = async (
  data: Omit<PlayData, "id" | "submittedAt">,
) => {
  const docRef = await addDoc(collection(db, "play"), {
    ...data,
    submittedAt: serverTimestamp(),
  });
  return docRef.id;
};

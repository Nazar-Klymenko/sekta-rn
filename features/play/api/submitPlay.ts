import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { db } from "@/services/firebase";
import { PlayData } from "@/shared/models/PlayData";

export const submitPlay = async (
  data: Omit<PlayData, "id" | "submittedAt">,
) => {
  const docRef = await addDoc(collection(db, "play"), {
    ...data,
    submittedAt: serverTimestamp(),
  });
  return docRef.id;
};

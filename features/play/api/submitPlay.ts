import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { PlaySubmission } from "@/features/play/models/PlaySubmission";
import { db } from "@/lib/firebase/firebase";

export const submitPlay = async (
  data: Omit<PlaySubmission, "id" | "submittedAt">,
) => {
  const docRef = await addDoc(collection(db, "play"), {
    ...data,
    submittedAt: serverTimestamp(),
  });
  return docRef.id;
};

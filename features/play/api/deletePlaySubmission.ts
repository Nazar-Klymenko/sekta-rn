import { deleteDoc, doc } from "firebase/firestore";

import { db } from "@/lib/firebase/firebase";

export const deletePlaySubmission = async (id: string) => {
  await deleteDoc(doc(db, "play", id));
};

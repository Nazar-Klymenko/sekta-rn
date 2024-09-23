import { deleteDoc, doc } from "firebase/firestore";

import { db } from "@/services/firebase/firebase";

export const deletePlaySubmission = async (id: string) => {
  await deleteDoc(doc(db, "playSubmissions", id));
};

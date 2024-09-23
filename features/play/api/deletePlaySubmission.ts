import { db } from "@/shared/services/firebase";

import { deleteDoc, doc } from "firebase/firestore";

export const deletePlaySubmission = async (id: string) => {
  await deleteDoc(doc(db, "playSubmissions", id));
};

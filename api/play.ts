import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { PlayData } from "@/models/PlayData";
import { UserData } from "@/models/UserData";

import { db } from "../services/firebase";

const playCollection = collection(db, "play");
export const submitPlayInfo = async (
  data: Omit<PlayData, "id" | "submittedAt">,
) => {
  const docRef = await addDoc(collection(db, "play"), {
    ...data,
    submittedAt: serverTimestamp(),
  });
  return docRef.id;
};
export const fetchPlaySubmissions = async (): Promise<PlayData[]> => {
  const snapshot = await getDocs(playCollection);
  return snapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      }) as PlayData,
  );
};
export const deletePlaySubmission = async (id: string) => {
  await deleteDoc(doc(db, "playSubmissions", id));
};

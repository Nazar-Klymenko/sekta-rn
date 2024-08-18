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
  try {
    const docRef = await addDoc(collection(db, "play"), {
      ...data,
      submittedAt: serverTimestamp(),
    });
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw new Error("Failed to submit play info");
  }
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

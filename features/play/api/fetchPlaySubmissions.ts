import { db } from "@/shared/services/firebase";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { PlaySubmission } from "@/features/play/models/PlaySubmission";

const playCollection = collection(db, "play");

export const fetchPlaySubmissions = async (): Promise<PlaySubmission[]> => {
  const snapshot = await getDocs(playCollection);
  return snapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      }) as PlaySubmission,
  );
};

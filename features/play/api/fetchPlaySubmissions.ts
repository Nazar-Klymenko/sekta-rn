import { collection, getDocs } from "firebase/firestore";

import { PlaySubmission } from "@/features/play/models/PlaySubmission";
import { db } from "@/lib/firebase/firebase";

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

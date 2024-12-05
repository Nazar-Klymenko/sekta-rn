import { useQuery } from "@tanstack/react-query";

import { doc, getDoc } from "firebase/firestore";

import { DisplayUser } from "@/features/users/models/User";
import { db } from "@/lib/firebase/firebase";

export const useUserData = (userId: string) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      const docRef = doc(db, "users", userId);

      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data() as DisplayUser;
      }
      throw new Error("User document not found after multiple attempts");
    },
    retry: true,
  });
};

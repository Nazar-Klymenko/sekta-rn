import { useQuery } from "@tanstack/react-query";

import { doc, getDoc } from "firebase/firestore";

import { DisplayUser } from "@/features/users/models/User";
import { db } from "@/lib/firebase/firebase";

export const useUserData = (userId: string) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      const docRef = doc(db, "users", userId);
      const maxRetries = 5;
      const retryDelay = 1000; // 1 second

      for (let i = 0; i < maxRetries; i++) {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          return docSnap.data() as DisplayUser;
        }
        // Wait before trying again
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
      }
      throw new Error("User document not found after multiple attempts");
    },
    retry: false, // We handle retries manually
  });
};

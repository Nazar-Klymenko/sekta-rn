// src/hooks/useUsernameAvailability.ts
import { collection, getDocs, limit, query, where } from "firebase/firestore";

import { useQuery } from "react-query";

import { db } from "../services/firebase";

const checkUsernameAvailability = async (
  username: string
): Promise<boolean> => {
  const q = query(
    collection(db, "users"),
    where("username", "==", username),
    limit(1)
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.empty;
};

export const useUsernameAvailability = (username: string) => {
  return useQuery(
    ["usernameAvailability", username],
    () => checkUsernameAvailability(username),
    {
      enabled: false,
      retry: false,
    }
  );
};

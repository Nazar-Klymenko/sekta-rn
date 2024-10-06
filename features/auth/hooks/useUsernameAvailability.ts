import { useQuery } from "@tanstack/react-query";

import { collection, getDocs, limit, query, where } from "firebase/firestore";

import { db } from "@/lib/firebase/firebase";

const checkUsernameAvailability = async (
  username: string,
): Promise<boolean> => {
  const q = query(
    collection(db, "users"),
    where("username", "==", username),
    limit(1),
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.empty;
};

export const useUsernameAvailability = (username: string) => {
  return useQuery<boolean, Error>({
    queryKey: ["usernameAvailability", username],
    queryFn: () => checkUsernameAvailability(username),
    enabled: false,
    retry: false,
  });
};

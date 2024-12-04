import { useQuery } from "@tanstack/react-query";

import { collection, doc, getDoc } from "firebase/firestore";

import { db } from "@/lib/firebase/firebase";

const checkUsernameAvailability = async (
  username: string
): Promise<boolean> => {
  const q = doc(collection(db, "usernames"), username.toLowerCase());
  const docSnapshot = await getDoc(q);
  return !docSnapshot.exists();
};

export const useUsernameAvailability = (username: string) => {
  return useQuery<boolean, Error>({
    queryKey: ["usernameAvailability", username],
    queryFn: () => checkUsernameAvailability(username),
    enabled: false,
    retry: false,
  });
};

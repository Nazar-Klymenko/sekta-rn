import { getUserData } from "@/api/firestore";
import { UserData } from "@/models/UserData";

import { useQuery } from "react-query";

export const useUserData = (userId: string) => {
  return useQuery<UserData | null>(
    ["userData", userId],
    () => getUserData(userId),
    {
      enabled: !!userId,
      retry: false,
    }
  );
};

// useUserData.ts
import { useQuery } from "@tanstack/react-query";

import { getUserData } from "@/api/firestore";
import { UserData } from "@/models/UserData";

export const useUserData = (userId: string) => {
  return useQuery<UserData | null, Error>({
    queryKey: ["userData", userId],
    queryFn: () => getUserData(userId),
    enabled: !!userId,
    retry: false,
  });
};

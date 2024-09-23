// useUserData.ts
import { useQuery } from "@tanstack/react-query";

import { UserData } from "@/shared/models/UserData";

import { getUserData } from "../api/getUserData";

export const useUserData = (userId: string) => {
  return useQuery<UserData | null, Error>({
    queryKey: ["userData", userId],
    queryFn: () => getUserData(userId),
    enabled: !!userId,
    retry: false,
  });
};

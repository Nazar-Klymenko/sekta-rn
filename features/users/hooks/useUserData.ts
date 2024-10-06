// useUserData.ts
import { useQuery } from "@tanstack/react-query";

import { User as UserData } from "@/features/users/models/User";

import { getUserData } from "../repository/getUserData";

export const useUserData = (userId: string) => {
  return useQuery<UserData | null, Error>({
    queryKey: ["userData", userId],
    queryFn: () => getUserData(userId),
    enabled: !!userId,
    retry: false,
  });
};

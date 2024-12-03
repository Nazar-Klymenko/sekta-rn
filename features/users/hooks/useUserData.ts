// useUserData.ts
import { useQuery } from "@tanstack/react-query";

import { DisplayUser } from "@/features/users/models/User";

import { getUserData } from "../repository/getUserData";

export const useUserData = (userId: string) => {
  const result = useQuery<DisplayUser | null, Error>({
    queryKey: ["userData", userId],
    queryFn: () => getUserData(userId),
    enabled: !!userId,
    retry: false,
  });

  return {
    ...result,
    data: result.data ?? null,
  };
};

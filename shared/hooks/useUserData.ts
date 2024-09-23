// useUserData.ts
import { useQuery } from "@tanstack/react-query";

import { fetchUsers } from "@/shared/api/auth";
import { getUserData } from "@/shared/api/firestore";
import { UserData } from "@/shared/models/UserData";

export const useUserData = (userId: string) => {
  return useQuery<UserData | null, Error>({
    queryKey: ["userData", userId],
    queryFn: () => getUserData(userId),
    enabled: !!userId,
    retry: false,
  });
};

export const useUsers = () => {
  return useQuery<UserData[], Error>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
};

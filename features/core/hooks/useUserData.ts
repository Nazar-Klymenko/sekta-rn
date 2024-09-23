// useUserData.ts
import { useQuery } from "@tanstack/react-query";

import { fetchUsers } from "@/api/auth";
import { UserData } from "@/models/UserData";

import { getUserData } from "../api/getUserData";

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

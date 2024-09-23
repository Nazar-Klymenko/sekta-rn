// useUserData.ts
import { useQuery } from "@tanstack/react-query";

import { fetchUsers } from "@/shared/api/auth";
import { UserData } from "@/shared/models/UserData";

export const useUsers = () => {
  return useQuery<UserData[], Error>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
};

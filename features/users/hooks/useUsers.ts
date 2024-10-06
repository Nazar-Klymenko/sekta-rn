import { useQuery } from "@tanstack/react-query";

import { User as UserData } from "@/features/users/models/User";

import { getUsers } from "../repository/getUsers";

export const useUsers = () => {
  return useQuery<UserData[], Error>({
    queryKey: ["users"],
    queryFn: getUsers,
  });
};

import { useQuery } from "@tanstack/react-query";

import { DisplayUser } from "@/features/users/models/User";

import { getUsers } from "../repository/getUsers";

export const useUsers = () => {
  return useQuery<DisplayUser[], Error>({
    queryKey: ["users"],
    queryFn: getUsers,
  });
};

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { signOut } from "../repository/signOut";

export const useSignOut = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

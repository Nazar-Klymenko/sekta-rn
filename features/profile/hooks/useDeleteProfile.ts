import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteProfile } from "../api/deleteProfile";

export const useDeleteProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (password: string) => deleteProfile(password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

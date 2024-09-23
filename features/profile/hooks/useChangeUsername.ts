import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useAuth } from "@/features/core/hooks/useAuth";

import { changeUsername } from "../api/changeUsername";

export const useChangeUsername = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newUsername: string) => {
      if (!user?.uid) throw new Error("User not authenticated");
      await changeUsername(newUsername);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userData"] });
    },
  });
};

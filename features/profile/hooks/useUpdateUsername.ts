import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useAuth } from "@/features/core/hooks/useAuth";

import { updateUsername } from "../api/updateUsername";

export const useUpdateUsername = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newUsername: string) => {
      if (!user?.uid) throw new Error("User not authenticated");
      await updateUsername(newUsername);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userData"] });
    },
  });
};

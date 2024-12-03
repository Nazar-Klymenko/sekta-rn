import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { useOperationStatusHelper } from "@/features/core/hooks/useOperationStatusHelper";

import { changeUsername } from "../api/changeUsername";

export const useChangeUsername = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const handleToastMessage = useOperationStatusHelper();
  return useMutation({
    mutationFn: async (newUsername: string) => {
      if (!user?.uid) throw new Error("User not authenticated");
      await changeUsername(newUsername);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userData"] });
      handleToastMessage(null, "updateUsername", "success");
    },
    onError: (error) => {
      handleToastMessage(error, "updateUsername", "error");
    },
  });
};

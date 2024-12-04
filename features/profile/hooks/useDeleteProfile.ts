import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useOperationStatusHelper } from "@/features/core/hooks/useOperationStatusHelper";

import { deleteProfile } from "../api/deleteProfile";

export const useDeleteProfile = () => {
  const queryClient = useQueryClient();
  const handleToastMessage = useOperationStatusHelper();
  return useMutation({
    mutationFn: (password: string) => deleteProfile(password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      handleToastMessage(null, "deleteAccount", "info");
    },
    onError(error) {
      handleToastMessage(error, "deleteAccount", "error");
    },
  });
};

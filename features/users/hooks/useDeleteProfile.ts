import { useMutation } from "@tanstack/react-query";

import { useOperationStatusHelper } from "@/features/core/hooks/useOperationStatusHelper";
import { deleteProfile } from "@/features/users/api/deleteProfile";

export const useDeleteProfile = () => {
  const handleToastMessage = useOperationStatusHelper();
  return useMutation({
    mutationFn: (password: string) => deleteProfile(password),
    onSuccess: () => {
      handleToastMessage(null, "deleteAccount", "info");
    },
    onError(error) {
      handleToastMessage(error, "deleteAccount", "error");
    },
  });
};

import { useMutation } from "@tanstack/react-query";

import { useOperationStatusHelper } from "@/features/core/hooks/useOperationStatusHelper";
import { updatePushToken } from "@/features/users/api/updatePushToken";

export function useUpdatePushToken() {
  const handleToastMessage = useOperationStatusHelper();
  return useMutation({
    mutationFn: ({ userId, newToken }: { userId: string; newToken: string }) =>
      updatePushToken(userId, newToken),
    onSuccess: () => {
      handleToastMessage(null, "updatePushToken", "success");
    },
    onError: (error) => {
      handleToastMessage(error, "updatePushToken", "error");
    },
  });
}

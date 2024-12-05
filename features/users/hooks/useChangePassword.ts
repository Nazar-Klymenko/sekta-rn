import { useMutation } from "@tanstack/react-query";

import { useOperationStatusHelper } from "@/features/core/hooks/useOperationStatusHelper";
import { changePassword } from "@/features/users/api/changePassword";

export function useChangePassword() {
  const handleToastMessage = useOperationStatusHelper();
  return useMutation({
    mutationFn: ({
      currentPassword,
      newPassword,
    }: {
      currentPassword: string;
      newPassword: string;
    }) => changePassword(currentPassword, newPassword),
    onSuccess: () => {
      handleToastMessage(null, "changePassword", "success");
    },
    onError: (error) => {
      handleToastMessage(error, "changePassword", "error");
    },
  });
}

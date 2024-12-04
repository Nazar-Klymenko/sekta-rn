import { useMutation } from "@tanstack/react-query";

import { useOperationStatusHelper } from "@/features/core/hooks/useOperationStatusHelper";
import { sendVerificationEmail } from "@/features/users/api/verifyEmail";

export const useVerifyEmail = () => {
  const handleToastMessage = useOperationStatusHelper();
  return useMutation({
    mutationFn: sendVerificationEmail,
    onSuccess: () => {
      handleToastMessage(null, "sendVerifyEmail", "success");
    },
    onError: (error) => {
      handleToastMessage(error, "sendVerifyEmail", "error");
    },
  });
};

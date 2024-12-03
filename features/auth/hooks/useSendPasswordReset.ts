import { useMutation } from "@tanstack/react-query";

import { useOperationStatusHelper } from "@/features/core/hooks/useOperationStatusHelper";

import { sendPasswordReset } from "../repository/sendPasswordReset";

export const useSendPasswordReset = () => {
  const handleToastMessage = useOperationStatusHelper();

  return useMutation({
    mutationFn: (email: string) => sendPasswordReset(email),
    onSuccess: () => {
      handleToastMessage(null, "resetPassword", "info");
    },
    onError: (error) => {
      handleToastMessage(error, "resetPassword", "error");
    },
  });
};

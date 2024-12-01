import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useOperationStatusHelper } from "@/features/core/hooks/useOperationStatusHelper";

import { signIn } from "../repository/signIn";

export const useSignIn = () => {
  const queryClient = useQueryClient();
  const handleToastMessage = useOperationStatusHelper();

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      signIn(email, password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      handleToastMessage(null, "login", "success");
    },
    onError: (error) => {
      handleToastMessage(error, "login", "error");
    },
  });
};

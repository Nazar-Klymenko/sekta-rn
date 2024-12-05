import { useMutation } from "@tanstack/react-query";

import { useOperationStatusHelper } from "@/features/core/hooks/useOperationStatusHelper";

import { signIn } from "../repository/signIn";

export const useSignIn = () => {
  const handleToastMessage = useOperationStatusHelper();

  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => await signIn(email, password),

    onSuccess: () => {
      handleToastMessage(null, "login", "success");
    },

    onError: (error) => {
      handleToastMessage(error, "login", "error");
    },
  });
};

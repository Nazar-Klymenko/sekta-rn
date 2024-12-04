import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useOperationStatusHelper } from "@/features/core/hooks/useOperationStatusHelper";

import { signUp } from "../repository/signUp";
import { SignUpSchemaType } from "../utils/schemas";

export const useSignUp = () => {
  const queryClient = useQueryClient();
  const handleToastMessage = useOperationStatusHelper();
  return useMutation({
    mutationFn: async ({ email, password, ...userData }: SignUpSchemaType) => {
      await signUp({
        email,
        password,
        username: userData.username,
        agreeTos: userData.agreeTos,
        agreeEmail: userData.agreeEmail,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      handleToastMessage(null, "signup", "success");
    },
    onError: (error) => {
      handleToastMessage(error, "signup", "error");
    },
  });
};

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { signUp } from "../repository/signUp";
import { SignUpSchemaType } from "../utils/schemas";

export const useSignUp = () => {
  const queryClient = useQueryClient();

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
    },
  });
};

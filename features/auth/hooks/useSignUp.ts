import { useMutation, useQueryClient } from "@tanstack/react-query";

import { SignUpData, signUp } from "../repository/signUp";

export const useSignUp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ email, password, ...userData }: SignUpData) => {
      const user = await signUp({
        email,
        password,
        username: userData.username,
        agreeTos: userData.agreeTos,
        agreeEmail: userData.agreeEmail,
      });
      return user;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

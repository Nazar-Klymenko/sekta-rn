import { useMutation, useQueryClient } from "@tanstack/react-query";

import { signIn } from "../repository/signIn";

export const useSignIn = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      signIn(email, password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

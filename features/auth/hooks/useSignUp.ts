import { useMutation, useQueryClient } from "@tanstack/react-query";

import { User as UserData } from "@/features/users/models/User";

import { signUp } from "../repository/signUp";

type SignUpData = Omit<UserData, "email" | "id"> & {
  email: string;
  password: string;
};

export const useSignUp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ email, password, ...userData }: SignUpData) => {
      const user = await signUp(
        email,
        password,
        userData.username,
        userData.agreeTos,
        userData.agreeEmail,
      );
      return user;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

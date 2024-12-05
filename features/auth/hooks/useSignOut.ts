import { useMutation } from "@tanstack/react-query";

import { signOut } from "../repository/signOut";

export const useSignOut = () => {
  return useMutation({
    mutationFn: signOut,
  });
};

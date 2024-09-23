import { useMutation } from "@tanstack/react-query";

import { sendPasswordReset } from "../repository/sendPasswordReset";

export const useSendPasswordReset = () => {
  return useMutation({
    mutationFn: (email: string) => sendPasswordReset(email),
  });
};

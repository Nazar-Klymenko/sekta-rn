import { useMutation } from "@tanstack/react-query";

import { useToastController } from "@tamagui/toast";

import { sendVerificationEmail } from "../api/verifyEmail";

export const useVerifyEmail = () => {
  const toast = useToastController();

  return useMutation({
    mutationFn: sendVerificationEmail,
    onSuccess: () => {
      toast.show("Success", {
        message: "Verification email sent. Please check your inbox.",
        variant: "success",
      });
    },
    onError: (error) => {
      toast.show("Error", {
        message: error instanceof Error ? error.message : "An error occurred",
        variant: "error",
      });
    },
  });
};

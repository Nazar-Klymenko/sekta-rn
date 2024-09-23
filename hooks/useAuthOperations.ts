// useAuthOperations.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { FirebaseError } from "firebase/app";
import { User } from "firebase/auth";

import {
  deleteAccount,
  sendPasswordReset,
  sendVerificationEmail,
  signIn,
  signOut,
  signUp,
} from "@/api/auth";
import { UserData } from "@/models/UserData";

import { useToastController } from "@tamagui/toast";

import { useAuth } from "./useAuth";

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

export const useSendPasswordReset = () => {
  return useMutation({
    mutationFn: (email: string) => sendPasswordReset(email),
  });
};

export const useDeleteAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (password: string) => deleteAccount(password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

export const useSignOut = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};
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

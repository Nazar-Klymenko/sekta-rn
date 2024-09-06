// useAuthOperations.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FirebaseError } from "firebase/app";
import { User } from "firebase/auth";

import {
  changePassword,
  deleteAccount,
  sendPasswordReset,
  sendVerificationEmail,
  signIn,
  signOut,
  signUp,
} from "@/api/auth";
import { updateUsername, updateUserProfile } from "@/api/firestore";
import { UserData } from "@/models/UserData";

import { useAuth } from "./useAuth";
import { useToastController } from "@tamagui/toast";

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

export function useChangePassword() {
  return useMutation({
    mutationFn: ({
      currentPassword,
      newPassword,
    }: {
      currentPassword: string;
      newPassword: string;
    }) => changePassword(currentPassword, newPassword),
  });
}

export const useSendPasswordReset = () => {
  return useMutation({
    mutationFn: (email: string) => sendPasswordReset(email),
  });
};

export const useUpdateUsername = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newUsername: string) => {
      if (!user?.uid) throw new Error("User not authenticated");
      await updateUsername(newUsername);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userData"] });
    },
  });
};

export const useUpdateEmail = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      profileData,
      currentPassword,
    }: {
      profileData: Partial<UserData>;
      currentPassword?: string;
    }) => updateUserProfile(user!, profileData, currentPassword),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userData"] });
      if (user) {
        user.reload(); // Refresh the user object to get updated info
      }
    },
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

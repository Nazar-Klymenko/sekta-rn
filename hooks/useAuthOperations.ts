// useAuthOperations.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FirebaseError } from "firebase/app";
import { User } from "firebase/auth";

import {
  changePassword,
  deleteAccount,
  sendPasswordReset,
  signIn,
  signOut,
  signUp,
} from "@/api/auth";
import { updateUserProfile } from "@/api/firestore";
import { UserData } from "@/models/UserData";

import { useAuth } from "./useAuth";

type SignUpData = Omit<UserData, "email"> & { email: string; password: string };

export const useSignUp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ email, password, ...userData }: SignUpData) => {
      const user = await signUp(
        email,
        password,
        userData.username,
        userData.agreeTos,
        userData.agreeEmail
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

export const useUpdateProfile = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (profileData: Partial<UserData>) =>
      updateUserProfile(user?.uid || "", profileData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userData"] });
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

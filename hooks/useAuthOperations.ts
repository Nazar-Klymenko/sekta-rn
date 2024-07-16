import { FirebaseError } from "firebase/app";
import { User } from "firebase/auth";

import {
  changePassword,
  sendPasswordReset,
  signIn,
  signOut,
  signUp,
} from "@/api/auth";
import { updateUserProfile } from "@/api/firestore";
import { UserData } from "@/models/UserData";

import { useMutation, useQueryClient } from "react-query";

import { useAuth } from "./useAuth";

type SignUpData = Omit<UserData, "email"> & { email: string; password: string };

export const useSignUp = () => {
  const queryClient = useQueryClient();

  return useMutation<User, FirebaseError, SignUpData>(
    async ({ email, password, ...userData }: SignUpData) => {
      const user = await signUp(
        email,
        password,
        userData.username,
        userData.agreeTos,
        userData.agreeEmail
      );
      return user;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("user");
      },
    }
  );
};

export const useSignIn = () => {
  const queryClient = useQueryClient();
  return useMutation<User, FirebaseError, { email: string; password: string }>(
    ({ email, password }) => signIn(email, password),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("user");
      },
    }
  );
};

export function useChangePassword() {
  return useMutation<
    void,
    FirebaseError,
    { currentPassword: string; newPassword: string }
  >(({ currentPassword, newPassword }) =>
    changePassword(currentPassword, newPassword)
  );
}

export const useSendPasswordReset = () => {
  return useMutation<void, FirebaseError, string>((email: string) =>
    sendPasswordReset(email)
  );
};

export const useUpdateProfile = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation<void, FirebaseError, Partial<UserData>>(
    (profileData: Partial<UserData>) =>
      updateUserProfile(user?.uid || "", profileData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("userData");
      },
    }
  );
};

export const useSignOut = () => {
  const queryClient = useQueryClient();
  return useMutation(signOut, {
    onSuccess: () => {
      queryClient.invalidateQueries("user");
    },
  });
};

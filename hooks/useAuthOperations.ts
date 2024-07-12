import { FirebaseError } from "firebase/app";
import { User } from "firebase/auth";

import {
  changePassword,
  sendPasswordReset,
  signIn,
  signOut,
  signUp,
} from "@/api/auth";

import { useRouter } from "expo-router";
import { useMutation, useQueryClient } from "react-query";

function isFirebaseError(error: unknown): error is FirebaseError {
  return (
    error instanceof FirebaseError ||
    (typeof error === "object" &&
      error !== null &&
      "code" in error &&
      "message" in error)
  );
}
export const useSignUp = () => {
  const queryClient = useQueryClient();

  return useMutation<
    User,
    FirebaseError,
    { email: string; password: string; username: string }
  >(
    async ({
      email,
      password,
      username,
    }: {
      email: string;
      password: string;
      username: string;
    }) => {
      const user = await signUp(email, password, username);
      return user;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("user");
      },
      onError: (error) => {
        console.error("Sign-up error:", error);
        // Handle error (e.g., show error message to user)
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
  >(
    async ({
      currentPassword,
      newPassword,
    }: {
      currentPassword: string;
      newPassword: string;
    }) => {
      await changePassword(currentPassword, newPassword);
    }
  );
}

export const useSendPasswordReset = () => {
  return useMutation<void, FirebaseError, string>((email: string) =>
    sendPasswordReset(email)
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

import { FirebaseError } from "firebase/app";
import { User } from "firebase/auth";

import { sendPasswordReset, signIn, signOut, signUp } from "@/api/auth";

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
    ({
      email,
      password,
      username,
    }: {
      email: string;
      password: string;
      username: string;
    }) => signUp(email, password),
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

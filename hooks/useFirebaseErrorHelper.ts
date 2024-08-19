// src/utils/firebaseErrorHandler.ts

import { FirebaseError } from "firebase/app";
import { useToastController } from "@tamagui/toast";

type ErrorMessages = {
  [key: string]: string;
};

const errorMessages: ErrorMessages = {
  "auth/user-not-found": "No account found with this email address.",
  "auth/wrong-password": "Incorrect password. Please try again.",
  "auth/invalid-email": "Invalid email address. Please check and try again.",
  "auth/email-already-in-use":
    "This email is already registered. Try logging in instead.",
  "auth/weak-password":
    "Password is too weak. It should be at least 6 characters long.",
  "auth/operation-not-allowed":
    "This operation is not allowed. Please contact support.",
  "auth/account-exists-with-different-credential":
    "An account already exists with the same email but different sign-in credentials.",
  "auth/invalid-credential": "Wrong password or email. Could not log in.",
  "auth/invalid-verification-code":
    "Invalid verification code. Please try again.",
  "auth/invalid-verification-id":
    "Invalid verification ID. Please request a new verification code.",
  "auth/requires-recent-login":
    "This operation is sensitive and requires recent authentication. Please log in again.",
  // Add more error codes and messages as needed
};

export function useFirebaseErrorHandler() {
  const toast = useToastController();

  const handleFirebaseError = (error: unknown) => {
    if (error instanceof FirebaseError) {
      const errorCode = error.code;
      const errorMessage =
        errorMessages[errorCode] ||
        "An unexpected error occurred. Please try again.";

      toast.show("Error", {
        message: errorMessage,
        variant: "error",
        duration: 5000,
      });

      console.error(`Firebase Error (${errorCode}):`, error.message);
    } else if (error instanceof Error) {
      toast.show("Error", {
        message: error.message,
        variant: "error",
        duration: 5000,
      });

      console.error("Non-Firebase Error:", error.message);
    } else {
      toast.show("Error", {
        message: "An unexpected error occurred. Please try again.",
        variant: "error",
        duration: 5000,
      });

      console.error("Unknown Error:", error);
    }
  };

  return handleFirebaseError;
}

import { FirebaseError } from "firebase/app";

import { useToastController } from "@tamagui/toast";

type OperationType =
  // Auth Operations
  | "login"
  | "signup"
  | "resetPassword"
  | "verifyEmail"
  // Profile Operations
  | "changePassword"
  | "updatePushToken"
  | "removePushToken"
  | "updateUsername"
  | "deleteAccount"
  | "sendVerifyEmail"
  | "updateProfile"
  // Event Operations
  | "createEvent"
  | "updateEvent"
  | "deleteEvent"
  // Play Operations
  | "submitPlay"
  | "deletePlay";

const operationMessages: Record<
  OperationType,
  {
    error: string;
    success: string;
    info?: string;
  }
> = {
  // Auth Operations
  login: {
    error: "Couldn't log you in. Please try again.",
    success: "Successfully logged in. Welcome back!",
  },
  signup: {
    error: "Couldn't create your account. Please try again.",
    success: "Account created successfully. Welcome!",
    info: "Please verify your email address.",
  },
  resetPassword: {
    error: "Couldn't reset your password. Please try again.",
    success: "Password reset email sent.",
    info: "Check your email for instructions.",
  },
  verifyEmail: {
    error: "Couldn't verify your email. Please try again.",
    success: "Email verified successfully.",
  },

  // Profile Operations
  changePassword: {
    error: "Couldn't update your password. Please try again.",
    success: "Password updated successfully.",
    info: "You'll need to log in again with your new password.",
  },
  updatePushToken: {
    success: "Push notifications set up successfully",
    error: "Failed to set up push notifications",
  },
  removePushToken: {
    success: "Push notifications disabled",
    error: "Failed to disable push notifications",
  },
  updateUsername: {
    error: "Couldn't update your username. Please try again.",
    success: "Username updated successfully.",
  },
  deleteAccount: {
    error: "Couldn't delete your account. Please try again.",
    success: "Account deleted successfully.",
    info: "We're sorry to see you go.",
  },
  sendVerifyEmail: {
    error: "Couldn't send verification email. Please try again.",
    success: "Verification email sent.",
    info: "Please check your inbox and follow the instructions.",
  },
  updateProfile: {
    error: "Couldn't update your profile. Please try again.",
    success: "Profile updated successfully.",
  },

  // Event Operations
  createEvent: {
    error: "Couldn't create the event. Please try again.",
    success: "Event created successfully!",
  },
  updateEvent: {
    error: "Couldn't update the event. Please try again.",
    success: "Event updated successfully.",
  },
  deleteEvent: {
    error: "Couldn't delete the event. Please try again.",
    success: "Event deleted successfully.",
  },

  // Play Operations
  submitPlay: {
    error: "Couldn't submit your play. Please try again.",
    success: "Play submitted successfully!",
  },
  deletePlay: {
    error: "Couldn't delete your play. Please try again.",
    success: "Play deleted successfully.",
  },
};

const firebaseErrorMessages: Record<string, string> = {
  // Auth Errors
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
  "auth/email-already-verified": "Email is already verified.",
  "auth/invalid-user-token": "Your session has expired. Please log in again.",
  "auth/user-disabled":
    "This account has been disabled. Please contact support.",
  "auth/user-token-expired": "Your session has expired. Please log in again.",
  "auth/too-many-requests": "Too many attempts. Please try again later.",

  // Firestore Errors
  "permission-denied": "You don't have permission to perform this action.",
  "not-found": "The requested resource was not found.",
  "already-exists": "This resource already exists.",
  "resource-exhausted":
    "Request quota has been exceeded. Please try again later.",
  "failed-precondition": "Operation was rejected. Please try again.",
  unavailable: "Service is currently unavailable. Please try again later.",
};

const TOAST_TYPES = {
  error: "Error",
  success: "Success",
  info: "Info",
} as const;

type ToastType = keyof typeof TOAST_TYPES;

export function useOperationStatusHelper() {
  const toast = useToastController();

  const handleToastMessage = (
    error: unknown,
    operationType: OperationType,
    messageType: ToastType = "error",
    customMessage?: string
  ) => {
    let message =
      customMessage || "An unexpected error occurred. Please try again.";

    if (messageType === "error") {
      if (error instanceof FirebaseError) {
        message =
          firebaseErrorMessages[error.code] ||
          operationMessages[operationType].error;
        console.error(`Firebase Error (${error.code}):`, error.message);
      } else if (error instanceof Error) {
        message = error.message;
        console.error("Non-Firebase Error:", error.message);
      } else {
        message = operationMessages[operationType].error;
        console.error("Unknown Error:", error);
      }
    } else {
      message =
        customMessage ||
        operationMessages[operationType][messageType] ||
        message;
    }

    toast.show(TOAST_TYPES[messageType], {
      message,
      variant: messageType,
      duration: 5000,
    });

    return message;
  };

  return handleToastMessage;
}

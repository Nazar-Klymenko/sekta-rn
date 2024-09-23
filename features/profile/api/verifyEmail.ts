import { sendEmailVerification } from "firebase/auth";

import { auth } from "@/services/firebase";

export const sendVerificationEmail = async () => {
  const user = auth.currentUser;
  if (user && !user.emailVerified) {
    await sendEmailVerification(user);
    return "Verification email sent successfully";
  } else {
    throw new Error("No user found or email already verified");
  }
};

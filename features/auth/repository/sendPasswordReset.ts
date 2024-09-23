import { sendPasswordResetEmail } from "firebase/auth";

import { auth } from "@/services/firebase/firebase";

export const sendPasswordReset = async (email: string): Promise<void> => {
  await sendPasswordResetEmail(auth, email);
};

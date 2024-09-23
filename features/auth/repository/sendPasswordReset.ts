import { sendPasswordResetEmail } from "firebase/auth";

import { auth } from "@/shared/services/firebase";

export const sendPasswordReset = async (email: string): Promise<void> => {
  await sendPasswordResetEmail(auth, email);
};

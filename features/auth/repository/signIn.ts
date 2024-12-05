import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "@/lib/firebase/firebase";

export const signIn = async (email: string, password: string) => {
  await signInWithEmailAndPassword(auth, email, password);
};

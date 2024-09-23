import { User, signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "@/services/firebase/firebase";

export const signIn = async (
  email: string,
  password: string,
): Promise<User> => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password,
  );
  const token = await userCredential.user.getIdToken();
  return userCredential.user;
};

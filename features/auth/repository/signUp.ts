import { User, signInWithEmailAndPassword } from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions";

import { auth } from "@/services/firebase/firebase";

export const signUp = async (
  email: string,
  password: string,
  username: string,
  agreeTos: boolean,
  agreeEmail?: boolean,
): Promise<User> => {
  const functions = getFunctions();
  const createUserFunction = httpsCallable(functions, "createUser");

  await createUserFunction({
    email,
    password,
    username,
    agreeTos,
    agreeEmail,
  });

  // Sign in the user
  await signInWithEmailAndPassword(auth, email, password);

  // Store the user token
  const token = await auth.currentUser!.getIdToken();
  return auth.currentUser!;
};

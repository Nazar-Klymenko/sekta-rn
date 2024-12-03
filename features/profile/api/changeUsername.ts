import { getFunctions, httpsCallable } from "firebase/functions";

import { FirestoreUser } from "@/features/users/models/User";

export const changeUsername = async (
  newUsername: FirestoreUser["username"]
) => {
  const functions = getFunctions();
  const changeUsernameFunc = httpsCallable(functions, "updateUsername");
  return await changeUsernameFunc({ username: newUsername });
};

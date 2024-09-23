import { getFunctions, httpsCallable } from "firebase/functions";

export const updateUsername = async (newUsername: string) => {
  const functions = getFunctions();
  const updateUsernameFunc = httpsCallable(functions, "updateUsername");
  return await updateUsernameFunc({ username: newUsername });
};

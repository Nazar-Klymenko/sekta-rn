import { getFunctions, httpsCallable } from "firebase/functions";

export const changeUsername = async (newUsername: string) => {
  const functions = getFunctions();
  const changeUsernameFunc = httpsCallable(functions, "updateUsername");
  return await changeUsernameFunc({ username: newUsername });
};

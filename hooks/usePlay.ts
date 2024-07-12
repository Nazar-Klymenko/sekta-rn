import { FirebaseError } from "firebase/app";

import { submitPlayInfo } from "@/api/firestore";

import { useMutation, useQueryClient } from "react-query";

export const usePlaySubmission = () => {
  return useMutation<void, FirebaseError, PlayData, string>(
    "submitPlayInfo",
    async (data: PlayData) => {
      await submitPlayInfo(data);
    }
  );
};

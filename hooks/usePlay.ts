import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FirebaseError } from "firebase/app";

import { submitPlayInfo } from "@/api/firestore";

export const usePlaySubmission = () => {
  const queryClient = useQueryClient();

  return useMutation<void, FirebaseError, PlayData>({
    mutationFn: async (data: PlayData) => {
      await submitPlayInfo(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["playInfo"] });
    },
  });
};

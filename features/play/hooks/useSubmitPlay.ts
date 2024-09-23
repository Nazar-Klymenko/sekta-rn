import { useMutation, useQueryClient } from "@tanstack/react-query";

import { FirebaseError } from "firebase/app";

import { PlaySubmission } from "@/features/play/models/PlaySubmission";

import { submitPlay } from "../api/submitPlay";

export const useSubmitPlay = () => {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    FirebaseError,
    Omit<PlaySubmission, "id" | "submittedAt">
  >({
    mutationFn: async (data: Omit<PlaySubmission, "id" | "submittedAt">) => {
      await submitPlay(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["playInfo"] });
    },
  });
};

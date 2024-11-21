import { useMutation, useQueryClient } from "@tanstack/react-query";

import { FirebaseError } from "firebase/app";

import { useOperationStatusHelper } from "@/features/core/hooks/useOperationStatusHelper";
import { PlaySubmission } from "@/features/play/models/PlaySubmission";

import { submitPlay } from "../api/submitPlay";

export const useSubmitPlay = () => {
  const queryClient = useQueryClient();
  const handleToastMessage = useOperationStatusHelper();
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
      handleToastMessage(null, "submitPlay", "success");
    },
    onError: (error) => {
      handleToastMessage(error, "submitPlay", "error");
    },
  });
};

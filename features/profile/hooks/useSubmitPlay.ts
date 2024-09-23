import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FirebaseError } from "firebase/app";

import { PlayData } from "@/models/PlayData";

import { submitPlay } from "../api/submitPlay";

export const useSubmitPlay = () => {
  const queryClient = useQueryClient();

  return useMutation<void, FirebaseError, Omit<PlayData, "id" | "submittedAt">>(
    {
      mutationFn: async (data: Omit<PlayData, "id" | "submittedAt">) => {
        await submitPlay(data);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["playInfo"] });
      },
    },
  );
};

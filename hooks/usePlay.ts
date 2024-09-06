import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FirebaseError } from "firebase/app";

import {
  deletePlaySubmission,
  fetchPlaySubmissions,
  submitPlayInfo,
} from "@/api/play";
import { PlayData } from "@/models/PlayData";

export const usePlaySubmission = () => {
  const queryClient = useQueryClient();

  return useMutation<void, FirebaseError, Omit<PlayData, "id" | "submittedAt">>(
    {
      mutationFn: async (data: Omit<PlayData, "id" | "submittedAt">) => {
        await submitPlayInfo(data);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["playInfo"] });
      },
    },
  );
};

export const useFetchPlaySubmissions = () => {
  return useQuery<PlayData[], Error>({
    queryKey: ["playSubmissions"],
    queryFn: fetchPlaySubmissions,
  });
};
export const useDeletePlaySubmission = () => {
  const queryClient = useQueryClient();

  return useMutation<void, FirebaseError, string>({
    mutationFn: async (id: string) => {
      await deletePlaySubmission(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["playSubmissions"] });
    },
  });
};

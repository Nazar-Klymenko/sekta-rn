import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { FirebaseError } from "firebase/app";

import { deletePlaySubmission, fetchPlaySubmissions } from "@/shared/api/play";
import { PlayData } from "@/shared/models/PlayData";

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

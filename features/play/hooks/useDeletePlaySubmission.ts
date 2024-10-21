import { useMutation, useQueryClient } from "@tanstack/react-query";

import { FirebaseError } from "firebase/app";

import { deletePlaySubmission } from "../api/deletePlaySubmission";

export const useDeletePlaySubmission = () => {
  const queryClient = useQueryClient();

  return useMutation<void, FirebaseError, string>({
    mutationFn: async (id: string) => {
      await deletePlaySubmission(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["playSubmissions"] });
    },
    onError: (error) => {
      alert(error.message);
    },
  });
};

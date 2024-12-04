import { useMutation, useQueryClient } from "@tanstack/react-query";

import { FirebaseError } from "firebase/app";

import { useOperationStatusHelper } from "@/features/core/hooks/useOperationStatusHelper";

import { deletePlaySubmission } from "../api/deletePlaySubmission";

export const useDeletePlaySubmission = () => {
  const queryClient = useQueryClient();
  const handleToastMessage = useOperationStatusHelper();
  return useMutation<void, FirebaseError, string>({
    mutationFn: async (id: string) => {
      await deletePlaySubmission(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["playSubmissions"] });
      handleToastMessage(null, "deletePlay", "success");
    },
    onError: (error: Error) => {
      handleToastMessage(error, "deletePlay", "error");
    },
  });
};

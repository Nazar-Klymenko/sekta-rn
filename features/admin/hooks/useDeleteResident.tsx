import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useRouter } from "expo-router";

import { useOperationStatusHelper } from "@/features/core/hooks/useOperationStatusHelper";

import { deleteResident } from "../repository/deleteResident";

export const useDeleteResident = (id?: string) => {
  const queryClient = useQueryClient();
  const handleToastMessage = useOperationStatusHelper();
  const router = useRouter();

  return useMutation({
    mutationFn: deleteResident,
    onSuccess: () => {
      handleToastMessage(null, "deleteEvent", "success");
      queryClient.invalidateQueries({ queryKey: ["resident", id] });
      queryClient.invalidateQueries({ queryKey: ["allResidents"] });
      router.navigate(`/admin/residents`);
    },
    onError: (error: Error) => {
      handleToastMessage(error, "deleteEvent", "error");
    },
  });
};

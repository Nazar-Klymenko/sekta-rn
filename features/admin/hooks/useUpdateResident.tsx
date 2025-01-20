import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useRouter } from "expo-router";

import { useOperationStatusHelper } from "@/features/core/hooks/useOperationStatusHelper";

import { updateResident } from "../repository/updateResident";

export const useUpdateResident = (id?: string) => {
  const queryClient = useQueryClient();
  const handleToastMessage = useOperationStatusHelper();
  const router = useRouter();

  return useMutation({
    mutationFn: updateResident,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resident", id] });
      queryClient.invalidateQueries({ queryKey: ["allResidents"] });
      handleToastMessage(null, "updateEvent", "success");
      router.navigate(`/admin/residents`);
    },
    onError: (error: Error) => {
      handleToastMessage(error, "updateEvent", "error");
    },
  });
};

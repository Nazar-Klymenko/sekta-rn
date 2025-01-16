import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useOperationStatusHelper } from "@/features/core/hooks/useOperationStatusHelper";

import { updateEvent } from "../repository/updateEvent";
import { updateResident } from "../repository/updateResident";

export const useUpdateResident = (id?: string) => {
  const queryClient = useQueryClient();
  const handleToastMessage = useOperationStatusHelper();
  return useMutation({
    mutationFn: updateResident,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resident", id] });
      queryClient.invalidateQueries({ queryKey: ["allResidents"] });
      handleToastMessage(null, "updateEvent", "success");
    },
    onError: (error: Error) => {
      handleToastMessage(error, "updateEvent", "error");
    },
  });
};

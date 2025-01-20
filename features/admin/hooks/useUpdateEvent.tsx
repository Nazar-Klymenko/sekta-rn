import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useRouter } from "expo-router";

import { useOperationStatusHelper } from "@/features/core/hooks/useOperationStatusHelper";

import { updateEvent } from "../repository/updateEvent";

export const useUpdateEvent = (id?: string) => {
  const queryClient = useQueryClient();
  const handleToastMessage = useOperationStatusHelper();
  const router = useRouter();

  return useMutation({
    mutationFn: updateEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["paginatedEvents"] });
      queryClient.invalidateQueries({ queryKey: ["upcomingEvents"] });
      queryClient.invalidateQueries({ queryKey: ["event", id] });
      handleToastMessage(null, "updateEvent", "success");
      router.navigate(`/admin/events`);
    },
    onError: (error: Error) => {
      handleToastMessage(error, "updateEvent", "error");
    },
  });
};

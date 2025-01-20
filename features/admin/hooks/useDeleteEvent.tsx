import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useRouter } from "expo-router";

import { deleteEvent } from "@/features/admin/repository/deleteEvent";
import { useOperationStatusHelper } from "@/features/core/hooks/useOperationStatusHelper";

export const useDeleteEvent = (id?: string) => {
  const queryClient = useQueryClient();
  const handleToastMessage = useOperationStatusHelper();
  const router = useRouter();

  return useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      handleToastMessage(null, "deleteEvent", "success");
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["paginatedEvents"] });
      queryClient.invalidateQueries({ queryKey: ["upcomingEvents"] });
      queryClient.invalidateQueries({ queryKey: ["event", id] });
      router.navigate(`/admin/events`);
    },
    onError: (error: Error) => {
      handleToastMessage(error, "deleteEvent", "error");
    },
  });
};

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteEvent } from "@/features/admin/repository/deleteEvent";

import { useToastController } from "@tamagui/toast";

export const useDeleteEvent = (id?: string) => {
  const queryClient = useQueryClient();
  const toast = useToastController();

  return useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      toast.show("Success", {
        variant: "success",
        message: "Event deleted successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["paginatedEvents"] });
      queryClient.invalidateQueries({ queryKey: ["upcomingEvents"] });
      queryClient.invalidateQueries({ queryKey: ["event", id] });
    },
    onError: (error: Error) => {
      toast.show("Error", {
        variant: "error",
        message: error.message || "Failed to delete event. Please try again.",
      });
    },
  });
};

import { functions } from "@/lib/firebase/firebase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { httpsCallable } from "firebase/functions";

import { useOperationStatusHelper } from "@/features/core/hooks/useOperationStatusHelper";

import { updateEvent } from "../repository/updateEvent";

export const useUpdateEvent = (id?: string) => {
  const queryClient = useQueryClient();
  const handleToastMessage = useOperationStatusHelper();
  return useMutation({
    mutationFn: updateEvent,
    onSuccess: async ({ success, event }) => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["paginatedEvents"] });
      queryClient.invalidateQueries({ queryKey: ["upcomingEvents"] });
      queryClient.invalidateQueries({ queryKey: ["event", id] });
      handleToastMessage(null, "updateEvent", "success");
      const sendNotification = httpsCallable(
        functions,
        "actualBatchNotifications"
      );

      await sendNotification({
        title: "Event Update",
        body: `${event?.title.display} has been updated`,
        data: {
          eventId: event?.uid,
          type: "EVENT_UPDATE",
        },
      });
    },
    onError: (error: Error) => {
      handleToastMessage(error, "updateEvent", "error");
    },
  });
};

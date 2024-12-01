// hooks/useCreateEvent.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createEvent } from "@/features/admin/repository/createEvent";
import { EventForm } from "@/features/event/models/Event";

// Adjust the import path
import { useToastController } from "@tamagui/toast";

import { useRouter } from "expo-router";

export const useCreateEvent = () => {
  const queryClient = useQueryClient();
  const toast = useToastController();
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ data }: { data: EventForm }) => {
      return await createEvent(data);
    },
    onSuccess: (data) => {
      toast.show("Event created successfully!", { variant: "success" });
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["paginatedEvents"] });
      queryClient.invalidateQueries({ queryKey: ["upcomingEvents"] });
      router.replace(`/admin/events`);
    },
    onError: (error: Error) => {
      toast.show(error.message || "Failed to create event. Please try again.", {
        variant: "error",
      });
    },
  });
};

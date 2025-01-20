import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useRouter } from "expo-router";

import { createEvent } from "@/features/admin/repository/createEvent";
import { EventFormValues } from "@/features/admin/utils/schemas";
import { useOperationStatusHelper } from "@/features/core/hooks/useOperationStatusHelper";

export const useCreateEvent = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const handleToastMessage = useOperationStatusHelper();
  return useMutation({
    mutationFn: async ({ data }: { data: EventFormValues }) => {
      return await createEvent(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["paginatedEvents"] });
      queryClient.invalidateQueries({ queryKey: ["upcomingEvents"] });
      handleToastMessage(null, "createEvent", "success");
      router.navigate(`/admin/events`);
    },
    onError: (error: Error) => {
      handleToastMessage(error, "createEvent", "error");
    },
  });
};

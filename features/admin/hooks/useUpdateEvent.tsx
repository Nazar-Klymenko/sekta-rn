import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateEvent } from "../repository/updateEvent";

export const useUpdateEvent = (id?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["event", id] });
    },
  });
};

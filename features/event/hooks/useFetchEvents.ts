import { useQuery } from "@tanstack/react-query";

import { DisplayEvent } from "@/features/event/models/Event";

import { fetchEvents } from "../repository/fetchEvents";

export const useFetchEvents = (sortDirection: "asc" | "desc" = "desc") => {
  return useQuery<DisplayEvent[], Error>({
    queryKey: ["events"],
    queryFn: () => fetchEvents(sortDirection),
  });
};

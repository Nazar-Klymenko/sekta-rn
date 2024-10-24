import { useQuery } from "@tanstack/react-query";

import { Event } from "@/features/event/models/Event";

import { fetchEvents } from "../repository/fetchEvents";

export const useFetchEvents = (sortDirection: "asc" | "desc" = "desc") => {
  return useQuery<Event[], Error>({
    queryKey: ["events"],
    queryFn: () => fetchEvents(sortDirection),
  });
};

import { useQuery } from "@tanstack/react-query";

import { Event } from "../models/Event";
import { fetchEvent } from "../repository/fetchEvent";

export const useFetchEvent = (id: string) => {
  return useQuery<Event, Error>({
    queryKey: ["event", id],
    queryFn: () => fetchEvent(id),
  });
};

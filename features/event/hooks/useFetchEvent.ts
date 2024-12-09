import { useQuery } from "@tanstack/react-query";

import { DisplayEvent } from "../models/Event";
import { fetchEvent } from "../repository/fetchEvent";

export const useFetchEvent = (id: string) => {
  return useQuery<DisplayEvent, Error>({
    queryKey: ["event", id],
    queryFn: () => fetchEvent(id),
  });
};

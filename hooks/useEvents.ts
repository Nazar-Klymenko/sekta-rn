// src/hooks/useEvents.ts
import { fetchEventById, fetchEvents } from "@/api/events";
import { Event } from "@/models/Event";

import { useQuery } from "react-query";

export const useEvents = () => {
  return useQuery<Event[], Error>("events", fetchEvents);
};

export const useEvent = (id: string) => {
  return useQuery<Event, Error>(["event", id], () => fetchEventById(id), {
    enabled: !!id,
  });
};

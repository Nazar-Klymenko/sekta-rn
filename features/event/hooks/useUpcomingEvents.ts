import {
  InfiniteData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";

import { Event } from "@/features/event/models/Event";

import {
  upcomingEvents,
  upcomingEventsPreview,
} from "../repository/upcomingEvents";

const ITEMS_PER_PAGE = 5;

export const useUpcomingEventsPreview = (count: number = 3) => {
  return useQuery<Event[], Error>({
    queryKey: ["upcomingEventsPreview", count],
    queryFn: () => upcomingEventsPreview(count),
  });
};
export const useUpcomingEvents = () => {
  return useInfiniteQuery<
    Event[],
    Error,
    InfiniteData<Event[]>,
    ["upcomingEvents"],
    number
  >({
    queryKey: ["upcomingEvents"],
    queryFn: async ({ pageParam = 0 }) => {
      return upcomingEvents(pageParam, ITEMS_PER_PAGE);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === ITEMS_PER_PAGE ? allPages.length : undefined;
    },
  });
};

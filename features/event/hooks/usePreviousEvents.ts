import {
  InfiniteData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";

import { Event } from "@/features/event/models/Event";

import {
  previousEvents,
  previousEventsPreview,
} from "../repository/previousEvents";

const ITEMS_PER_PAGE = 5;

// For previews (limited events)
export const usePreviousEventsPreview = (count: number = 4) => {
  return useQuery<Event[], Error>({
    queryKey: ["previousEventsPreview", count],
    queryFn: () => previousEventsPreview(count),
  });
};

// For paginated events (no limit)
export const usePreviousEvents = () => {
  return useInfiniteQuery<
    Event[],
    Error,
    InfiniteData<Event[]>,
    ["previousEvents"],
    number
  >({
    queryKey: ["previousEvents"],
    queryFn: async ({ pageParam = 0 }) => {
      return previousEvents(pageParam, ITEMS_PER_PAGE);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === ITEMS_PER_PAGE ? allPages.length : undefined;
    },
  });
};

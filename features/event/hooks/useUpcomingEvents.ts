import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";

import { DisplayEvent } from "@/features/event/models/Event";

import { upcomingEvents } from "../repository/upcomingEvents";

const ITEMS_PER_PAGE = 5;

export const useUpcomingEvents = () => {
  return useInfiniteQuery<
    DisplayEvent[],
    Error,
    InfiniteData<DisplayEvent[]>,
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

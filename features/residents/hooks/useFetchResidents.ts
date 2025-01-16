import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";

import { DisplayResident } from "../models/Resident";
import { fetchResidents } from "../repository/fetchResidents";

const ITEMS_PER_PAGE = 5;

export const useFetchResidents = () => {
  return useInfiniteQuery<
    DisplayResident[],
    Error,
    InfiniteData<DisplayResident[]>,
    ["residents"],
    number
  >({
    queryKey: ["residents"],
    queryFn: async ({ pageParam = 0 }) => {
      return fetchResidents(pageParam, ITEMS_PER_PAGE);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === ITEMS_PER_PAGE ? allPages.length : undefined;
    },
  });
};

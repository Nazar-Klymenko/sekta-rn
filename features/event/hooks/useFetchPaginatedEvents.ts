// useEvents.ts
import { useQuery } from "@tanstack/react-query";

import { useState } from "react";

import { Event } from "@/features/event/models/Event";

import { fetchPaginatedEvents } from "../repository/fetchPaginatedEvents";

const ITEMS_PER_PAGE = 5;

export const useFetchPaginatedEvents = () => {
  const [currentPage, setCurrentPage] = useState<string | null>(null);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");

  const { data, isLoading, isError, refetch } = useQuery<Event[], Error>({
    queryKey: ["paginatedEvents", currentPage, direction],
    queryFn: () => fetchPaginatedEvents(currentPage, ITEMS_PER_PAGE, direction),
  });

  const goToNextPage = () => {
    if (data && data.length > 0) {
      setCurrentPage(data[data.length - 1].id);
      setDirection("forward");
      refetch();
    }
  };

  const goToPreviousPage = () => {
    if (data && data.length > 0) {
      setCurrentPage(data[0].id);
      setDirection("backward");
      refetch();
    }
  };

  return {
    data,
    isLoading,
    isError,
    goToNextPage,
    goToPreviousPage,
    hasNextPage: data ? data.length === ITEMS_PER_PAGE : false,
    hasPreviousPage: !!currentPage,
  };
};

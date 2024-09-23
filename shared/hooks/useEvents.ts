// useEvents.ts
import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { useState } from "react";

import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { Event } from "@/features/event/models/Event";
import {
  fetchAllEvents,
  fetchLikedEvents,
  fetchLikedEventsId,
  fetchPaginatedEvents,
} from "@/shared/api/events";
import { db } from "@/shared/services/firebase";

import { useAuth } from "./useAuth";

const ITEMS_PER_PAGE = 5;

export const useAllEvents = () => {
  return useQuery<Event[], Error>({
    queryKey: ["allEvents"],
    queryFn: fetchAllEvents,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const usePaginatedEvents = () => {
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

export const useFavoriteEventsList = () => {
  const { user } = useAuth();

  return useQuery<Event[], Error>({
    queryKey: ["likedEvents", user?.uid],
    queryFn: () => fetchLikedEvents(user!.uid),
    enabled: !!user,
    staleTime: 5 * 1000,
  });
};

export const useFavoriteEventsId = () => {
  const { user } = useAuth();

  return useQuery<string[], Error>({
    queryKey: ["likedEventsId", user?.uid],
    queryFn: () => fetchLikedEventsId(user!.uid),
    enabled: !!user,
    staleTime: 5 * 1000,
  });
};

export const useToggleEventLike = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation<boolean, Error, { eventId: string; isLiked: boolean }>({
    mutationFn: async ({ eventId, isLiked }) => {
      if (!user) throw new Error("User not authenticated");

      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        likedEvents: isLiked ? arrayRemove(eventId) : arrayUnion(eventId),
      });

      return !isLiked;
    },
    onSuccess: (_) => {
      queryClient.invalidateQueries({ queryKey: ["likedEvents"] });
      queryClient.invalidateQueries({ queryKey: ["likedEventsId"] });
    },
  });
};

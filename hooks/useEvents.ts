// useEvents.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import {
  fetchEventById,
  fetchEvents,
  fetchLikedEvents,
  fetchLikedEventsId,
} from "@/api/events";
import { Event } from "@/models/Event";
import { db } from "@/services/firebase";

import { useAuth } from "./useAuth";

export const useEvents = () => {
  return useQuery<Event[], Error>({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });
};

export const useEvent = (id: string) => {
  return useQuery<Event, Error>({
    queryKey: ["event", id],
    queryFn: () => fetchEventById(id),
    enabled: !!id,
  });
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

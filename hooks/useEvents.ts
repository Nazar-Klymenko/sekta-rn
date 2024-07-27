// src/hooks/useEvents.ts
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { fetchEventById, fetchEvents, fetchLikedEvents } from "@/api/events";
import { Event } from "@/models/Event";
import { db } from "@/services/firebase";

import { useMutation, useQuery, useQueryClient } from "react-query";

import { useAuth } from "./useAuth";

export const useEvents = () => {
  return useQuery<Event[], Error>("events", fetchEvents);
};

export const useEvent = (id: string) => {
  return useQuery<Event, Error>(["event", id], () => fetchEventById(id), {
    enabled: !!id,
  });
};
export const useEventCollection = () => {
  const { user } = useAuth();

  return useQuery(
    ["userCollection", user?.uid],
    async () => {
      if (!user) return null;
      const userDoc = await getDoc(doc(db, "users", user.uid));
      return userDoc.data()?.likedEvents || [];
    },
    {
      enabled: !!user,
    }
  );
};
export const useAddEventToCollection = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { data: likedEvents } = useEventCollection();

  return useMutation(
    async (eventId: string) => {
      if (!user) throw new Error("User not authenticated");

      const userRef = doc(db, "users", user.uid);
      const isLiked = likedEvents?.includes(eventId);

      if (isLiked) {
        await setDoc(
          userRef,
          { likedEvents: arrayRemove(eventId) },
          { merge: true }
        );
      } else {
        await setDoc(
          userRef,
          { likedEvents: arrayUnion(eventId) },
          { merge: true }
        );
      }

      return !isLiked;
    },
    {
      onSuccess: (_, eventId) => {
        queryClient.invalidateQueries("userCollection");
        queryClient.invalidateQueries(["event", eventId]);
        queryClient.invalidateQueries("likedEvents");
      },
    }
  );
};
export const useFavoriteEvents = () => {
  const { user } = useAuth();

  return useQuery<Event[], Error>(
    ["likedEvents", user?.uid],
    () => fetchLikedEvents(user!.uid),
    {
      enabled: !!user,
      staleTime: 5 * 1000,
    }
  );
};
export const useUserLikedEvents = () => {
  const { user } = useAuth();

  return useQuery(
    ["userLikedEvents", user?.uid],
    async () => {
      if (!user) return [];
      const userDoc = await getDoc(doc(db, "users", user.uid));
      return userDoc.data()?.likedEvents || [];
    },
    {
      enabled: !!user,
    }
  );
};
export const useToggleEventLike = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation(
    async ({ eventId, isLiked }: { eventId: string; isLiked: boolean }) => {
      if (!user) throw new Error("User not authenticated");

      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        likedEvents: isLiked ? arrayRemove(eventId) : arrayUnion(eventId),
      });

      return !isLiked;
    },
    {
      onSuccess: (_, { eventId }) => {
        queryClient.invalidateQueries("userCollection");
        queryClient.invalidateQueries(["event", eventId]);
        queryClient.invalidateQueries("likedEvents");
      },
    }
  );
};

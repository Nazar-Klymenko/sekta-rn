// src/hooks/useEvents.ts
import { arrayUnion, doc, setDoc } from "firebase/firestore";

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
export const useAddEventToCollection = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation(
    async (eventId: string) => {
      if (!user) throw new Error("User not authenticated");

      const userRef = doc(db, "users", user.uid);
      await setDoc(
        userRef,
        { likedEvents: arrayUnion(eventId) },
        { merge: true }
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("userCollection");
      },
    }
  );
};
export const useLikedEvents = () => {
  const { user } = useAuth();

  return useQuery<Event[], Error>(
    ["likedEvents", user?.uid],
    () => fetchLikedEvents(user!.uid),
    {
      enabled: !!user,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );
};

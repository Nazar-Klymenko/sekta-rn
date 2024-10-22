import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { Alert } from "react-native";

import { useFetchEvent } from "@/features/event/hooks/useFetchEvent";
import { Event, EventFormData } from "@/features/event/models/Event";
import { db, storage } from "@/lib/firebase/firebase";

import { useToastController } from "@tamagui/toast";

import { useRouter } from "expo-router";

export function useEventOperations(eventId: string) {
  const { data: event, isError, isLoading } = useFetchEvent(eventId);
  const router = useRouter();
  const toast = useToastController();

  const deleteEvent = async () => {
    if (!eventId) {
      Alert.alert("Error", "No event to delete");
      return;
    }

    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this event?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteDoc(doc(db, "events", eventId));
              Alert.alert("Success", "Event deleted successfully!");
              router.back();
            } catch (error) {
              console.error("Error deleting event:", error);
              Alert.alert("Error", "Failed to delete event. Please try again.");
            }
          },
        },
      ],
    );
  };

  const duplicateEvent = async () => {
    if (!eventId) {
      Alert.alert("Error", "No event to duplicate");
      return;
    }

    try {
      const eventDoc = await getDoc(doc(db, "events", eventId));
      if (eventDoc.exists()) {
        const eventData = eventDoc.data() as Event;
        const newEventData: Omit<Event, "id"> = {
          ...eventData,
          title: `Copy of ${eventData.title}`,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
          attendeeCount: 0,
        };

        const docRef = await addDoc(collection(db, "events"), newEventData);
        toast.show("Success", {
          message: "Event duplicated successfully!",
          variant: "success",
        });
      }
    } catch (error) {
      console.error("Error duplicating event:", error);
      Alert.alert("Error", "Failed to duplicate event. Please try again.");
    }
  };

  const updateEvent = async (data: EventFormData, image: string | null) => {
    if (!image) {
      Alert.alert("Error", "Please select an image");
      return;
    }

    try {
      const imageRef = ref(storage, `events/${Date.now()}`);
      const response = await fetch(image);
      const blob = await response.blob();
      await uploadBytes(imageRef, blob);
      const imageUrl = await getDownloadURL(imageRef);

      const eventData: Omit<Event, "id"> = {
        title: data.title,
        title_lowercase: data.title?.toLowerCase() ?? "",
        caption: data.caption,
        price: data.price,
        date: Timestamp.fromDate(new Date(data.date as unknown as string)),
        location: data.location ?? "Cracow, Nowa 3",
        genres: data.genres ?? [],
        lineup: data.lineup ?? [],
        image: {
          id: imageRef.name,
          publicUrl: imageUrl,
          path: imageRef.fullPath,
          altText: data.title,
        },
        attendeeCount: 0,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        deletedAt: null,
        metadata: {},
      };

      await updateDoc(doc(db, "events", eventId!), eventData);
      Alert.alert("Success", "Event updated successfully!");
    } catch (error) {
      console.error("Error adding document: ", error);
      Alert.alert("Error", "Failed to update event. Please try again.");
    }
  };

  return {
    event,
    isLoading,
    isError,
    deleteEvent,
    duplicateEvent,
    updateEvent,
  };
}

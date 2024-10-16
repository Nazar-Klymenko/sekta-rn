import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

import React, { useEffect, useState } from "react";

import { Timestamp, addDoc, collection, deleteDoc } from "firebase/firestore";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { Alert } from "react-native";

import { FullPageLoading } from "@/features/core/components/layout/FullPageLoading";
import { PageContainer } from "@/features/core/components/layout/PageContainer";
import { Event } from "@/features/event/models/Event";
import { db, storage } from "@/lib/firebase/firebase";

import { useToastController } from "@tamagui/toast";

import {
  Button,
  Form,
  Input,
  Label,
  Paragraph,
  TextArea,
  YStack,
} from "tamagui";

import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams } from "expo-router";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import { CustomImagePicker } from "./ImagePicker";
import PillInput from "./PillInput";

export const eventSchema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters"),
  caption: yup
    .string()
    .max(1500, "Caption must not exceed 1500 characters")
    .required("Caption is required"),

  date: yup.date().required("Date is required"),
  location: yup.string(),

  price: yup
    .number()
    .min(0, "Price must be non-negative")
    .required("Price is required"),

  genres: yup.array().of(yup.string().required()).defined(),
  lineup: yup.array().of(yup.string().required()).defined(),
});

type FormData = {
  title: string;
  caption: string;

  date: Date;
  location?: string;

  price: number;

  genres: string[] | [];
  lineup: string[] | [];
};

export default function EventCreateScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const toast = useToastController();
  const params = useLocalSearchParams();
  const eventId = params.id as string | undefined;
  const onDateChange = (
    _: DateTimePickerEvent,
    selectedDate: Date | undefined,
  ) => {
    if (selectedDate) {
      setShow(false);
      setValue("date", selectedDate, { shouldValidate: true });
    }
  };

  useEffect(() => {
    if (eventId) {
      setIsEditMode(true);
      fetchEventData(eventId);
    }
  }, [eventId]);

  const [show, setShow] = useState(false);

  const router = useRouter();
  const now = Timestamp.now();

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(eventSchema),
    defaultValues: {
      price: 20,
      date: now.toDate(),
    },
  });

  const requestMediaLibraryPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission required",
        "Sorry, we need camera roll permissions to make this work!",
      );
    }
  };

  const pickImage = async () => {
    await requestMediaLibraryPermissions();
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Failed to pick image. Please try again.");
    }
  };

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
        // Alert.alert("Success", "Event duplicated successfully!");
        toast.show("Success", {
          message: "Event duplicated successfully!",
          variant: "success",
        });
        // router.navigate({
        //   pathname: "/events/[id]",
        //   params: { id: docRef.id },
        // });
      }
    } catch (error) {
      console.error("Error duplicating event:", error);
      Alert.alert("Error", "Failed to duplicate event. Please try again.");
    }
  };

  const fetchEventData = async (id: string) => {
    setIsLoading(true);
    try {
      const eventDoc = await getDoc(doc(db, "events", id));
      if (eventDoc.exists()) {
        const eventData = eventDoc.data() as Event;
        reset({
          title: eventData.title,
          caption: eventData.caption,
          date: eventData.date.toDate(),
          location: eventData.location,
          price: eventData.price,
          genres: eventData.genres,
          lineup: eventData.lineup,
        });
        setImage(eventData.image.publicUrl);
      } else {
        Alert.alert("Error", "Event not found");
        router.back();
      }
    } catch (error) {
      console.error("Error fetching event:", error);
      Alert.alert("Error", "Failed to fetch event data");
    }
    setIsLoading(false);
  };

  const onSubmit = async (data: FormData) => {
    if (!image) {
      Alert.alert("Error", "Please select an image");
      return;
    }

    try {
      // Upload image
      const imageRef = ref(storage, `events/${Date.now()}`);
      const response = await fetch(image);
      const blob = await response.blob();
      await uploadBytes(imageRef, blob);
      const imageUrl = await getDownloadURL(imageRef);

      const eventData: Omit<Event, "id"> = {
        ...data,
        title_lowercase: data.title?.toLowerCase() ?? "",
        date: Timestamp.fromDate(new Date(data.date as unknown as string)),
        location: data.location ?? "Cracow, Nowa 3",
        genres: data.genres ?? [],
        lineup: data.lineup ?? [],
        image: {
          id: imageRef.name,
          publicUrl: imageUrl,
          path: imageRef.fullPath,
          altText: data.title, // Using title as alt text
        },
        attendeeCount: 0,
        createdAt: now,
        updatedAt: now,
        deletedAt: null,
        metadata: {}, // Empty object for now, can be used for custom fields later
      };

      if (isEditMode) {
        await updateDoc(doc(db, "events", eventId!), eventData);
        Alert.alert("Success", "Event updated successfully!");
      } else {
        const docRef = await addDoc(collection(db, "events"), eventData);
        Alert.alert("Success", "Event created successfully!");
        router.navigate({
          pathname: "/events/[id]",
          params: { id: docRef.id },
        });
      }
    } catch (error) {
      console.error("Error adding document: ", error);
      Alert.alert("Error", "Failed to create event. Please try again.");
    }
  };

  if (isLoading) return <FullPageLoading />;

  return (
    <PageContainer>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <YStack>
          <CustomImagePicker onPress={pickImage} image={image} />
          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
                {errors.title && <Paragraph>{errors.title.message}</Paragraph>}
              </>
            )}
          />

          <Controller
            control={control}
            name="caption"
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <Label>Caption</Label>
                <Input
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  verticalAlign="top"
                  multiline
                  rows={6}
                />
                {errors.caption && (
                  <Paragraph>{errors.caption.message}</Paragraph>
                )}
              </>
            )}
          />
          <Controller
            control={control}
            name="date"
            render={({ field: { value } }) => (
              <>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  value={value.toLocaleDateString()}
                  onPress={() => setShow(true)}
                />
                {show && (
                  <DateTimePicker
                    value={value}
                    mode="date"
                    is24Hour={true}
                    onChange={onDateChange}
                  />
                )}
                {errors.date && <Paragraph>{errors.date.message}</Paragraph>}
              </>
            )}
          />
          <Controller
            control={control}
            name="location"
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
                {errors.location && (
                  <Paragraph>{errors.location.message}</Paragraph>
                )}
              </>
            )}
          />
          <Controller
            control={control}
            name="price"
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  value={value?.toString()}
                  onChangeText={(text) => onChange(parseFloat(text) || 0)}
                  onBlur={onBlur}
                  keyboardType="numeric"
                />
                {errors.price && <Paragraph>{errors.price.message}</Paragraph>}
              </>
            )}
          />
          <Controller
            control={control}
            name="genres"
            render={({ field: { onChange, value } }) => (
              <>
                <Label htmlFor="genres">Genres</Label>
                <PillInput
                  value={value || []}
                  onChange={onChange}
                  error={errors.genres?.message}
                  placeholder="Enter genre"
                  addLabel="Add Genre"
                  editLabel="Edit Genre"
                />
              </>
            )}
          />
          <Controller
            control={control}
            name="lineup"
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <Label htmlFor="lineup">Lineup</Label>
                <PillInput
                  value={value || []}
                  onChange={onChange}
                  error={errors.lineup?.message}
                  placeholder="Enter dj"
                  addLabel="Add DJ"
                  editLabel="Edit DJ"
                />
              </>
            )}
          />
          <Form.Trigger asChild>
            <Button>{isEditMode ? "Update Event" : "Create Event"}</Button>
          </Form.Trigger>
          {isEditMode && (
            <>
              <Button onPress={deleteEvent}>Delete Event</Button>
              <Button onPress={duplicateEvent}>Duplicate Event</Button>
            </>
          )}
        </YStack>
      </Form>
    </PageContainer>
  );
}

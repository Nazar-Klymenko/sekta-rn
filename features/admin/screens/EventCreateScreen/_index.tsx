import DateTimePicker from "@react-native-community/datetimepicker";

import React, { useState } from "react";

import { Timestamp, addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { Alert } from "react-native";

import { PageContainer } from "@/features/core/components/layout/PageContainer";
import { Event } from "@/features/event/models/Event";
import { db, storage } from "@/lib/firebase/firebase";

import { Button, Form, Input, Label, Paragraph, YStack } from "tamagui";

import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import { CustomImagePicker } from "./ImagePicker";

// Define your validation schema
export const eventSchema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters"),
  caption: yup
    .string()
    .max(200, "Caption must not exceed 200 characters")
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

export type FormData = {
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
  const [date, setDate] = useState(new Date());

  const [show, setShow] = useState(false);

  const router = useRouter();
  const now = Timestamp.now();

  const {
    control,
    handleSubmit,
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

      const newEvent: Omit<Event, "id"> = {
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

      await addDoc(collection(db, "events"), newEvent);

      Alert.alert("Success", "Event created successfully!");
      router.back();
    } catch (error) {
      console.error("Error adding document: ", error);
      Alert.alert("Error", "Failed to create event. Please try again.");
    }
  };
  const [value, setValue] = useState("");
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
                <Label htmlFor="caption">Caption</Label>
                <Input
                  id="caption"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
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
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  value={value.toLocaleDateString()}
                  onPress={() => setShow(true)}
                />
                {show && (
                  <DateTimePicker
                    value={date}
                    mode="date"
                    is24Hour={true}
                    onChange={onChange}
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
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <Label htmlFor="genres">Genres (comma-separated)</Label>
                <Input
                  id="genres"
                  value={value?.join(", ")}
                  onChangeText={(text) =>
                    onChange(text.split(",").map((g) => g.trim()))
                  }
                  onBlur={onBlur}
                />
                {errors.genres && (
                  <Paragraph>{errors.genres.message}</Paragraph>
                )}
              </>
            )}
          />
          <Controller
            control={control}
            name="lineup"
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <Label htmlFor="lineup">Lineup (comma-separated)</Label>
                <Input
                  id="lineup"
                  value={value?.join(", ")}
                  onChangeText={(text) =>
                    onChange(text.split(",").map((l) => l.trim()))
                  }
                  onBlur={onBlur}
                />
                {errors.lineup && (
                  <Paragraph>{errors.lineup.message}</Paragraph>
                )}
              </>
            )}
          />
          <Form.Trigger asChild>
            <Button>Create Event</Button>
          </Form.Trigger>
        </YStack>
      </Form>
    </PageContainer>
  );
}

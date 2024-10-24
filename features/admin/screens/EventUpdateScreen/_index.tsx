import React, { useEffect } from "react";

import { Alert } from "react-native";

import { ButtonCTA } from "@/features/core/components/buttons/ButtonCTA";
import { DateInput } from "@/features/core/components/form/DateInput";
import { Form } from "@/features/core/components/form/Form";
import { Input } from "@/features/core/components/form/Input";
import { MultiTagInput } from "@/features/core/components/form/MultiTagInput";
import { TextArea } from "@/features/core/components/form/TextArea";
import { FullPageLoading } from "@/features/core/components/layout/FullPageLoading";
import { PageContainer } from "@/features/core/components/layout/PageContainer";
import { useFetchEvent } from "@/features/event/hooks/useFetchEvent";
import { EventFormData } from "@/features/event/models/Event";

import { Calendar } from "@tamagui/lucide-icons";
import { useToastController } from "@tamagui/toast";

import { useLocalSearchParams, useRouter } from "expo-router";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import { CustomImagePicker } from "../../components/events/ImagePicker";
import { useImagePicker } from "../../hooks/useImagePicker";
import { useUpdateEvent } from "../../hooks/useUpdateEvent";
import {
  DEFAULT_DATE,
  DEFAULT_LOCATION,
  DEFAULT_PRICE,
} from "../../utils/constants";
import { eventSchema } from "../../utils/schemas";

export default function EventUpdateScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: event, isLoading, isError, error } = useFetchEvent(id || "");
  const toast = useToastController();
  const { mutateAsync, isPending } = useUpdateEvent(id);
  const router = useRouter();
  const methods = useForm<EventFormData>({
    resolver: yupResolver(eventSchema),
    defaultValues: {
      title: event?.title || "",
      caption: event?.caption || "",
      location: event?.location || DEFAULT_LOCATION,
      date: event?.date.toDate() || DEFAULT_DATE,
      genres: event?.genres || [],
      lineup: event?.lineup || [],
      price: event?.price || DEFAULT_PRICE,
    },
  });
  const { handleSubmit, setValue, reset } = methods;

  const { image, setImage, pickImage } = useImagePicker();

  useEffect(() => {
    if (!isLoading && event) {
      setImage(event.image.publicUrl);
      reset({ ...event, date: event.date.toDate() });
    }
  }, [isLoading]);

  const onSubmit = async (data: EventFormData) => {
    if (!event) return;

    if (!image) {
      Alert.alert("Error", "Please select an image");
      return;
    }

    await mutateAsync(
      {
        eventId: id,
        data,
        image,
        originalData: event,
      },
      {
        onSuccess: () => {
          toast.show("Success", {
            variant: "success",
            message: "Event updated successfully!",
          });
          router.back();
        },
        onError: () => {
          toast.show("Error", {
            variant: "error",
            message: "Failed to update event. Please try again.",
          });
        },
      }
    );
  };

  if (isLoading) return <FullPageLoading />;

  return (
    <PageContainer>
      <Form methods={methods}>
        <CustomImagePicker onPress={pickImage} image={image} />
        <Input
          id="event-title"
          name="title"
          label="Event title"
          placeholder="Title"
        />
        <TextArea
          id="event-caption"
          name="caption"
          label="Event caption"
          placeholder="Caption"
          rows={6}
          verticalAlign="top"
          maxLength={1000}
          multiline
        />

        <DateInput
          name="date"
          label="Event date"
          id="event-date"
          placeholder="Select date"
          icon={Calendar}
          mode="datetime"
          minimumDate={new Date(1900, 0, 1)}
        />
        <Input
          id="event-location"
          name="location"
          label="Event location"
          placeholder="Nowa 3/3, Kraków"
        />

        <MultiTagInput
          name={"genres"}
          label={"Select genres"}
          id={"event-genres"}
          placeholder={"type a genre and press enter"}
        />
        <MultiTagInput
          name={"lineup"}
          label={"Select Artists"}
          id={"event-lineup"}
          placeholder={"type an artist name and press enter"}
        />
        <Input
          id="event-price"
          name="price"
          label="Entrance price"
          placeholder="30.00"
          inputMode="numeric"
          leftAdornment="PLN"
          keyboardType="numeric"
        />

        <ButtonCTA
          theme="accent"
          disabled={isPending}
          isLoading={isPending}
          onPress={handleSubmit(onSubmit)}
        >
          Next: Publish update
        </ButtonCTA>
      </Form>
    </PageContainer>
  );
}

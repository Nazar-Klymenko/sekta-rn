import React from "react";

import { ButtonCTA } from "@/features/core/components/buttons/ButtonCTA";
import { DateInput } from "@/features/core/components/form/DateInput";
import { Form } from "@/features/core/components/form/Form";
import { ImagePicker } from "@/features/core/components/form/ImagePicker";
import { Input } from "@/features/core/components/form/Input";
import { MultiTagInput } from "@/features/core/components/form/MultiTagInput";
import { TextArea } from "@/features/core/components/form/TextArea";
import { FullPageLoading } from "@/features/core/components/layout/FullPageLoading";
import { PageContainer } from "@/features/core/components/layout/PageContainer";
import { useFetchEvent } from "@/features/event/hooks/useFetchEvent";
import { EventForm } from "@/features/event/models/Event";

import { Calendar } from "@tamagui/lucide-icons";
import { useToastController } from "@tamagui/toast";

import { Text } from "tamagui";

import { useLocalSearchParams, useRouter } from "expo-router";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import { useUpdateEvent } from "../../hooks/useUpdateEvent";
import { eventSchema } from "../../utils/schemas";

export default function EventUpdateScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: event, isLoading, isError, error } = useFetchEvent(id || "");
  const toast = useToastController();
  const { mutate, isPending } = useUpdateEvent(id);
  const router = useRouter();
  const defaultValues = { ...(event || eventSchema.getDefault()) };
  const methods = useForm<EventForm>({
    resolver: yupResolver(eventSchema),
    defaultValues: {
      ...defaultValues,
      image: {
        uri: event?.image.publicUrl,
      },
      date: event?.date.toDate(),
    },
  });
  const { watch, handleSubmit } = methods;

  const onSubmit = async (data: EventForm) => {
    mutate(
      {
        eventId: id,
        data,
        originalData: event || null,
      },
      {
        onSuccess: () => {
          toast.show("Success", {
            variant: "success",
            message: "Event updated successfully!",
          });
          router.back();
        },
        onError: (error) => {
          console.warn(error);
          toast.show("Error", {
            variant: "error",
            message: "Failed to update event. Please try again.",
          });
        },
      }
    );
  };

  if (isLoading) return <FullPageLoading />;
  let img = watch("image");
  return (
    <PageContainer>
      <Form methods={methods}>
        <ImagePicker
          name="image"
          label="Event Image"
          placeholder="Tap to select event image"
        />
        <Text>{img.uri.toString()}</Text>
        <Input name="title" label="Event title" placeholder="Title" />
        <TextArea
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
          placeholder="Select date"
          icon={Calendar}
          mode="datetime"
          minimumDate={new Date(1900, 0, 1)}
        />
        <Input
          name="location"
          label="Event location"
          placeholder="Nowa 3/3, Kraków"
        />

        <MultiTagInput
          name={"genres"}
          label={"Select genres"}
          placeholder={"type a genre and press enter"}
        />
        <MultiTagInput
          name={"lineup"}
          label={"Select Artists"}
          placeholder={"type an artist name and press enter"}
        />
        <Input
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

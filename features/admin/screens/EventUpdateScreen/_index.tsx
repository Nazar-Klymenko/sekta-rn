import React from "react";

import { useLocalSearchParams } from "expo-router";
import { useForm } from "react-hook-form";

import { Calendar } from "@tamagui/lucide-icons";

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

import { yupResolver } from "@hookform/resolvers/yup";

import { useUpdateEvent } from "../../hooks/useUpdateEvent";
import { EventFormValues, eventSchema } from "../../utils/schemas";

export default function EventUpdateScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: event, isLoading } = useFetchEvent(id || "");
  const { mutate, isPending } = useUpdateEvent(id);
  const methods = useForm({
      resolver: yupResolver(eventSchema),
      defaultValues: {
        ...eventSchema.getDefault(),
        ...event,
        image: { uri: event?.image.publicUrl || "" },
        date: event?.date.toDate(),
        title: event?.title?.display,
        price: event?.price?.amount,
      },
    }),
    { handleSubmit } = methods;

  const onSubmit = async (data: EventFormValues) => {
    if (!event) return;

    mutate({
      eventUid: id,
      originalData: event,
      data,
    });
  };

  if (isLoading) return <FullPageLoading />;

  return (
    <PageContainer>
      <Form methods={methods}>
        <ImagePicker
          name="image"
          label="Event Image"
          placeholder="Tap to select event image"
        />
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
          minimumDate={new Date(1900, 0, 1)}
        />
        <Input
          name="location"
          label="Event location"
          placeholder="Nowa 3/3, Kraków"
        />

        <MultiTagInput
          name={"genres"}
          label={"Select Genres"}
          placeholder={"Type a genre and press enter"}
        />
        <MultiTagInput
          name={"lineup"}
          label={"Select Artists"}
          placeholder={"Type an artist name and press enter"}
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

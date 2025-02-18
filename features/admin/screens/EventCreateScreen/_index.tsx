import React from "react";

import { useForm } from "react-hook-form";

import { Calendar } from "@tamagui/lucide-icons";

import { EventFormValues, eventSchema } from "@/features/admin/utils/schemas";
import { ButtonCTA } from "@/features/core/components/buttons/ButtonCTA";
import { DateInput } from "@/features/core/components/form/DateInput";
import { Form } from "@/features/core/components/form/Form";
import { ImagePicker } from "@/features/core/components/form/ImagePicker";
import { Input } from "@/features/core/components/form/Input";
import { MultiTagInput } from "@/features/core/components/form/MultiTagInput";
import { TextArea } from "@/features/core/components/form/TextArea";
import { PageContainer } from "@/features/core/components/layout/PageContainer";

import { yupResolver } from "@hookform/resolvers/yup";

import { useCreateEvent } from "../../hooks/useCreateEvent";

export default function EventCreateScreen() {
  const methods = useForm({
    resolver: yupResolver(eventSchema),
    defaultValues: {
      ...eventSchema.getDefault(),
      // @ts-ignore
      image: null,
    },
  });
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const { mutate, isPending } = useCreateEvent();

  const onSubmit = (data: EventFormValues) => {
    mutate({ data });
  };
  console.log({ errors });

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
          label={"Select genres"}
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
          Next: Publish Event
        </ButtonCTA>
      </Form>
    </PageContainer>
  );
}

import React, { useState } from "react";

import { ButtonCTA } from "@/features/core/components/buttons/ButtonCTA";
import { DateInput } from "@/features/core/components/form/DateInput";
import { Form } from "@/features/core/components/form/Form";
import { Input } from "@/features/core/components/form/Input";
import { MultiTagInput } from "@/features/core/components/form/MultiTagInput";
import { TextArea } from "@/features/core/components/form/TextArea";
import { PageContainer } from "@/features/core/components/layout/PageContainer";
import { EventFormData } from "@/features/event/models/Event";

import { Calendar } from "@tamagui/lucide-icons";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import { CustomImagePicker } from "../../components/events/ImagePicker";
import { useCreateEvent } from "../../hooks/useCreateEvent";
import { useImagePicker } from "../../hooks/useImagePicker";
import {
  DEFAULT_DATE,
  DEFAULT_LOCATION,
  DEFAULT_PRICE,
} from "../../utils/constants";
import { eventSchema } from "../../utils/schemas";

export default function EventCreateScreen() {
  const methods = useForm<EventFormData>({
    resolver: yupResolver(eventSchema),
    defaultValues: {
      title: "",
      caption: "",
      location: DEFAULT_LOCATION,
      // date: DEFAULT_DATE,
      genres: [],
      lineup: [],
      price: DEFAULT_PRICE,
    },
  });
  const { handleSubmit, setValue, reset } = methods;

  const { image, pickImage } = useImagePicker();
  const { mutate, isPending } = useCreateEvent();

  const onSubmit = (data: EventFormData) => {
    mutate({ data: data, image: image });
  };

  return (
    <PageContainer>
      <Form methods={methods}>
        <CustomImagePicker onPress={pickImage} image={image} />
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
          Next: Publish Event
        </ButtonCTA>
      </Form>
    </PageContainer>
  );
}

import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

import React, { useEffect, useState } from "react";

import { Tag } from "@/features/core/components/Tag";
import { DateInput } from "@/features/core/components/form/DateInput";
import { Form } from "@/features/core/components/form/Form";
import { Input } from "@/features/core/components/form/Input";
import { MultiSelect } from "@/features/core/components/form/MultiSelect";
import { MultiTagInput } from "@/features/core/components/form/MultiTagInput";
import { FullPageLoading } from "@/features/core/components/layout/FullPageLoading";
import { PageContainer } from "@/features/core/components/layout/PageContainer";
import { EventFormData } from "@/features/event/models/Event";

import { Calendar } from "@tamagui/lucide-icons";

import { Button, Label, Paragraph, YStack } from "tamagui";

import { useLocalSearchParams } from "expo-router";
import { Controller, useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import { CustomImagePicker } from "../../components/events/ImagePicker";
import PillInput from "../../components/events/PillInput";
import { useEventOperations } from "../../hooks/useEventOperations";
import { useImagePicker } from "../../hooks/useImagePicker";
import {
  DEFAULT_DATE,
  DEFAULT_LOCATION,
  DEFAULT_PRICE,
} from "../../utils/constants";
import { eventSchema } from "../../utils/schemas";

export default function EventOperationsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [show, setShow] = useState(false);
  const { event, isLoading, updateEvent } = useEventOperations(id);

  const methods = useForm<EventFormData>({
      resolver: yupResolver(eventSchema),
      defaultValues: {
        price: DEFAULT_PRICE,
        location: DEFAULT_LOCATION,
        date: DEFAULT_DATE,
      },
    }),
    {
      control,
      handleSubmit,
      setValue,
      reset,
      formState: { errors },
    } = methods;

  const { image, setImage, pickImage } = useImagePicker();

  useEffect(() => {
    if (!isLoading && event) {
      setImage(event.image.publicUrl);
      reset({ ...event, date: event.date.toDate() });
    }
  }, [isLoading]);

  const onDateChange = (
    _: DateTimePickerEvent,
    selectedDate: Date | undefined,
  ) => {
    if (selectedDate) {
      setShow(false);
      setValue("date", selectedDate, { shouldValidate: true });
    }
  };

  const onSubmit = async (data: EventFormData) => updateEvent(data, image);

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
        <Input
          id="event-caption"
          name="caption"
          label="Event caption"
          placeholder="Caption"
          rows={6}
          verticalAlign="top"
          maxLength={1000}
          multiline
        />

        {/* <Controller
            control={control}
            name="date"
            render={({ field: { value } }) => (
              <>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  value={
                    value instanceof Date ? value.toLocaleDateString() : ""
                  }
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
          /> */}

        <DateInput
          name="birthDate"
          label="Birth Date"
          id="birthDate"
          placeholder="Select date"
          icon={Calendar}
          mode="date"
          minimumDate={new Date(1900, 0, 1)}
          maximumDate={new Date()}
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
          placeholder="30"
          inputMode="numeric"
          leftAdornment="PLN"
        />

        <Button>Update Event</Button>
      </Form>
    </PageContainer>
  );
}

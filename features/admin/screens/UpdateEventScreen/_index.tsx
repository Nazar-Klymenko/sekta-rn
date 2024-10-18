import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

import React, { useEffect, useState } from "react";

import { FullPageLoading } from "@/features/core/components/layout/FullPageLoading";
import { PageContainer } from "@/features/core/components/layout/PageContainer";
import { EventFormData } from "@/features/event/models/Event";

import { Button, Form, Input, Label, Paragraph, YStack } from "tamagui";

import { useLocalSearchParams } from "expo-router";
import { Controller } from "react-hook-form";

import { CustomImagePicker } from "../../components/events/ImagePicker";
import PillInput from "../../components/events/PillInput";
import { useEventForm } from "../../hooks/useEventForm";
import { useEventOperations } from "../../hooks/useEventOperations";
import { useImagePicker } from "../../hooks/useImagePicker";

export default function EventOperationsScreen() {
  const params = useLocalSearchParams();
  const eventId = params.id as string;
  const [show, setShow] = useState(false);
  const { event, isLoading, deleteEvent, duplicateEvent, submitEvent } =
    useEventOperations(eventId);

  const { control, handleSubmit, reset, setValue, errors } = useEventForm();
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

  const onSubmit = (data: EventFormData) => submitEvent(data, image);

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
            <Button>Update Event</Button>
          </Form.Trigger>

          <Button onPress={deleteEvent}>Delete Event</Button>
          <Button onPress={duplicateEvent}>Duplicate Event</Button>
        </YStack>
      </Form>
    </PageContainer>
  );
}

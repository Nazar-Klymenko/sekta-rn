import { Timestamp } from "firebase/firestore";

import React from "react";

import { Event } from "@/models/Event";

import { Controller, useForm } from "react-hook-form";
import {
  Adapt,
  Button,
  Dialog,
  Label,
  Sheet,
  Text,
  XStack,
  YStack,
} from "tamagui";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import { Tag } from "@/components/Tag";

import { Checkbox } from "./form/Checkbox";
import { Form } from "./form/Form";
import { MultiSelect } from "./form/MultiSelect";
import { Select } from "./form/Select";

interface FilterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  events: Event[];
  onApplyFilters: (filters: FilterValues) => void;
  onResetFilters: () => void;
  currentFilters: FilterValues;
}

const schema = yup.object().shape({
  priceSort: yup
    .mixed()
    .oneOf([false, "lowToHigh", "highToLow", "free"], (value) => {
      console.log({ value });
    })
    .default(false),
  selectedGenres: yup.array().of(yup.string().required()).required(),
  selectedArtists: yup.array().of(yup.string().required()).required(),
  upcomingOnly: yup.boolean().required(),
});
export type FilterValues = yup.InferType<typeof schema>;

export function FilterDialog({
  open,
  onOpenChange,
  events,
  onApplyFilters,
  onResetFilters,
  currentFilters,
}: FilterDialogProps) {
  const methods = useForm<FilterValues>({
      resolver: yupResolver(schema),
      defaultValues: currentFilters,
    }),
    { control, handleSubmit, reset } = methods;

  const uniqueGenres = Array.from(
    new Set(events.flatMap((event) => event.genres))
  );
  const uniqueArtists = Array.from(
    new Set(events.flatMap((event) => event.lineup))
  );

  const onSubmit = (data: FilterValues) => {
    onApplyFilters(data);
    onOpenChange(false);
  };

  const handleReset = () => {
    reset();
    onResetFilters();
  };
  const priceOptions = [
    { label: "Don't Filter", value: false },
    { label: "Low to High", value: "lowToHigh" },
    { label: "High to Low", value: "highToLow" },
    { label: "Free", value: "free" },
  ];

  return (
    <Dialog modal open={open} onOpenChange={onOpenChange}>
      <Adapt when="sm" platform="touch">
        <Sheet animation="medium" zIndex={200000} modal dismissOnSnapToBottom>
          <Sheet.Frame padding="$4" gap="$4">
            <Adapt.Contents />
          </Sheet.Frame>
          <Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content key={"event-filter-dialog"}>
          <Dialog.Title>Filter Events</Dialog.Title>
          <Form methods={methods}>
            <YStack gap="$4">
              <Select
                name="priceSort"
                placeholder="Select price"
                id="price-sort"
                label="Sort by price"
                items={priceOptions}
              />

              <Checkbox id="upcoming-only" name="upcomingOnly">
                Only show upcoming events
              </Checkbox>
              <XStack gap="$4" justifyContent="flex-end">
                <Button onPress={handleReset}>Reset</Button>
                <Button theme="active" onPress={handleSubmit(onSubmit)}>
                  Apply
                </Button>
              </XStack>
            </YStack>
          </Form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}

{
  /* 

              <Text fontWeight="bold">Genres</Text>
              <Controller
                control={control}
                name="selectedGenres"
                render={({ field: { onChange, value } }) => (
                  <MultiSelect
                    options={uniqueGenres}
                    value={value}
                    onChange={onChange}
                    placeholder="Select genres"
                  />
                )}
              />

              <Text fontWeight="bold">Artists</Text>
              <Controller
                control={control}
                name="selectedArtists"
                render={({ field: { onChange, value } }) => (
                  <MultiSelect
                    options={uniqueArtists}
                    value={value}
                    onChange={onChange}
                    placeholder="Select artists"
                  />
                )}
              /> */
}

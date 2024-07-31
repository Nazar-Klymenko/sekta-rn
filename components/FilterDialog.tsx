import { Timestamp } from "firebase/firestore";

import React from "react";

import { Event } from "@/models/Event";

import { Controller, useForm } from "react-hook-form";
import { Adapt, Button, Label, Sheet, Text, XStack, YStack } from "tamagui";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import { Tag } from "@/components/Tag";

import { Dialog } from "./Dialog";
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
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title="Filter Events"
      id={"event-filter-dialog"}
    >
      <Form methods={methods}>
        <YStack gap="$4">
          <Select
            name="priceSort"
            placeholder="Select price"
            id="price-sort"
            label="Sort by price"
            items={priceOptions}
          />

          <MultiSelect
            name="selectedGenres"
            placeholder="Select Genres"
            id="genres-sort"
            label="Sort by genres"
            items={uniqueGenres}
          />

          <MultiSelect
            name="selectedArtists"
            placeholder="Select Artists"
            id="artists-sort"
            label="Sort by Artists"
            items={uniqueArtists}
          />
          <Checkbox id="upcoming-only" name="upcomingOnly">
            Show old events
          </Checkbox>
          <XStack gap="$4" justifyContent="flex-end">
            <Button onPress={handleReset}>Reset all</Button>
            <Button theme="active" onPress={handleSubmit(onSubmit)}>
              Apply
            </Button>
          </XStack>
        </YStack>
      </Form>
    </Dialog>
  );
}

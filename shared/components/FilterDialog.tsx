import React from "react";

import { Event } from "@/shared/models/Event";

import { Filter, SlidersHorizontal, X } from "@tamagui/lucide-icons";

import { Button, Text, XStack, YStack, styled } from "tamagui";

import { useForm } from "react-hook-form";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import { Dialog } from "./Dialog";
import { PrimaryButton } from "./buttons/PrimaryButton";
import { SecondaryButton } from "./buttons/SecondaryButton";
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
    .oneOf([false, "lowToHigh", "highToLow", "free"])
    .default(false),
  selectedGenres: yup.array().of(yup.string()).default([]),
  selectedArtists: yup.array().of(yup.string()).default([]),
  includeOldEvents: yup.boolean().default(false),
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
    { handleSubmit, reset } = methods;

  const uniqueGenres = Array.from(
    new Set(events.flatMap((event) => event.genres)),
  );
  const uniqueArtists = Array.from(
    new Set(events.flatMap((event) => event.lineup)),
  );

  const onSubmit = (data: FilterValues) => {
    console.log(data);
    onApplyFilters(data);
    onOpenChange(false);
  };

  const handleReset = () => {
    reset({
      priceSort: false,
      selectedGenres: [],
      selectedArtists: [],
      includeOldEvents: false,
    });
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
        <YStack gap="$6" paddingVertical="$4">
          <Select
            name="priceSort"
            placeholder="Select price"
            id="price-sort"
            label="Sort by price"
            items={priceOptions}
            hideErrors
          />
          <MultiSelect
            name="selectedGenres"
            placeholder="Select Genres"
            id="genres-sort"
            label="Filter by genres"
            items={uniqueGenres}
          />
          <MultiSelect
            name="selectedArtists"
            placeholder="Select Artists"
            id="artists-sort"
            label="Filter by Artists"
            items={uniqueArtists}
          />
          <Checkbox id="include-old-events" name="includeOldEvents">
            <Text color="$gray11">Include past events</Text>
          </Checkbox>
          <XStack gap="$4" justifyContent="space-between">
            <SecondaryButton
              text="Reset all"
              onPress={handleReset}
              icon={X}
              flex={1}
            />
            <PrimaryButton
              text="Apply Filters"
              icon={Filter}
              onPress={handleSubmit(onSubmit)}
              flex={1}
            />
          </XStack>
        </YStack>
      </Form>
    </Dialog>
  );
}

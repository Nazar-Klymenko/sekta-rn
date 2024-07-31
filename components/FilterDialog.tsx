import { Filter, SlidersHorizontal, X } from "@tamagui/lucide-icons";

import React from "react";

import { Event } from "@/models/Event";

import { useForm } from "react-hook-form";
import { Button, Text, XStack, YStack, styled } from "tamagui";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

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
    .oneOf([false, "lowToHigh", "highToLow", "free"])
    .default(false),
  selectedGenres: yup.array().of(yup.string()).default([]),
  selectedArtists: yup.array().of(yup.string()).default([]),
  includeOldEvents: yup.boolean().default(false),
});

export type FilterValues = yup.InferType<typeof schema>;

const StyledButton = styled(Button, {
  borderRadius: 8,
  paddingVertical: 12,
  paddingHorizontal: 16,
  shadowColor: "$shadowColor",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevate: true,
});

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
  });

  const { handleSubmit, reset } = methods;

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
        <YStack gap="$6" paddingVertical="$4">
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
            <StyledButton onPress={handleReset} icon={X} theme="alt2">
              Reset all
            </StyledButton>
            <StyledButton
              theme="active"
              onPress={handleSubmit(onSubmit)}
              icon={Filter}
            >
              Apply Filters
            </StyledButton>
          </XStack>
        </YStack>
      </Form>
    </Dialog>
  );
}

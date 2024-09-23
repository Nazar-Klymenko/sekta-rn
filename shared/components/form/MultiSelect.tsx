// src/components/form/MultiSelect.tsx
import React, { useMemo, useState } from "react";

import { Tag } from "@/shared/components/Tag";

import { Check, ChevronDown, X } from "@tamagui/lucide-icons";

import {
  Adapt,
  Select,
  Sheet,
  SelectProps as TamaguiSelectProps,
  Text,
  XStack,
  YStack,
} from "tamagui";

import { useController, useFormContext } from "react-hook-form";

import {
  CustomAdapt,
  MultiSelectTrigger,
  ScrollDownButton,
  ScrollUpButton,
} from "./shared/SelectComponents";

interface MultiSelectProps
  extends Omit<TamaguiSelectProps, "value" | "onValueChange"> {
  name: string;
  label: string;
  id: string;
  placeholder: string;
  items: string[];
}

export const MultiSelect = ({
  items,
  placeholder,
  name,
  id,
  label,
  ...props
}: MultiSelectProps): JSX.Element => {
  const [open, setOpen] = useState(false);
  const { control } = useFormContext();
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const handleValueChange = (newValue: string) => {
    const updatedValue = [...value, newValue];
    onChange(updatedValue);
  };

  const handleRemoveTag = (tag: string) => {
    const newValue = value.filter((item: string) => item !== tag);
    onChange(newValue);
  };

  const availableItems = useMemo(() => {
    return items.filter((item) => !value.includes(item));
  }, [items, value]);
  const isDisabled = availableItems.length === 0;

  return (
    <YStack>
      <Text>{label}</Text>
      <Select
        id={id}
        value={value.length > 0 ? value[value.length - 1] : undefined}
        onValueChange={handleValueChange}
        open={open}
        onOpenChange={setOpen}
        {...props}
      >
        <XStack flexWrap="wrap" gap="$2" marginBottom="$2">
          {value.map((item: string) => (
            <Tag
              key={item}
              tag={item}
              selected
              onPress={() => handleRemoveTag(item)}
              icon={<X size={12} />}
            />
          ))}
        </XStack>
        <MultiSelectTrigger placeholder={placeholder} disabled={isDisabled}>
          {value.length > 0
            ? `${value.length} item${value.length > 1 ? "s" : ""} selected`
            : placeholder}
        </MultiSelectTrigger>
        <CustomAdapt />
        <Select.Content zIndex={200000}>
          <ScrollUpButton />
          <Select.Viewport>
            <Select.Group>
              {availableItems.map((item, i) => {
                return (
                  <Select.Item index={i} key={item} value={item}>
                    <Select.ItemText>{item}</Select.ItemText>
                    <Select.ItemIndicator marginLeft="auto">
                      <Check size={16} />
                    </Select.ItemIndicator>
                  </Select.Item>
                );
              })}
            </Select.Group>
          </Select.Viewport>
          <ScrollDownButton />
        </Select.Content>
      </Select>
      {error && (
        <Text color="$red10" fontSize="$2">
          {error.message}
        </Text>
      )}
    </YStack>
  );
};

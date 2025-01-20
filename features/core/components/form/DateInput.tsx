import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import RNDateTimePicker from "@react-native-community/datetimepicker";

import React, { useId, useState } from "react";

import { Platform, Pressable } from "react-native";

import { useController, useFormContext } from "react-hook-form";
import {
  Label,
  Paragraph,
  Stack,
  InputProps as TamaguiInputProps,
  Theme,
  XStack,
  YStack,
} from "tamagui";

import { BaseInput } from "./shared";
import { FormError } from "./shared/FormError";
import { InputIcon } from "./shared/InputIcon";

interface DateInputProps extends TamaguiInputProps {
  name: string;
  label: string;
  placeholder: string;
  icon?: React.ElementType;
  mode?: "date" | "time" | "datetime";
  minimumDate?: Date;
  maximumDate?: Date;
}

export function DateInput({
  name,
  label,
  placeholder,
  icon,
  mode = "date",
  minimumDate,
  maximumDate,
  ...props
}: DateInputProps) {
  const { control } = useFormContext();
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
  });
  const id = useId();

  const handleDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    if (event.type === "set" && selectedDate) {
      onChange(selectedDate.toISOString());
    }
  };

  return (
    <YStack flex={1} marginTop="$4">
      <XStack>
        <Label htmlFor={id} flex={1}>
          {label}
        </Label>
        <RNDateTimePicker
          mode="datetime"
          value={value ? new Date(value) : new Date()}
          testID={id}
          minimumDate={minimumDate}
          onChange={handleDateChange}
        />
      </XStack>

      <XStack marginTop="$2">
        <FormError error={error} />
      </XStack>
    </YStack>
  );
}

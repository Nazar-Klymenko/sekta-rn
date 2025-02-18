import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import RNDateTimePicker from "@react-native-community/datetimepicker";

import React, { useId } from "react";

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

import { FormError } from "./shared/FormError";

interface DateInputProps extends TamaguiInputProps {
  name: string;
  label: string;
  minimumDate?: Date;
  maximumDate?: Date;
}

export function DateInput({ name, label, minimumDate }: DateInputProps) {
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
  console.log({ error });

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

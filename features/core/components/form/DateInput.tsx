import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

import React, { useId, useState } from "react";

import { Platform, Pressable } from "react-native";

import {
  Label,
  Paragraph,
  Stack,
  InputProps as TamaguiInputProps,
  Theme,
  XStack,
  YStack,
} from "tamagui";

import { useController, useFormContext } from "react-hook-form";

import { BaseInput } from "./shared/BaseInput";

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
  icon: Icon,
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

  const [isFocused, setIsFocused] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const isPaddedLeft = !!Icon;
  const id = useId();

  const formatDateTime = (date: Date) => {
    const dateStr = date.toLocaleDateString("pl");
    const timeStr = date.toLocaleTimeString(["pl"], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    return `${dateStr} ${timeStr}`;
  };

  const handleDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }

    if (event.type === "set" && selectedDate) {
      const currentValue = value ? new Date(value) : new Date();

      // For date selection, keep the existing time if any
      if (!showTimePicker) {
        selectedDate.setHours(currentValue.getHours());
        selectedDate.setMinutes(currentValue.getMinutes());
        onChange(selectedDate);

        if (Platform.OS === "android") {
          // After date selection, show time picker
          setShowTimePicker(true);
        }
      } else {
        // For time selection, keep the existing date
        const newDate = value ? new Date(value) : new Date();
        newDate.setHours(selectedDate.getHours());
        newDate.setMinutes(selectedDate.getMinutes());
        onChange(newDate);
        setShowTimePicker(false);
      }
    } else {
      setShowDatePicker(false);
      setShowTimePicker(false);
    }
  };

  return (
    <Theme name="Input">
      <YStack flex={1}>
        <Label htmlFor={`${id}-${name}`}>{label}</Label>
        <Pressable onPress={() => setShowDatePicker(true)}>
          <YStack alignItems="center">
            <Stack
              flexDirection="row"
              width="100%"
              alignItems="center"
              flex={1}
              position="relative"
            >
              {Icon && (
                <Icon
                  style={{
                    position: "absolute",
                    left: 16,
                    color: "grey",
                    pointerEvents: "none",
                    userSelect: "none",
                    zIndex: 1,
                    size: 16,
                  }}
                />
              )}

              <BaseInput
                id={`${id}-${name}`}
                placeholder={placeholder}
                value={value ? formatDateTime(new Date(value)) : ""}
                paddingHorizontal={isPaddedLeft ? "$8" : "$3.5"}
                onBlur={() => {
                  onBlur();
                  setIsFocused(false);
                }}
                onFocus={() => setIsFocused(true)}
                editable={false}
                borderColor={
                  error
                    ? "$red10Light"
                    : isFocused
                    ? "$accentBackground"
                    : undefined
                }
                hoverStyle={{
                  borderColor: error ? "$red10Dark" : undefined,
                }}
                ref={ref}
                disabledStyle={{ color: "grey" }}
                {...props}
              />
            </Stack>
          </YStack>
        </Pressable>

        {(showDatePicker || showTimePicker) && (
          <DateTimePicker
            testID={`${id}-picker`}
            value={value ? new Date(value) : new Date()}
            mode={showTimePicker ? "time" : "date"}
            display={Platform.OS === "ios" ? "inline" : "default"}
            is24Hour={true}
            onChange={handleDateChange}
            minimumDate={minimumDate}
          />
        )}

        <XStack marginTop="$2">
          <Paragraph
            flex={1}
            color={error ? "$red10Light" : "$colorTransparent"}
            fontSize="$2"
          >
            {error ? error?.message : ""}
          </Paragraph>
        </XStack>
      </YStack>
    </Theme>
  );
}

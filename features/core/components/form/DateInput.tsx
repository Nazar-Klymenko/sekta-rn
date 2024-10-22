import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

import React, { useState } from "react";

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
  id: string;
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
  id,
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
  const [showPicker, setShowPicker] = useState(false);
  const isPaddedLeft = !!Icon;

  const formatDate = (date: Date) => {
    if (mode === "time") {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    return date.toLocaleDateString();
  };

  const handleDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date,
  ) => {
    setShowPicker(Platform.OS === "ios");
    if (event.type === "set" && selectedDate) {
      onChange(selectedDate);
    }
  };

  return (
    <Theme name="Input">
      <YStack flex={1}>
        <Label htmlFor={id}>{label}</Label>
        <Pressable onPress={() => setShowPicker(true)}>
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
                id={id}
                placeholder={placeholder}
                value={value ? formatDate(new Date(value)) : ""}
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
        {showPicker && (
          <YStack backgroundColor="$background" padding="$4" borderRadius="$4">
            <DateTimePicker
              testID={`${id}-picker`}
              value={value ? new Date(value) : new Date()}
              mode={mode}
              display="inline"
              onChange={handleDateChange}
              minimumDate={minimumDate}
              maximumDate={maximumDate}
              themeVariant="dark"
              textColor="white"
              accentColor="$blue10Light"
            />
          </YStack>
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

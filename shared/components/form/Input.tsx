import { Mail } from "@tamagui/lucide-icons";

import React, { useState } from "react";

import { TextInputProps } from "react-native";

import { useController, useFormContext } from "react-hook-form";
import {
  Label,
  Stack,
  Input as TamaguiInput,
  InputProps as TamaguiInputProps,
  Text,
  XStack,
  YStack,
  styled,
} from "tamagui";

import { BaseInput, MaxLength } from "./shared/BaseInput";

interface InputProps extends TamaguiInputProps {
  name: string;
  label: string;
  id: string;
  placeholder: string;
  icon?: React.ElementType;
}

export function Input({
  name,
  label,
  placeholder,
  id,
  icon: Icon,
  maxLength,
  ...props
}: InputProps) {
  const { control } = useFormContext();
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const [isFocused, setIsFocused] = useState(false);

  return (
    <YStack flex={1}>
      <Label htmlFor={id}>{label}</Label>
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
                color: "$placeholderColor",
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
            value={value}
            onChangeText={onChange}
            paddingHorizontal={Icon ? "$8" : "$3.5"}
            onBlur={() => {
              onBlur();
              setIsFocused(false);
            }}
            onFocus={() => setIsFocused(true)}
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
            disabledStyle={{ color: "$placeholderColor" }}
            {...props}
          />
        </Stack>
      </YStack>
      <XStack ai="center" marginTop="$2">
        <Text
          flex={1}
          color={error ? "$red10Light" : "$colorTransparent"}
          fontSize="$2"
        >
          {error ? error?.message : ""}
        </Text>
        {maxLength && (
          <MaxLength length={value?.length || 0} maxLength={maxLength} />
        )}
      </XStack>
    </YStack>
  );
}

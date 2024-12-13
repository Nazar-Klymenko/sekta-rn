import React, { useId, useState } from "react";

import {
  Label,
  Paragraph,
  SizableText,
  Stack,
  InputProps as TamaguiInputProps,
  XStack,
  YStack,
} from "tamagui";

import { useController, useFormContext } from "react-hook-form";

import { BaseInput, MaxLength } from "./ui";

interface InputProps extends TamaguiInputProps {
  name: string;
  label: string;
  placeholder: string;
  icon?: React.ElementType;
  leftAdornment?: string;
}

export function Input({
  name,
  label,
  placeholder,
  icon: Icon,
  leftAdornment,
  maxLength,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const id = useId();

  const { control } = useFormContext();
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const isPaddedLeft = !!Icon || !!leftAdornment;

  const displayValue = value?.toString() || "";

  return (
    <YStack>
      <XStack justifyContent="space-between">
        <Label htmlFor={`${id}-${name}`}>{label}</Label>
        {maxLength && (
          <MaxLength length={value?.length || 0} maxLength={maxLength} />
        )}
      </XStack>
      <YStack alignItems="center">
        <XStack width="100%" alignItems="center" flex={1} position="relative">
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
          {leftAdornment && (
            <SizableText
              style={{
                position: "absolute",
                left: 16,
                color: "grey",
                pointerEvents: "none",
                userSelect: "none",
                zIndex: 1,
              }}
            >
              {leftAdornment}
            </SizableText>
          )}

          <BaseInput
            id={`${id}-${name}`}
            placeholder={placeholder}
            value={displayValue}
            onChangeText={onChange}
            paddingHorizontal={isPaddedLeft ? "$8" : "$3.5"}
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
            disabledStyle={{ color: "grey" }}
            {...props}
          />
        </XStack>
      </YStack>
      <XStack marginTop="$2">
        <SizableText
          flex={1}
          color={error ? "$red10Light" : "$colorTransparent"}
          fontSize="$2"
        >
          {error ? error?.message : ""}
        </SizableText>
      </XStack>
    </YStack>
  );
}

import React, { useState } from "react";

import {
  Label,
  Paragraph,
  Stack,
  InputProps as TamaguiInputProps,
  XStack,
  YStack,
} from "tamagui";

import { useController, useFormContext } from "react-hook-form";

import { BaseInput, MaxLength } from "./shared/BaseInput";

interface InputProps extends TamaguiInputProps {
  name: string;
  label: string;
  id: string;
  placeholder: string;
  icon?: React.ElementType;
  leftAdornment?: string;
}

export function Input({
  name,
  label,
  placeholder,
  id,
  icon: Icon,
  leftAdornment,
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
  const isPaddedLeft = !!Icon || !!leftAdornment;
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
                color: "grey",
                pointerEvents: "none",
                userSelect: "none",
                zIndex: 1,
                size: 16,
              }}
            />
          )}
          {leftAdornment && (
            <Paragraph
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
            </Paragraph>
          )}

          <BaseInput
            id={id}
            placeholder={placeholder}
            value={value}
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
        </Stack>
      </YStack>
      <XStack marginTop="$2">
        <Paragraph
          flex={1}
          color={error ? "$red10Light" : "$colorTransparent"}
          fontSize="$2"
        >
          {error ? error?.message : ""}
        </Paragraph>
        {maxLength && (
          <MaxLength length={value?.length || 0} maxLength={maxLength} />
        )}
      </XStack>
    </YStack>
  );
}

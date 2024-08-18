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
} from "tamagui";

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
  ...props
}: InputProps) {
  const { control } = useFormContext();
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const [isFocused, setIsFocused] = useState(false);
  const hasValue = field.value && field.value.length > 0;

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

          <TamaguiInput
            id={id}
            flex={1}
            placeholder={placeholder}
            value={field.value}
            onChangeText={field.onChange}
            outlineStyle="none"
            paddingHorizontal={Icon ? "$8" : "$3.5"}
            minHeight={54}
            focusStyle={{
              outlineWidth: "0",
              outlineStyle: "none",
              borderColor: error ? "$red10Light" : "$accentColor",
            }}
            onBlur={() => {
              field.onBlur();
              setIsFocused(false);
            }}
            onFocus={() => setIsFocused(true)}
            borderColor={
              error ? "$red10Light" : isFocused ? "accentColor" : undefined
            }
            hoverStyle={{
              borderColor: error
                ? "$red10Light"
                : isFocused
                  ? "accentColor"
                  : undefined,
            }}
            ref={field.ref}
            fontSize={16}
            {...props}
          />
        </Stack>
      </YStack>
      <Text color={error ? "$red10Light" : "$colorTransparent"} fontSize="$2">
        {error ? error?.message : ""}
      </Text>
    </YStack>
  );
}

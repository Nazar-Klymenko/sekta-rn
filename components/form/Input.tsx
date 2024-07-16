import React, { useState } from "react";

import { TextInputProps } from "react-native";

import { useController, useFormContext } from "react-hook-form";
import {
  Label,
  Input as TamaguiInput,
  InputProps as TamaguiInputProps,
  Text,
  YStack,
} from "tamagui";

interface InputProps extends TamaguiInputProps {
  name: string;
  label: string;
  id: string;
  placeholder: string;
}

export function Input({ name, label, placeholder, id, ...props }: InputProps) {
  const { control } = useFormContext();
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const [isFocused, setIsFocused] = useState(false);
  return (
    <YStack gap="$2">
      <Label htmlFor={id}>{label}</Label>
      <TamaguiInput
        id={id}
        placeholder={placeholder}
        value={field.value}
        onChangeText={field.onChange}
        outlineStyle="none"
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
        {...props}
      />
      <Text color={error ? "$red10Light" : "$colorTransparent"} fontSize="$2">
        {error ? error?.message : "*"}
      </Text>
    </YStack>
  );
}

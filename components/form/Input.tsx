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
        onBlur={() => {
          field.onBlur();
          setIsFocused(false);
        }}
        onFocus={() => setIsFocused(true)}
        borderColor={error ? "$red10" : isFocused ? "$blue8" : undefined}
        borderWidth={error || isFocused ? 2 : 1}
        focusStyle={{
          borderColor: error ? "$red10" : "$blue8",
        }}
        ref={field.ref}
        {...props}
      />
      <Text color={error ? "$red10" : "$colorTransparent"} fontSize="$2">
        {error ? error?.message : "*"}
      </Text>
    </YStack>
  );
}

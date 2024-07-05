import React, { useState } from "react";

import { TextInputProps } from "react-native";

import { useController, useFormContext } from "react-hook-form";
import { Label, Input as TamaguiInput, Text, YStack, useTheme } from "tamagui";

interface InputProps extends TextInputProps {
  name: string;
  label: string;
  secureTextEntry?: boolean;
  placeholder: string;
}

export function Input({
  name,
  label,
  placeholder,
  secureTextEntry = false,
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
  const theme = useTheme();

  return (
    <YStack gap="$2">
      <Label htmlFor={name}>{label}</Label>
      <TamaguiInput
        id={name}
        placeholder={placeholder}
        value={field.value}
        onChangeText={field.onChange}
        onBlur={() => {
          field.onBlur();
          setIsFocused(false);
        }}
        onFocus={() => setIsFocused(true)}
        secureTextEntry={secureTextEntry}
        borderColor={error ? "$red10" : isFocused ? "$blue8" : undefined}
        borderWidth={error || isFocused ? 2 : 1}
        focusStyle={{
          borderColor: error ? "$red10" : "$blue8",
        }}
        {...props}
      />
      <Text color="$red10" fontSize="$2">
        {error && error?.message}
      </Text>
    </YStack>
  );
}

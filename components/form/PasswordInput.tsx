import React, { useState } from "react";
import {
  YStack,
  Label,
  Input as TamaguiInput,
  Text,
  useTheme,
  XStack,
  Button,
} from "tamagui";
import { useController, useFormContext } from "react-hook-form";
import { TextInputProps } from "react-native";
import { Eye, EyeOff } from "@tamagui/lucide-icons";

interface InputProps extends TextInputProps {
  name: string;
  label: string;
  placeholder: string;
}

export function PasswordInput(
  { name, label, placeholder }: InputProps,
  props: TextInputProps
) {
  const { control } = useFormContext();
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const theme = useTheme();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <YStack gap="$2">
      <Label htmlFor={name}>{label}</Label>
      <XStack alignItems="center">
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
          secureTextEntry={!isPasswordVisible}
          borderColor={error ? "$red10" : isFocused ? "$blue8" : undefined}
          borderWidth={error || isFocused ? 2 : 1}
          focusStyle={{
            borderColor: error ? "$red10" : "$blue8",
          }}
          flex={1}
          {...props}
        />
        <Button
          size="$2"
          icon={isPasswordVisible ? EyeOff : Eye}
          onPress={togglePasswordVisibility}
          marginLeft="$-6"
          backgroundColor="transparent"
        />
      </XStack>
      <Text color="$red10" fontSize="$2">
        {error && error?.message}
      </Text>
    </YStack>
  );
}

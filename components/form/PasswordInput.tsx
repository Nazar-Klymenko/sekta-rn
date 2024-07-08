import { Eye, EyeOff } from "@tamagui/lucide-icons";

import React, { useState } from "react";

import { TextInputProps } from "react-native";

import { useController, useFormContext } from "react-hook-form";
import {
  Button,
  Label,
  Input as TamaguiInput,
  Text,
  XStack,
  YStack,
  useTheme,
} from "tamagui";

interface InputProps extends TextInputProps {
  name: string;
  label: string;
  placeholder: string;
  id: string;
}

export function PasswordInput(
  { name, label, placeholder, id }: InputProps,
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
      <Label htmlFor={id}>{label}</Label>
      <XStack alignItems="center">
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
          secureTextEntry={!isPasswordVisible}
          borderColor={error ? "$red10" : isFocused ? "$blue8" : undefined}
          // borderWidth={error || isFocused ? 2 : 1}
          focusStyle={{
            borderColor: error ? "$red10" : "$blue8",
          }}
          flex={1}
          ref={field.ref}
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
      <Text color={error ? "$red10" : "$colorTransparent"} fontSize="$2">
        {error ? error?.message : "*"}
      </Text>
    </YStack>
  );
}

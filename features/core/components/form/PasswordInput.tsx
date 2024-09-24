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

import { BaseInput } from "./shared/BaseInput";

interface InputProps extends TextInputProps {
  name: string;
  label: string;
  placeholder: string;
  id: string;
}

export function PasswordInput(
  { name, label, placeholder, id }: InputProps,
  props: TextInputProps,
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
    <YStack>
      <Label htmlFor={id}>{label}</Label>
      <XStack alignItems="center">
        <BaseInput
          id={id}
          placeholder={placeholder}
          value={field.value}
          onChangeText={field.onChange}
          secureTextEntry={!isPasswordVisible}
          onBlur={() => {
            field.onBlur();
            setIsFocused(false);
          }}
          borderColor={
            error ? "$red10Light" : isFocused ? "$accentBackground" : undefined
          }
          hoverStyle={{
            borderColor: error ? "$red10Dark" : undefined,
          }}
          onFocus={() => setIsFocused(true)}
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
      <Text
        color={error ? "$red10Light" : "$colorTransparent"}
        marginTop="$2"
        fontSize="$2"
      >
        {error ? error?.message : "*"}
      </Text>
    </YStack>
  );
}

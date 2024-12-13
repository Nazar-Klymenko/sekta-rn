import React, { useId, useState } from "react";

import {
  Label,
  InputProps as TamaguiInputProps,
  Text,
  XStack,
  YStack,
} from "tamagui";

import { useController, useFormContext } from "react-hook-form";

import { BaseInput } from "./ui";
import { FormError } from "./ui/FormError";
import { PasswordIcon } from "./ui/PasswordIcon";

interface InputProps extends TamaguiInputProps {
  name: string;
  label: string;
  placeholder: string;
}

export function PasswordInput({
  name,
  label,
  placeholder,
  ...props
}: InputProps) {
  const { control } = useFormContext();
  const {
    field: { value, onChange, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
  });
  const id = useId();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <YStack>
      <Label htmlFor={`${id}-${name}`}>{label}</Label>
      <XStack alignItems="center">
        <BaseInput
          id={`${id}-${name}`}
          placeholder={placeholder}
          value={value}
          onChangeText={onChange}
          secureTextEntry={!isPasswordVisible}
          ref={ref}
          {...props}
        />
        <PasswordIcon
          onPress={togglePasswordVisibility}
          isVisible={isPasswordVisible}
        />
      </XStack>
      <XStack marginTop="$2">
        <FormError error={error} />
      </XStack>
    </YStack>
  );
}

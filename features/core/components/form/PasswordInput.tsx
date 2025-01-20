import React, { useId, useState } from "react";

import { useController, useFormContext } from "react-hook-form";
import {
  Label,
  InputProps as TamaguiInputProps,
  Text,
  XStack,
  YStack,
} from "tamagui";

import { BaseInput } from "./shared";
import { FormError } from "./shared/FormError";
import { PasswordIcon } from "./shared/PasswordIcon";

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
  const displayValue = value?.toString() || "";

  return (
    <YStack>
      <Label htmlFor={`${id}-${name}`}>{label}</Label>
      <XStack alignItems="center">
        <BaseInput
          id={`${id}-${name}`}
          placeholder={placeholder}
          value={displayValue}
          onChangeText={onChange}
          secureTextEntry={!isPasswordVisible}
          hasError={Boolean(error)}
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

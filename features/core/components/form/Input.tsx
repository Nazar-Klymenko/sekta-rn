import React, { useId, useState } from "react";

import {
  Label,
  InputProps as TamaguiInputProps,
  XStack,
  YStack,
} from "tamagui";

import { useController, useFormContext } from "react-hook-form";

import { BaseInput, MaxLength } from "./ui";
import { ClearIcon } from "./ui/ClearIcon";
import { FormError } from "./ui/FormError";
import { InputIcon } from "./ui/InputIcon";
import { LeftAdornment } from "./ui/LeftAdornment";

interface InputProps extends TamaguiInputProps {
  name: string;
  label: string;
  placeholder: string;
  icon?: React.ElementType;
  leftAdornment?: string;
  clearable?: boolean;
}

export function Input({
  name,
  label,
  placeholder,
  icon,
  leftAdornment,
  maxLength,
  clearable = false,
  ...props
}: InputProps) {
  const id = useId();

  const { control } = useFormContext();
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const handleClear = () => {
    onChange("");
  };

  const showClearIcon = clearable && Boolean(value);

  return (
    <YStack>
      <XStack justifyContent="space-between">
        <Label htmlFor={`${id}-${name}`}>{label}</Label>
        {maxLength && (
          <MaxLength length={value?.length || 0} maxLength={maxLength} />
        )}
      </XStack>
      <YStack alignItems="center">
        <XStack width="100%" alignItems="center" flex={1} position="relative">
          {leftAdornment && <LeftAdornment>{leftAdornment}</LeftAdornment>}
          {!leftAdornment && icon && <InputIcon icon={icon} />}

          <BaseInput
            id={`${id}-${name}`}
            placeholder={placeholder}
            value={value}
            onChangeText={onChange}
            hasError={Boolean(error)}
            isPaddedLeft={Boolean(icon || leftAdornment)}
            ref={ref}
            {...props}
          />

          {clearable && (
            <ClearIcon onPress={handleClear} visible={showClearIcon} />
          )}
        </XStack>
      </YStack>
      <XStack marginTop="$2">
        <FormError error={error} />
      </XStack>
    </YStack>
  );
}

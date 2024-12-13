import React, { useId, useState } from "react";

import {
  Label,
  InputProps as TamaguiInputProps,
  XStack,
  YStack,
} from "tamagui";

import { useController, useFormContext } from "react-hook-form";

import { BaseInput, MaxLength } from "./shared";
import { ClearIcon } from "./shared/ClearIcon";
import { FormError } from "./shared/FormError";
import { InputIcon } from "./shared/InputIcon";
import { LeftAdornment } from "./shared/LeftAdornment";

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
  const displayValue = value?.toString() || "";

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
            value={displayValue}
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

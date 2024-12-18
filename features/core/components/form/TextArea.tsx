import React, { useId } from "react";

import {
  Label,
  Stack,
  TextAreaProps as TamaguiTextAreaProps,
  XStack,
  YStack,
} from "tamagui";

import { useController, useFormContext } from "react-hook-form";

import { BaseTextArea, MaxLength } from "./shared";
import { FormError } from "./shared/FormError";
import { InputIcon } from "./shared/InputIcon";
import { LeftAdornment } from "./shared/LeftAdornment";

interface TextAreaProps extends TamaguiTextAreaProps {
  name: string;
  label: string;
  placeholder: string;
  icon?: React.ElementType;
  leftAdornment?: string;
}

export function TextArea({
  name,
  label,
  placeholder,
  icon,
  leftAdornment,
  maxLength,
  ...props
}: TextAreaProps) {
  const { control } = useFormContext();
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const id = useId();
  const displayValue = value?.toString() || "";
  return (
    <YStack flex={1}>
      <Label htmlFor={`${id}-${name}`}>{label}</Label>
      <YStack alignItems="center">
        <Stack
          flexDirection="row"
          width="100%"
          alignItems="center"
          flex={1}
          position="relative"
        >
          {leftAdornment && <LeftAdornment>{leftAdornment}</LeftAdornment>}
          {!leftAdornment && icon && <InputIcon icon={icon} />}

          <BaseTextArea
            id={`${id}-${name}`}
            placeholder={placeholder}
            value={displayValue}
            onChangeText={onChange}
            hasError={Boolean(error)}
            isPaddedLeft={Boolean(icon || leftAdornment)}
            ref={ref}
            {...props}
          />
        </Stack>
      </YStack>
      <XStack marginTop="$2">
        <FormError error={error} />

        {maxLength && (
          <MaxLength length={value?.length || 0} maxLength={maxLength} />
        )}
      </XStack>
    </YStack>
  );
}

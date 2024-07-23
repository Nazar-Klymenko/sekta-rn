import React from "react";

import { Link } from "expo-router";
import { useController, useFormContext } from "react-hook-form";
import {
  CheckboxProps,
  Label,
  Checkbox as TamaguiCheckbox,
  Text,
  XStack,
  YStack,
} from "tamagui";

interface CustomCheckboxProps
  extends Omit<CheckboxProps, "checked" | "onCheckedChange"> {
  children: React.ReactNode;
  name: string;
  label?: string;
  id: string;
}

export function Checkbox({
  name,
  label,
  id,
  children,
  ...props
}: CustomCheckboxProps) {
  const { control } = useFormContext();
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <YStack gap="$2">
      <XStack alignItems="center" gap="$2">
        <TamaguiCheckbox
          id={id}
          checked={field.value}
          onCheckedChange={(checked) => {
            field.onChange(checked);
          }}
          ref={field.ref}
          {...props}
        >
          <TamaguiCheckbox.Indicator>
            <Text>✓</Text>
          </TamaguiCheckbox.Indicator>
        </TamaguiCheckbox>
        <Label fontSize={12} htmlFor={id}>
          {children}
        </Label>
      </XStack>
      {error && (
        <Text color={error ? "$red10Light" : "$colorTransparent"} fontSize="$2">
          {error?.message}
        </Text>
      )}
    </YStack>
  );
}

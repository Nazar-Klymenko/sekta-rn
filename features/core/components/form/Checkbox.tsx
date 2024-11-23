import React, { useId } from "react";

import {
  CheckboxProps,
  Label,
  Paragraph,
  Checkbox as TamaguiCheckbox,
  XStack,
  YStack,
} from "tamagui";

import { useController, useFormContext } from "react-hook-form";

interface CustomCheckboxProps
  extends Omit<CheckboxProps, "checked" | "onCheckedChange"> {
  children: React.ReactNode;
  name: string;
  label?: string;
}

export function Checkbox({
  name,
  label,
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
  const id = useId();

  return (
    <YStack gap="$2" marginBottom="$4">
      <XStack alignItems="flex-start" gap="$2">
        <TamaguiCheckbox
          id={`${id}-${name}`}
          checked={field.value}
          onCheckedChange={(checked) => {
            field.onChange(checked);
          }}
          ref={field.ref}
          {...props}
        >
          <TamaguiCheckbox.Indicator>
            <Paragraph>✓</Paragraph>
          </TamaguiCheckbox.Indicator>
        </TamaguiCheckbox>
        <Label fontSize={12} htmlFor={`${id}-${name}`} lineHeight={"$1"}>
          {children}
        </Label>
      </XStack>
      {error && (
        <Paragraph
          color={error ? "$red10Light" : "$colorTransparent"}
          fontSize="$2"
        >
          {error?.message}
        </Paragraph>
      )}
    </YStack>
  );
}

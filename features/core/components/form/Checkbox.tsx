import React, { useId } from "react";

import { Check } from "@tamagui/lucide-icons";

import {
  CheckboxProps,
  Label,
  Paragraph,
  Checkbox as TamaguiCheckbox,
  XStack,
  YStack,
  styled,
} from "tamagui";

import { useController, useFormContext } from "react-hook-form";

import { FormError } from "./shared/FormError";

interface CustomCheckboxProps
  extends Omit<CheckboxProps, "checked" | "onCheckedChange"> {
  children: React.ReactNode;
  name: string;
  label?: string;
}

export function Checkbox({ name, children, ...props }: CustomCheckboxProps) {
  const { control } = useFormContext();
  const {
    field: { value, onChange, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
  });
  const id = useId();

  return (
    <YStack>
      <XStack alignItems="flex-start" gap="$3" display="flex">
        <BaseCheckbox
          id={`${id}-${name}`}
          checked={value}
          onCheckedChange={onChange}
          ref={ref}
          hasError={Boolean(error)}
          {...props}
        >
          <TamaguiCheckbox.Indicator>
            <Check />
          </TamaguiCheckbox.Indicator>
        </BaseCheckbox>

        <Label htmlFor={`${id}-${name}`} flexShrink={1} lineHeight="$1">
          {children}
        </Label>
      </XStack>

      <XStack marginTop="$2">
        <FormError error={error} />
      </XStack>
    </YStack>
  );
}
export const BaseCheckbox = styled(TamaguiCheckbox, {
  borderWidth: 0,
  borderRadius: "$2",
  size: "$5",
  variants: {
    hasError: {
      true: {
        borderWidth: 2,
        borderColor: "$red10Light",
        hoverStyle: {
          borderColor: "$red10Dark",
        },
      },
    },
    checked: {
      true: {
        backgroundColor: "$accentBackground",
        borderColor: "$accentBackground",
      },
    },
  },

  focusStyle: {
    borderColor: "$accentBackground",
  },
});

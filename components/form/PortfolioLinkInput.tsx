import React, { useState } from "react";

import { useController, useFormContext } from "react-hook-form";
import {
  Label,
  Stack,
  Input as TamaguiInput,
  Text,
  XStack,
  YStack,
} from "tamagui";

interface PortfolioLinkInputProps {
  name: string;
  label: string;
  icon?: React.ElementType;
  placeholder: string;
  prefix?: boolean;
  id: string;
}

export function PortfolioLinkInput({
  name,
  label,
  icon: Icon,
  placeholder,
  prefix,
  id,
}: PortfolioLinkInputProps) {
  const { control } = useFormContext();
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const [isFocused, setIsFocused] = useState(false);
  const hasValue = field.value && field.value.length > 0;

  return (
    <YStack gap="$2">
      <Label htmlFor={id}>{label}</Label>
      <XStack alignItems="center" gap="$2">
        <Stack
          flexDirection="row"
          alignItems="center"
          flex={1}
          position="relative"
        >
          {prefix && (
            <Text
              position="absolute"
              left="$2"
              color={hasValue ? "$color" : "$placeholderColor"}
              pointerEvents="none"
              userSelect="none"
              zIndex={1}
            >
              @
            </Text>
          )}
          <TamaguiInput
            id={id}
            flex={1}
            placeholder={placeholder}
            value={field.value}
            onChangeText={field.onChange}
            autoCapitalize="none"
            inputMode="url"
            paddingHorizontal={prefix ? "$5" : "$3.5"}
            focusStyle={{
              outlineWidth: "0",
              outlineStyle: "none",
              borderColor: error ? "$red10Light" : "$accentColor",
            }}
            hoverStyle={{
              borderColor: error
                ? "$red10Light"
                : isFocused
                ? "accentColor"
                : undefined,
            }}
            onBlur={() => {
              field.onBlur();
              setIsFocused(false);
            }}
            onFocus={() => setIsFocused(true)}
            borderColor={
              error ? "$red10Light" : isFocused ? "accentColor" : undefined
            }
            ref={field.ref}
          />
        </Stack>
      </XStack>
      <Text color={error ? "$red10Light" : "$colorTransparent"} fontSize="$2">
        {error ? error?.message : "*"}
      </Text>
    </YStack>
  );
}

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
            onBlur={() => {
              field.onBlur();
              setIsFocused(false);
            }}
            onFocus={() => setIsFocused(true)}
            autoCapitalize="none"
            inputMode="url"
            paddingLeft={prefix ? "$5" : "$2"}
            borderWidth={error || isFocused ? 2 : 1}
            focusStyle={{
              borderColor: error ? "$red10" : "$blue8",
            }}
            ref={field.ref}
          />
        </Stack>
      </XStack>
      <Text color={error ? "$red10" : "$colorTransparent"} fontSize="$2">
        {error ? error?.message : "*"}
      </Text>
    </YStack>
  );
}

import React, { useState } from "react";
import {
  XStack,
  Input as TamaguiInput,
  Text,
  YStack,
  Stack,
  Label,
  useTheme,
} from "tamagui";
import { useController, useFormContext } from "react-hook-form";

interface PortfolioLinkInputProps {
  name: string;
  label: string;
  icon?: React.ElementType;
  placeholder: string;
  prefix?: boolean;
}

export function PortfolioLinkInput({
  name,
  label,
  icon: Icon,
  placeholder,
  prefix,
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
  const theme = useTheme();
  const hasValue = field.value && field.value.length > 0;
  const inputId = `input-${name}`;

  return (
    <YStack gap="$2">
      <Label htmlFor={inputId}>{label}</Label>
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
            id={inputId}
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
            keyboardType="url"
            paddingLeft={prefix ? "$5" : "$2"}
            borderWidth={error || isFocused ? 2 : 1}
            focusStyle={{
              borderColor: error ? "$red10" : "$blue8",
            }}
          />
        </Stack>
      </XStack>
      {error && (
        <Text color="$red10" fontSize="$2">
          {error.message}
        </Text>
      )}
    </YStack>
  );
}

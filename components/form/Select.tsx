import { Check, ChevronDown, ChevronUp } from "@tamagui/lucide-icons";

import React, { useMemo, useState } from "react";

import { useController, useFormContext } from "react-hook-form";
import {
  Adapt,
  FontSizeTokens,
  Label,
  Sheet,
  Stack,
  Select as TamaguiSelect,
  SelectProps as TamaguiSelectProps,
  Text,
  XStack,
  YStack,
  getFontSize,
} from "tamagui";

import { LinearGradient } from "tamagui/linear-gradient";

import {
  CustomAdapt,
  ScrollDownButton,
  ScrollUpButton,
  SelectTrigger,
} from "./shared/SelectComponents";

interface SelectProps extends TamaguiSelectProps {
  name: string;
  label: string;
  id: string;
  placeholder: string;
  hideLabel?: boolean;
  hideErrors?: boolean;
  items: { label: string; value: string | boolean }[];
}

export function Select({
  name,
  label,
  placeholder,
  id,
  items,
  hideLabel = false,
  hideErrors = false,
  ...props
}: SelectProps) {
  const { control } = useFormContext();
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });
  const selectBody = (
    <TamaguiSelect
      value={field.value}
      onValueChange={(val) => {
        field.onChange(val);
      }}
    >
      <SelectTrigger placeholder={placeholder} />
      <CustomAdapt native={!!props.native} />
      <TamaguiSelect.Content zIndex={200000}>
        <ScrollUpButton />
        <TamaguiSelect.Viewport
          animation="quick"
          animateOnly={["transform", "opacity"]}
          enterStyle={{ o: 0, y: -10 }}
          exitStyle={{ o: 0, y: 10 }}
          minWidth={200}
        >
          <TamaguiSelect.Group>
            <TamaguiSelect.Label>{placeholder}</TamaguiSelect.Label>
            {useMemo(
              () =>
                items.map((item, i) => {
                  return (
                    <TamaguiSelect.Item
                      index={i}
                      key={`${item.value}-${i}`}
                      value={item.value as string}
                    >
                      <TamaguiSelect.ItemText>
                        {item.label}
                      </TamaguiSelect.ItemText>
                      <TamaguiSelect.ItemIndicator marginLeft="auto">
                        <Check size={16} />
                      </TamaguiSelect.ItemIndicator>
                    </TamaguiSelect.Item>
                  );
                }),
              [items]
            )}
          </TamaguiSelect.Group>
        </TamaguiSelect.Viewport>
        <ScrollDownButton />
      </TamaguiSelect.Content>
    </TamaguiSelect>
  );

  // if (strippedLabels) {
  //   return selectBody;
  // }
  return (
    <YStack gap="$2">
      {!hideLabel && <Label htmlFor={id}>{label}</Label>}
      <YStack alignItems="center" gap="$2">
        <Stack
          flexDirection="row"
          width="100%"
          alignItems="center"
          position="relative"
        >
          {selectBody}
        </Stack>
      </YStack>
      {!hideErrors && (
        <Text color={error ? "$red10Light" : "$colorTransparent"} fontSize="$2">
          {error ? error?.message : "*"}
        </Text>
      )}
    </YStack>
  );
}

// id={id}
// flex={1}
// placeholder={placeholder}
// value={field.value}
// onChangeText={field.onChange}
// outlineStyle="none"
// paddingHorizontal={"$3.5"}
// focusStyle={{
//   outlineWidth: "0",
//   outlineStyle: "none",
//   borderColor: error ? "$red10Light" : "$accentColor",
// }}
// onBlur={() => {
//   field.onBlur();
//   setIsFocused(false);
// }}
// onFocus={() => setIsFocused(true)}
// borderColor={
//   error ? "$red10Light" : isFocused ? "accentColor" : undefined
// }
// hoverStyle={{
//   borderColor: error
//     ? "$red10Light"
//     : isFocused
//     ? "accentColor"
//     : undefined,
// }}
// ref={field.ref}
// {...props}

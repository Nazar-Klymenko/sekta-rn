import React, { useId, useState } from "react";

import { X } from "@tamagui/lucide-icons";

import {
  Label,
  Separator,
  InputProps as TamaguiInputProps,
  Theme,
  XStack,
  YStack,
} from "tamagui";

import { useController, useFormContext } from "react-hook-form";

import { BaseInput, MaxLength } from "./shared";
import { FormError } from "./shared/FormError";
import { Pill } from "./shared/Pill";

interface InputProps extends TamaguiInputProps {
  name: string;
  label: string;
  placeholder: string;
}

export function MultiTagInput({
  name,
  label,
  placeholder,
  maxLength,
}: InputProps) {
  const id = useId();
  const { control } = useFormContext();
  const {
    field: { value, onChange, onBlur },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const tags: string[] = value || [];

  const handleAddTag = () => {
    if (inputValue.trim()) {
      const newTags = [...tags, inputValue.trim()];
      setInputValue("");
      onChange(newTags);
    }
  };

  const handleRemoveTag = (indexToRemove: number) => {
    const newTags = tags.filter(
      (_: string, index: number) => index !== indexToRemove
    );
    onChange(newTags);
  };
  return (
    <Theme name="Input">
      <YStack flex={1}>
        <Label htmlFor={id}>{label}</Label>
        <YStack alignItems="center" backgroundColor="$background">
          <YStack
            paddingHorizontal="$3.5"
            width="100%"
            alignItems="flex-start"
            flex={1}
            position="relative"
            minHeight={108}
            borderRadius="$2"
            borderWidth={2}
            borderColor={
              error
                ? "$red10Light"
                : isFocused
                ? "$accentBackground"
                : "$borderColor"
            }
          >
            <BaseInput
              id={`${id}-${name}`}
              placeholder={placeholder}
              value={inputValue}
              onChangeText={setInputValue}
              onBlur={() => {
                onBlur();
                setIsFocused(false);
              }}
              onFocus={() => setIsFocused(true)}
              onSubmitEditing={handleAddTag}
              returnKeyType="done"
              blurOnSubmit={false}
              paddingVertical={10}
              verticalAlign="top"
              width="100%"
              maxHeight={54}
              backgroundColor={"$background"}
              borderWidth={0}
              paddingHorizontal={0}
            />

            <Separator backgroundColor="$borderColor" flex={1} width="100%" />

            <YStack flex={1} width="100%" paddingVertical="$2">
              <XStack flexWrap="wrap" gap="$2">
                {tags.map((tag, index) => (
                  <Pill
                    key={index}
                    tag={tag}
                    onPress={() => handleRemoveTag(index)}
                    icon={<X size={"$1"} color="$accentColor" />}
                  />
                ))}
              </XStack>
            </YStack>
          </YStack>
        </YStack>

        <XStack marginTop="$2">
          <FormError error={error} />
          {maxLength && (
            <MaxLength length={value?.length || 0} maxLength={maxLength} />
          )}
        </XStack>
      </YStack>
    </Theme>
  );
}

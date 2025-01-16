import React, { useId } from "react";

import { useController, useFormContext } from "react-hook-form";
import { Image, Label, SizableText, Stack, XStack, YStack } from "tamagui";

import { Camera } from "@tamagui/lucide-icons";

import { useImagePicker } from "@/features/admin/hooks/useImagePicker";

import { FormError } from "./shared/FormError";

interface ImagePickerProps {
  name: string;
  label: string;
  placeholder?: string;
}

export function ImagePicker({ name, label, placeholder }: ImagePickerProps) {
  const id = useId();
  const { control } = useFormContext();
  const {
    field: { value, onChange, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const { pickImage } = useImagePicker();

  const handleImagePick = async () => {
    const result = await pickImage();
    if (result !== undefined) {
      onChange(result);
    }
  };

  return (
    <YStack>
      <Label htmlFor={`${id}-${name}`}>{label}</Label>
      <Stack
        onPress={handleImagePick}
        width="100%"
        aspectRatio={1}
        borderWidth={2}
        borderColor={error ? "$red10Light" : "transparent"}
        alignItems="center"
        justifyContent="center"
        backgroundColor="$backgroundHover"
        borderRadius="$2"
        hoverStyle={{
          backgroundColor: "$backgroundFocus",
        }}
        pressStyle={{
          backgroundColor: "$backgroundPress",
        }}
      >
        {value?.uri ? (
          <Image
            source={{ uri: value.uri }}
            width="100%"
            height="100%"
            borderRadius="$2"
          />
        ) : (
          <YStack alignItems="center" gap="$2">
            <Camera size="$6" color="$secondary" />
            <SizableText size="$4" color="$secondary">
              {placeholder}
            </SizableText>
          </YStack>
        )}
      </Stack>
      <XStack marginTop="$2">
        <FormError error={error} />
      </XStack>
    </YStack>
  );
}

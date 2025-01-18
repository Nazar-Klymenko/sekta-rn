import { Picker } from "@react-native-picker/picker";

import React, { useState } from "react";

import { useFieldArray, useFormContext } from "react-hook-form";
import { Button, Select, SizableText, XStack, YStack } from "tamagui";

import { ChevronDown } from "@tamagui/lucide-icons";

import { Input } from "@/features/core/components/form/Input";
import { Sheet } from "@/features/core/components/panels/Sheet";

const SOCIAL_MEDIA_OPTIONS = [
  { label: "Instagram", value: "instagram" },
  { label: "Facebook", value: "fb" },
  { label: "Soundcloud", value: "soundcloud" },
  { label: "Twitter", value: "twitter" },
  { label: "YouTube", value: "youtube" },
  { label: "Spotify", value: "spotify" },
];

interface SocialMediaLink {
  platform: string;
  url: string;
}

export function SocialMediaFieldArray() {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "socialLinks",
  });
  const [isPlatformSheetOpen, setIsPlatformSheetOpen] = useState(true);
  const handleAddLink = () => {
    append({ platform: "", url: "" });
  };

  return (
    <>
      <YStack gap="$3" marginVertical="$4">
        <XStack theme={"alt2"} onPress={() => setIsPlatformSheetOpen(true)}>
          <SizableText>Platform</SizableText>
          <ChevronDown size={"$1"} />
        </XStack>

        {/* {fields.map((field, index) => (
      <XStack key={field.id} space="$3" alignItems="center">
        <YStack flex={1}>
          <Select
            native
            value={field.id}
            onValueChange={(value) => {
              // const updatedFields = [...fields];
              // updatedFields[index].platform = value;
              // // Update the form
              // control._fields.socialLinks = updatedFields;
            }}
          >
            <Select.Trigger width="$12">
              <Select.Value placeholder="Select platform" />
            </Select.Trigger>

            <Select.Content>
              <Select.ScrollUpButton />
              <Select.Viewport>
                {SOCIAL_MEDIA_OPTIONS.map((option, idx) => (
                  <Select.Item
                    index={idx}
                    key={option.value}
                    value={option.value}
                  >
                    <Select.ItemText>{option.label}</Select.ItemText>
                  </Select.Item>
                ))}
              </Select.Viewport>
              <Select.ScrollDownButton />
            </Select.Content>
          </Select>

          <Input
            name={`socialLinks.${index}.url`}
            label="URL"
            placeholder="Enter social media URL"
            clearable
          />
        </YStack>
        <Button onPress={() => remove(index)} size="$3">
          Remove
        </Button>
      </XStack>
    ))} */}
        <Button onPress={handleAddLink}>Add Social Media Link</Button>
      </YStack>
      <Sheet
        open={isPlatformSheetOpen}
        onOpenChange={setIsPlatformSheetOpen}
        insideModal
      >
        <SizableText>Instagram</SizableText>
      </Sheet>
    </>
  );
}

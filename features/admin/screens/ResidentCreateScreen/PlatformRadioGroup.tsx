import React, { useState } from "react";

import {
  useController,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import {
  Button,
  ButtonIcon,
  RadioGroup,
  Separator,
  SizableText,
  Stack,
  XStack,
  YStack,
} from "tamagui";

interface PlatformRadioGroupProps {
  name: string;
}
export const PlatformRadioGroup = ({ name }: PlatformRadioGroupProps) => {
  const { control } = useFormContext();
  const {
    field: { value, onChange, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <RadioGroup
      defaultValue=""
      gap="$2"
      theme={"surface2"}
      backgroundColor={"$background"}
      borderRadius={"$2"}
      borderWidth={1}
      borderColor={"$borderColor"}
    >
      {SOCIAL_MEDIA_OPTIONS.map((option, idx) => (
        <>
          <XStack key={option.value} alignItems="center" gap="$2" padding="$2">
            <YStack flex={1}>
              <SizableText size={"$6"} flex={1}>
                {option.label}
              </SizableText>
              <SizableText size={"$4"} color="gray" flex={1}>
                {option.instruction}
              </SizableText>
            </YStack>

            <RadioGroup.Item
              size={"$6"}
              value={option.value}
              id={`${option.value}-radio-item`}
            >
              <RadioGroup.Indicator />
            </RadioGroup.Item>
          </XStack>
        </>
      ))}
    </RadioGroup>
  );
};

const SOCIAL_MEDIA_OPTIONS = [
  {
    label: "Instagram",
    value: "instagram",
    instruction: "Just the username: username",
  },
  {
    label: "Facebook",
    value: "fb",
    instruction:
      "Use the part of the link that comes after the /\nFor example, in facebook.com/userID, take userID only",
  },
  {
    label: "Soundcloud",
    value: "soundcloud",
    instruction:
      "Use the part of the link that comes after the /\nFor example, in soundcloud.com/userID, take userID only",
  },
  {
    label: "Twitter",
    value: "twitter",
    instruction: "Just the username from the url: username",
  },
  {
    label: "YouTube",
    value: "youtube",
    instruction:
      "Use the part of the link that comes after the /\nFor example, in youtube.com/@userID, take @userID only",
  },
  {
    label: "Spotify",
    value: "spotify",
    instruction:
      "Use the part of the link that comes after the /user/\nFor example, in spotify.com/user/userID, take userID only",
  },
];

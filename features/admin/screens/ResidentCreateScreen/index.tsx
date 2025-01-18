import React, { useState } from "react";

import { useFieldArray, useForm } from "react-hook-form";
import {
  Button,
  ButtonIcon,
  Label,
  RadioGroup,
  Separator,
  SizableText,
  Stack,
  XStack,
  YStack,
} from "tamagui";
import { Select } from "tamagui";

import {
  ChevronDown,
  CircleFadingPlus,
  Delete,
  Instagram,
  Trash,
} from "@tamagui/lucide-icons";

import {
  ResidentFormValues,
  residentSchema,
} from "@/features/admin/utils/schemas";
import { Hint } from "@/features/core/components/Hint";
import { ButtonCTA } from "@/features/core/components/buttons/ButtonCTA";
import { MenuItem } from "@/features/core/components/buttons/MenuItem";
import { Form } from "@/features/core/components/form/Form";
import { ImagePicker } from "@/features/core/components/form/ImagePicker";
import { Input } from "@/features/core/components/form/Input";
import { TextArea } from "@/features/core/components/form/TextArea";
import { PageContainer } from "@/features/core/components/layout/PageContainer";
import { Sheet } from "@/features/core/components/panels/Sheet";

import { yupResolver } from "@hookform/resolvers/yup";

import { useCreateResident } from "../../hooks/useCreateResident";
import { SocialMediaFieldArray } from "./SocialMediaFieldArray";

export default function ResidentCreateScreen() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const methods = useForm({
    resolver: yupResolver(residentSchema),
    defaultValues: {
      ...residentSchema.getDefault(),
      //@ts-ignore
      image: null,
    },
  });
  const { handleSubmit, control } = methods;

  const { mutate, isPending } = useCreateResident();

  const onSubmit = (data: ResidentFormValues) => {
    mutate({ data });
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "socialMedia",
  });
  const [isPlatformSheetOpen, setIsPlatformSheetOpen] = useState(true);
  const handleAddLink = () => {
    append({ platform: "", url: "" });
  };
  return (
    <>
      <PageContainer>
        <Form methods={methods}>
          <ImagePicker
            name="image"
            label="Resident Image"
            placeholder="Tap to select resident image"
          />
          <Input name="name" label="Name" placeholder="Name" />
          <TextArea
            name="bio"
            label="Resident bio"
            placeholder="Bio"
            rows={6}
            verticalAlign="top"
            maxLength={1000}
            multiline
          />
          {fields.map((field, index) => (
            <XStack gap="$2" paddingVertical="$3">
              <Separator vertical></Separator>
              <XStack flex={1} alignItems="center">
                <Stack flex={1}>
                  <XStack
                    theme={field.platform ? "active" : "alt2"}
                    onPress={() => {
                      setIsPlatformSheetOpen(true);
                      setActiveIndex(index);
                    }}
                    alignItems="center"
                  >
                    <SizableText size={"$8"}>
                      {field.platform || " Platform"}
                    </SizableText>
                    <ChevronDown size={"$1"} />
                  </XStack>
                  <Input
                    name={`socialMedia.${index}.url`}
                    label={""}
                    placeholder="Enter username or userID..."
                    autoFocus={false}
                  />
                </Stack>

                <Button
                  circular
                  chromeless
                  borderWidth={0}
                  icon={Trash}
                  onPress={() => remove(index)}
                />
              </XStack>
            </XStack>
          ))}

          <MenuItem
            title={"Add Social Media"}
            icon={CircleFadingPlus}
            onPress={handleAddLink}
          />
          <ButtonCTA
            theme="accent"
            disabled={isPending}
            isLoading={isPending}
            onPress={handleSubmit(onSubmit)}
          >
            Next: Publish Resident
          </ButtonCTA>
        </Form>
      </PageContainer>
      <Sheet
        open={isPlatformSheetOpen}
        onOpenChange={setIsPlatformSheetOpen}
        insideModal
      >
        <RadioGroup
          defaultValue="Platform"
          value="fb"
          gap="$2"
          theme={"surface2"}
          backgroundColor={"$background"}
          borderRadius={"$2"}
          borderWidth={1}
          borderColor={"$borderColor"}
          paddingHorizontal="$2"
          paddingVertical="$4"
        >
          {SOCIAL_MEDIA_OPTIONS.map((option, idx) => (
            <XStack
              key={option.value}
              alignItems="center"
              gap="$2"
              padding="$2"
            >
              <Label unstyled flex={1} htmlFor="" gap={0}>
                <YStack gap="$0">
                  <SizableText size={"$6"}>{option.label}</SizableText>
                  <SizableText size={"$4"} color="gray">
                    {option.instruction}
                  </SizableText>
                </YStack>
              </Label>

              <RadioGroup.Item
                size={"$6"}
                value={option.value}
                id={`${option.value}-radio-item`}
              >
                <RadioGroup.Indicator />
              </RadioGroup.Item>
            </XStack>
          ))}
        </RadioGroup>
      </Sheet>
    </>
  );
}
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

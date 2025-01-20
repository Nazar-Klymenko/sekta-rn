import React, { useId, useState } from "react";

import { useLocalSearchParams } from "expo-router";
import { useFieldArray, useForm } from "react-hook-form";
import {
  Button,
  ButtonIcon,
  Label,
  RadioGroup,
  Separator,
  SizableText,
  Spacer,
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
import { FullPageLoading } from "@/features/core/components/layout/FullPageLoading";
import { PageContainer } from "@/features/core/components/layout/PageContainer";
import { Sheet } from "@/features/core/components/panels/Sheet";
import { useFetchResident } from "@/features/residents/hooks/useFetchResident";

import { yupResolver } from "@hookform/resolvers/yup";

import { useUpdateResident } from "../../hooks/useUpdateResident";

export default function ResidentUpdateScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: resident, isLoading } = useFetchResident(id);
  const [isPlatformSheetOpen, setIsPlatformSheetOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const { mutate, isPending } = useUpdateResident(id);
  const methods = useForm({
      resolver: yupResolver(residentSchema),
      defaultValues: {
        ...residentSchema.getDefault(),
        ...resident,
        image: { uri: resident?.image.publicUrl || "" },
        name: resident?.name.display,
        socialMedia: Array.isArray(resident?.socialMedia)
          ? resident.socialMedia
          : [],
      },
      mode: "onChange",
    }),
    {
      handleSubmit,
      watch,
      setValue,
      control,
      formState: { errors },
    } = methods;

  const onSubmit = async (data: ResidentFormValues) => {
    if (!resident) return;
    mutate({
      residentId: id,
      originalData: resident,
      data,
    });
  };
  const { fields, append, remove } = useFieldArray({
    control,
    name: "socialMedia",
  });
  const handleAddLink = () => {
    append({ platform: "", url: "" }, { shouldFocus: false });
  };
  const handlePlatformSelect = (platformValue: string) => {
    if (activeIndex !== null) {
      setValue(`socialMedia.${activeIndex}.platform`, platformValue, {
        shouldValidate: true,
      });
      setIsPlatformSheetOpen(false);
    }
  };
  const watchSocialMedia = watch("socialMedia");
  const currentPlatform =
    activeIndex !== null ? watchSocialMedia[activeIndex]?.platform : "";
  if (isLoading) return <FullPageLoading />;

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
            <XStack gap="$2" paddingVertical="$3" key={field.id}>
              <XStack flex={1} alignItems="center" gap="$1">
                <Stack flex={1}>
                  <XStack
                    theme={
                      watchSocialMedia[index]?.platform ? "active" : "alt2"
                    }
                    onPress={() => {
                      setIsPlatformSheetOpen(true);
                      setActiveIndex(index);
                    }}
                    alignItems="center"
                  >
                    <SizableText
                      size={"$8"}
                      color={
                        errors.socialMedia?.[index]?.platform
                          ? "$red10Light"
                          : "$color"
                      }
                    >
                      {watchSocialMedia[index]?.platform || " Platform"}
                    </SizableText>
                    <ChevronDown size={"$1"} />
                  </XStack>
                  <Input
                    name={`socialMedia.${index}.url`}
                    label={""}
                    placeholder="Enter username or userID..."
                    autoFocus={false}
                    autoCorrect={false}
                    autoCapitalize="none"
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
          <Spacer />
          <ButtonCTA
            theme="accent"
            disabled={isPending}
            isLoading={isPending}
            onPress={handleSubmit(onSubmit)}
          >
            Next: Update Resident
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
          value={currentPlatform}
          onValueChange={handlePlatformSelect}
          gap="$2"
          theme={"surface2"}
          backgroundColor={"$background"}
          borderRadius={"$2"}
          borderWidth={1}
          borderColor={"$borderColor"}
          paddingHorizontal="$2"
          paddingVertical="$4"
        >
          {SOCIAL_MEDIA_OPTIONS.map((option, idx) => {
            const id = useId();

            return (
              <XStack
                key={option.value}
                alignItems="center"
                gap="$2"
                padding="$2"
              >
                <Label unstyled flex={1} htmlFor={id} gap={0}>
                  <YStack gap="$0">
                    <SizableText size={"$6"}>{option.label}</SizableText>
                    <SizableText size={"$4"} color="gray">
                      {option.instruction}
                    </SizableText>
                  </YStack>
                </Label>

                <RadioGroup.Item size={"$6"} value={option.value} id={id}>
                  <RadioGroup.Indicator />
                </RadioGroup.Item>
              </XStack>
            );
          })}
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
  {
    label: "Website",
    value: "website",
    instruction: "Use the full URL, without https://",
  },
];

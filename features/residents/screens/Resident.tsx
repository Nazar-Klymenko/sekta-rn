import React from "react";

import { Linking } from "react-native";

import { Image } from "expo-image";
import { Stack, useLocalSearchParams } from "expo-router";
import {
  Button,
  Separator,
  SizableText,
  XStack,
  YStack,
  styled,
} from "tamagui";

import {
  AudioLines,
  Facebook,
  Instagram,
  Youtube,
} from "@tamagui/lucide-icons";

import Skeleton from "@/features/core/components/Skeleton";
import { PageContainer } from "@/features/core/components/layout/PageContainer";
import { handleSocialMediaPress } from "@/features/core/utils/handleSocialMediaPress";

import { useFetchResident } from "../hooks/useFetchResident";

const ResidentScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: resident, isLoading, isError } = useFetchResident(id);

  if (isLoading) {
    return (
      <PageContainer>
        <SkeletonResidentDetails />
      </PageContainer>
    );
  }

  if (isError || !resident) {
    return (
      <YStack padding="$4" alignItems="center" gap="$4">
        <SizableText>Failed to load resident details.</SizableText>
        <Button>Retry</Button>
      </YStack>
    );
  }

  return (
    <PageContainer contentContainerStyle={{ padding: 0 }}>
      <Stack.Screen
        options={{
          title: resident.name.display,
        }}
      />
      <YStack gap="$4">
        <ImageStyled source={{ uri: resident?.image?.publicUrl }} />
        <YStack gap="$4" paddingHorizontal="$4">
          <SizableText fontSize="$6" color="$gray11" fontWeight={700}>
            {resident?.bio}
          </SizableText>

          <XStack gap="$3">
            {resident.socialMedia.map((link, index) => {
              const IconComponent = platformIcons[link.platform] || Facebook;
              return (
                <Button
                  key={index}
                  circular
                  onPress={() =>
                    handleSocialMediaPress(link.platform, link.url)
                  }
                >
                  <IconComponent />
                </Button>
              );
            })}
          </XStack>
        </YStack>
      </YStack>
    </PageContainer>
  );
};

export default ResidentScreen;

const SkeletonResidentDetails = () => {
  return (
    <YStack gap="$4">
      <Skeleton height={300} width="100%" borderRadius="$2" />
      <YStack gap="$2">
        <Skeleton height={32} width="60%" />
        <Skeleton height={100} width="100%" />
      </YStack>
      <Separator />
      <YStack gap="$2">
        <Skeleton height={24} width="30%" />
        <XStack gap="$2">
          <Skeleton height={40} width={100} borderRadius="$4" />
          <Skeleton height={40} width={100} borderRadius="$4" />
        </XStack>
      </YStack>
    </YStack>
  );
};

const ImageStyled = styled(Image, {
  aspectRatio: 1,
  objectFit: "cover",
  maxWidth: 724,
});

const platformIcons: Record<string, React.ElementType> = {
  instagram: Instagram,
  facebook: Facebook,
  soundcloud: AudioLines,
  youtube: Youtube,
  twitter: Instagram,
  spotify: Instagram,
};

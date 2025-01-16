import React from "react";

import { Linking } from "react-native";

import { Stack, useLocalSearchParams } from "expo-router";
import { Button, Image, Separator, SizableText, XStack, YStack } from "tamagui";

import Skeleton from "@/features/core/components/Skeleton";
import { PageContainer } from "@/features/core/components/layout/PageContainer";

import { useFetchResident } from "../hooks/useFetchResident";

const ResidentScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  console.log({ id });
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

  const handleSocialMediaPress = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.error(`Can't handle URL: ${url}`);
    }
  };

  return (
    <PageContainer>
      <Stack.Screen
        options={{
          title: resident.name.display,
        }}
      />
      <YStack gap="$4">
        <Image
          source={{ uri: resident?.image.publicUrl }}
          aspectRatio={1 / 1}
          objectFit="cover"
          maxWidth={724}
          flex={1}
          width={"100%"}
        />
        <SizableText fontSize="$6" color="$gray11" fontWeight={700}>
          {resident?.bio}
        </SizableText>
        <Button
          onPress={() =>
            handleSocialMediaPress("instagram://user?username=sektaselekta")
          }
        >
          Open Instagram
        </Button>
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

import React, { useState } from "react";

import { Linking } from "react-native";

import { Stack, useLocalSearchParams } from "expo-router";
import { Button, Image, Separator, SizableText, XStack, YStack } from "tamagui";

import { useAuth } from "@/features/auth/hooks/useAuth";
import Skeleton from "@/features/core/components/Skeleton";
import { ButtonCTA } from "@/features/core/components/buttons/ButtonCTA";
import { PageContainer } from "@/features/core/components/layout/PageContainer";
import { ReanimatedPageContainer } from "@/features/core/components/layout/ReanimatedPageContainer";
import { useAnimatedScroll } from "@/features/core/hooks/useAnimatedScroll";
import { useFetchResident } from "@/features/residents/hooks/useFetchResident";

import { InnerMenuSheet } from "./InnerMenuSheet";
import { OuterMenuSheet } from "./OuterMenuSheet";

const ResidentPreviewScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  console.log({ id });
  const { data: resident, isLoading, isError } = useFetchResident(id);
  const [showConfirmSheet, setShowConfirmSheet] = useState(false);
  const [innershowConfirmSheet, setInnerShowConfirmSheet] = useState(false);
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

  console.log({ resident });
  const handleSocialMediaPress = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <>
      <Stack.Screen options={{ title: "sdsvvvv" }}></Stack.Screen>
      <PageContainer>
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
        </YStack>
        {/* Social Media Links
      {Object.entries(resident.socialMedia).length > 0 && (
        <YStack gap="$2">
          <SizableText fontSize="$6" fontWeight="600">
            Connect
          </SizableText>
          <XStack flexWrap="wrap" gap="$2">
            {Object.entries(resident.socialMedia).map(([platform, url]) => (
              <Button
                key={platform}
                size="$3"
                variant="outlined"
                onPress={() => handleSocialMediaPress(url)}
              >
                {platform}
              </Button>
            ))}
          </XStack>
        </YStack>
      )} */}
      </PageContainer>
      <OuterMenuSheet
        key={id + "outer"}
        open={showConfirmSheet}
        onOpenChange={setShowConfirmSheet}
        setInnerShowConfirmSheet={setInnerShowConfirmSheet}
        id={id}
      />
      <InnerMenuSheet
        key={id + "inner"}
        open={innershowConfirmSheet}
        onOpenChange={setInnerShowConfirmSheet}
        confirmFunction={handleDelete}
        isPending={isPending}
      />
    </>
  );
};

export default ResidentPreviewScreen;

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

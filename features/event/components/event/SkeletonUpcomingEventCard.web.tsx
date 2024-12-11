import React from "react";

import { useWindowDimensions } from "react-native";

import Skeleton from "@/features/core/components/Skeleton";

import { Stack, XStack, YStack } from "tamagui";

export const SkeletonUpcomingEventCard = () => {
  return (
    <YStack
      width={"100%"}
      borderRadius="$2"
      overflow="hidden"
      maxWidth="100%"
      $gtMd={{
        maxWidth: "calc(33.333% - 16px)",
      }}
      $gtSm={{
        maxWidth: "calc(50% - 16px)",
      }}
    >
      <Skeleton width={"100%"} aspectRatio={1} borderRadius={"$2"} />
      <YStack padding="$4" gap="$2">
        <Skeleton height={24} width="80%" />
        <XStack alignItems="center" gap="$2">
          <Skeleton height={16} width={16} borderRadius="$9" />
          <Skeleton height={15} width="60%" />
        </XStack>
        <XStack alignItems="center" gap="$2">
          <Skeleton height={16} width={16} borderRadius="$9" />
          <Skeleton height={15} width="40%" />
        </XStack>
        <Skeleton height={14} width="100%" />
        <Skeleton height={14} width="90%" />
        <XStack flexWrap="wrap" gap="$2" marginTop="$3">
          <Skeleton height={24} width={60} borderRadius="$4" />
          <Skeleton height={24} width={70} borderRadius="$4" />
          <Skeleton height={24} width={50} borderRadius="$4" />
        </XStack>
      </YStack>
    </YStack>
  );
};

import React from "react";

import { useWindowDimensions } from "react-native";

import Skeleton from "@/features/core/components/Skeleton";

import { Stack, XStack, YStack } from "tamagui";

interface SkeletonUpcomingEventCardProps {
  verticalView?: boolean;
}

export const SkeletonUpcomingEventCard: React.FC<
  SkeletonUpcomingEventCardProps
> = ({ verticalView }) => {
  const { width: windowWidth } = useWindowDimensions();

  const cardWidth = (windowWidth - 32) * 0.9;

  return (
    <YStack
      width={verticalView ? "100%" : cardWidth}
      borderRadius="$2"
      overflow="hidden"
    >
      <Skeleton
        width={verticalView ? "100%" : cardWidth}
        aspectRatio={1}
        borderRadius={"$2"}
      />
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

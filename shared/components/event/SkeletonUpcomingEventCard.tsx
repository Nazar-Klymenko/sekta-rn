import React from "react";

import Skeleton from "@/shared/components/Skeleton";

import { Stack, XStack, YStack } from "tamagui";

interface SkeletonUpcomingEventCardProps {
  cardWidth: number;
}

export const SkeletonUpcomingEventCard: React.FC<
  SkeletonUpcomingEventCardProps
> = ({ cardWidth }) => {
  return (
    <YStack
      width={cardWidth}
      borderRadius="$6"
      overflow="hidden"
      borderWidth={1}
      borderColor="$gray2Dark"
    >
      <Skeleton height={240} width={cardWidth} />
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

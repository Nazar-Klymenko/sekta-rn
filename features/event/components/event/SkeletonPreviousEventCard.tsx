import React from "react";

import Skeleton from "@/features/core/components/Skeleton";

import { XStack, YStack } from "tamagui";

export const SkeletonPreviousEventCard: React.FC = () => {
  return (
    <XStack
      width="100%"
      overflow="hidden"
      padding="$2"
      gap="$3"
      alignItems="center"
    >
      <Skeleton width={100} height={100} borderRadius="$2" />
      <YStack flex={1} gap="$2">
        <Skeleton height={20} width="80%" />
        <Skeleton height={16} width="40%" />
        <XStack flexWrap="wrap" gap="$2">
          <Skeleton height={24} width={60} borderRadius="$4" />
          <Skeleton height={24} width={70} borderRadius="$4" />
        </XStack>
      </YStack>
    </XStack>
  );
};

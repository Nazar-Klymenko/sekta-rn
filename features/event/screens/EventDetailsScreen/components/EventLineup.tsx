import React from "react";

import { Tag } from "@/shared/components/Tag";

import { H2, XStack, YStack } from "tamagui";

interface EventLineupProps {
  lineup: string[];
}

export default function EventLineup({ lineup }: EventLineupProps) {
  return (
    <YStack gap="$2">
      <H2 fontWeight="bold">Lineup</H2>
      <XStack flexWrap="wrap" gap="$2">
        {lineup.map((artist, index) => (
          <Tag tag={artist} key={index} />
        ))}
      </XStack>
    </YStack>
  );
}

import React from "react";

import { Tag } from "@/features/core/components/Tag";

import { H2, XStack, YStack } from "tamagui";

interface EventGenresProps {
  genres: string[];
}

export default function EventGenres({ genres }: EventGenresProps) {
  return (
    <YStack gap="$2">
      <H2 fontWeight="bold">Genres</H2>
      <XStack flexWrap="wrap" gap="$2">
        {genres.map((genre, index) => (
          <Tag tag={genre} key={index} />
        ))}
      </XStack>
    </YStack>
  );
}

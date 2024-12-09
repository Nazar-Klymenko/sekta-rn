import React from "react";

import { DisplayEvent } from "@/features/event/models/Event";

import { Image, YStack } from "tamagui";

export default function EventHero({ event }: { event: DisplayEvent }) {
  return (
    <YStack position="relative" gap="$4">
      <Image
        source={{ uri: event.image.publicUrl }}
        aspectRatio={1 / 1}
        objectFit="cover"
        maxWidth={724}
      />
    </YStack>
  );
}

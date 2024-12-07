import React from "react";

import { Event } from "@/features/event/models/Event";

import { Image, YStack } from "tamagui";

export default function EventHero({ event }: { event: Event }) {
  return (
    <YStack position="relative" gap="$4">
      <Image
        source={{ uri: event.image.publicUrl }}
        aspectRatio={1 / 1}
        objectFit="cover"
      />
    </YStack>
  );
}

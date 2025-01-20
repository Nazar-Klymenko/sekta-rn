import React from "react";

import { Image, YStack } from "tamagui";

import { DisplayEvent } from "@/features/event/models/Event";

export default function EventHero({ event }: { event: DisplayEvent }) {
  return (
    <Image
      source={{
        uri: event?.image.publicUrl,
      }}
      aspectRatio={1 / 1}
      objectFit="cover"
      maxWidth={724}
      flex={1}
      width={"100%"}
    />
  );
}

import { LinearGradient } from "tamagui/linear-gradient";

import React from "react";

import { Event } from "@/features/event/models/Event";

import { Image, YStack } from "tamagui";

export default function EventHero({ event }: { event: Event }) {
  return (
    <YStack position="relative" gap="$4">
      <Image source={{ uri: event.image.publicUrl }} aspectRatio={3 / 3} />
      <LinearGradient
        colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.8)"]}
        start={[0, 0]}
        end={[0, 1]}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 100,
        }}
      />
    </YStack>
  );
}

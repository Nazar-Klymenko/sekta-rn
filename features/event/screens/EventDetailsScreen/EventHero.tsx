import React from "react";

import { Event } from "@/features/event/models/Event";

import { Image, YStack } from "tamagui";

import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function EventHero({ event }: { event: Event }) {
  const { top } = useSafeAreaInsets();
  return (
    <YStack position="relative" gap="$4" paddingTop={top}>
      <Image
        source={{ uri: event.image.publicUrl }}
        aspectRatio={1 / 1}
        objectFit="cover"
      />
    </YStack>
  );
}

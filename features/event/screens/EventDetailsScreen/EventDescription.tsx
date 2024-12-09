import React from "react";

import { H3, SizableText, YStack } from "tamagui";

interface EventDescriptionProps {
  description: string;
}

export default function EventDescription({
  description,
}: EventDescriptionProps) {
  return (
    <YStack gap="$2">
      <H3>About this event</H3>
      <SizableText size="$5">{description}</SizableText>
    </YStack>
  );
}

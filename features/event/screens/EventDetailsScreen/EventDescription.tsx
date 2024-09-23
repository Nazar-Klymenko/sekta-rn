import React from "react";

import { H2, Paragraph, YStack } from "tamagui";

interface EventDescriptionProps {
  description: string;
}

export default function EventDescription({
  description,
}: EventDescriptionProps) {
  return (
    <YStack gap="$2">
      <H2 fontWeight="bold">About this event</H2>
      <Paragraph color="$color10">{description}</Paragraph>
    </YStack>
  );
}

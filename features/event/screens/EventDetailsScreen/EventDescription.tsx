import React from "react";

import { H2, Paragraph, Separator, YStack } from "tamagui";

interface EventDescriptionProps {
  description: string;
}

export default function EventDescription({
  description,
}: EventDescriptionProps) {
  return (
    <YStack gap="$2">
      <H2 fontWeight="700">About this event</H2>
      <Paragraph size="$5">{description}</Paragraph>
    </YStack>
  );
}

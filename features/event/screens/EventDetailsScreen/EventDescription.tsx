import React from "react";

import { H2, H3, Paragraph, Separator, YStack } from "tamagui";

interface EventDescriptionProps {
  description: string;
}

export default function EventDescription({
  description,
}: EventDescriptionProps) {
  return (
    <YStack gap="$2">
      <H3>About this event</H3>
      <Paragraph size="$5">{description}</Paragraph>
    </YStack>
  );
}

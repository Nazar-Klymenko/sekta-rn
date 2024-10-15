import React from "react";

import { Calendar } from "@tamagui/lucide-icons";

import { Paragraph, YStack } from "tamagui";

export default function EmptyUpcomingEvents() {
  return (
    <YStack
      flex={1}
      justifyContent="flex-start"
      alignItems="center"
      paddingVertical="$8"
      gap="$4"
    >
      <Calendar size={100} color="$gray8Light" />
      <Paragraph fontSize="$6" fontWeight="600" textAlign="center">
        Sorry, We don't have any upcoming events
      </Paragraph>
      <Paragraph fontSize="$4" textAlign="center" color="$gray10Light">
        Come back later, and enable push notifications to not miss any new
        events
      </Paragraph>
    </YStack>
  );
}

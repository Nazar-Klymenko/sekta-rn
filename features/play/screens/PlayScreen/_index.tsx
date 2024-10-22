import React from "react";

import { Paragraph, ScrollView, YStack, useTheme } from "tamagui";

import { PlayForm } from "./Form";
import { HeroSection } from "./Hero";
import { VenueInfoSection } from "./Venue";

export default function PlayScreen() {
  return (
    <ScrollView>
      <HeroSection />
      <YStack
        backgroundColor="$background"
        padding="$4"
        gap="$4"
        marginHorizontal="auto"
        width="100%"
        maxWidth={740}
      >
        <VenueInfoSection />
        <YStack gap="$2">
          <Paragraph fontSize={24} fontWeight="700">
            Apply to Play
          </Paragraph>
          <Paragraph fontSize="$4" color="$gray10Light">
            Share your details and we'll be in touch
          </Paragraph>
        </YStack>

        <PlayForm />
      </YStack>
    </ScrollView>
  );
}

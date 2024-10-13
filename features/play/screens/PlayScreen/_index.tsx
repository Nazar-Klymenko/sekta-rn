import React from "react";

import { Platform } from "react-native";

import { PageContainer } from "@/features/core/components/layout/PageContainer";

import { Paragraph, YStack, useTheme } from "tamagui";

import { Stack } from "expo-router";

import { PlayForm } from "./Form";
import { HeroSection } from "./Hero";
import { VenueInfoSection } from "./Venue";

export default function PlayScreen() {
  const theme = useTheme();

  return (
    <PageContainer fullWidth>
      <HeroSection />
      <YStack
        backgroundColor="$background"
        padding="$4"
        flex={1}
        gap="$4"
        marginHorizontal="auto"
        width="100%"
        maxWidth={740}
      >
        <VenueInfoSection />
        <YStack gap="$2">
          <Paragraph fontSize={24} fontWeight="bold">
            Apply to Play
          </Paragraph>
          <Paragraph fontSize="$4" color="$gray10Light">
            Share your details and we'll be in touch
          </Paragraph>
        </YStack>

        <PlayForm />
      </YStack>
    </PageContainer>
  );
}

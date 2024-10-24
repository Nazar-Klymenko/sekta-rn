import React from "react";

import { PageContainer } from "@/features/core/components/layout/PageContainer";
import { ReanimatedPageContainer } from "@/features/core/components/layout/ReanimatedPageContainer";
import { useAnimatedScroll } from "@/features/core/hooks/useAnimatedScroll";

import {
  H1,
  Paragraph,
  ScrollView,
  Separator,
  YStack,
  useTheme,
} from "tamagui";

import { PlayForm } from "./Form";
import Header from "./Header";
import { HeroSection } from "./Hero";
import { VenueInfoSection } from "./Venue";

export default function PlayScreen() {
  const { scrollHandler, scrollEventThrottle, scrollY } = useAnimatedScroll();

  return (
    <>
      <Header scrollY={scrollY} />
      <ReanimatedPageContainer
        fullWidth={false}
        onScroll={scrollHandler}
        scrollEventThrottle={scrollEventThrottle}
      >
        <HeroSection />
        <YStack padding="$4" gap="$4">
          <VenueInfoSection />
          <Separator />
          <YStack gap="$2">
            <H1>Apply to Play</H1>
            <Paragraph fontSize="$5" color="$gray10Light">
              Share your details and we'll be in touch
            </Paragraph>
          </YStack>

          <PlayForm />
        </YStack>
      </ReanimatedPageContainer>
    </>
  );
}

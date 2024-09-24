import React from "react";

import { PrimaryButton } from "@/features/core/components/buttons/PrimaryButton";
import { FullPageLoading } from "@/features/core/components/layout/FullPageLoading";
import { ReanimatedPageContainer } from "@/features/core/components/layout/ReanimatedPageContainer";
import { useAnimatedScroll } from "@/features/core/hooks/useAnimatedScroll";

import { SizableText, YStack } from "tamagui";

import { useLocalSearchParams } from "expo-router";

import { useFetchEvent } from "../../hooks/useFetchEvent";
import {
  CountdownBanner,
  EventDescription,
  EventGenres,
  EventHeader,
  EventHero,
  EventInfo,
  EventLineup,
} from "./index";

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: event, isLoading, isError, error } = useFetchEvent(id || "");
  const { scrollHandler, scrollEventThrottle, scrollY } = useAnimatedScroll();

  if (!id || isLoading) return <FullPageLoading />;
  if (isError)
    return (
      <ReanimatedPageContainer>
        <SizableText>Error: {error.message}</SizableText>
      </ReanimatedPageContainer>
    );
  if (!event)
    return (
      <ReanimatedPageContainer>
        <SizableText>Event not found</SizableText>
      </ReanimatedPageContainer>
    );

  const stickyBottom = (
    <PrimaryButton onPress={() => {}}>I will attend 🎟️</PrimaryButton>
  );

  return (
    <>
      <EventHeader scrollY={scrollY} />
      <ReanimatedPageContainer
        scrollable
        fullWidth={false}
        stickyBottom={stickyBottom}
        onScroll={scrollHandler}
        scrollEventThrottle={scrollEventThrottle}
      >
        <YStack gap="$4">
          <EventHero event={event} />
          <YStack paddingHorizontal="$4" gap="$4">
            <EventInfo event={event} />
            <CountdownBanner targetDate={event.date} />
            <EventDescription description={event.caption} />
            <EventLineup lineup={event.lineup} />
            <EventGenres genres={event.genres} />
          </YStack>
        </YStack>
      </ReanimatedPageContainer>
    </>
  );
}

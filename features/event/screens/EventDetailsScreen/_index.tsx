import React from "react";

import { PrimaryButton } from "@/features/core/components/buttons/PrimaryButton";
import { FullPageLoading } from "@/features/core/components/layout/FullPageLoading";
import { ReanimatedPageContainer } from "@/features/core/components/layout/ReanimatedPageContainer";
import { useAnimatedScroll } from "@/features/core/hooks/useAnimatedScroll";

import { Paragraph, YStack } from "tamagui";

import { useLocalSearchParams } from "expo-router";

import { useFetchEvent } from "../../hooks/useFetchEvent";
import { TagSection } from "./TagSection";
import { EventDescription, EventHeader, EventHero, EventInfo } from "./index";

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: event, isLoading, isError, error } = useFetchEvent(id || "");
  const { scrollHandler, scrollEventThrottle, scrollY } = useAnimatedScroll();

  if (!id || isLoading) return <FullPageLoading />;
  if (isError)
    return (
      <ReanimatedPageContainer>
        <Paragraph>Error: {error.message}</Paragraph>
      </ReanimatedPageContainer>
    );
  if (!event)
    return (
      <ReanimatedPageContainer>
        <Paragraph>Event not found</Paragraph>
      </ReanimatedPageContainer>
    );

  const stickyBottom = <PrimaryButton onPress={() => {}}>Going!</PrimaryButton>;

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
            <EventDescription description={event.caption} />
            {event.lineup.length > 0 && (
              <TagSection title="Lineup" tags={event.lineup} />
            )}
            {event.genres.length > 0 && (
              <TagSection title="Genres" tags={event.genres} />
            )}
          </YStack>
        </YStack>
      </ReanimatedPageContainer>
    </>
  );
}

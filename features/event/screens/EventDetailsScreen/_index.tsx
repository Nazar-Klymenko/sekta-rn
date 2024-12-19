import React, { useState } from "react";

import { RefreshControl } from "react-native";

import { FullPageLoading } from "@/features/core/components/layout/FullPageLoading";
import { ReanimatedPageContainer } from "@/features/core/components/layout/ReanimatedPageContainer";
import { useAnimatedScroll } from "@/features/core/hooks/useAnimatedScroll";
import { useCountdown } from "@/features/core/hooks/useCountdown";

import { Calendar } from "@tamagui/lucide-icons";

import { View, YStack, styled } from "tamagui";

import { useLocalSearchParams } from "expo-router";

import EmptyEventList from "../../components/EmptyEventList";
import ErrorEventList from "../../components/ErrorEventList";
import { useFetchEvent } from "../../hooks/useFetchEvent";
import EventDescription from "./EventDescription";
import EventHero from "./EventHero";
import EventInfo from "./EventInfo";
import { StickyBottomButton } from "./StickyBottomButton";
import { TagSection } from "./TagSection";

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const {
    data: event,
    isLoading,
    isError,
    refetch,
    isRefetching,
  } = useFetchEvent(id || "");
  const { scrollHandler, scrollEventThrottle } = useAnimatedScroll();
  if (!id || isLoading) return <FullPageLoading />;
  if (isError)
    return (
      <ErrorEventList
        onRetry={refetch}
        errorMessage={"Error loading this event."}
        isRefetching={isRefetching}
        onRefresh={refetch}
      />
    );
  if (!event)
    return (
      <ReanimatedPageContainer>
        <EmptyEventList
          icon={Calendar}
          title="Event not found"
          description="Pull to refresh or check back later."
        />
      </ReanimatedPageContainer>
    );

  const { hasEventPassed } = useCountdown(event!.date);

  const showBottomButtom = useState(!hasEventPassed());

  return (
    <>
      <ReanimatedPageContainer
        fullWidth={false}
        onScroll={scrollHandler}
        scrollEventThrottle={scrollEventThrottle}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
      >
        <YStack gap="$4">
          <EventHero event={event} />
          <YStack
            paddingHorizontal="$4"
            paddingBottom={showBottomButtom ? "$13" : "$4"}
            gap="$4"
          >
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
      {showBottomButtom && (
        <StickyButtonWrap>
          <StickyBottomButton />
        </StickyButtonWrap>
      )}
    </>
  );
}
export const StickyButtonWrap = styled(View, {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: "$background",
  padding: "$4",
  borderTopWidth: 1,
  borderTopColor: "$borderColor",
});

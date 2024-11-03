import React from "react";

import { RefreshControl } from "react-native";

import { ButtonCTA } from "@/features/core/components/buttons/ButtonCTA";
import { FullPageLoading } from "@/features/core/components/layout/FullPageLoading";
import { ReanimatedPageContainer } from "@/features/core/components/layout/ReanimatedPageContainer";
import { useAnimatedScroll } from "@/features/core/hooks/useAnimatedScroll";

import { Calendar } from "@tamagui/lucide-icons";

import { Separator, YStack } from "tamagui";

import { useLocalSearchParams } from "expo-router";

import EmptyEventList from "../../components/EmptyEventList";
import ErrorEventList from "../../components/ErrorEventList";
import { useFetchEvent } from "../../hooks/useFetchEvent";
import { TagSection } from "./TagSection";
import { EventDescription, EventHeader, EventHero, EventInfo } from "./index";

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const {
    data: event,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useFetchEvent(id || "");
  const { scrollHandler, scrollEventThrottle, scrollY } = useAnimatedScroll();

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

  const stickyBottom = (
    <ButtonCTA theme="accent" onPress={() => {}}>
      Going!
    </ButtonCTA>
  );

  return (
    <>
      <EventHeader scrollY={scrollY} title={event.title} />
      <ReanimatedPageContainer
        scrollable
        fullWidth={false}
        stickyBottom={stickyBottom}
        onScroll={scrollHandler}
        scrollEventThrottle={scrollEventThrottle}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
      >
        <YStack gap="$4">
          <EventHero event={event} />
          <YStack paddingHorizontal="$4" gap="$4">
            <EventInfo event={event} />
            <Separator />
            <EventDescription description={event.caption} />
            <Separator />
            {event.lineup.length > 0 && (
              <TagSection title="Lineup" tags={event.lineup} />
            )}
            <Separator />
            {event.genres.length > 0 && (
              <TagSection title="Genres" tags={event.genres} />
            )}
          </YStack>
        </YStack>
      </ReanimatedPageContainer>
    </>
  );
}

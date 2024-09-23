import React from "react";

import { PageContainer } from "@/shared/components/layout/PageContainer";
import { useFavoriteEventsId } from "@/shared/hooks/useEvents";

import { Separator, YStack } from "tamagui";

import { useRouter } from "expo-router";

import { usePreviousEventsPreview } from "../../hooks/usePreviousEvents";
import { useUpcomingEventsPreview } from "../../hooks/useUpcomingEvents";
import {
  ErrorView,
  PreviousEventsSection,
  UpcomingEventsSection,
} from "./components";

export default function EventListScreen() {
  const router = useRouter();
  const { data: likedEvents } = useFavoriteEventsId();

  const {
    data: upcomingEvents,
    isLoading: isUpcomingLoading,
    error: upcomingError,
    refetch: refetchUpcoming,
  } = useUpcomingEventsPreview(3);

  const {
    data: previousEvents,
    isLoading: isPreviousEventsLoading,
    error: previousEventsError,
    refetch: refetchPrevious,
  } = usePreviousEventsPreview(4);

  if (upcomingError || previousEventsError) {
    return (
      <ErrorView
        error={(previousEventsError || upcomingError) as Error}
        onRetry={() => {
          refetchUpcoming();
          refetchPrevious();
        }}
      />
    );
  }

  return (
    <PageContainer scrollable fullWidth>
      <YStack gap="$4" paddingTop="$4">
        <UpcomingEventsSection
          upcomingEvents={upcomingEvents}
          isUpcomingLoading={isUpcomingLoading}
          onViewAllPress={() => router.push("/events/upcoming")}
        />
        <Separator marginHorizontal="$4" />
        <PreviousEventsSection
          previousEvents={previousEvents}
          isPreviousEventsLoading={isPreviousEventsLoading}
          onViewAllPress={() => router.push("/events/previous")}
        />
      </YStack>
    </PageContainer>
  );
}

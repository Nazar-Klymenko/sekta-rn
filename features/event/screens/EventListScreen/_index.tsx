import { useQueryClient } from "@tanstack/react-query";

import React, { useCallback, useState } from "react";

import { RefreshControl } from "react-native";

import { PageContainer } from "@/features/core/components/layout/PageContainer";

import { Button } from "tamagui";

import { useRouter } from "expo-router";

import { usePreviousEventsPreview } from "../../hooks/usePreviousEvents";
import { useUpcomingEvents } from "../../hooks/useUpcomingEvents";
import {
  ErrorView,
  PreviousEventsSection,
  UpcomingEventsSection,
} from "./index";

export default function EventListScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);

  const {
    data: upcomingEvents,
    isLoading: isUpcomingLoading,
    error: upcomingError,
    refetch: refetchUpcoming,
  } = useUpcomingEvents();

  const {
    data: previousEvents,
    isLoading: isPreviousEventsLoading,
    error: previousEventsError,
    refetch: refetchPrevious,
  } = usePreviousEventsPreview(4);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([refetchUpcoming(), refetchPrevious()]);
    setRefreshing(false);
  }, [refetchUpcoming, refetchPrevious]);
  const clearQueryCache = useCallback(() => {
    queryClient.clear();
    onRefresh(); // Refetch data after clearing cache
  }, [onRefresh]);
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
    <PageContainer
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Button onPress={clearQueryCache}>Clear Cache and Refresh</Button>
      <UpcomingEventsSection
        upcomingEvents={upcomingEvents}
        isUpcomingLoading={isUpcomingLoading}
        onViewAllPress={() => router.navigate("/events/upcoming")}
      />
      <PreviousEventsSection
        previousEvents={previousEvents}
        isPreviousEventsLoading={isPreviousEventsLoading}
        onViewAllPress={() => router.navigate("/events/previous")}
      />
    </PageContainer>
  );
}

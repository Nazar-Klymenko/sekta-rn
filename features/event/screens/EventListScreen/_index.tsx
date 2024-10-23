import { useQueryClient } from "@tanstack/react-query";

import React, { useCallback, useState } from "react";

import { RefreshControl } from "react-native";

import { ButtonCTA } from "@/features/core/components/buttons/ButtonCTA";
import { PageContainer } from "@/features/core/components/layout/PageContainer";

import { Separator } from "tamagui";

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
      overflowRight
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      gap="$4"
    >
      <ButtonCTA
        onPress={() => router.push("/admin/events/JW2wfBEzD1owf2HvmnP5/update")}
      >
        Shortcut delete later
      </ButtonCTA>
      <ButtonCTA onPress={() => router.push("/admin")}>Admin</ButtonCTA>
      {/* <ButtonCTA onPress={clearQueryCache}>Clear Cache and Refresh</ButtonCTA> */}
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

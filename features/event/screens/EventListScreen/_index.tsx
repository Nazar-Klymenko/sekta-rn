import React from "react";

import { RefreshControl } from "react-native";

import { PageContainer } from "@/features/core/components/layout/PageContainer";

import { useRouter } from "expo-router";

import ErrorEventList from "../../components/ErrorEventList";
import { usePreviousEventsPreview } from "../../hooks/usePreviousEvents";
import { useUpcomingEvents } from "../../hooks/useUpcomingEvents";
import { PreviousEventsSection, UpcomingEventsSection } from "./index";

export default function EventListScreen() {
  const router = useRouter();
  const {
    data: upcomingEvents,
    isLoading: isUpcomingLoading,
    isError: isUpcomingEventsError,
    isRefetching: isUpcomingEventsRefetching,
    refetch: refetchUpcoming,
  } = useUpcomingEvents();

  const {
    data: previousEvents,
    isLoading: isPreviousEventsLoading,
    isError: isPreviousEventsError,
    isRefetching: isPreviousEventsRefetching,
    refetch: refetchPrevious,
  } = usePreviousEventsPreview(4);

  if (isUpcomingEventsError || isPreviousEventsError) {
    return (
      <ErrorEventList
        onRetry={() => {
          refetchUpcoming();
          refetchPrevious();
        }}
        errorMessage={"Error loading Home"}
        isRefetching={isUpcomingEventsRefetching || isPreviousEventsRefetching}
        onRefresh={() => {
          refetchUpcoming();
          refetchPrevious();
        }}
      />
    );
  }

  return (
    <PageContainer
      overflowHorizontal
      refreshControl={
        <RefreshControl
          refreshing={isUpcomingEventsError || isPreviousEventsError}
          onRefresh={() => {
            refetchUpcoming();
            refetchPrevious();
          }}
        />
      }
      gap="$4"
    >
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

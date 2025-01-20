import React from "react";

import { RefreshControl } from "react-native";

import { useRouter } from "expo-router";

import { PageContainer } from "@/features/core/components/layout/PageContainer";
import { useFetchResidents } from "@/features/residents/hooks/useFetchResidents";

import ErrorEventList from "../../components/ErrorEventList";
import { usePreviousEventsPreview } from "../../hooks/usePreviousEvents";
import { useUpcomingEvents } from "../../hooks/useUpcomingEvents";
import { ResidentsSection } from "./ResidentsSection";
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
    data: residents,
    isLoading: isResidentsLoading,
    isError: isResidentsError,
    isRefetching: isResidentsRefetching,
    refetch: refetchResidents,
  } = useFetchResidents();
  const {
    data: previousEvents,
    isLoading: isPreviousEventsLoading,
    isError: isPreviousEventsError,
    isRefetching: isPreviousEventsRefetching,
    refetch: refetchPrevious,
  } = usePreviousEventsPreview(4);

  if (isUpcomingEventsError || isPreviousEventsError || isResidentsError) {
    return (
      <ErrorEventList
        onRetry={() => {
          refetchUpcoming();
          refetchPrevious();
        }}
        errorMessage={"Error loading Home"}
        isRefetching={
          isUpcomingEventsRefetching ||
          isPreviousEventsRefetching ||
          isResidentsRefetching
        }
        onRefresh={() => {
          refetchUpcoming();
          refetchPrevious();
          refetchResidents();
        }}
      />
    );
  }

  return (
    <PageContainer
      overflowHorizontal
      refreshControl={
        <RefreshControl
          refreshing={
            isUpcomingEventsRefetching ||
            isPreviousEventsRefetching ||
            isResidentsRefetching
          }
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
      <ResidentsSection
        residents={residents}
        isResidentsLoading={isResidentsLoading}
        onViewAllPress={() => router.navigate("/events/residents")}
      />
      <PreviousEventsSection
        previousEvents={previousEvents}
        isPreviousEventsLoading={isPreviousEventsLoading}
        onViewAllPress={() => router.navigate("/events/previous")}
      />
    </PageContainer>
  );
}

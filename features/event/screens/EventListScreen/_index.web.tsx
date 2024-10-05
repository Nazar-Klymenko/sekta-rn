import React from "react";

import { PageContainer } from "@/features/core/components/layout/PageContainer";

import { Separator, Text, YStack } from "tamagui";

import { useRouter } from "expo-router";

import { usePreviousEventsPreview } from "../../hooks/usePreviousEvents";
import { useUpcomingEventsPreview } from "../../hooks/useUpcomingEvents";
import {
  ErrorView,
  PreviousEventsSection,
  UpcomingEventsSection,
} from "./index";

export default function EventListScreen() {
  const router = useRouter();

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
        <Text fontSize={94}>
          TestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTestttTesttt
        </Text>
      </YStack>
    </PageContainer>
  );
}

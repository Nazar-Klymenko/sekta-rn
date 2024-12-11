import React from "react";

import { PageContainer } from "@/features/core/components/layout/PageContainer";

import { H1, XStack, styled } from "tamagui";

import { useRouter } from "expo-router";

import ErrorEventList from "../../components/ErrorEventList";
import { SkeletonUpcomingEventCard } from "../../components/event/SkeletonUpcomingEventCard";
import UpcomingEventCard from "../../components/event/UpcomingEventCard";
import { useFetchEvents } from "../../hooks/useFetchEvents";

export default function WebEventListScreen() {
  const { data, isLoading, isError, isRefetching, refetch } = useFetchEvents();

  if (isError) {
    return (
      <ErrorEventList
        onRetry={refetch}
        errorMessage={"Error loading Home"}
        isRefetching={isRefetching}
        onRefresh={refetch}
      />
    );
  }

  return (
    <PageContainer gap="$4">
      <H1>Upcoming Events</H1>
      <GridContainer>
        {isLoading
          ? Array(5)
              .fill(null)
              .map((_, index) => <SkeletonUpcomingEventCard key={index} />)
          : data?.map((event, idx) => (
              <UpcomingEventCard event={event} key={idx} />
            ))}
      </GridContainer>
    </PageContainer>
  );
}
const GridContainer = styled(XStack, {
  flexWrap: "wrap",
  justifyContent: "flex-start",
  gap: "$4",
  width: "100%",
});

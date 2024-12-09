import React from "react";

import { FullPageLoading } from "@/features/core/components/layout/FullPageLoading";
import { PageContainer } from "@/features/core/components/layout/PageContainer";

import { H1, XStack, YStack, styled } from "tamagui";

import { useRouter } from "expo-router";

import ErrorEventList from "../../components/ErrorEventList";
import UpcomingEventCard from "../../components/event/UpcomingEventCard";
import { useFetchEvents } from "../../hooks/useFetchEvents";

export default function WebEventListScreen() {
  const router = useRouter();
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
  if (isLoading) return <FullPageLoading />;

  return (
    <PageContainer gap="$4">
      <H1>Upcoming Events</H1>
      <GridContainer>
        {data &&
          data.map((event, idx) => (
            <UpcomingEventCard event={event} key={idx} />
          ))}
      </GridContainer>
    </PageContainer>
  );
}
const GridContainer = styled(XStack, {
  flexWrap: "wrap",
  justifyContent: "space-between",
  gap: "$4",
  width: "100%",
});

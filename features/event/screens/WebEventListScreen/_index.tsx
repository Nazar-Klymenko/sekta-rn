import React from "react";

import { FullPageLoading } from "@/features/core/components/layout/FullPageLoading";
import { PageContainer } from "@/features/core/components/layout/PageContainer";

import { XStack, YStack } from "tamagui";

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
    <PageContainer>
      <XStack flex={1} gap="$4" flexWrap="wrap">
        {data &&
          data.map((event, idx) => {
            return (
              <>
                <UpcomingEventCard event={event} key={idx} verticalView />
                <UpcomingEventCard event={event} key={idx} verticalView />
              </>
            );
          })}
      </XStack>
    </PageContainer>
  );
}

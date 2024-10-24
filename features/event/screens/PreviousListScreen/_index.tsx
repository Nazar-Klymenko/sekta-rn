import React from "react";

import { FlatList, RefreshControl } from "react-native";

import PreviousEventCard from "@/features/event/components/event/PreviousEventCard";
import { SkeletonPreviousEventCard } from "@/features/event/components/event/SkeletonPreviousEventCard";

import { getTokens } from "@tamagui/core";
import { Calendar } from "@tamagui/lucide-icons";

import { Paragraph, Spinner, YStack } from "tamagui";

import EmptyEventList from "../../components/EmptyEventList";
import ErrorEventList from "../../components/ErrorEventList";
import { usePreviousEvents } from "../../hooks/usePreviousEvents";

export default function PreviousEventsScreen() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isRefetching,
    isError,
    isLoading,
    refetch,
  } = usePreviousEvents();

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };
  if (isError) {
    return (
      <ErrorEventList
        errorMessage="Error loading previous events"
        isRefetching={isRefetching}
        onRetry={refetch}
        onRefresh={refetch}
      />
    );
  }

  const flattenedEvents = data?.pages.flatMap((page) => page) || [];

  return (
    <YStack flex={1} backgroundColor="$background">
      <FlatList
        contentContainerStyle={{ padding: getTokens().space.$4.val }}
        data={isLoading ? Array(5).fill({}) : flattenedEvents}
        renderItem={({ item: event }) => (
          <YStack gap="$4">
            {isLoading ? (
              <SkeletonPreviousEventCard />
            ) : (
              <PreviousEventCard event={event} />
            )}
          </YStack>
        )}
        keyExtractor={(item, index) => item.id || index.toString()}
        refreshing={isLoading}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
        ListEmptyComponent={() => (
          <EmptyEventList
            icon={Calendar}
            title="Sorry, no previous events found"
            description="Come back later, and enable push notifications to not miss any new events"
          />
        )}
        ListFooterComponent={() =>
          isFetchingNextPage && (
            <Spinner size="large" theme={"accent"} color={"$background"} />
          )
        }
      />
    </YStack>
  );
}

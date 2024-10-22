import React from "react";

import { ActivityIndicator, FlatList } from "react-native";

import { RetryButton } from "@/features/core/components/buttons/IconButtons";
import PreviousEventCard from "@/features/event/components/event/PreviousEventCard";
import { SkeletonPreviousEventCard } from "@/features/event/components/event/SkeletonPreviousEventCard";

import { Paragraph, YStack, useTheme } from "tamagui";

import { usePreviousEvents } from "../../hooks/usePreviousEvents";

export default function PreviousEventsScreen() {
  const theme = useTheme();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
    isLoading,
    refetch,
  } = usePreviousEvents();

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  if (status === "error") {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center">
        <Paragraph>Error: {(error as Error).message}</Paragraph>
        <RetryButton onPress={() => refetch()} size="lg" />
      </YStack>
    );
  }

  const flattenedEvents = data?.pages.flatMap((page) => page) || [];

  return (
    <YStack flex={1} backgroundColor="black" padding="$2">
      <FlatList
        data={isLoading ? Array(5).fill({}) : flattenedEvents}
        renderItem={({ item: event }) =>
          isLoading ? (
            <YStack
              style={{
                maxWidth: 720,
              }}
            >
              <SkeletonPreviousEventCard />
            </YStack>
          ) : (
            <YStack
              style={{
                maxWidth: 720,
              }}
            >
              <PreviousEventCard event={event} />
            </YStack>
          )
        }
        keyExtractor={(item, index) => item.id || index.toString()}
        refreshing={isLoading}
        onRefresh={refetch}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
        ListEmptyComponent={() => (
          <Paragraph padding="$4">
            No events found. Pull to refresh or check back later.
          </Paragraph>
        )}
        ListFooterComponent={() =>
          isFetchingNextPage ? (
            <ActivityIndicator size="large" color={theme.accentColor.get()} />
          ) : null
        }
      />
    </YStack>
  );
}

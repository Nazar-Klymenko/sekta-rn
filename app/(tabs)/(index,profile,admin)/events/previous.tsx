import React from "react";

import { ActivityIndicator, FlatList } from "react-native";

import { useFavoriteEventsId, usePreviousEvents } from "@/hooks/useEvents";

import { H2, Text, YStack, useTheme } from "tamagui";

import { RetryButton } from "@/components/buttons/IconButtons";
import PreviousEventCard from "@/components/event/PreviousEventCard";
import { SkeletonEventCard } from "@/components/event/SkeletonEventCard";
import { SkeletonPreviousEventCard } from "@/components/event/SkeletonPreviousEventCard";
import { PageContainer } from "@/components/layout/PageContainer";

export default function PreviousEventsScreen() {
  const theme = useTheme();
  const { data: likedEvents } = useFavoriteEventsId();

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
        <Text>Error: {(error as Error).message}</Text>
        <RetryButton onPress={() => refetch()} size="lg" />
      </YStack>
    );
  }

  const flattenedEvents = data?.pages.flatMap((page) => page) || [];

  return (
    <PageContainer scrollable={false} fullWidth>
      <FlatList
        data={isLoading ? Array(5).fill({}) : flattenedEvents}
        renderItem={({ item: event }) =>
          isLoading ? (
            <YStack
              style={{
                maxWidth: 720,
                paddingHorizontal: 16,
                paddingVertical: 8,
              }}
            >
              <SkeletonPreviousEventCard />
            </YStack>
          ) : (
            <YStack
              style={{
                maxWidth: 720,
                paddingHorizontal: 16,
                paddingVertical: 8,
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
          <Text padding="$4">
            No events found. Pull to refresh or check back later.
          </Text>
        )}
        ListFooterComponent={() =>
          isFetchingNextPage ? (
            <ActivityIndicator size="large" color={theme.accentColor.get()} />
          ) : null
        }
      />
    </PageContainer>
  );
}

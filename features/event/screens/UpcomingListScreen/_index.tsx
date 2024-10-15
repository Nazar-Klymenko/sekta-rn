import React from "react";

import { ActivityIndicator, FlatList } from "react-native";

import { RetryButton } from "@/features/core/components/buttons/IconButtons";
import { SkeletonUpcomingEventCard } from "@/features/event/components/event/SkeletonUpcomingEventCard";
import UpcomingEventCard from "@/features/event/components/event/UpcomingEventCard";

import { Paragraph, YStack, useTheme } from "tamagui";

import { useUpcomingEvents } from "../../hooks/useUpcomingEvents";
import EmptyUpcomingEvents from "./EmptyUpcomingEvents";
import InfoBanner from "./InfoBanner";

export default function UpcomingEventsScreen() {
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
  } = useUpcomingEvents();

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
  if (!isLoading && flattenedEvents.length === 0) {
    return <EmptyUpcomingEvents />;
  }

  return (
    <YStack flex={1} backgroundColor="black" paddingHorizontal="$4">
      <FlatList
        data={isLoading ? Array(5).fill({}) : flattenedEvents}
        renderItem={({ item: event }) =>
          isLoading ? (
            <YStack
              style={{
                maxWidth: 720,
                paddingVertical: 8,
              }}
            >
              <SkeletonUpcomingEventCard />
            </YStack>
          ) : (
            <UpcomingEventCard event={event} isVerticalView />
          )
        }
        keyExtractor={(item, index) => item.id || index.toString()}
        refreshing={isLoading}
        onRefresh={refetch}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
        ListHeaderComponent={<InfoBanner />}
        ListEmptyComponent={() => (
          <Paragraph padding="$4">
            No upcoming events found. Pull to refresh or check back later.
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

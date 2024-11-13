import React from "react";

import { FlatList, RefreshControl } from "react-native";

import { PageContainer } from "@/features/core/components/layout/PageContainer";
import { SkeletonUpcomingEventCard } from "@/features/event/components/event/SkeletonUpcomingEventCard";
import UpcomingEventCard from "@/features/event/components/event/UpcomingEventCard";

import { Calendar } from "@tamagui/lucide-icons";

import { Separator, Spinner } from "tamagui";

import EmptyEventList from "../../components/EmptyEventList";
import ErrorEventList from "../../components/ErrorEventList";
import InfoBanner from "../../components/InfoBanner";
import { useUpcomingEvents } from "../../hooks/useUpcomingEvents";

export default function UpcomingEventsScreen() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isRefetching,
    isError,
    isLoading,
    refetch,
  } = useUpcomingEvents();

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };
  if (isError) {
    return (
      <ErrorEventList
        errorMessage="Error loading upcoming events"
        isRefetching={isRefetching}
        onRetry={refetch}
        onRefresh={refetch}
      />
    );
  }

  const flattenedEvents = data?.pages.flatMap((page) => page) || [];

  return (
    <PageContainer>
      <FlatList
        scrollEnabled={false}
        data={isLoading ? Array(5).fill({}) : flattenedEvents}
        ItemSeparatorComponent={() => <Separator marginVertical="$2" />}
        renderItem={({ item: event }) =>
          isLoading ? (
            <SkeletonUpcomingEventCard verticalView />
          ) : (
            <UpcomingEventCard verticalView event={event} />
          )
        }
        keyExtractor={(item, index) => item.id || index.toString()}
        refreshing={isLoading}
        onRefresh={refetch}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
        ListHeaderComponent={<InfoBanner />}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
        ListEmptyComponent={() => (
          <EmptyEventList
            icon={Calendar}
            title="Sorry, We don't have any upcoming events"
            description="Pull to refresh or check back later"
          />
        )}
        ListFooterComponent={() =>
          isFetchingNextPage && (
            <Spinner size="large" theme={"accent"} color={"$background"} />
          )
        }
      />
    </PageContainer>
  );
}

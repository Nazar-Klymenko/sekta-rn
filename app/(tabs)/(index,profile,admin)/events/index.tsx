import { ChevronRight } from "@tamagui/lucide-icons";

import React from "react";

import { ActivityIndicator, FlatList, ScrollView } from "react-native";

import { useFavoriteEventsId } from "@/hooks/useEvents";
import { usePreviousEvents, useUpcomingEvents } from "@/hooks/useEvents";

import { Link, useRouter } from "expo-router";
import {
  Button,
  H1,
  H2,
  Heading,
  Text,
  XStack,
  YStack,
  useTheme,
} from "tamagui";

import { RetryButton } from "@/components/buttons/IconButtons";
import { EventCard } from "@/components/event/EventCard";
import PreviousEventCard from "@/components/event/PreviousEventCard";
import { SkeletonEventCard } from "@/components/event/SkeletonEventCard";
import UpcomingEventCard from "@/components/event/UpcomingEventCard";
import { PageContainer } from "@/components/layout/PageContainer";

const ITEMS_PER_PAGE = 10;

export default function HomeScreen() {
  const theme = useTheme();
  const { data: likedEvents } = useFavoriteEventsId();
  const router = useRouter();

  const {
    data: upcomingEvents,
    isLoading: isUpcomingLoading,
    error: upcomingError,
  } = useUpcomingEvents(3); // Fetch 3 upcoming events

  const {
    data: previousEventsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error: previousEventsError,
    isLoading: isPreviousEventsLoading,
    refetch,
  } = usePreviousEvents();

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  if (status === "error" || upcomingError) {
    return (
      <YStack flex={1} justifyContent="flex-start" alignItems="center">
        <Text>
          Error: {((previousEventsError || upcomingError) as Error).message}
        </Text>
        <RetryButton onPress={() => refetch()} size="lg" />
      </YStack>
    );
  }

  const flattenedPreviousEvents =
    previousEventsData?.pages.flatMap((page) => page) || [];

  return (
    <PageContainer scrollable={false} fullWidth>
      <FlatList
        data={
          isPreviousEventsLoading ? Array(5).fill({}) : flattenedPreviousEvents
        }
        renderItem={({ item: event }) =>
          isPreviousEventsLoading ? (
            <SkeletonEventCard />
          ) : (
            <YStack
              style={{
                maxWidth: 720,
                padding: 16,
              }}
            >
              <PreviousEventCard event={event} />
            </YStack>
          )
        }
        keyExtractor={(item, index) => item.id || index.toString()}
        refreshing={isPreviousEventsLoading}
        onRefresh={refetch}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
        ListHeaderComponent={
          <YStack gap="$4" paddingTop="$4">
            <XStack
              justifyContent="space-between"
              alignItems="center"
              paddingHorizontal="$4"
            >
              <H2>Upcoming Events</H2>
              {/* <Link href="/upcoming"> */}
              <XStack
                alignItems="center"
                justifyContent="center"
                display="flex"
              >
                <Text onPress={() => router.push("/events/upcoming")}>
                  View all
                </Text>
                <ChevronRight />
              </XStack>
              {/* </Link> */}
            </XStack>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: 16,
                paddingVertical: 8,
              }}
            >
              {isUpcomingLoading
                ? Array(3)
                    .fill(null)
                    .map((_, index) => (
                      <XStack key={`skeleton-${index}`} paddingRight="$4">
                        <SkeletonEventCard />
                      </XStack>
                    ))
                : upcomingEvents?.map((event) => (
                    <XStack key={event.id} paddingRight="$4">
                      <UpcomingEventCard
                        event={event}
                        isLiked={likedEvents?.includes(event.id) || false}
                      />
                    </XStack>
                  ))}
            </ScrollView>
            <H2 paddingHorizontal="$4">Previous Events</H2>
          </YStack>
        }
        ListEmptyComponent={() => (
          <Text>No events found. Pull to refresh or check back later.</Text>
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

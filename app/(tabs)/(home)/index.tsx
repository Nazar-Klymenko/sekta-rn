// index.tsx
import { SlidersHorizontal } from "@tamagui/lucide-icons";
import {
  InfiniteData,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";

import React, { useState } from "react";

import { ActivityIndicator, FlatList, Platform } from "react-native";

import { fetchFilteredEvents } from "@/api/events";
import { useFavoriteEventsId } from "@/hooks/useEvents";
import { Event } from "@/models/Event";

import { Stack, useRouter } from "expo-router";
import { Button, Text, YStack, useTheme } from "tamagui";

import { FilterDialog, FilterValues } from "@/components/FilterDialog";
import { FilterButton, RetryButton } from "@/components/buttons/IconButtons";
import { EventCard } from "@/components/event/EventCard";
import { FullPageLoading } from "@/components/layout/FullPageLoading";
import { PageContainer } from "@/components/layout/PageContainer";

const ITEMS_PER_PAGE = 6;

export default function HomeScreen() {
  const theme = useTheme();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState<FilterValues>({
    priceSort: false,
    selectedGenres: [],
    selectedArtists: [],
    includeOldEvents: false,
  });

  const { data: likedEvents } = useFavoriteEventsId();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
    refetch,
    isLoading,
  } = useInfiniteQuery<
    Event[],
    Error,
    InfiniteData<Event[]>,
    [string, FilterValues],
    number
  >({
    queryKey: ["events", filters],
    queryFn: async ({ pageParam }) => {
      const events = await fetchFilteredEvents(
        filters,
        pageParam,
        ITEMS_PER_PAGE
      );
      return events;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.length === ITEMS_PER_PAGE ? pages.length : undefined;
    },
  });

  const flattenedEvents = data?.pages.flat() || [];

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const appliedFiltersCount = Object.values(filters).filter((value) => {
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === "boolean") return value;
    return value !== null;
  }).length;

  const handleApplyFilters = (newFilters: FilterValues) => {
    setFilters(newFilters);
    queryClient.resetQueries({ queryKey: ["events", newFilters] });
  };

  const handleResetFilters = () => {
    setFilters({
      priceSort: false,
      selectedGenres: [],
      selectedArtists: [],
      includeOldEvents: false,
    });
  };
  if (status === "pending") return <FullPageLoading />;

  return (
    <PageContainer scrollable={false} fullWidth>
      <Stack.Screen
        options={{
          headerRight: () => (
            <FilterButton
              setOpen={setOpen}
              appliedFiltersCount={appliedFiltersCount}
            />
          ),
        }}
      />
      {status === "error" ? (
        <YStack flex={1} justifyContent="flex-start" alignItems="center">
          <Text>Error: {(error as Error).message}</Text>
          <RetryButton onPress={() => refetch()} size="lg" />
        </YStack>
      ) : (
        <FlatList
          style={{ flex: 1, width: "100%" }}
          showsVerticalScrollIndicator={Platform.OS == "web"}
          contentContainerStyle={{
            marginHorizontal: Platform.OS == "web" ? "auto" : undefined,
          }}
          data={flattenedEvents}
          renderItem={({ item: event }) => (
            <YStack style={{ maxWidth: 720 }}>
              <EventCard
                event={event}
                hrefSource="event"
                isLiked={likedEvents?.includes(event.id) || false}
              />
            </YStack>
          )}
          keyExtractor={(item) => item.id}
          refreshing={isLoading}
          onRefresh={refetch}
          onEndReached={loadMore}
          onEndReachedThreshold={0.1}
          ListEmptyComponent={() => (
            <Text>No events found. Pull to refresh or check back later.</Text>
          )}
          ListFooterComponent={() =>
            isFetchingNextPage ? (
              <ActivityIndicator size="large" color={theme.accentColor.get()} />
            ) : null
          }
        />
      )}
      <FilterDialog
        open={open}
        onOpenChange={setOpen}
        events={flattenedEvents}
        onApplyFilters={handleApplyFilters}
        onResetFilters={handleResetFilters}
        currentFilters={filters}
      />
    </PageContainer>
  );
}
